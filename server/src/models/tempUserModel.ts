import { EmailVerify } from "../interface/EmailVerify.js";
import mongoose, { Document, Schema } from "mongoose";

interface ITempUserInterface extends Document {
  email: string;
  password?: string; 
  otp: string;
  verifyType: EmailVerify;
  createdAt: Date;
}

const tempUserSchema: Schema<ITempUserInterface> = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: false,
  },
  otp: { type: String, required: true },
  verifyType: {
    type: String,
    enum: Object.values(EmailVerify),
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

tempUserSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

const tempUserModel = mongoose.model<ITempUserInterface>(
  "TempOtp",
  tempUserSchema
);

export default tempUserModel;
