import jwt from 'jsonwebtoken'
import type { Request, Response } from 'express'
import { Types } from 'mongoose';
import 'dotenv/config'

interface IPayload {
    _id: Types.ObjectId;
    access_code: string;
}

export const generateJwt = (payload: IPayload, req: Request, res: Response) => {
    try {
        const token = jwt.sign({ id: payload._id, access_code: payload.access_code }, process.env.JWT_SECRET_KEY as string, { 
            expiresIn: '7d'
        })

        const isSecureRequest = req.secure || req.headers['x-forwarded-proto'] === 'https'

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: isSecureRequest,
            sameSite: isSecureRequest ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

    } catch (error) {
        console.error("Error generating JWT:", error);
    }
}