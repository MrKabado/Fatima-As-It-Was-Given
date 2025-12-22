'use client';
import React from 'react';

export function useTextToSpeech() {
    const [isSpeaking, setIsSpeaking] = React.useState<Boolean>(false);

    const readText = (text: string) => {
        if (!('speechSynthesis' in window)) {
            console.warn('Text-to-speech is not supported in this browser.');
            return;
        }

        const voices = window.speechSynthesis.getVoices();
        const utterance = new SpeechSynthesisUtterance(text);

        utterance.voice = voices.find(v => v.lang === 'en-US' && v.name.includes('Google')) || voices[0];
        utterance.pitch = 0.5;
        utterance.rate = 1;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
    }

    const stopReading = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    }

    return { isSpeaking, readText, stopReading };
}