import { S3 } from '@aws-sdk/client-s3';
import config from "../config/index.js";

if (!config.AWS_S3_ACCESS_KEY || !config.AWS_S3_SECRET_KEY || !config.AWS_REGION) {
    throw new Error('Missing AWS configuration values in environment variables.');
}

const s3 = new S3({
    credentials: {
        accessKeyId: config.AWS_S3_ACCESS_KEY!,  
        secretAccessKey: config.AWS_S3_SECRET_KEY!,
    },
    region: config.AWS_REGION!, 
});

export default s3;
