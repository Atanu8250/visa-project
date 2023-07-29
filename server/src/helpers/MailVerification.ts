import nodemailer, { Transporter } from 'nodemailer';
import dotenv from 'dotenv';

import { IMailOptions, IMailVerfyParams } from '../constants/constants';
import { EmailTemplate } from './EmailTemplate';

dotenv.config();


export const sendVeryMail = (payload: IMailVerfyParams): void => {
     const { recipientEmail } = payload;
     
     console.log('host:',process.env.EMAIL_VERIFIER_HOST)
     console.log('port:',process.env.EMAIL_VERIFIER_PORT)
     console.log('auth user:',process.env.EMAIL_VERIFIER_AUTH_USER)
     console.log('auth pwd:',process.env.EMAIL_VERIFIER_AUTH_PWD)
     try {
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

          const mailOptions: IMailOptions = {
               from: process.env.EMAIL_VERIFIER_AUTH_USER!,
               to: recipientEmail,
               subject: 'For mail verification',
               html: EmailTemplate(payload)
          }

          transporter.sendMail(mailOptions, (err, info) => {
               if (err) {
                    console.error("Error in seding email:", err);
               } else {
                    console.log("Email has been sent:-", info.response);
               }
          })
     } catch (error) {
          console.log('Error:', error);
     }
}