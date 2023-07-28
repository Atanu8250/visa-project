import mongoose from "mongoose";

import { IUser } from "../constants/constants";


const userSchema = new mongoose.Schema<IUser>({
     name: {
          type: String,
          required: true,
     },
     email: {
          type: String,
          unique: true,
          immutable: true,
          required: true
     },
     password: {
          type: String,
          required: true,
     },
     isAdmin: {
          type: Boolean,
          default: false
     },
     isEmailVerified: {
          type: Boolean,
          default: false
     }
}, {
     timestamps: true,
})

export const UserModel = mongoose.model<IUser>('user', userSchema);
