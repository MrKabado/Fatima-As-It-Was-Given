import { create } from "zustand";
import {
    createHtmlContainer,
    getHtmlContainer,
    getAllHtmlContainers,
    updateHtmlContainer,
    deleteHtmlContainer,
    type IHtmlContainer
} from "@/services/htmlContainerService";

interface IHtmlContainerState {
    containers: Record<string, IHtmlContainer>;
    isLoading: boolean;
    error: string | null;
    
    // Actions
    createContainer: (identifier: string, content: string) => Promise<boolean>;
    getContainer: (identifier: string, isPublic?: boolean) => Promise<IHtmlContainer | null>;
    getAllContainers: (isPublic?: boolean) => Promise<void>;
    updateContainer: (identifier: string, content: string) => Promise<boolean>;
    deleteContainer: (identifier: string) => Promise<boolean>;
    getContainerContent: (identifier: string) => string;
    setContainerContent: (identifier: string, content: string) => void;
}

export const htmlContainerStore = create<IHtmlContainerState>()((set, get) => ({
    containers: {},
    isLoading: false,
    error: null,

    createContainer: async (identifier: string, content: string) => {
        try {
            set({ isLoading: true, error: null });
            const response = await createHtmlContainer({ identifier, content });
            
            if (response.data) {
                set((state) => ({
                    containers: {
                        ...state.containers,
                        [identifier]: response.data
                    },
                    isLoading: false
                }));
                return true;
            }
            set({ isLoading: false });
            return false;
        } catch (error: any) {
            console.error("Error creating container:", error);
            set({ 
                error: error.response?.data?.message || "Failed to create container",
                isLoading: false 
            });
            return false;
        }
    },

    getContainer: async (identifier: string, isPublic: boolean = false) => {
        try {
            set({ isLoading: true, error: null });
            const response = await getHtmlContainer(identifier, isPublic);
            
            if (response.data) {
                set((state) => ({
                    containers: {
                        ...state.containers,
                        [identifier]: response.data
                    },
                    isLoading: false
                }));
                return response.data;
            }
            set({ isLoading: false });
            return null;
        } catch (error: any) {
            console.error("Error getting container:", error);
            set({ 
                error: error.response?.data?.message || "Failed to get container",
                isLoading: false 
            });
            return null;
        }
    },

    getAllContainers: async (isPublic: boolean = false) => {
        try {
            set({ isLoading: true, error: null });
            const response = await getAllHtmlContainers(isPublic);
            
            if (response.data && Array.isArray(response.data)) {
                const containersMap: Record<string, IHtmlContainer> = {};
                response.data.forEach((container: IHtmlContainer) => {
                    containersMap[container.identifier] = container;
                });
                
                set({ containers: containersMap, isLoading: false });
            } else {
                set({ isLoading: false });
            }
        } catch (error: any) {
            console.error("Error getting all containers:", error);
            set({ 
                error: error.response?.data?.message || "Failed to get containers",
                isLoading: false 
            });
        }
    },

    updateContainer: async (identifier: string, content: string) => {
        try {
            set({ isLoading: true, error: null });
            const response = await updateHtmlContainer(identifier, { content });
            
            if (response.data) {
                set((state) => ({
                    containers: {
                        ...state.containers,
                        [identifier]: response.data
                    },
                    isLoading: false
                }));
                console.log("Container updated successfully in database:", identifier);
                return true;
            }
            set({ isLoading: false });
            console.warn("Update response missing data:", identifier);
            return false;
        } catch (error: any) {
            // If container doesn't exist (404), create it instead
            if (error.response?.status === 404) {
                console.log("Container not found, creating new one:", identifier);
                try {
                    const createResponse = await createHtmlContainer({ identifier, content });
                    if (createResponse.data) {
                        set((state) => ({
                            containers: {
                                ...state.containers,
                                [identifier]: createResponse.data
                            },
                            isLoading: false
                        }));
                        console.log("Container created successfully in database:", identifier);
                        return true;
                    }
                    set({ isLoading: false });
                    console.warn("Create response missing data:", identifier);
                    return false;
                } catch (createError: any) {
                    console.error("Error creating container:", createError);
                    set({ 
                        error: createError.response?.data?.message || "Failed to create container",
                        isLoading: false 
                    });
                    return false;
                }
            } else {
                console.error("Error updating container:", error);
                set({ 
                    error: error.response?.data?.message || "Failed to update container",
                    isLoading: false 
                });
                return false;
            }
        }
    },

    deleteContainer: async (identifier: string) => {
        try {
            set({ isLoading: true, error: null });
            await deleteHtmlContainer(identifier);
            
            set((state) => {
                const newContainers = { ...state.containers };
                delete newContainers[identifier];
                return { containers: newContainers, isLoading: false };
            });
            return true;
        } catch (error: any) {
            console.error("Error deleting container:", error);
            set({ 
                error: error.response?.data?.message || "Failed to delete container",
                isLoading: false 
            });
            return false;
        }
    },

    getContainerContent: (identifier: string) => {
        const state = get();
        return state.containers[identifier]?.content || "";
    },

    setContainerContent: (identifier: string, content: string) => {
        set((state) => ({
            containers: {
                ...state.containers,
                [identifier]: {
                    ...state.containers[identifier],
                    identifier,
                    content
                }
            }
        }));
    }
}));

