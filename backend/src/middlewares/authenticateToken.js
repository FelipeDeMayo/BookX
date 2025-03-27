import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const key = process.env.JWT_SECRET;

export const authenticateToken = (req, res, next) => {
    const tokenHeader = req.headers['authorization'];  

    
    const token = tokenHeader && tokenHeader.split(' ')[1];  
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, key);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid token' });
    }
}
