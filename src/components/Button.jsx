import React from 'react';
import { cn } from '../utils/cn';

export function Button({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  children, 
  ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50 rounded-xl hover:-translate-y-0.5 active:translate-y-0";
  
  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 shadow-[0_4px_14px_0_rgba(34,197,94,0.39)] hover:shadow-[0_6px_20px_rgba(34,197,94,0.23)]",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-200 shadow-sm",
    outline: "border-2 border-slate-200 bg-white/50 hover:bg-slate-50 text-slate-900 hover:border-slate-300 backdrop-blur-sm shadow-sm",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-700 hover:text-slate-900",
    gradient: "bg-gradient-to-r from-primary-600 to-teal-500 text-white shadow-[0_4px_14px_0_rgba(20,184,166,0.39)] hover:shadow-[0_6px_20px_rgba(20,184,166,0.23)] border-none"
  };
  
  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 py-2 text-sm",
    lg: "h-12 px-8 text-base",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : null}
      {children}
    </button>
  );
}
