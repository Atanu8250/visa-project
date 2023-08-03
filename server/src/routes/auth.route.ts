import dotenv from "dotenv";
import express from 'express';
import { login, signup, sendVerifyMail, verifyMail, forgetPassword, resetPassword } from "../controllers/auth.controller";

// Configure env variables
dotenv.config();

export const router = express.Router();

router.post('/signup', signup);
router.post('/signin', login);
router.get('/verify-mail', verifyMail)
router.post('/send-verify-mail', sendVerifyMail);
router.post('/forget-password', forgetPassword)
router.post('/reset-password', resetPassword)