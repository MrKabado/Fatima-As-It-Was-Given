"use client";

import React from "react";
import { useState } from "react";
import { ButtonSubmit } from "@/components/button";

export default function AccessCode() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form className="w-full max-w-md rounded-lg p-6 sm:p-8 bg-white shadow-md">
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
            className="text-lg border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-center"
            required
          />
        </div>

        <ButtonSubmit
          props={{
            submitted: isSubmitted,
            buttonType: "submit",
            className: "w-full cursor-pointer",
            btnOnClick: () => setIsSubmitted(true),
            btnText: "Submit Access Code",
            btnLoadingText: "Submitting",
          }}
        />
      </form>
    </div>
  );
}
