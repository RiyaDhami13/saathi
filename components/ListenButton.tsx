"use client";

import { useEffect, useState } from "react";
import { Square, Volume2 } from "lucide-react";
import { BigButton } from "@/components/BigButton";
import { useApp } from "@/components/AppProvider";

export function ListenButton({ text }: { text: string }) {
  const { lang, t } = useApp();
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  // Stop speech on unmount and whenever the text or language changes.
  useEffect(() => {
    setSupported("speechSynthesis" in window);
    return () => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, [text, lang]);

  if (!supported) return null;

  function toggle() {
    const synth = window.speechSynthesis;
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    // Many devices have no Nepali voice. Hindi (Devanagari) is the closest fallback.
    const wanted = /[\u0900-\u097F]/.test(text) ? ["ne-NP", "hi-IN"] : ["en-US"];
    const voices = synth.getVoices();
    const voice = wanted
      .map((code) => voices.find((v) => v.lang.replace("_", "-").toLowerCase() === code.toLowerCase()))
      .find((v): v is SpeechSynthesisVoice => Boolean(v));
    utterance.lang = voice?.lang ?? wanted[0];
    if (voice) utterance.voice = voice;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    synth.cancel();
    synth.speak(utterance);
    setSpeaking(true);
  }

  return (
    <BigButton
      tone="secondary"
      aria-pressed={speaking}
      icon={speaking ? <Square aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
      onClick={toggle}
    >
      {speaking ? t.Explain.stopListening : t.Explain.listen}
    </BigButton>
  );
}