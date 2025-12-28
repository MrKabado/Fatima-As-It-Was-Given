import { create } from "zustand";
import { requestAccessCode, requestNewAccessCode, checkAuthentication, logout } from "@/services/authService";
    
interface IAuthState {
    authenticatedData: Record<string, unknown>;
    isAutheticated: boolean;
    requestAccessCode: (accessCode: string) => Promise<boolean>;
    requestNewAccessCode: () => Promise<void>;
    checkAuthentication: () => Promise<boolean>;
    logoutAccess: () => Promise<boolean>;
}

export const authStore = create<IAuthState>()((set) => ({
    authenticatedData: {},
    isAutheticated: false,

    requestAccessCode: async (accessCode: string) => {
        try {
            const response = await requestAccessCode(accessCode);
            set({ isAutheticated: true });
            alert(response.message);
            return true;
        } catch (error) {
            console.error("Error request access failed:", error);
            alert("Access code request failed. Please try again.");
            return false;
        }
    },

    requestNewAccessCode: async () => {
        try {
            const response = await requestNewAccessCode();
            if(response.status === 400 || response.status === 500) {
                alert(response.message);
                return;
            }
            alert(response.message);
            return
        } catch (error) {
            console.error("Requesting new access code:", error);
        }
    },

    checkAuthentication: async () => {
        try {
            const response = await checkAuthentication();
            set({ isAutheticated: !!response.access });
            console.log("Authentication check:", response);
            return !!response.access;
        } catch (error) {
            console.error("Error checking authentication:", error);
            set({ isAutheticated: false });
            return false;
        }
    },

    logoutAccess: async () => {
        try {
            const response = await logout();
            set({ isAutheticated: false });
            alert(response.message);
            return true
        } catch (error) {
            console.error("Error during logout:", error);
            alert("Logout failed. Please try again.");
            return false;
        }
    },
}));