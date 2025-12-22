import Joi from "joi";

export const requestAccessSchema = Joi.object({
    access_code: Joi.string().min(3).max(30).required(),
});