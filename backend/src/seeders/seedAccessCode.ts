import { Index } from "../models/Index";
import { generateUniqueCode } from "../utils/generateCode";
import { connectDB } from "../config/mongodb.config";

export const seedAccessCode = async () => {
    const { AccessCode } = Index

    await connectDB();

    const generateAccessCode = await generateUniqueCode();

    const newAccessCode = await AccessCode.create({
        access_code: generateAccessCode
    });

    if(!newAccessCode) { throw new Error('Failed to seed access code'); }

    return console.log(`Seeded Access Code: ${generateAccessCode}`);
}

seedAccessCode();