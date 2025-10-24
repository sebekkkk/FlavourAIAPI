import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import config from '../config/config.js';

/**
 * Middleware to verify JWT token and attach user to request
 */
export const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(' ')[1];

    try {

        const decoded = jwt.verify(token, config.jwtToken); 
        const user = await User.findById(decoded._id);
        
        if (!user) {
            return res.status(401).json({ error: "Unauthorized: User not found" });
        }
    
        req.user = user; 
        next();
    } catch (err) {
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
};

