import type { Request, Response } from "express";
import { Index } from "../../models/Index";

interface ICreateHtmlContainer {
    identifier: string;
    content: string;
}

interface IUpdateHtmlContainer {
    content: string;
}

export const createHtmlContainer = async (req: Request, res: Response) => {
    try {
        const validated = res.locals.validatedBody as ICreateHtmlContainer;
        const { HtmlContainer } = Index;

        // Check if container with identifier already exists
        const existingContainer = await HtmlContainer.findOne({ 
            identifier: validated.identifier 
        });

        if (existingContainer) {
            return res.status(400).json({ 
                message: "Container with this identifier already exists. Use update instead." 
            });
        }

        const newContainer = await HtmlContainer.create({
            identifier: validated.identifier,
            content: validated.content
        });

        return res.status(201).json({ 
            message: "Container created successfully.",
            data: newContainer
        });
    } catch (error) {
        console.error("Create HtmlContainer Failed: ", error);
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
};

export const getHtmlContainer = async (req: Request, res: Response) => {
    try {
        const { identifier } = req.params;
        const { HtmlContainer } = Index;

        const container = await HtmlContainer.findOne({ identifier });

        if (!container) {
            return res.status(404).json({ 
                message: "Container not found." 
            });
        }

        return res.status(200).json({ 
            message: "Container retrieved successfully.",
            data: container
        });
    } catch (error) {
        console.error("Get HtmlContainer Failed: ", error);
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
};

export const getAllHtmlContainers = async (req: Request, res: Response) => {
    try {
        const { HtmlContainer } = Index;

        const containers = await HtmlContainer.find({});

        return res.status(200).json({ 
            message: "Containers retrieved successfully.",
            data: containers
        });
    } catch (error) {
        console.error("Get All HtmlContainers Failed: ", error);
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
};

export const updateHtmlContainer = async (req: Request, res: Response) => {
    try {
        const { identifier } = req.params;
        const validated = res.locals.validatedBody as IUpdateHtmlContainer;
        const { HtmlContainer } = Index;

        const container = await HtmlContainer.findOneAndUpdate(
            { identifier },
            { content: validated.content },
            { new: true, runValidators: true }
        );

        if (!container) {
            return res.status(404).json({ 
                message: "Container not found." 
            });
        }

        return res.status(200).json({ 
            message: "Container updated successfully.",
            data: container
        });
    } catch (error) {
        console.error("Update HtmlContainer Failed: ", error);
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
};

export const deleteHtmlContainer = async (req: Request, res: Response) => {
    try {
        const { identifier } = req.params;
        const { HtmlContainer } = Index;

        const container = await HtmlContainer.findOneAndDelete({ identifier });

        if (!container) {
            return res.status(404).json({ 
                message: "Container not found." 
            });
        }

        return res.status(200).json({ 
            message: "Container deleted successfully."
        });
    } catch (error) {
        console.error("Delete HtmlContainer Failed: ", error);
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
};




