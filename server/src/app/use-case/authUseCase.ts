import AuthRepository from "../repository/authRepository.js";
import logger from "../../utils/logger.js";
import { IResponse } from "../../interface/IResponse.js";
import { StatusCode } from "../../interface/StatusCode.js";
import { generateOtp } from "../../utils/generateOtp.js";
import emailService from "../../services/emailService.js";
import { handleError } from "../../middlewares/errorMiddleware.js";

class AuthUseCase{
    private authRepository: AuthRepository;

    constructor(authRepository: AuthRepository){
        this.authRepository = authRepository
    }

    public async registerUser(email:string ,password:string): Promise<IResponse & { otp?: string}>{
        try {
            logger.debug("Got hre")
            const existUser = await this.authRepository.findByEmail(email)
            if(existUser){
                return{status:StatusCode.BadRequest, message:"User already found"}
            }
            const otp =  generateOtp()
            logger.debug("Generated otp",otp)
          
            try {
                await emailService.sendOtpEmail(email, otp);
                const data = await this.authRepository.saveOtpData(email,password,otp)
                if(data){
                    logger.info("Temp Data saved")
                    return { status: StatusCode.OK, message: "OTP sent successfully", otp };
                }
                logger.error("Error while saving temp data")
                return{status:StatusCode.InternalServerError, message:"Something happend,Error occured"}
            } catch (emailError) {
                logger.error("Error sending OTP email:", emailError);
                return { status: StatusCode.InternalServerError, message: "Failed to send OTP email" };
            }
        } catch (error: unknown ) {
                return handleError(error, "An error occurred while registering user")
               }
    }

}

export default AuthUseCase;