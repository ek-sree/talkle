import { Types } from "mongoose";
export interface IUser{
    _id: string | Types.ObjectId;
    email: string;
    userName: string;
    password: string;
    name: string;
    avatar: string;
}