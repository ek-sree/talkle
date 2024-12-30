import { IResponse } from "./IResponse";
import { IUser } from "./IUser";

export interface IAuthResponse extends IResponse {
    data?: IUser;
    accessToken?: string;
    refreshToken?: string;
}