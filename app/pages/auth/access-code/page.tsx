"use client";

import React from "react";
import { useState, useEffect } from "react";
import { ButtonSubmit } from "@/components/button";
import { authStore } from "@/stores/authStore";

export default function AccessCode() {
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 300 seconds = 5 minutes
  const [isTimerActive, setIsTimerActive] = useState(false);
  const { requestAccessCode } = authStore();

  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage for visual indicator
  const progressPercentage = ((300 - timeLeft) / 300) * 100;

  // Handle resend access code
  const handleResend = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isTimerActive) {
      // Reset timer and allow resend
      setIsTimerActive(true);
      setTimeLeft(300);
      
      // Here you would typically trigger the actual resend logic
      console.log("Resending access code...");
      // Add your API call to resend the code here
      // Example: await resendAccessCodeAPI();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      const accessCode = formData.get("accessCode") as string;
      console.log("Access Code Submitted:", accessCode);
      
      // Start the timer when submitting
      if (!isTimerActive) {
        setIsTimerActive(true);
        setTimeLeft(300);
      }
      
      const success = await requestAccessCode(accessCode);
      
      if (!success) {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Unexpected error submitting access code:", error);
      setIsLoading(false);
    }
  };

  // Timer countdown effect
  useEffect(() => {
    if (!isTimerActive || timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerId);
          setIsTimerActive(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [isTimerActive, timeLeft]);

  // Start timer when component mounts (if you want timer to start immediately)
  useEffect(() => {
    // Start the timer when the component loads
    setIsTimerActive(true);
    setTimeLeft(300);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-lg p-6 sm:p-8 bg-white shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Access Code
        </h1>

        <div className="flex flex-col gap-2 mb-6">
          <div className="flex flex-row justify-between items-center">
            <label htmlFor="accessCode" className="text-sm font-medium">
              Enter Access Code
            </label>

            <div className="flex flex-col items-end">
              <button
                onClick={handleResend}
                disabled={isTimerActive && timeLeft > 0}
                className={`cursor-pointer font-semibold text-sm ${
                  isTimerActive && timeLeft > 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-black hover:underline"
                }`}
              >
                Resend Access Code
              </button>
              {isTimerActive && (
                <div className="mt-1 w-full">
                  <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all duration-1000 ease-linear"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 mt-1 block">
                    Resend available in {formatTime(timeLeft)}
                  </span>
                </div>
              )}
            </div>
          </div>

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