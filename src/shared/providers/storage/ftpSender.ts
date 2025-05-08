import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { v4 as uuidv4 } from 'uuid';
import { storagebucket } from "./firebaseLoader";
import { uploadViaFTP } from "./remoteUpload";


async function uploadFileToFirebase(file: Express.Multer.File, storagePath: string): Promise<string> {
    try {
        const uniqueFileName = `${uuidv4()}_${file.originalname}`;
       const fileRef = ref(storagebucket, `${storagePath}/${uniqueFileName}`);
        await uploadBytes(fileRef, file.buffer);
         const downloadURL = await getDownloadURL(fileRef);
1
  /*   const downloadURL = await uploadViaFTP(file.buffer, uniqueFileName, {
          remoteDir: '/',
           onProgress: (progress: number) => console.log(`Upload FTP progress: ${progress}%`)
        });
*/
        return downloadURL;

    } catch (error) {
        throw new Error(`Erro ao fazer upload do arquivo: ${error}`);
    }
}

export { uploadFileToFirebase };