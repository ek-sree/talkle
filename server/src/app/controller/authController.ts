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
}

export default AuthController;