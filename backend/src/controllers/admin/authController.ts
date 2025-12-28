import type { Request, Response } from "express"
import { sendMail } from "../../services/sendMail";
import { Index } from "../../models/Index"
import { generateUniqueCode } from "../../utils/generateCode";
import { generateJwt } from "../../utils/generateJwt";
import 'dotenv/config'

interface IAccessCodeDest {
    access_code: string;
}

export const requestAccess = async (req: Request, res: Response) => {
    try {
        const validated = res.locals.validatedBody as IAccessCodeDest;

        console.log("Validated Access Code: ", validated.access_code);
        const { AccessCode } = Index

        const isAccessCodeValid = await AccessCode.findOne({ access_code: validated.access_code });

        if (!isAccessCodeValid) {
            return res.status(400).json({ message: "Invalid access code. Please try again." });
        }

        console.log(isAccessCodeValid);

        generateJwt(isAccessCodeValid, res);

        return res.status(200).json({ message: "Access code granted." });

    } catch (error) {
        res.status(500).json({ message: "Server error. Please try again later." });
        console.error("Request Access Failed: ", error);
    }
}

export const requestNewAccessCode = async (req: Request, res: Response) => {
    try {
        const { AccessCode } = Index;

        const generateAccessCode = await generateUniqueCode();

        const currentAccessCode = await AccessCode.findOne();

        if (!currentAccessCode) { return res.status(500).json({ message: "No existing access code found." }); }

        const updatedAccessCode = await AccessCode.findOneAndUpdate(
            { _id: currentAccessCode._id },
            { access_code: generateAccessCode },
            { new: true }
        );

        if (!updatedAccessCode) { throw new Error('Failed to create new access code'); }

        const payload = {
            accessCode: generateAccessCode
        }

        // mickken@hotmail.com

        await sendMail({
            to: 'dyfordbonghanoy@gmail.com',
            subject: "New Access Code Request",
            text: `Your new access code is: ${generateAccessCode}`,
            templateName: "MailCode.html",
            payload: payload
        });

        return res.status(200).json({ message: "New access code sent." });
    } catch (error) {
        console.error("Error sending new access code:", error);
    }
}

export const logoutAccess = (req: Request, res: Response) => {
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });
    return res.status(200).json({ message: "Logged out successfully." });
}

export const checkAuth = async (req: Request, res: Response) => {
    return res.status(200).json({ message: "Authenticated", access: res.locals.access_code });
}