import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
mongoose.set('strictQuery', true)

export default function connectDB() {

     const dbUrl = process.env.DATABASE_URL as string;

     return mongoose.connect(dbUrl)
          .then(() => console.info("database connected"))
          .catch((err: any) => {
               console.error("db error", { err: err.message });
               process.exit(1);
          })
};