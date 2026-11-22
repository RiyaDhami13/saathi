"use client";

import { useApp } from "@/components/AppProvider";

export default function Loading() {
  const { t } = useApp();
  return (
    <p className="text-lg font-medium" role="status">
      {t.States.loading}
    </p>
  );
}
