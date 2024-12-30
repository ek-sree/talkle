import { UserDetailsDiContainer } from "../../di/userDetailsDiContainer.js";
import {Router} from "express"

const userDetailsRouter = Router();

const userDetailsController = UserDetailsDiContainer.getUserDetailsController()


userDetailsRouter.post('/updateName/:userId', userDetailsController.changeName);
userDetailsRouter.post('/updateUserName/:userId', userDetailsController.changeUserName);

export default userDetailsRouter;