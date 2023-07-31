import { Document } from "mongoose";

export interface IUser extends Document {
     name: string,
     email: string,
     password: string,
     isAdmin: boolean,
     isEmailVerified: boolean
}


export interface IDoc extends Document {
     country: string,
     instituteName: string,
     campus: string,
     city: string,
     appFeesCAD: string,
     programCode: string,
     programName: string,
     programLevel: string,
     duration: number,
     intake: string,
     conditional: string,
     coOp: string,
     coOpDuration: string,
     fees: number,
     aveTATBucket: string,
     degreeCode: string,
     degreeName: string,
     stream: string,
     CGPABcket: string,
     percentageBucket: string,
     passingYear: number,
     studyGape: number,
     backlogs: number,
     MOIAccepted: boolean,
     exam: string,
     l: number,
     r: number,
     w: number,
     s: number,
     overall: number,
     specialRequirements: string,
     programLink: string
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