"use client";

import { Volume2, VolumeOff } from "lucide-react";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

export default function TextToSpeech({
  textContent,
}: {
  textContent?: string;
}) {
  const { isSpeaking, readText, stopReading } = useTextToSpeech();

  return (
    <div className="flex justify-center">
      <button
        onClick={() =>
          isSpeaking ? stopReading() : readText(textContent || "")
        }
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
      w-fit
    "
      >
        {isSpeaking ? (
          <VolumeOff className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
        ) : (
          <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
        )}

        <span className="text-sm sm:text-base font-medium text-gray-800">
          {isSpeaking ? "Stop Reading" : "Listen"}
        </span>
      </button>
    </div>
  );
}
