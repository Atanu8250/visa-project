import mongoose from "mongoose";

import type { IUser } from "../@types/constants";


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

export const UserModel = mongoose.model<IUser>('User', userSchema);
