"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface FocusCardItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

interface FocusCardsProps {
  items: FocusCardItem[];
  className?: string;
}

export function FocusCards({ items, className }: FocusCardsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative">
      {/* Container with padding */}
      <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6 px-4 max-w-5xl mx-auto", className)}>
        {/* Backdrop blur overlay - positioned relative to outer container */}
        {hoveredIndex !== null && (
          <div 
            className="fixed inset-0 bg-white/30 backdrop-blur-sm transition-all duration-500"
            style={{
              position: 'absolute',
              top: '-2rem',
              left: '-2rem',
              right: '-2rem',
              bottom: '-2rem',
              borderRadius: '1.5rem',
            }}
          />
        )}
        
        {items.map((item, index) => (
          <motion.button
            key={index}
            onClick={item.onClick}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={cn(
              "group relative min-h-[200px] overflow-hidden rounded-3xl p-8",
              "bg-gradient-to-br from-white/90 to-white/75 backdrop-blur-xl",
              "border-2 border-transparent hover:border-[#3674B5]/30",
              "transition-all duration-500 ease-out transform hover:-translate-y-1",
              "shadow-lg hover:shadow-2xl",
              hoveredIndex !== null && hoveredIndex !== index && "opacity-40 scale-95 blur-[2px]",
              hoveredIndex === index && "z-10 scale-[1.02]"
            )}
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#3674B5]/10 via-[#578FCA]/5 to-[#A1E3F9]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Animated glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[glow_1.5s_ease-in-out_infinite]" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-start gap-6">
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className="p-4 rounded-2xl bg-[#3674B5]/10"
              >
                <div className="text-[#3674B5] w-8 h-8">
                  {item.icon}
                </div>
              </motion.div>
              
              <div className="space-y-3">
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.1 }}
                  className="text-2xl font-bold text-gray-800 group-hover:text-[#3674B5] transition-colors"
                >
                  {item.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                  className="text-base text-gray-600 group-hover:text-gray-700"
                >
                  {item.description}
                </motion.p>
              </div>
        </div>

            {/* Enhanced hover border effect */}
            <div className="absolute inset-px rounded-3xl border-2 border-[#3674B5] opacity-0 scale-105 group-hover:opacity-20 group-hover:scale-100 transition-all duration-500" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
