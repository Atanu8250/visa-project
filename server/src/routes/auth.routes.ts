import express, { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();



export const signup = async (req: Request, res: Response) => {
     const { name, email, password } = req.body;

     if (!name || !email || !password) {
          console.error("Please Enter all the Fields");
          return res.status(400).json({ message: "Please Enter all the Fields" });
     }

     try {
          const userExists = await UserModel.findOne({ email });
          if (userExists) {
               console.error("User already exists");
               return res.status(404).json({ message: "User already exists" });
          }

          const hash = bcrypt.hashSync(password, +process.env.SALT_ROUND!);

          if (hash) {
               const user = await UserModel.create({ name, email, password: hash });

               if (user) {
                    return res.status(201).json({
                         message: "User registered successfully",
                         user: {
                              _id: user._id,
                              name: user.name,
                              email: user.email,
                              isAdmin: user.isAdmin
                         }
                    });
               }
          }

     } catch (error: any) {
          res.status(500).send({ "msg": "Something went wrong", "error": error.message });
     }
};


export const login = async (req: Request, res: Response) => {
     // const { email, password } = req.body;

     try {
     //      const user = await UserModel.findOne({ email });
     //      if (!user) {
     //           res.status(400).send({ "msg": "user don't exist please register first" });
     //      } else {
     //           bcrypt.compare(password, user.password, async (err: Error | undefined, result: boolean) => {
     //                if (result) {

     //                     var token = jwt.sign({ userId: user._id, role: [user.role] }, "varthak", { expiresIn: "3h" });
     //                     res.status(200).send({
     //                          "msg": "user logged in successful",
     //                          "user": {
     //                               _id: user._id,
     //                               name: user.name,
     //                               email: user.email,
     //                               token: token
     //                          }
     //                     })
     //                } else {
                         res.status(400).send({ "msg": "Wrong password or email" })
          //           }
          //      });
          // }
     } catch (error: any) {
          res.status(500).send({ "msg": "Something went wrong", "error": error.message });
     }
};


export const router = express.Router();

router.post('/signup', signup);
router.post('/signin', login);