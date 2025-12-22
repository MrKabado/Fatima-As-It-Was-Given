'use client';

import { TbPlayerPlay, TbPlayerStop  } from "react-icons/tb";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

export default function TextToSpeech({ textContent }: { textContent?: string }) {
    const { isSpeaking, readText, stopReading } = useTextToSpeech();

    return (
        <div className="flex items-center border border-gray-300 py-2 px-2 rounded-full shadow-sm bg-white gap-2">
            <button className="flex items-center space-x-2.5 cursor-pointer" onClick={() => isSpeaking ? stopReading() : readText(textContent || "")}>
            {/* <span className="text-lg">
                {isSpeaking ? "Listening..." : "Listen"}
            </span> */}
                {isSpeaking ? <TbPlayerStop className="w-10 h-10" /> : <TbPlayerPlay className="w-10 h-10" />}
            </button>
        </div>
    );
}