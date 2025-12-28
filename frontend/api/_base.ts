import axios from "axios";

export const apiInstance = axios.create({
    baseURL: 'https://fatima-as-it-was-given.onrender.com',
    withCredentials: true
})