import jwt, { JwtPayload } from 'jsonwebtoken';
import { TOKEN } from "../config/constant";

// Hàm tạo token
export const generateToken = (userData: JwtPayload) => {
    return jwt.sign(userData, TOKEN.SECRET_KEY || "", { expiresIn: TOKEN.EXPIRE_TIME });
};

