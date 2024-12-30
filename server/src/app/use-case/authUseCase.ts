import AuthRepository from "../repository/authRepository.js";
import logger from "../../utils/logger.js";
import { IResponse } from "../../interface/IResponse.js";
import { StatusCode } from "../../interface/StatusCode.js";
import { generateOtp } from "../../utils/generateOtp.js";
import emailService from "../../services/emailService.js";
import { handleError } from "../../middlewares/errorMiddleware.js";
import { EmailVerify } from "../../interface/EmailVerify.js";
import { IUser } from "../../interface/IUser.js";
import { uploadImageToS3 } from "../../services/s3Services.js";
import { generateTokens } from "../../utils/generateTokens.js";
import { IAuthResponse } from "../../interface/IAuthResponse.js";
import { validateEmail, validateOtp, validatePassword, validateUserName } from "../../utils/validation.js";

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
            const emailValidate = validateEmail(email)
            const passwordValidate = validatePassword(password)
            if(!emailValidate || !passwordValidate){
                return{status:StatusCode.BadRequest, message:"Invalid email or password"}
            }
            const existUser = await this.authRepository.findByEmail(email)
            if(existUser){
                return{status:StatusCode.Conflict, message:"User already found"}
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
            const otpValidate = validateOtp(otp)
            if(!otpValidate){
                return{status:StatusCode.BadRequest, message:"Invalid otp"}
            }
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

    public async checkUserName(userName:string): Promise<IResponse>{
        try {
            const userNameValidate = validateUserName(userName)
            if(!userNameValidate){
                return{status:StatusCode.BadRequest, message:"Invalid username"}
            }
            const name = await this.authRepository.findUserName(userName);
            if(!name){
                return {status:StatusCode.BadRequest, message:"Username is already taken"}
            }
            return{status:StatusCode.OK ,  message:"usesrname available"}
        } catch (error) {
            return handleError(error, "An error occurred while checking userName")
        }
    }

    public async saveUserData(email:string, name:string, userName:string, fileBuffer:Buffer,mimeType:string): Promise<IAuthResponse>{
        try {
            
            const userNameValidate = validateUserName(userName)
            const emailValidate = validateEmail(email)
            if(!userNameValidate || !emailValidate || !name.trim() || !fileBuffer || !mimeType){
                return{status:StatusCode.BadRequest, message:"Invalid credientials"}
            }


            const user = await this.authRepository.findOtp(email);
            if(!user){
                logger.error("Error finding data on tempModal")
                return {status:StatusCode.InternalServerError, message:"some credientials are missing/ internal server error"}
            }

            const imageUrl = await uploadImageToS3(fileBuffer,mimeType);

            if(!imageUrl){
                logger.error("Error while uploading image on s3");
                return {status:StatusCode.InternalServerError, message:"Cannot upload profile image"}
            }
            const datas: IUser = {
                _id:'',
                name,
                userName,
                email,
                password:user?.password || '',
                avatar: imageUrl
            }
            const data = await this.authRepository.saveUser(datas)
            if(!data){
                return{status:StatusCode.InternalServerError, message:"User data is not saved, Error occured"}
            }
            if(!data._id){
                return{status:StatusCode.InternalServerError, message:"userId not found"}
            }
            const {accessToken, refreshToken} =  generateTokens(data?._id.toString())
            
            this.authRepository.deleteTempDataInBackground(email)

            return{status:StatusCode.OK, message:"Data saved successfully", data,accessToken, refreshToken}
        } catch (error) {
            return handleError(error, "An error occurred while verifying otp")
        }
    }

    public async login(email: string, password: string): Promise<IAuthResponse>{
        try {
            const emailValidate = validateEmail(email)
            const passwordValidate = validatePassword(password)
            if(!emailValidate || !passwordValidate){
                return{status:StatusCode.BadRequest, message:"Invalid email or password"}
            }
            
            const user = await this.authRepository.findUser(email, password);
            if(!user){
                return {status:StatusCode.NotFound, message:"Email or password incorrect"}
            }
            const {accessToken, refreshToken} =  generateTokens(user?._id.toString())
            return{status:StatusCode.OK, message:"Login successfully", data:user, accessToken,refreshToken}
        } catch (error) {
            return handleError(error, "An error occurred while login")  
        }
    }

}

export default AuthUseCase;