import { IAuthDecoded } from "../constants"

declare global {
     namespace Express {
          interface Request {
               user: IAuthDecoded
          }
     }
}