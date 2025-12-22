import { create } from "zustand";
import { requestAccessCode } from "@/services/authService";

interface IAuthState {
    isAutheticated: boolean;
}

export const authStore = create<IAuthState>()((set) => ({
    isAutheticated: false,

    requestAccessCode: async (accessCode: string) => {
        try {
            const response = await requestAccessCode(accessCode);
            if(response.status === 400 || response.status === 500) {
                alert(response.message);
                return;
            }
            set({ isAutheticated: true });
            alert(response.message);
            return
        } catch (error) {
            console.error("Error request access failed:", error);
        }
    }
}));