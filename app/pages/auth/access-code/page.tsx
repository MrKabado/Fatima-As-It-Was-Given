"use client";

import React from "react";
import { useState, useEffect } from "react";
import { ButtonSubmit } from "@/components/button";

export default function AccessCode() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setIsTimerActive(true);
    setTimeLeft(300);
  };

  const handleResend = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isTimerActive) {
      setIsTimerActive(true);
      setTimeLeft(300);
      setIsSubmitted(false);
      console.log("Resending access code...");
    }
  };

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

  // Calculate progress percentage for visual indicator
  const progressPercentage = ((300 - timeLeft) / 300) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg p-6 sm:p-8 bg-white shadow-md"
      >
        <h1 className="text-2xl font-semibold text-center mb-6">Access Code</h1>

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
            className="text-lg border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-center"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <ButtonSubmit
            props={{
              submitted: isSubmitted,
              buttonType: "submit",
              className: "w-full cursor-pointer",
              btnText: "Submit Access Code",
              btnLoadingText: "Submitting",
            }}
          />

          <button 
            type="button"
            className="border w-full p-1 rounded-md cursor-pointer hover:bg-gray-100 text-sm"
            onClick={() => window.history.back()}
          >
            Return
          </button>
        </div>
      </form>
    </div>
  );
}
