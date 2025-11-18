// app/components/ExperienceItem.js
import React from "react";
import Image from "next/image";
import { Calendar, MapPin, Award, Briefcase } from "lucide-react";
import { nixieOne, martianMono } from "../fonts";

const ExperienceItem = ({ experience, index, language }) => {
  const isEven = index % 2 === 0;
  const alignText = isEven ? "text-left" : "text-right";

  const skillsArray = experience.skills
    ? experience.skills.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <div className="relative mb-16 experience-item">
      {/* (ANTES aquí estaba el punto de la línea, lo hemos eliminado) */}

      <div
        className={`flex w-full flex-col md:flex-row ${
          isEven ? "md:justify-start" : "md:justify-end"
        }`}
      >
        <div className="w-full md:w-7/12 px-6 md:px-0 text-left md:text-left">
          <div className="relative group">
            {/* Glow exterior */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition duration-500" />

            {/* Card principal */}
            <div className="relative bg-[#1a2537] border border-gray-700/50 p-6 rounded-2xl shadow-lg hover:shadow-[0_20px_50px_rgba(59,130,246,0.2)] transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/50 backdrop-blur-sm overflow-hidden">
              {/* Barra superior decorativa */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Brillo diagonal */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-500/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>

              <div className="relative z-10">
                {/* Header con logo y título */}
                <div className="flex items-center gap-4 mb-5">
                  <div className={isEven ? "order-2" : "order-1"}>
                    <div className="relative w-16 h-16 bg-white rounded-xl overflow-hidden flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-110">
                      {experience.logo ? (
                        <Image
                          src={experience.logo}
                          alt={`${experience.company} logo`}
                          width={64}
                          height={64}
                          className="object-contain p-2"
                        />
                      ) : (
                        <Briefcase className="w-8 h-8 text-gray-700" />
                      )}

                      {/* Ring animado */}
                      <div className="absolute inset-0 rounded-xl ring-2 ring-blue-500 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300" />
                    </div>
                  </div>

                  <div
                    className={`flex-1 ${
                      isEven ? "text-right md:text-left" : "text-left md:text-right"
                    }`}
                  >
                    <h3
                      className={`${nixieOne.className} text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors duration-300 ${alignText}`}
                    >
                      {experience.title}
                    </h3>
                    <h4
                      className={`${martianMono.className} text-sm text-gray-400 group-hover:text-blue-300 transition-colors duration-300 ${alignText}`}
                    >
                      {experience.company}
                    </h4>
                  </div>
                </div>

                {/* Info con iconos */}
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span className={`${martianMono.className} text-xs`}>
                      {experience.period}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span className={`${martianMono.className} text-xs`}>
                      {experience.location}
                    </span>
                  </div>
                </div>

                {/* Descripción */}
                <p
                  className={`${martianMono.className} text-sm text-gray-300 mb-5 leading-relaxed group-hover:text-gray-200 transition-colors duration-300`}
                >
                  {experience.description}
                </p>

                {/* Skills como chips */}
                {skillsArray.length > 0 && (
                  <div className="border-t border-gray-700/50 group-hover:border-blue-500/30 pt-4 transition-colors duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="w-4 h-4 text-blue-500" />
                      <p
                        className={`${martianMono.className} text-xs font-bold text-blue-400`}
                      >
                        {language === "EN" ? "Skills" : "Aptitudes"}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillsArray.map((skill, i) => (
                        <span
                          key={i}
                          className={`${martianMono.className} px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg text-xs hover:bg-blue-500/20 hover:border-blue-500/40 hover:scale-105 transition-all duration-200 cursor-default`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceItem;