import { Document } from "mongoose";
import { IncomingHttpHeaders } from 'http';

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

export interface IEmailTemplate {
     recipientName: string,
     recipientEmail: string,
     token: string
}

export interface IMailVerfyParams {
     recipientName: string,
     recipientEmail: string,
     userId: string
}

export interface IVerifyMailReqQuery {
     token: string
}

export interface IAuthDecoded {
     userId: string,
     isAdmin: boolean,
     isEmailVerified: boolean
}

export interface ICustomReq {
     headers: IncomingHttpHeaders & {
          user: IAuthDecoded
     }
}
