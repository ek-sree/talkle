import { Request, Response } from "express";
import { UserDetailsUseCase } from "../use-case/userDetailsUseCase.js";
import { StatusCode } from "../../interface/StatusCode.js";
import logger from "../../utils/logger.js";

class UserDetailsController{
    private userDetailsUseCase: UserDetailsUseCase

    constructor(userDetailsUseCase: UserDetailsUseCase){
        this.userDetailsUseCase=  userDetailsUseCase
    }

    public changeName= async(req:Request, res:Response): Promise<void>=>{
        try {
            const name = req.body.name;
            const {userId} = req.params;
            if(!name || !userId){
                res.status(StatusCode.BadRequest).json({message:"Credientials are missing"})
                return
            }
            const response = await this.userDetailsUseCase.editName(userId, name)
            res.status(response.status).json({message:response.message, data:response.data})
        } catch (error) {
            logger.error("change name error on controller", error);
            res.status(StatusCode.InternalServerError).json({ 
                message: "Internal server error" 
            });
        }
    }

    public changeUserName = async(req:Request, res:Response): Promise<void>=>{
        try {
            const userName = req.body.userName;
            const {userId} = req.params;
            if(!userName || !userId){
                return 
            }
            const response = await this.userDetailsUseCase.editUserName(userId,userName)
            res.status(response.status).json({messsage:response.message, data:response.data})
        } catch (error) {
            logger.error("Change userName error on controller", error);
            res.status(StatusCode.InternalServerError).json({ 
                message: "Internal server error" 
            });
        }
    }

}


export default UserDetailsController