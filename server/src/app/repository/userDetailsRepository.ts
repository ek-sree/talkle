import userModel from "../../models/userModel.js";
import logger from "../../utils/logger.js";

class UserDetailsRepository{
    constructor(){}

    public async updateName(userId:string, name:string): Promise<string | null>{
        try {
            const user = await userModel.findOne({_id:userId});
            console.log(user,"edadfaddddddddd");
            
            if(!user){
                return null
            }
            user.name = name
            await user.save()
            return name;
        } catch (error) {
            logger.error("Error in updating name",error)
            throw new Error("Failed to fetch user");
          }
    }

    public async updateUserName(userId:string, userName:string):Promise<string | null>{
        try {
            const user = await userModel.findOne({_id:userId})
            if(!user){
                return null
            }
            user.userName = userName
            await user.save()
            return userName
        } catch (error) {
            logger.error("Error in updating userName",error)
            throw new Error("Failed to fetch user");
          }
    }
}

export default UserDetailsRepository