"use client";

import { useState, useRef, useEffect } from "react";

interface DropdownOption {
  value: string;
  label: string;
}

interface GlassDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function GlassDropdown({
  options,
  value,
  onChange,
  className = "",
}: GlassDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedLabel =
    options.find((o) => o.value === value)?.label || value;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between rounded-xl px-4 py-3 text-sm text-foreground cursor-pointer bg-white/4 backdrop-blur-2xl border border-white/10 hover:border-white/18 transition-all duration-200 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
      >
        <span>{selectedLabel}</span>
        <svg
          className={`w-4 h-4 text-muted transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-[rgba(15,15,25,0.92)] backdrop-blur-3xl border border-white/10 rounded-xl overflow-hidden animate-scale-in origin-top py-1 shadow-2xl shadow-black/50 [box-shadow:inset_0_1px_0_0_rgba(255,255,255,0.06)]">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-all duration-150 ${
                value === option.value
                  ? "text-accent bg-accent/15 font-medium"
                  : "text-white/80 hover:text-white hover:bg-white/8"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
