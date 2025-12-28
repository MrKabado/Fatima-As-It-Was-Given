import axios from "axios";

export const apiInstance = axios.create({
    baseURL: process.env.NODE_ENV === 'production'
        ? 'https://fatima-as-it-was-given.onrender.com'
        : 'http://localhost:8000/api',
    withCredentials: true
})