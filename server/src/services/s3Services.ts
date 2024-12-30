import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import s3 from './s3Config.js';


export const uploadImageToS3 = async (fileBuffer: Buffer, mimeType: string): Promise<string> => {
    const fileName = `${uuidv4()}.png`; 

    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME!,  
        Key: fileName, 
        Body: fileBuffer, 
        ContentType: mimeType,  
    };

    try {
        await s3.send(new PutObjectCommand(uploadParams));  

        return getImageFromS3(fileName);  
    } catch (error: unknown) {  
        const e = error as Error;  
        throw new Error(`Error uploading image: ${e.message}`);
    }
};

export const getImageFromS3 = (fileName: string): string => {
    const baseUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/`;
    return `${baseUrl}${fileName}`;
};

export const deleteImageFromS3 = async (fileName: string): Promise<void> => {
    const deleteParams = {
        Bucket: process.env.AWS_BUCKET_NAME!,  
        Key: fileName, 
    };

    try {
        await s3.send(new DeleteObjectCommand(deleteParams));  
        console.log('Image deleted successfully.');
    } catch (error: unknown) {
        const e = error as Error;
        throw new Error(`Error deleting image: ${e.message}`);
    }
};
