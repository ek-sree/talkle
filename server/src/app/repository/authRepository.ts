import { IUser } from "../../interface/IUser.js";
import { EmailVerify } from "../../interface/EmailVerify.js";
import { IAuthUser } from "../../interface/IAuthUser.js";
import tempUserModel from "../../models/tempUserModel.js";
import userModel from "../../models/userModel.js";
import logger from "../../utils/logger.js";
import { comparePassword, hashedPassword } from "../../utils/hashPassword.js";

class AuthRepository {
  constructor() {
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    try {
      const user = await userModel.findOne({ email }).lean();
    return user as unknown as IUser;
    } catch (error) {
      logger.error("Error in findByEmail",error)
      throw new Error("Failed to fetch user");
    }
  }

  public async findUserName(userName:string): Promise<boolean | null>{
    try {
        const username = await userModel.findOne({userName});
        if(username){
          return null
        }
        return true
    } catch (error) {
      logger.error("Error in findUserName",error)
      throw new Error("Failed to fetch user");
    }
  }

  public async saveOtpData(email: string, password: string | null, otp: string, verifyType: EmailVerify): Promise<string | null> {
    try {
      const existingRecord = await tempUserModel.findOne({ email });
      let hashPassword: string | null = null;
      if(password){
         hashPassword = await hashedPassword(password);
      }
      if (existingRecord) {
        existingRecord.otp = otp;
        existingRecord.createdAt = new Date(); 
        if(hashPassword) existingRecord.password=hashPassword
        await existingRecord.save();
        return existingRecord.otp;
      }
  
      const newOtpData = new tempUserModel({ email, password:hashPassword, otp, verifyType });
      await newOtpData.save();
      return newOtpData.otp  || null
    } catch (error) {
      logger.error("Error while saving otp in repo",error);
      throw new Error("Failed to save or update OTP data");
    }
  }

  public async findOtp(email:string): Promise<IAuthUser | null>{
    try {
      const data = await tempUserModel.findOne({email})      
      if (data) {
        return {
          email: data.email,
          otp: data.otp || '',
          password: data.password || '',
          verifyType: data.verifyType
        };
      }
      
      return null;
    } catch (error) {
      logger.error("Error while find otp in repo",error);
      throw new Error("Failed to find OTP data");
    }
  }

  public async saveUser(data: IUser): Promise<IUser | null>{
    try {
      const {email, password, avatar, name, userName} = data
      const user = new userModel({email,password, avatar, name, userName})
      await user.save();
      return {
        _id: user._id.toString(), 
        email: user.email,
        userName:user.userName,
        password: user.password,
        name: user.name,
        avatar: user.avatar,
      };
    } catch (error) {
      logger.error("Error while saving user data in repo",error);
      throw new Error("Failed to find OTP data");
    }
  }

  
  public async deleteTempDataInBackground(email: string): Promise<void> {
    (async () => {
        try {
            await tempUserModel.deleteOne({ email });
            logger.info(`Temporary data for ${email} deleted successfully.`);
        } catch (error) {
            logger.error("Error while deleting temp data in background", error);
        }
    })();
}


  public async findUser(email: string, password:string): Promise<IUser | null>{
    try {
      const user = await userModel.findOne({email});
      if(!user){
        return null
      }
      const isPassword = await comparePassword(password, user.password);
      if(!isPassword){
        return null
      }
      return user
    } catch (error) {
      logger.error("Error while finding user data in repo",error);
      throw new Error("Failed to find OTP data");
    }
  }
  
}

export default AuthRepository;
