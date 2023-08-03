import nodemailer, { Transporter } from 'nodemailer';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import type { IMailOptions, IMailVerfyParams } from '../@types/constants';
import { EmailTemplate } from './EmailTemplate';

dotenv.config();


export const sendVerificationMail = (payload: IMailVerfyParams): void => {
     const { recipientEmail, recipientName, userId } = payload;

     try {
          // create transporter for transporting Mail to the user
          const transporter: Transporter = nodemailer.createTransport({
               host: process.env.EMAIL_VERIFIER_HOST,
               port: +process.env.EMAIL_VERIFIER_PORT!,
               secure: false,
               requireTLS: true,
               auth: {
                    user: process.env.EMAIL_VERIFIER_AUTH_USER,
                    pass: process.env.EMAIL_VERIFIER_AUTH_PWD
               }
          });


          // generate security token
          const token = jwt.sign(
               { userId },
               process.env.JWT_MAIL_SERVICE_SECRET_KEY!,
               { expiresIn: '1h' }
          )

          const mailOptions: IMailOptions = {
               from: process.env.EMAIL_VERIFIER_AUTH_USER!,
               to: recipientEmail,
               subject: 'For mail verification',
               html: EmailTemplate({ recipientEmail, recipientName, token })
          }

          transporter.sendMail(mailOptions, (err, info) => {
               if (err) {
                    console.error("Error in seding email:", err);
                    // Throw error 
                    throw Error(JSON.stringify(err))
               } else {
                    console.log("Email has been sent:-", info.response);
               }
          })
     } catch (error) {
          console.log('Error:', error);
          throw Error(JSON.stringify(error));
     }
}