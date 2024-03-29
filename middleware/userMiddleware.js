import jwt from 'jsonwebtoken';
import { userModel } from '../models/userModel.js';

export const verifyToken = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(decoded);
        const role = decoded.role;
        const user = await userModel.findById(decoded.id);
        if (!user || user.role!=decoded.role) {
            return res.status(401).json({ message: 'Invalid token - User not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Failed to authenticate token' });
    }
}


export class accessControl{
    static isAdmin = (req, res, next) => {
        console.log(req.user);
        if (req.user.role === 'admin') {
            next(); 
        } else {
            return res.status(403).json({ message: 'Unauthorized' });
        }
    }
    
    static isManager = (req, res, next) => {
        if (req.user.role === 'manager') {
            next();
        } else {
            return res.status(403).json({ message: 'Unauthorized' });
        }
    }
    
    static isSiteEngineer = (req, res, next) => {
        if (req.user.role === 'site-engineer') {
            next();
        } else {
            return res.status(403).json({ message: 'Unauthorized' });
        }
    }
    
    static isClient = (req, res, next) => {
        if (req.user.role === 'client') {
            next(); 
        } else {
            return res.status(403).json({ message: 'Unauthorized' });
        }
    }

    static isAdminManagerSiteEng = (req,res,next) => {
        if (req.user.role === 'admin' || req.user.role==='manager' || req.user.role==='site-engineer') {
            next(); 
        } else {
            return res.status(403).json({ message: 'Unauthorized' });
        }
    }

    static isAdminManager = (req,res,next) => {
        if (req.user.role === 'admin' || req.user.role==='manager') {
            next(); 
        } else {
            return res.status(403).json({ message: 'Unauthorized' });
        }
    }

    static isAdminManagerClient = (req,res,next) => {
        if (req.user.role === 'admin' || req.user.role==='manager' || req.user.role==='client') {
            next(); 
        } else {
            return res.status(403).json({ message: 'Unauthorized' });
        }
    }
}

