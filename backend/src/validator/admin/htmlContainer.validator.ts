import Joi from "joi";

export const createHtmlContainerSchema = Joi.object({
    identifier: Joi.string().required(),
    content: Joi.string().required(),
});

export const updateHtmlContainerSchema = Joi.object({
    content: Joi.string().required(),
});




