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
            logger.debug('Register request body:', req.body);
            
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(StatusCode.BadRequest).json({ 
                    message: "Email and password are required" 
                });
                return;
            }

            const responses = await this.authUseCase.registerUser(email, password);
            
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
}

export default AuthController;