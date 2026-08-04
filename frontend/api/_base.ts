import axios from "axios";

const normalizeBaseUrl = (value: string) => {
    return value.replace(/\/+$/, '').replace(/\/api$/, '');
};

const defaultApiBaseUrl = process.env.NODE_ENV === 'production'
  ? 'https://fatima-as-it-was-given.onrender.com'
  : 'http://localhost:8000';

export const apiInstance = axios.create({
    baseURL: normalizeBaseUrl(process.env.NEXT_PUBLIC_API_URL || defaultApiBaseUrl),
    withCredentials: true
})