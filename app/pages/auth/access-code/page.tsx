"use client";

import React from "react";
import { useState } from "react";
import { ButtonSubmit } from "@/components/button";
import { authStore } from "@/stores/authStore";

export default function AccessCode() {
  const [isLoading, setIsLoading] = useState(false);
  const { requestAccessCode } = authStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      const accessCode = formData.get("accessCode") as string;
      console.log("Access Code Submitted:", accessCode);
      
      const success = await requestAccessCode(accessCode);
      
      if (!success) {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Unexpected error submitting access code:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-lg p-6 sm:p-8 bg-white shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Access Code
        </h1>

        <div className="flex flex-col gap-2 mb-6">
          <label htmlFor="accessCode" className="text-sm font-medium">
            Enter Access Code
          </label>
          <input
            type="text"
            id="accessCode"
            name="accessCode"
            placeholder="000000"
            maxLength={8}
            inputMode="numeric"
            disabled={isLoading}
            className="text-lg border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-center disabled:opacity-50 disabled:cursor-not-allowed"
            required
          />
        </div>

        <ButtonSubmit
          props={{
            submitted: isLoading,
            buttonType: "submit",
            className: "w-full cursor-pointer",
            btnText: "Submit Access Code",
            btnLoadingText: "Submitting",
          }}
        />
      </form>
    </div>
  );
}

