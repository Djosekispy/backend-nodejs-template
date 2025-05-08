import { Client } from 'basic-ftp';
import { env } from 'process';
import { FTP_HOST, FTP_PORT, FTP_USERNAME, FTP_PASSWORD } from './env';


export const ftpConfig = {
    
        host: FTP_HOST,
        port: parseInt(String(FTP_PORT)),
        user: FTP_USERNAME,
        password: FTP_PASSWORD,
        secure: false 
};

export const sftpClient = new Client();

