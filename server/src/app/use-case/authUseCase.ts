import AuthRepository from "../repository/authRepository.js";
import logger from "../../utils/logger.js";
import { IResponse } from "../../interface/IResponse.js";
import { StatusCode } from "../../interface/StatusCode.js";
import { generateOtp } from "../../utils/generateOtp.js";
import emailService from "../../services/emailService.js";
import { handleError } from "../../middlewares/errorMiddleware.js";
import { EmailVerify } from "../../interface/EmailVerify.js";

class AuthUseCase{
    private authRepository: AuthRepository;

    constructor(authRepository: AuthRepository){
        this.authRepository = authRepository
    }


    private async verifyEmail(email:string):Promise<{otp?:string; success:boolean}>{
        try {
            const otp = generateOtp();
            try {
                await emailService.sendOtpEmail(email,otp)
                return {otp,success:true}
            } catch (error) {
                logger.error("Error sending code to email",error)
                return {success:false}
            }
        } catch (error) {
            logger.error("Error verifying email",error)
            return {success:false}
        }
    }

    

    public async registerUser(email:string ,password:string): Promise<IResponse & { otp?: string}>{
        try {
            const existUser = await this.authRepository.findByEmail(email)
            if(existUser){
                return{status:StatusCode.BadRequest, message:"User already found"}
            }
        
            const {otp, success} = await this.verifyEmail(email)
            if(!success){
                return { status: StatusCode.InternalServerError, message: "Failed to send OTP email" };
            }
            if(otp){
                const data = await this.authRepository.saveOtpData(email, password, otp, EmailVerify.Register);
                if (data) {
                    logger.info("Temporary data saved successfully.");
                    return { status: StatusCode.OK, message: "OTP sent successfully", otp };
                }
            }
          
                logger.error("Error while saving temp data")
                return{status:StatusCode.InternalServerError, message:"Something happend,Error occured"}
            } catch (error: unknown ) {
                return handleError(error, "An error occurred while registering user")
            }
    }

    public async verifyOtp(otp:string,email:string): Promise<IResponse & {data?:{email:string, verifyType:string}}>{
        try {
            if(!email){
                return {status:StatusCode.InternalServerError, message:"Email doesnt found,Error"}
            }
            const data = await this.authRepository.findOtp(email);
            if(!data){
                return {status:StatusCode.BadRequest, message:"Time out"};
            }

            const otpCheck = otp == data.otp
            if(!otpCheck){
                return {status:StatusCode.BadRequest , message:"Otp enterd is incorrect"}
            }
                return {status:StatusCode.OK, message:"Verified email", data:{email:data.email,verifyType:data.verifyType}}
        } catch (error) {
            return handleError(error, "An error occurred while verifying otp")
        }
    }

}

export default AuthUseCase;