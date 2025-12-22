import { apiInstance } from "@/api/_base";

export const requestAccessCode = async (accessCode: string) => {
    const response = await apiInstance.post("/api/auth/request-access", { access_code:accessCode }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
}

export const requestNewAccessCode = async () => {
    const response = await apiInstance.post("/api/auth/request-new-access-code");
    return response.data;
}

export const checkAuthentication = async () => {
    const response = await apiInstance.get("/api/auth/check-auth");
    return response.data;
}
