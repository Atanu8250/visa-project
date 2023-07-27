import mongoose, { Document, ObjectId } from "mongoose";

interface IUser extends Document {
     name: String,
     email: String,
     password: String,
     isAdmin: Boolean
}


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
          min: [6, 'Password must contain more than 5 chars!'],
          required: true,
     },
     isAdmin: {
          type: String,
          default: false
     }
}, {
     timestamps: true,
})

export const UserModel = mongoose.model<IUser>('user', userSchema);
