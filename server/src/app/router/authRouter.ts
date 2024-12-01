import { Router } from "express";
import { AuthDIContainer } from "../../di/authDiContainer.js";

const authRouter = Router();

const authController = AuthDIContainer.getAuthController();



authRouter.post("/register", authController.register);  
authRouter.post('/otpVerify', authController.otpVerify)

export default authRouter;
