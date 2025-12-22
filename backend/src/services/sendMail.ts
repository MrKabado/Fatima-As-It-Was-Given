import { mailerConfig } from "../config/mailer.config";
import Handlebars from "handlebars";
import { Index } from "../models/Index";
import path from 'path'
import { promises as fs } from "fs";

interface ISendMail {
    to: string;
    subject: string;
    text: string;
    templateName: string;
    payload?: Record<string, any>;
}

export const sendMail = async (mailOptions: ISendMail) => { 
    try {
        const filePath = path.join(__dirname, '..', 'views', mailOptions.templateName)

        const htmlContent = await fs.readFile(filePath, 'utf-8')

        const template = Handlebars.compile(htmlContent);

        const htmlContentWithPayload = template(mailOptions.payload);

        const result = await mailerConfig.sendMail({
            from: process.env.MAILER_EMAIL,
            to: mailOptions.to,
            subject: mailOptions.subject,
            text: mailOptions.text,
            html: htmlContentWithPayload
        })

        console.log("Email sent: ", result.response);
        
    } catch (error) {
        console.error("Send Mail Service Failed: ", error);
    }
}