import { Request, NextFunction, Response } from "express";
const jwt = require("jsonwebtoken");

import { IAuthDecoded } from "../@types/constants";
const { UserModel } = require("../models/user.model");

require("dotenv").config();

export const authCheck = async (req: Request, res: Response, next: NextFunction) => {
     // Get the token from the headers
     const token = req.headers.authorization;

     // Verify the token
     const decoded: IAuthDecoded | null = jwt.verify(token, process.env.JWT_SECRET_KEY);

     // Invalid Token
     if (!decoded) return res.status(401).send({ message: "Invalid Token!" })

     try {
          // find the user with the logged-in user's id
          const matchedUser = await UserModel.findById(decoded.userId);

          if (matchedUser) {
               req.user = { userId: decoded.userId, isAdmin: decoded.isAdmin, isEmailVerified: decoded.isEmailVerified };
               next();
          } else {
               res.status(401).send({ message: "User doesn't exist!" });
          }
     } catch (error: any) {
          console.error('error:', error)
          res.status(500).send({ message: error.message, error })
     }
}
