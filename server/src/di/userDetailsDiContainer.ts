import UserDetailsRepository from "../app/repository/userDetailsRepository.js";
import UserDetailsController from "../app/controller/userDetailsController.js";
import { UserDetailsUseCase } from "../app/use-case/userDetailsUseCase.js";
import logger from "../utils/logger.js";

export class UserDetailsDiContainer{
    public static  getUserDetailsController(): UserDetailsController{
        const userDetailsRepository = new UserDetailsRepository()
        const userDetailsUseCase = new UserDetailsUseCase(userDetailsRepository)
        const userDetailsController = new UserDetailsController(userDetailsUseCase)

        logger.info("UserDetailsController instantiated with UserDetailsUseCase:", userDetailsController);
        return userDetailsController;
    }
}