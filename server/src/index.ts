import express, { Request, Response } from "express";
import dotenv from 'dotenv';
import cors from 'cors';

import { router as authRouter } from './routes/auth.routes';
import connectDB from "./config/db";

dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());



app.get("/", (req: Request, res: Response): void => {
     res.sendStatus(200);
})

app.use('/api/auth', authRouter)

app.listen(process.env.PORT, async () => {
     console.log(`Server is running on port: ${process.env.PORT}`)
     try {
          await connectDB();
          console.log('✅ Database connected successfully!')
     } catch (error) {
          console.log('❌ error in connecting DB:', error)
     }
})