import { Request, Response } from "express";
import AuthUseCase from "../use-case/authUseCase.js";
import logger from "../../utils/logger.js";
import { StatusCode } from "../../interface/StatusCode.js";

class AuthController {
    private authUseCase: AuthUseCase;

    constructor(authUseCase: AuthUseCase) {
        this.authUseCase = authUseCase;
    }

    public register = async (req: Request, res: Response): Promise<void> => {
        try {
            
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(StatusCode.BadRequest).json({ 
                    message: "Email and password are required" 
                });
                return;
            }

            const responses = await this.authUseCase.registerUser(email, password);
            if(responses.status==200){
                req.session.email=email;
            }
            res.status(responses.status).json({ 
                message: responses.message 
            });
        } catch (error) {
            logger.error("Register error on controller", error);
            res.status(StatusCode.InternalServerError).json({ 
                message: "Internal server error" 
            });
        }
    }

    public otpVerify= async(req:Request, res: Response): Promise<void>=>{
        try {
            const otp = req.body.otp
            logger.warn(req.body.otp)
            logger.debug("otp got",otp)
            const email = req.session.email || ''
            if(!otp.trim() || !email){
                res.status(StatusCode.BadRequest).json({message:"Some credientials are missing"})
                return
            }
            const response = await this.authUseCase.verifyOtp(otp,email);
            if(response.status==200){
                delete req.session.email;
            }
            res.status(response.status).json({message:response.message, data:response.data})
        } catch (error) {
            logger.error("Verify Otp error on controller", error);
            res.status(StatusCode.InternalServerError).json({ 
                message: "Internal server error" 
            });
        }
    }

    public findUserName= async(req:Request, res:Response): Promise<void>=>{
        try {
            const userName = req.body.userName;
            logger.debug(userName)
            if(!userName){
                res.status(StatusCode.BadRequest).json({ message: "credientials are not found" });
                return
            }
            const response = await this.authUseCase.checkUserName(userName);
            res.status(response.status).json({message:response.message})
        } catch (error) {
            logger.error("findUserName error on controller", error);
            res.status(StatusCode.InternalServerError).json({ 
                message: "Internal server error" 
            });
        }
    }

    public profileCreate= async(req:Request, res:Response): Promise<void>=>{
        try {
            const avatar  = req.file;
        const name = req.body.name;
        const email = req.body.email;
        const userName = req.body.userName;
        logger.debug("?"+ email)        
        logger.debug("?"+ avatar)        
        if (!avatar || !name || !userName || !email.trim()) {
            res.status(StatusCode.BadRequest).json({ message: "Image, name, or email cannot be found or is invalid." });
            return
        }
            
            const mimeType = avatar?.mimetype ||''
            const fileBuffer = avatar?.buffer || Buffer.from('')
            const response = await this.authUseCase.saveUserData(email,name,userName,fileBuffer,mimeType)
            res.cookie("refreshToken", response.refreshToken, {
                httpOnly: true,  
                secure: false,   
                sameSite: 'strict', 
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            res.status(response.status).json({message:response.message, data:response.data, accessToken:response.accessToken})
        } catch (error) {
            logger.error("Profile creating error on controller", error);
            res.status(StatusCode.InternalServerError).json({ 
                message: "Internal server error" 
            });
        }
    }

    public login= async(req: Request, res: Response):Promise<void>=>{
        try {
            const email = req.body.email;
            const password = req.body.password;
            if(!email || !password){
                res.status(StatusCode.BadRequest).json({message:"Missing credientials"})
                return
            }
            const response = await this.authUseCase.login(email, password);
            logger.debug("refresh dataa-->>>"+response.refreshToken)
            res.cookie("refreshToken", response.refreshToken, {
                httpOnly: true,  
                secure: false,   
                sameSite: 'strict', 
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            res.status(response.status).json({message:response.message, data:response.data,  accessToken:response.accessToken})
        } catch (error) {
            logger.error("Login user error on controller", error);
            res.status(StatusCode.InternalServerError).json({ 
                message: "Internal server error" 
            });
        }
    }

    public logout= async(req:Request, res:Response):Promise<void>=>{
        try {
            logger.info("Logout done??????????")
            res.clearCookie('refreshToken')
                res.status(200).json({message:"Cleared cookie"})
           
        } catch (error) {
            logger.error("Logout user error on controller", error);
            res.status(StatusCode.InternalServerError).json({ 
                message: "Internal server error" 
            });
        }
    }
}

export default AuthController;