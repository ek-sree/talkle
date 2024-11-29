import mongoose, { Document, Schema } from "mongoose";

interface IUserInterface extends Document{
    name: string;
    email: string;
    password: string;
    image: string;
    isStatus: boolean;
    fieldUpdateHistory: Map<string, Date>;

}

const userSchema : Schema<IUserInterface> = new Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required:true,
        unique:true,
        trim: true,
        match: /.+\@.+\..+/
    },
    password: {
        type:String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        updateTime:{
            type: Date
        }
    },
    isStatus:{
        type: Boolean,
        required: true,
        default: true
    },
    fieldUpdateHistory: {
        type: Map,
        of: Date
    }
}, {
    timestamps: true
})



const userModel = mongoose.model<IUserInterface>('User', userSchema);

export default userModel;