import { EmailVerify } from "../interface/EmailVerify.js";
import mongoose, { Document, Schema } from "mongoose";
import { Model } from "mongoose";
import cron from 'node-cron';

interface ITempUserInterface extends Document {
  email: string;
  password?: string; 
  otp?: string;
  otpCreatedAt?: Date;
  verifyType: EmailVerify;
  createdAt: Date;
  clearOtpIfExpired(): Promise<this>;
}

interface ITempUserModel extends Model<ITempUserInterface> {
  clearExpiredOtps(): Promise<void>;
}

const tempUserSchema: Schema<ITempUserInterface, ITempUserModel> = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: false,
  },
  otp: { 
    type: String, 
    required: false,
    minlength: 4,
    maxlength: 4
  },
  otpCreatedAt: {
    type: Date,
    default: null
  },
  verifyType: {
    type: String,
    enum: Object.values(EmailVerify),
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true
});

tempUserSchema.pre('save', function(next) {
  if (this.otp && !this.otpCreatedAt) {
    this.otpCreatedAt = new Date();
  }
  next();
});

// Instance method to clear OTP if expired
tempUserSchema.methods.clearOtpIfExpired = function() {
  if (this.otpCreatedAt) {
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
    if (this.otpCreatedAt < oneMinuteAgo) {
      this.otp = undefined;
      this.otpCreatedAt = null;
      return this.save();
    }
  }
  return Promise.resolve(this);
};

// Static method to clear expired OTPs across all documents
tempUserSchema.statics.clearExpiredOtps = async function() {
  const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
  
  try {
    const result = await this.updateMany(
      { 
        otpCreatedAt: { $lt: oneMinuteAgo },
        otp: { $exists: true }
      },
      { 
        $unset: { otp: 1 },
        $set: { otpCreatedAt: null }
      }
    );
    
    console.log(`Cleared expired OTPs: ${result.modifiedCount} documents updated`);
  } catch (error) {
    console.error('Error clearing expired OTPs:', error);
  }
};

const tempUserModel = mongoose.model<ITempUserInterface, ITempUserModel>(
  "TempUser",
  tempUserSchema
);

cron.schedule('* * * * *', async () => {
  await tempUserModel.clearExpiredOtps();
});

export default tempUserModel;