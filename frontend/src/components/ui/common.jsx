import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Card({ children, className, ...props }) {
  const [theme, setTheme] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.getAttribute('data-theme') || 'dark';
    }
    return 'dark';
  });

  React.useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute('data-theme') || 'dark');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      className={twMerge(`glass-panel rounded-xl p-6 ${theme === 'light' ? 'shadow-sm' : ''}`, className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function Button({ children, className, variant = 'primary', ...props }) {
    const [theme, setTheme] = React.useState(() => {
      if (typeof window !== 'undefined') {
        return document.documentElement.getAttribute('data-theme') || 'dark';
      }
      return 'dark';
    });

    React.useEffect(() => {
      const observer = new MutationObserver(() => {
        setTheme(document.documentElement.getAttribute('data-theme') || 'dark');
      });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
      return () => observer.disconnect();
    }, []);

    const isDark = theme === 'dark';
    const baseStyles = "px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 select-none";
    const variants = {
        primary: isDark 
          ? "bg-[#1f6feb] hover:bg-[#388bfd] text-white shadow-lg shadow-[#1f6feb]/20 active:scale-95"
          : "bg-[var(--color-accent-primary)] hover:bg-[#1565c0] text-white shadow-lg shadow-[var(--color-accent-primary)]/30 active:scale-95",
        glass: isDark
          ? "glass-button text-[#58a6ff] active:scale-95"
          : "glass-button text-[var(--color-accent-primary)] active:scale-95",
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
