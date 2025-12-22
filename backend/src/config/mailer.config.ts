import nodemailer from 'nodemailer';
import 'dotenv/config';

export const mailerConfig = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAILER_EMAIL as string,
        pass: process.env.MAILER_PASSWORD as string
    }
})