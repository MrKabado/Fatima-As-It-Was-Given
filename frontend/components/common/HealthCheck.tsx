"use client";

import { useEffect } from "react";
import axios from "axios";

const apiUrl = process.env.NODE_ENV === "production"
  ? process.env.NEXT_PUBLIC_BACKEND_URL_PROD
  : process.env.NEXT_PUBLIC_BACKEND_URL_LOCAL;

export default function HealthCheck() {
 useEffect(() => {
  const checkHealth = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/health`);
      console.log("✅ Backend is awake and healthy!", response.data);
    } catch (error) {
      console.error("❌ API health check failed:", error);
    }
  };

  checkHealth();
}, []);

  return null;
}