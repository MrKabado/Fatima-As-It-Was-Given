"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

export default function TextToSpeech({
  textContent,
}: {
  textContent?: string;
}) {
  const { isSpeaking, readText, stopReading } = useTextToSpeech();
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // once speech actually starts, clear the loading state
  useEffect(() => {
    if (isSpeaking) {
      setIsLoading(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
  }, [isSpeaking]);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleClick = async () => {
    if (isSpeaking) {
      stopReading();
      return;
    }

    if (!textContent) {
      toast.error("There's something wrong with the text content. Please try again.");
      return;
    }

    setIsLoading(true);

    try {
      await Promise.resolve(readText(textContent));

      // fallback: if speech hasn't actually started after a few seconds,
      // assume it failed silently and let the user know
      timeoutRef.current = setTimeout(() => {
        setIsLoading(false);
        toast.error("Text to speech isn't working right now.");
      }, 4000);
    } catch (error) {
      setIsLoading(false);
      toast.error("Text to speech isn't working right now.");
    }
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="
          flex items-center gap-2
          px-4 py-2
          sm:px-5 sm:py-2.5
          bg-white
          border border-gray-200
          rounded-full
          shadow-sm
          hover:shadow-md
          hover:bg-gray-50
          active:scale-95
          transition-all duration-200
          cursor-pointer
          disabled:cursor-not-allowed
          disabled:opacity-60
          disabled:active:scale-100
          w-fit
        "
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 animate-spin" />
        ) : isSpeaking ? (
          <VolumeOff className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
        ) : (
          <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
        )}

        <span className="text-sm sm:text-base font-medium text-gray-800">
          {isLoading ? "Loading..." : isSpeaking ? "Stop Reading" : "Listen"}
        </span>
      </button>
    </div>
  );
}