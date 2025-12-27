import jwt from 'jsonwebtoken'
import type { Response } from 'express'
import { Types } from 'mongoose';

interface IPayload {
    _id: Types.ObjectId;
    access_code: string;
}

export const generateJwt = (payload: IPayload, res: Response) => {
    try {
        const token = jwt.sign({ id: payload._id, access_code: payload.access_code }, process.env.JWT_SECRET_KEY as string, { 
            expiresIn: '7d'
        })

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

    } catch (error) {
        console.error("Error generating JWT:", error);
    }
}