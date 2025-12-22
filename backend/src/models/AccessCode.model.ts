import { Schema, model } from "mongoose";

interface IAccessCode {
  access_code: string;
}

const AccessCodeSchema = new Schema<IAccessCode>({
  access_code: { type: String, required: true }
});

export const AccessCode = model<IAccessCode>('accessCode', AccessCodeSchema);