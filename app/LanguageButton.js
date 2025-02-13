"use client";
import { Globe } from "lucide-react";
import { useLanguage } from "../app/LanguageContext";

export default function LanguageButton() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button 
        onClick={toggleLanguage}
        className={`
          font-martian-mono
          flex items-center gap-2 
          bg-[#1a2537] hover:bg-[#1e2c42]
          text-gray-300 hover:text-blue-400
          px-4 py-2 rounded-lg
          border border-gray-700
          transition-all duration-300
          shadow-lg hover:shadow-blue-900/20
          group
          relative
        `}
      >
        <div className="absolute inset-0 bg-blue-500/5 blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative flex items-center gap-2">
          <Globe className="w-4 h-4 text-blue-400 group-hover:rotate-180 transition-transform duration-500" />
          <span className="text-sm tracking-wider">{language}</span>
        </div>
      </button>
    </div>
  );
}