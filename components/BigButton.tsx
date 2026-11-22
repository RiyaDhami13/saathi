import type { ComponentProps, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Tone = "primary" | "warning" | "secondary";

const TONE_CLASSES: Record<Tone, string> = {
  primary: "bg-[#0072B2] text-white hover:bg-[#005a8e] active:scale-[0.99]",
  warning:
    "bg-[#E69F00] text-neutral-950 border-2 border-neutral-950 hover:bg-[#d89300] active:scale-[0.99]",
  secondary:
    "bg-white text-neutral-950 border-2 border-neutral-900 hover:bg-neutral-100 active:scale-[0.99]",
};

export interface BigButtonProps
  extends Omit<ComponentProps<typeof Button>, "children"> {
  tone?: Tone;
  icon?: ReactNode;
  children: ReactNode;
}

export function BigButton({
  tone = "primary",
  icon,
  children,
  className,
  type = "button",
  ...props
}: BigButtonProps) {
  return (
    <Button
      type={type}
      className={cn(
        "min-h-[3.5rem] px-6 py-4 text-xl font-bold rounded-2xl w-full whitespace-normal h-auto transition-all duration-150 flex items-center justify-center gap-3 has-[>svg]:px-6",
        TONE_CLASSES[tone],
        "focus-visible:ring-4 focus-visible:ring-neutral-950 focus-visible:outline-none",
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </Button>
  );
}