import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { authChecker } from "../../middlewares/authChecker";
import { 
    createHtmlContainerSchema, 
    updateHtmlContainerSchema 
} from "../../validator/admin/htmlContainer.validator";
import {
    createHtmlContainer,
    getHtmlContainer,
    getAllHtmlContainers,
    updateHtmlContainer,
    deleteHtmlContainer
} from "../../controllers/admin/htmlContainerController";

const htmlContainerRoute = express.Router();

// Public read routes (no authentication required)
htmlContainerRoute.get("/public/all", getAllHtmlContainers);
htmlContainerRoute.get("/public/:identifier", getHtmlContainer);

// Protected routes (require authentication)
htmlContainerRoute.use(authChecker);

// Create a new container
htmlContainerRoute.post("/create", validateRequest(createHtmlContainerSchema), createHtmlContainer);

// Get all containers (protected - for admin use)
htmlContainerRoute.get("/all", getAllHtmlContainers);

// Get a specific container by identifier (protected - for admin use)
htmlContainerRoute.get("/:identifier", getHtmlContainer);

// Update a container by identifier
htmlContainerRoute.put("/:identifier", validateRequest(updateHtmlContainerSchema), updateHtmlContainer);

// Delete a container by identifier
htmlContainerRoute.delete("/:identifier", deleteHtmlContainer);

export default htmlContainerRoute;

