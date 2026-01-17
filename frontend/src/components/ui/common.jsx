import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Card({ children, className, ...props }) {
  return (
    <div 
      className={twMerge("glass-panel rounded-xl p-6", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function Button({ children, className, variant = 'primary', ...props }) {
    const baseStyles = "px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 select-none";
    const variants = {
        primary: "bg-[#1f6feb] hover:bg-[#388bfd] text-white shadow-lg shadow-[#1f6feb]/20 active:scale-95",
        glass: "glass-button text-[#58a6ff] active:scale-95",
        ghost: "hover:bg-white/5 text-[var(--color-text-secondary)] hover:text-white"
    };

    return (
        <button 
            className={twMerge(baseStyles, variants[variant], className)} 
            {...props}
        >
            {children}
        </button>
    );
}
