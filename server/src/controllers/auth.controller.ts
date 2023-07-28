import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserModel } from '../models/user.model';
import { IUser } from '../constants/constants';
import { sendVeryMail } from '../helpers/MailVerification';


export const signup = async (req: Request, res: Response) => {
     const { name, email, password } = req.body;

     // Check incoming fields
     if (!name || !email || !password) {
          console.error("Please provide all the fields properly!");
          return res.status(400).json({ message: "Please provide all the fields properly!" });
     }

     try {
          // Find the user, exist or not
          const userExists = await UserModel.findOne({ email });

          // In-case user already exist
          if (userExists) {
               console.error("User already exists");
               return res.status(404).json({ message: "User already exists" });
          }

          // Encrypt user's password
          const hash = bcrypt.hashSync(password, +process.env.SALT_ROUND!);

          // Create the user doc in the DB
          const user: IUser = await UserModel.create({ name, email, password: hash });

          // Send Email verification mail
          sendVeryMail({ recipientName: user.name, recipientEmail: user.email, userId: user._id })

          return res.status(201).json({
               message: "User registered successfully, \nAn Email sent to your provided mail address, Please verify it before login!"
          });


     } catch (error: any) {
          console.error('error:', error)
          res.status(500).send({ "message": "Something went wrong", "error": error.message });
     }
};


export const login = async (req: Request, res: Response) => {
     const { email, password } = req.body;

     // If email or password not provided
     if (!email || !password) return res.status(400).json({ messsage: "Please provide all the fields properly!" })

     try {
          // Find the user in the DB by provided mail.
          const user: IUser | null = await UserModel.findOne({ email });

          // If the user doesn't exist
          if (!user) return res.status(400).send({ message: "User doesn't exist, Please register first!" });

          // If the user's mail isn't verified
          if (!user.isEmailVerified) return res.status(401).send({ message: "Sorry, Your email is not verified!" })

          // Compare the encrypted password
          bcrypt.compare(password, user.password, async (err: Error | undefined, result: boolean) => {

               // Password doesn't match
               if (!result || err) {
                    console.error("Wrong Password!");
                    return res.status(400).send({ message: "Wrong password!" });
               }

               // Generate authentication token
               const token = jwt.sign(
                    // Payloads, wants to access later for providing products
                    { userId: user._id, isAdmin: user.isAdmin, isEmailVerfied: user.isEmailVerified },
                    process.env.JWT_SECRET_KEY!,
                    { expiresIn: process.env.JWT_EXPIRY_TIME ?? '3h' } // token/session expiry time
               );

               // Send the response with some user data and the authentication token
               res.status(200).send({
                    "message": "User logged in successful.",
                    "user": {
                         name: user.name,
                         email: user.email,
                         token: token
                    }
               })
          });
     } catch (error: any) {
          console.error('error:', error);
          res.status(500).send({ message: "Something went wrong", "error": error.message });
     }
};

