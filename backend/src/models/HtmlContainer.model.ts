import { Schema, model } from "mongoose";

interface IHtmlContainer {
    identifier?: string;
    content: string;
}

const HtmlContainerSchema = new Schema<IHtmlContainer>({
    identifier: { type: String, required: true, unique: true },
    content: { type: String, required: true }
});

export const HtmlContainer = model<IHtmlContainer>('htmlContainer', HtmlContainerSchema);