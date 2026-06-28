"use client";

import { useState, useEffect, useRef } from "react";

type TTSState = "idle" | "playing" | "paused";

interface Props {
  text: string;
  label?: string;
}

// Chrome silently cuts off long utterances — split at sentence boundaries
function splitIntoChunks(text: string, maxLen = 250): string[] {
  const chunks: string[] = [];
  let remaining = text.trim();
  while (remaining.length > maxLen) {
    let cut = remaining.lastIndexOf(". ", maxLen);
    if (cut === -1) cut = remaining.lastIndexOf(" ", maxLen);
    if (cut === -1) cut = maxLen;
    else cut += 1;
    chunks.push(remaining.slice(0, cut).trim());
    remaining = remaining.slice(cut).trim();
  }
  if (remaining) chunks.push(remaining);
  return chunks;
}

function speakNext(
  chunks: string[],
  index: number,
  utteranceRef: React.MutableRefObject<SpeechSynthesisUtterance | null>,
  onDone: () => void
) {
  if (index >= chunks.length) {
    onDone();
    return;
  }
  const utt = new SpeechSynthesisUtterance(chunks[index]);
  utt.lang = "pl-PL";
  utt.rate = 0.95;
  utt.onend = () => speakNext(chunks, index + 1, utteranceRef, onDone);
  utt.onerror = (e) => {
    if ((e as SpeechSynthesisErrorEvent).error !== "interrupted") onDone();
  };
  utteranceRef.current = utt;
  window.speechSynthesis.speak(utt);
}

export default function TextToSpeech({
  text,
  label = "Odsłuchaj artykuł",
}: Props) {
  const [supported, setSupported] = useState(false);
  const [ttsState, setTtsState] = useState<TTSState>("idle");
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setSupported("speechSynthesis" in window);
  }, []);

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  if (!supported) return null;

  function speak() {
    window.speechSynthesis.cancel();
    const chunks = splitIntoChunks(text);
    speakNext(chunks, 0, utteranceRef, () => setTtsState("idle"));
    setTtsState("playing");
  }

  function pause() {
    window.speechSynthesis.pause();
    setTtsState("paused");
  }

  function resume() {
    window.speechSynthesis.resume();
    setTtsState("playing");
  }

  function stop() {
    window.speechSynthesis.cancel();
    setTtsState("idle");
  }

  if (ttsState === "idle") {
    return (
      <button
        type="button"
        onClick={speak}
        aria-label={`${label} – korzysta z syntezatora mowy przeglądarki`}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-green-300 dark:hover:border-green-700 transition-colors"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          className="w-4 h-4 text-green-700 dark:text-green-400 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14"
          />
        </svg>
        {label}
      </button>
    );
  }

  return (
    <div
      className="flex items-center gap-2 flex-wrap"
      role="group"
      aria-label="Kontrolki odtwarzania"
    >
      {ttsState === "playing" && (
        <span aria-hidden="true" className="flex items-end gap-0.5 h-4">
          {[10, 16, 12].map((h, i) => (
            <span
              key={i}
              className="w-1 rounded-full bg-green-600 dark:bg-green-400 animate-pulse"
              style={{ height: h, animationDelay: `${i * 160}ms` }}
            />
          ))}
        </span>
      )}

      {ttsState === "playing" ? (
        <button
          type="button"
          onClick={pause}
          aria-label="Wstrzymaj odtwarzanie"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-green-200 dark:border-green-800 text-sm font-medium text-green-800 dark:text-green-300 bg-green-50 dark:bg-green-950/30 hover:bg-green-100 dark:hover:bg-green-950/50 transition-colors"
        >
          <svg aria-hidden="true" focusable="false" className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
          Pauza
        </button>
      ) : (
        <button
          type="button"
          onClick={resume}
          aria-label="Wznów odtwarzanie"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-green-200 dark:border-green-800 text-sm font-medium text-green-800 dark:text-green-300 bg-green-50 dark:bg-green-950/30 hover:bg-green-100 dark:hover:bg-green-950/50 transition-colors"
        >
          <svg aria-hidden="true" focusable="false" className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          Wznów
        </button>
      )}

      <button
        type="button"
        onClick={stop}
        aria-label="Zatrzymaj odtwarzanie"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <svg aria-hidden="true" focusable="false" className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 6h12v12H6z" />
        </svg>
        Stop
      </button>
    </div>
  );
}
