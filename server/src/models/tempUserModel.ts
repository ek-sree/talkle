import mongoose, { Document, Schema } from "mongoose";

interface ITempUserInterface extends Document{
    email:string;
    password:string;
    otp:string;
    createdAt: Date;
}

const tempUserSchema: Schema<ITempUserInterface> = new Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  otp: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

tempUserSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

const tempUserModel = mongoose.model<ITempUserInterface>('TempOtp', tempUserSchema);

export default tempUserModel;


