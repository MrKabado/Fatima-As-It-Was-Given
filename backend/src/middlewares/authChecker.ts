import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authChecker = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Access denied. No token provided." });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

        res.locals.access_code = decoded;

        next();

    } catch (error) {
        console.error('auth checker failed: ', error);
    }
}
