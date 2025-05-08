import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { ref, deleteObject } from 'firebase/storage';
import { uploadFileToFirebase } from '../providers/storage/ftpSender';
import { IGetUserAuthInfoRequest } from '../../@types/express';
import { storagebucket } from '../providers/storage/firebaseLoader';


const localStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileName = `${file.fieldname}-${uniqueSuffix}-${file.originalname}`;
    cb(null, fileName);
  }
});

const memoryStorage = multer.memoryStorage();

const fileFilter = (req: IGetUserAuthInfoRequest, file: Express.Multer.File, cb: any) => {
  const allowedFileTypes = /jpg|jpeg|png|pdf/;
  const mimeType = ['image/jpeg', 'image/png', 'application/pdf'].includes(file.mimetype);
  const extName = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimeType && extName) {
    return cb(null, true);
  }
  cb(new Error('Formato de arquivo inválido. Apenas arquivos PDF e imagens (JPEG/PNG) são permitidos.'));
};


const uploadLocal = multer({
  storage: localStorage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 10 }
});

const uploadMemory = multer({
  storage: memoryStorage,
  fileFilter: fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }
});

export const uploadFileMiddleware = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  const useFirebase = true; 

  if (useFirebase) {
    uploadMemory.single('file')(req, res, async (err: any) => {
      if (err instanceof multer.MulterError) {
        console.error('Erro no upload do arquivo:', err);
        return res.status(400).json({ message: 'Erro no upload do arquivo!' });
      } else if (err) {
        console.error('Erro no upload do arquivo:', err);
        return res.status(500).json({ message: 'Erro no upload do arquivo.' });
      }

      if (!req.file) {
        return next();
      }

      const storagePath = 'files'; 
      try {
        const downloadURL = await uploadFileToFirebase(req.file, storagePath);
        req.downloadURL = downloadURL;
        next();
      } catch (error) {
        console.error('Erro ao fazer upload do arquivo:', error);
        return res.status(500).json({ message: 'Erro ao fazer upload do arquivo.' });
      }
    });
  } else {
    uploadLocal.single('file')(req, res, (err: any) => {
      if (err instanceof multer.MulterError) {
        console.error('Erro no upload do arquivo:', err);
        return res.status(400).json({ message: 'Erro no upload do arquivo.' });
      } else if (err) {
        console.error('Erro no upload do arquivo:', err);
        return res.status(500).json({ message: 'Erro no upload do arquivo.' });
      }

      if (req.file) {
        const normalizedPath = req.file.path.replace(/\\/g, '/');
        req.downloadURL = normalizedPath;
      }
      next();
    });
  }
};

export const saveFilePathMiddleware = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  if (req.file) {
    const normalizedPath = req.file.path.replace(/\\/g, '/');
    req.downloadURL = normalizedPath;
  }
  next();
};

export const deleteFile = async (filePath: string): Promise<string> => {
  try {
    if (filePath.startsWith('http')) {
      const fileRef = ref(storagebucket, filePath);
      await deleteObject(fileRef);
      return 'Arquivo deletado do Firebase com sucesso.';
    } else {
      await fs.promises.unlink(filePath);
      return 'Arquivo local deletado com sucesso.';
    }
  } catch (error) {
    throw new Error(`Erro ao deletar o arquivo: ${error}`);
  }
};