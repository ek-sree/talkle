import { IUser } from "../../interface/IUser.js";
import { EmailVerify } from "../../interface/EmailVerify.js";
import { IAuthUser } from "../../interface/IAuthUser.js";
import tempUserModel from "../../models/tempUserModel.js";
import userModel from "../../models/userModel.js";
import logger from "../../utils/logger.js";

class AuthRepository {
  constructor() {
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    try {
      const user = await userModel.findOne({ email });
      return user;
    } catch (error) {
      logger.error("Error in findByEmail",error)
      throw new Error("Failed to fetch user");
    }
  }

  public async saveOtpData(email: string, password: string | null, otp: string, verifyType: EmailVerify): Promise<string | null> {
    try {
      const existingRecord = await tempUserModel.findOne({ email });
  
      if (existingRecord) {
        existingRecord.otp = otp;
        existingRecord.createdAt = new Date(); 
        if(password) existingRecord.password=password
        await existingRecord.save();
        return existingRecord.otp;
      }
  
      const newOtpData = new tempUserModel({ email, password, otp, verifyType });
      await newOtpData.save();
      return newOtpData.otp
    } catch (error) {
      logger.error("Error while saving otp in repo",error);
      throw new Error("Failed to save or update OTP data");
    }
  }

  public async findOtp(email:string): Promise<IAuthUser | null>{
    try {
      const data = await tempUserModel.findOne({email})
      return data 
    } catch (error) {
      logger.error("Error while find otp in repo",error);
      throw new Error("Failed to find OTP data");
    }
  }
  
  
}

export default AuthRepository;
