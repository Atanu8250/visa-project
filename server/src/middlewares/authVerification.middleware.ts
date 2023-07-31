import { NextFunction, Response } from "express";
const jwt = require("jsonwebtoken");

import { IAuthDecoded, ICustomReq } from "../constants/constants";
const { UserModel } = require("../models/user.model");

require("dotenv").config();

const authCheck = async (req: ICustomReq, res: Response, next: NextFunction) => {
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
               req.headers.user = { userId: decoded.userId, isAdmin: decoded.isAdmin, isEmailVerified: decoded.isEmailVerified };
               next();
          } else {
               res.status(401).send({ message: "User doesn't exist!" });
          }
     } catch (error: any) {
          console.error('error:', error)
          res.status(500).send({ message: error.message, error })
     }
}

module.exports = authCheck;