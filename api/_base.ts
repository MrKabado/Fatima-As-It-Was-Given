import axios from "axios";

export const apiInstance = axios.create({
    baseURL: process.env.NEXT_ENV === "development" ? 
    process.env.BACKEND_URL_LOCAL : process.env.BACKEND_URL_PROD,
    withCredentials: true
})