"use client";

import { useRef } from "react";
import { Camera } from "lucide-react";
import { BigButton } from "@/components/BigButton";

interface UploadPickerProps {
  label: string;
  busyLabel: string;
  busy: boolean;
  onFile: (file: File) => void;
}

export function UploadPicker({ label, busyLabel, busy, onFile }: UploadPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = ""; // allow re-selecting the same photo
          if (file) onFile(file);
        }}
      />
      <BigButton
        tone="primary"
        disabled={busy}
        icon={<Camera aria-hidden="true" />}
        onClick={() => inputRef.current?.click()}
      >
        {busy ? busyLabel : label}
      </BigButton>
    </>
  );
}