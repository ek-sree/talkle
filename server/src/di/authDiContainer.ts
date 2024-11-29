import logger from "../utils/logger.js";
import AuthController from "../app/controller/authController.js";
import AuthRepository from "../app/repository/authRepository.js";
import AuthUseCase from "../app/use-case/authUseCase.js";


export class AuthDIContainer {
    public static getAuthController(): AuthController {
        const authRepository = new AuthRepository();
        const authUseCase = new AuthUseCase(authRepository);
        const authController = new AuthController(authUseCase);

        logger.debug("AuthController instantiated with AuthUseCase:", authController);
        return authController;
    }
}

