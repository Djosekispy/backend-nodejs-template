
import { Readable } from 'stream';
import path from 'path';
import { ftpConfig, sftpClient } from '../../../config/ftp';

interface UploadOptions {
    remoteDir?: string;
    onProgress?: (progress: number) => void;
}

async function uploadViaFTP(localFile: string | Buffer, fileName: string, options: UploadOptions = {}) {
    const { remoteDir = '/', onProgress } = options;
    
    try {
        await sftpClient.access(ftpConfig);
        
        await sftpClient.cd(remoteDir);
        
        if (Buffer.isBuffer(localFile)) {
            const stream = Readable.from(localFile);
            await sftpClient.uploadFrom(stream, fileName);
        } else {
            await sftpClient.uploadFrom(localFile, fileName);
        }

        return {
            success: true,
            url: `https://upload.kuheta.ao/files/${fileName}`,
            path: path.join(remoteDir, fileName)
        };

    } catch (err) {

        throw new Error(`Falha no upload: ${err}`);
    } finally {
        await sftpClient.close();
    }
}

export { uploadViaFTP };