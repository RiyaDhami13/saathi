import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Button({
  className,
  type = "button",
  ...props
}: ComponentProps<"button">) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}