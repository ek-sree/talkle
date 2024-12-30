import { Router } from "express";
import { AuthDIContainer } from "../../di/authDiContainer.js";
import { upload } from "../../middlewares/multer.js";
import { refreshTokenHandler } from "../controller/tokenHandler.js";

const authRouter = Router();

const authController = AuthDIContainer.getAuthController();



authRouter.post("/register", authController.register);  
authRouter.post('/otpVerify', authController.otpVerify);
authRouter.post('/checkUserName', authController.findUserName);
authRouter.post('/create-profile', upload("avatar").single('avatar'), authController.profileCreate)
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout)


authRouter.post('/refresh-token', refreshTokenHandler)


export default authRouter;
