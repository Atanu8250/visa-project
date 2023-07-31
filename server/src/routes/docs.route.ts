import express, { Request, Response } from 'express';


export const router = express.Router();

router.route('/')
     .get((req: Request, res: Response) => {
          res.send("Documents....");
     })
     .post((req: Request, res: Response) => {
          res.send("Documents....");
     })

router.route('/:docId')
     .patch((req: Request, res: Response) => {
          res.send("Documents....");
     })
     .delete((req: Request, res: Response) => {
          res.send("Documents....");
     })