import { Request, Response, NextFunction } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import {STATUS_CODES} from "../config/constant"


const SECRET_KEY: Secret = 'secret-key';

export interface CustomRequest extends Request {
    user: string | JwtPayload;
}

// Middleware xác thực người dùng
export const authenticateByToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Lấy token từ header
    if (!token) {
        const error = new Error('Unauthorized: No token provided');
        (error as any).statusCode = 401;
        return next(error);
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            const error = new Error('Unauthorized: Invalid token');
            (error as any).statusCode = 401;
            return next(error);
        }

        if (decoded) {
            (req as CustomRequest).user = decoded; // Gán thông tin người dùng vào req
        } else {
            const error = new Error('Unauthorized: No user data');
            (error as any).statusCode = 401;
            return next(error);
        }

        next(); 
    });
};
