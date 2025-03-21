"use client";

import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface ShiningButtonProps {
  label?: string;
  className?: string;
  href?: string;
}

export default function ShiningButton({ 
  label = "Sign In", 
  className,
  href = "/login"
}: ShiningButtonProps) {
  const router = useRouter();

  return (
    <button 
      onClick={() => href && router.push(href)}
      className={cn(
        "group relative cursor-pointer rounded-xl p-[2px] before:absolute before:inset-0 before:rounded-xl before:bg-[#4A8CF7] before:opacity-0 before:transition-opacity hover:before:opacity-100",
        className
      )}
    >
      <div className="relative flex items-center justify-center gap-4 overflow-hidden rounded-lg bg-[#4A8CF7] px-6 py-2 font-bold text-white">
        {label}
        <ArrowRight className="transition-all group-hover:translate-x-2 group-hover:scale-125" />
        <div className="absolute -left-16 top-0 h-full w-12 rotate-[30deg] scale-y-150 bg-white/10 transition-all duration-700 group-hover:left-[calc(100%+1rem)]" />
      </div>
    </button>
  );
} 