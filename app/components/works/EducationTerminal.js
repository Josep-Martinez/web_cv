// app/components/EducationTerminal.js
"use client";
import React, { useEffect, useState } from "react";
import { Terminal } from "lucide-react";

const data = {
  EN: {
    header: "Education Terminal",
    cmd: "cat academic_background.txt",
    footer: "2 academic degrees loaded",
    currentBadge: "",
    currentTitle: "Master’s in FinTech & Blockchain",
    currentInstitution: "ENEB – European Business School of Barcelona",
    currentPeriod: "Present",
    currentStatus: "In Progress",
    completedBadge: "",
    completedTitle: "Computer Engineering Degree",
    completedInstitution: "UPV – Universitat Politècnica de València",
    completedPeriod: "Completed",
    completedStatus: "Graduated",
    tags: ["UPV", "ENEB"],
  },
  ES: {
    header: "Terminal de Formación",
    cmd: "cat academic_background.txt",
    footer: "2 titulaciones cargadas",
    currentBadge: "",
    currentTitle: "Máster en Fintech & Blockchain",
    currentInstitution: "ENEB – Escuela de Negocios Europea de Barcelona",
    currentPeriod: "Presente",
    currentStatus: "En curso",
    completedBadge: "",
    completedTitle: "Grado en Ingeniería Informática",
    completedInstitution: "UPV – Universitat Politècnica de València",
    completedPeriod: "Finalizado",
    completedStatus: "Graduado",
    tags: ["UPV", "ENEB"],
  },
};

export default function EducationTerminal({ language = "EN" }) {
  const t = data[language] || data.EN;
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setBlink((s) => !s), 550);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="glass-panel rounded-lg shadow-2xl overflow-hidden border border-slate-dark/50">
      {/* Header */}
      <div className="bg-navy-800/80 px-4 py-2 flex items-center border-b border-slate-dark/50">
        <Terminal size={18} className="text-electric mr-2" />
        <span className="text-electric font-mono text-sm font-bold">
          {t.header}
        </span>
      </div>

      {/* Body */}
      <div className={`p-4 font-mono text-slate-light text-sm`}>
        {/* Prompt */}
        <div>
          <span className="text-electric">$</span>{" "}
          <span>{t.cmd}</span>
          {blink && <span className="border-r-2 border-electric ml-1 animate-pulse">&nbsp;</span>}
        </div>

        <div className="border-t border-slate-dark/50 my-3" />

        {/* Current */}
        <div className="space-y-2 pl-3">
          <div className="flex items-start">
            <span className="text-electric mr-2 leading-5">►</span>
            <div className="flex-1">
              {/* 👇 Subimos un poco el título y ocultamos el badge si está vacío */}
              <div className="text-gray-100 text-sm md:text-base mb-0.5 font-semibold -mt-0.5 md:-mt-1">
                {t.currentBadge ? (
                  <>
                    <span className="text-amber-300">{t.currentBadge}</span>{" "}
                    {t.currentTitle}
                  </>
                ) : (
                  t.currentTitle
                )}
              </div>
              <div className="text-slate-400 text-xs space-y-0.5 ml-3">
                <div><span className="text-electric/80">institution:</span> “{t.currentInstitution}”</div>
                <div><span className="text-electric/80">period:</span> “{t.currentPeriod}”</div>
                <div className="flex items-center gap-2">
                  <div><span className="text-electric/80">status:</span> <span className="text-amber-300">“{t.currentStatus}”</span></div>
                  <span className="inline-block w-1.5 h-1.5 bg-amber-300 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center space-x-2 my-3 ml-3">
            <div className="h-px flex-1 bg-gradient-to-r from-electric/50 to-transparent" />
          </div>

          {/* Completed */}
          <div className="flex items-start">
            <span className="text-electric mr-2 leading-5">►</span>
            <div className="flex-1">
              {/* 👇 también lo alineamos un poco más arriba para consistencia */}
              <div className="text-gray-100 text-sm md:text-base mb-0.5 font-semibold -mt-0.5 md:-mt-1">
                <span className="text-emerald-300">{t.completedBadge}</span>{" "}
                {t.completedTitle}
              </div>
              <div className="text-slate-400 text-xs space-y-0.5 ml-3">
                <div><span className="text-electric/80">institution:</span> “{t.completedInstitution}”</div>
                <div><span className="text-electric/80">period:</span> “{t.completedPeriod}”</div>
                <div><span className="text-electric/80">status:</span> <span className="text-emerald-300">“{t.completedStatus}”</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-dark/50 my-3" />

        {/* Footer */}
        <div className="flex justify-between items-center text-xs text-slate-400 px-1 mt-1">
          <div>{t.footer}</div>
          <div className="flex gap-4">
            <span className="text-electric">{t.tags[0]}</span>
            <span className="text-violet-400">{t.tags[1]}</span>
          </div>
        </div>
      </div>

      {/* Bottom prompt */}
      <div className="bg-navy-900/80 border-t border-slate-dark/50 p-3 flex items-center">
        <span className="text-electric font-mono mr-2">$</span>
        <div className="flex-1 bg-navy-800 rounded px-3 py-2 font-mono text-sm text-slate-light flex items-center">
          <span>
            education.show(<span className="text-electric">&apos;degrees&apos;</span>)
          </span>
          <span className="border-r-2 border-electric ml-1 h-5 animate-pulse"></span>
        </div>
      </div>
    </div>
  );
}