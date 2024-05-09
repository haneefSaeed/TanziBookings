import { NextFunction , Request, Response} from "express"
import jwt, { JwtPayload } from 'jsonwebtoken'

declare global {
    namespace Express {
        interface Request {
            userId : string;
        }
    }
}

const verifyToken = (req: Request, res: Response, next: NextFunction)=>{
    const token = req.cookies["auth_token"];
    if (!token){
        // cookie not availble , error 
        return res.status(401).json({message: "unauthorized"});
    }
        //else if available
    try {

        // decode the token based on secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string)
        // we get userid and pass it to request.userId
        req.userId = (decoded as JwtPayload).userId;
        next();
    }catch(err){
        return res.status(401).json({message: "unauthorized"});

    }
}

export default verifyToken;