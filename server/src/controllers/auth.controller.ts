import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserModel } from '../models/user.model';
import type { IUser, IVerifyMailReqQuery } from '../@types/constants';
import { sendVerificationMail } from '../helpers/MailVerification';



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

          // Hash user's password
          const hashedPassword = bcrypt.hashSync(password, +process.env.SALT_ROUND!);

          // Create the user doc in the DB
          const user: IUser = await UserModel.create({ name, email, password: hashedPassword });

          // Send Email verification mail
          sendVerificationMail({ recipientName: user.name, recipientEmail: user.email, userId: user._id })

          return res.status(201).json({
               message: "User registered successfully, \nAn Email sent to your provided mail address, Please verify it before login!"
          });


     } catch (error: any) {
          console.error('error:', error)
          res.status(500).send({ message: error.message, error });
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
                    { userId: user._id, isAdmin: user.isAdmin, isEmailVerified: user.isEmailVerified },
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
          res.status(500).send({ message: error.message, error });
     }
};


export const sendVerifyMail = async (req: Request, res: Response) => {
     const { email } = req.body;

     if (!email) return res.status(400).send({ message: "Please provide email to get verification mail!" });

     try {
          // Find the user with the given email
          const userWithGivenEmail: IUser | null = await UserModel.findOne({ email });

          // If user doesn't exist with the provided email
          if (!userWithGivenEmail) return res.status(404).send({ message: `User not found with email ${email}` });

          // If the user's email is already verified
          if (userWithGivenEmail.isEmailVerified) return res.status(200).send({ message: `This ${email} email address is already verified.` })

          // send a verification mail
          sendVerificationMail({ recipientEmail: userWithGivenEmail.email, recipientName: userWithGivenEmail.name, userId: userWithGivenEmail._id })

          res.status(200).send({ message: `Verification mail send successfully to ${email}` });
     } catch (error: any) {
          console.log('error:', error)
          res.status(500).send({ message: error.message, error })
     }
}


export const verifyMail = async (req: Request<{}, {}, {}, IVerifyMailReqQuery>, res: Response) => {
     const { token } = req.query;

     if (!token) return res.status(400).send({ message: "Please provide the token!" })

     try {
          const decoded: any = jwt.verify(token, process.env.JWT_MAIL_SERVICE_SECRET_KEY!)
          if (decoded) {
               // decrypt the token and get the userId;
               const { userId } = decoded;

               // update the data in the DB
               await UserModel.findByIdAndUpdate(userId, { isEmailVerified: true }, { runValidators: true });

               return res.status(202).send({ message: 'Mail Verification successful.' });
          }

          // if we didn't get decoded value
          res.status(498).send({ message: "Invalid Token!" });
     } catch (error: any) {
          console.error('error:', error)
          res.status(500).send({ message: error.message, error });
     }
}


export const forgetPassword = async (req: Request, res: Response) => {
     // Get email from the Request body
     const { email } = req.body;

     // If the email not send with the Request
     if (!email) return res.status(400).send({ message: "Please provide email to reset your password!" });

     try {
          // Find the user with the given email
          const userWithGivenEmail: IUser | null = await UserModel.findOne({ email });

          // If user doesn't exist with the provided email
          if (!userWithGivenEmail) return res.status(404).send({ message: `User not found with email ${email}` });

          // If the user's email is already verified
          if (!userWithGivenEmail.isEmailVerified) return res.status(200).send({ message: `This ${email} email address is not verified!` });

          // send a verification mail
          sendVerificationMail({ recipientEmail: userWithGivenEmail.email, recipientName: userWithGivenEmail.name, userId: userWithGivenEmail._id })

          res.status(200).send({ message: "A mail is sent on this Email." })

     } catch (error: any) {
          console.log('error:', error)
          res.status(500).send({ message: error.message, error })
     }


}


export const resetPassword = async (req: Request, res: Response) => {
     const { password, token } = req.body;

     if (!token || !password) return res.status(400).send({ message: "Please provide the password!" })

     try {
          const decoded: any = jwt.verify(token, process.env.JWT_MAIL_SERVICE_SECRET_KEY!)
          if (decoded) {
               // decrypt the token and get the userId;
               const { userId } = decoded;

               // Hash user's password
               const hashedPassword = bcrypt.hashSync(password, +process.env.SALT_ROUND!);

               // update the password in the DB
               await UserModel.findByIdAndUpdate(userId, { password: hashedPassword }, { runValidators: true });

               return res.status(202).send({ message: 'Password reset successfully.' });
          }

          // if we didn't get decoded value
          res.status(498).send({ message: "Invalid Token!" });
     } catch (error: any) {
          console.error('error:', error)
          res.status(500).send({ message: error.message, error });
     }
}