import crypto from 'crypto'
import bcrypt from 'bcrypt'
import logger from './logger.js';

export const generateOtp = (): string=>{
    return crypto.randomInt(1000,10000).toString();
}
logger.debug("reached")
export const hashOtp = async(otp:string): Promise<string>=>{
    return bcrypt.hash(otp, 10);
}