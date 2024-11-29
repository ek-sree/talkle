import { IUser } from "../../interface/IUser.js";
import tempUserModel from "../../models/tempUserModel.js";
import userModel from "../../models/userModel.js";
import logger from "../../utils/logger.js";

class AuthRepository {
  constructor() {
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    try {
      logger.debug("eeee")
      const user = await userModel.findOne({ email });
      logger.debug(user)
      return user;
    } catch (error) {
      logger.error("Error in findByEmail",error)
      throw new Error("Failed to fetch user");
    }
  }

  public async saveOtpData(email: string, password: string, otp: string): Promise<string | null> {
    try {
      const existingRecord = await tempUserModel.findOne({ email });
  
      if (existingRecord) {
        existingRecord.otp = otp;
        existingRecord.createdAt = new Date(); 
        await existingRecord.save();
        return existingRecord.otp;
      }
  
      const newOtpData = new tempUserModel({ email, password, otp });
      await newOtpData.save();
      return newOtpData.otp
    } catch (error) {
      throw new Error("Failed to save or update OTP data");
    }
  }
  
  
}

export default AuthRepository;
