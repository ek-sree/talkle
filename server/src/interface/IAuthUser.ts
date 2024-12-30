import { EmailVerify } from "./EmailVerify";

export interface IAuthUser {
    email: string;
    otp: string;
    password?:string;
    verifyType: EmailVerify;
}