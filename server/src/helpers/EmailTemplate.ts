import { IEmailTemplate } from "../constants/constants";

export const EmailTemplate = ({ recipientName, recipientEmail, token }: IEmailTemplate): string => `<div style="margin:auto;">
          <h1 style="text-align: center">Verify Your Email Address</h1>
          <h4 style="text-align: center; letter-spacing:1.5px">You'll need to verify your mail address to complete registration</h4>
          <div style="width: 30%; margin: auto; background: transparent">
               <img style="width: 100%" src="https://img.freepik.com/premium-vector/email-document-secure-shield_212005-16.jpg?size=626&ext=jpg" />
          </div>

          <p style="text-align:center; margin:auto; width: 70%; line-height: 22px">
               Hi, <b>${recipientName}</b>, Please verify your email : <a href="${recipientEmail}"><b><i>${recipientEmail}</i></b></a> for registration in [Company Name]. Email verification is must for further actions. Click on the below button to verify your Email address. 
          </p>
          <div style="width: fit-content; margin: 50px auto">
               <button style="padding:5px 10px;background-color:#4d7bf8; border:none;border-radius:5px">
                    <a style="font-weight:500;font-size:25px; background-color:#4d7bf8; color:white; text-decoration:none" href="http://localhost:5173/verify-mail?token=${token}">
                         Verify your email
                    </a>
               </button>
          </div>
          <div style="width: 40%; margin: auto; background: transparent">
               <img style="width: 100%; margin-inline: auto" src="https://placeholderlogo.com/img/placeholder-logo-1.png" />
          </div>
     </div>`