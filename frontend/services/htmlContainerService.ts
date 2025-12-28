import { apiInstance } from "@/api/_base";

export interface IHtmlContainer {
    identifier: string;
    content: string;
}

export interface ICreateHtmlContainer {
    identifier: string;
    content: string;
}

export interface IUpdateHtmlContainer {
    content: string;
}

export const createHtmlContainer = async (data: ICreateHtmlContainer) => {
    const response = await apiInstance.post("/api/html-container/create", data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};

export const getHtmlContainer = async (identifier: string, isPublic: boolean = false) => {
    const endpoint = isPublic 
        ? `/api/html-container/public/${identifier}`
        : `/api/html-container/${identifier}`;
    const response = await apiInstance.get(endpoint);
    return response.data;
};

export const getAllHtmlContainers = async (isPublic: boolean = false) => {
    const endpoint = isPublic 
        ? "/api/html-container/public/all"
        : "/api/html-container/all";
    const response = await apiInstance.get(endpoint);
    return response.data;
};

export const updateHtmlContainer = async (identifier: string, data: IUpdateHtmlContainer) => {
    const response = await apiInstance.put(`/api/html-container/${identifier}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};

export const deleteHtmlContainer = async (identifier: string) => {
    const response = await apiInstance.delete(`/api/html-container/${identifier}`);
    return response.data;
};

