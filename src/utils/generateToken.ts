import jwt from 'jsonwebtoken';

const SECRET_KEY = 'secret-key';

interface UserData {
    id: number;
    name: string;
    group: string;
}

// Hàm tạo token
const generateToken = (userData: UserData) => {
    return jwt.sign(userData, SECRET_KEY, { expiresIn: '12h' });
};

// Ví dụ về cách sử dụng hàm tạo token
const token = generateToken({ id: 1, name: 'Tien Dat', group: 'USER' });
console.log(token); // In token ra console
