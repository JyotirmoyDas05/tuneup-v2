"use client";

import { useCallback, useRef } from "react";
import { Music } from "lucide-react";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  title: string;
  emoji?: string;
  content: React.ReactNode;
}

export default function ShinyCard({ className, title, emoji, content }: CardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const update = useCallback(({ x, y }: { x: number; y: number }) => {
    if (!overlayRef.current) {
      return;
    }

    const { width, height } = overlayRef.current?.getBoundingClientRect() ?? {};
    const xOffset = x - width / 2;
    const yOffset = y - height / 2;

    overlayRef.current?.style.setProperty("--x", `${xOffset}px`);
    overlayRef.current?.style.setProperty("--y", `${yOffset}px`);
  }, []);

  useMousePosition(containerRef, update);

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative w-full overflow-hidden rounded-xl border border-[#3674B5]/20 bg-white/90 p-6 text-[#638AB2] shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:border-[#3674B5]/40",
        className,
      )}
    >
      <div
        ref={overlayRef}
        className="absolute h-96 w-96 -z-1 rounded-full bg-gradient-to-r from-[#3674B5] via-[#578FCA] to-[#A1E3F9] opacity-0 mix-blend-soft-light blur-2xl transition-all duration-300 group-hover:opacity-30"
        style={{
          transform: "translate(var(--x), var(--y))",
        }}
      />

      <div className="relative z-10">
        <h2 className="text-2xl font-bold text-[#3674B5] mb-4 flex items-center gap-2 transition-colors duration-300 group-hover:text-[#2A5C91]">
          {title} {emoji && <span className="transition-transform duration-300 group-hover:scale-110">{emoji}</span>}
        </h2>
        <div className="space-y-4 transition-colors duration-300 group-hover:text-[#4B6A8C]">{content}</div>
      </div>
    </div>
  );
} 