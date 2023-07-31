import dotenv from "dotenv";
import express from 'express';
import { login, signup, verifyMail } from "../controllers/auth.controller";

// Configure env variables
dotenv.config();

export const router = express.Router();

router.post('/signup', signup);
router.post('/signin', login);
router.get('/verify-mail', verifyMail)