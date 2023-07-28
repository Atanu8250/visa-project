import { Document } from "mongoose";

export interface IUser extends Document {
     name: string,
     email: string,
     password: string,
     isAdmin: boolean,
     isEmailVerified: boolean
}


export interface IMailOptions {
     from: string;
     to: string;
     subject: string;
     html: string;
}

export interface IMailVerfyParams {
     recipientName: string,
     recipientEmail: string,
     userId: string
}