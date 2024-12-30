import { handleError } from "../../middlewares/errorMiddleware.js";
import { IResponse } from "../../interface/IResponse.js";
import UserDetailsRepository from "../repository/userDetailsRepository.js";
import { StatusCode } from "../../interface/StatusCode.js";
import logger from "../../utils/logger.js";
import { validateName, validateUserName } from "../../utils/validation.js";
import { validateUserId } from "../../utils/validation.js";


export class UserDetailsUseCase{

    private userDetailsRepository : UserDetailsRepository

    constructor(userDetailsRepository: UserDetailsRepository){
        this.userDetailsRepository = userDetailsRepository
    }

    public async editName(userId:string, name:string):Promise<IResponse & {data?:string}>{
        try {
            const nameValidate = validateName(name)
            const userIdValidate = validateUserId(userId)
            if(!nameValidate || !userIdValidate){
                return{status:StatusCode.BadRequest, message:"Some credientials are missing"}
            }
            const data = await this.userDetailsRepository.updateName(userId, name);
            logger.debug(data)
            if(!data){
                return{status:StatusCode.InternalServerError, message:"No user found"}
            }
            return{status:StatusCode.OK, message:"Name updated", data}
        } catch (error) {
            return handleError(error, "An error occurred while changing name")
           }
    }

    public async editUserName(userId:string, userName:string): Promise<IResponse & {data?:string}>{
        try {
            const userNameValidate = validateUserName(userName)
            const userIdValidate = validateUserName(userId)
            if(!userNameValidate || !userIdValidate){
                return{status:StatusCode.BadRequest, message:"some credientials are missing"}
            }
            const data = await this.userDetailsRepository.updateUserName(userId, userName)
            if(!data){
                return{status:StatusCode.InternalServerError, message:"Something went wrong cant change userName"}
            }
            return{status:StatusCode.OK, message:"userName changed successfully", data}
        } catch (error) {
            return handleError(error, "An error occurred while changing userName")
           }
    }
}