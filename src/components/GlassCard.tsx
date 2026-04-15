import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = true, ...props }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : {}}
      {...props}
      className={cn(
        "bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-4 shadow-lg transition-all duration-300",
        hover && "hover:shadow-2xl hover:border-white/50",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
