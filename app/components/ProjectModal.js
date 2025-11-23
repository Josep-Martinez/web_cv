// ProjectModal.js - SOLUCIÓN DEFINITIVA CORREGIDA
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { useLanguage } from '../LanguageContext';
import { usePageTransition } from '../components/LanguageTransitionProvider';
import { projectsData } from '../data/projectsData';

const texts = {
  EN: {
    detailsTitle: "Project Details",
    techStack: "Tech Stack",
    keyFeatures: "Key Features",
    status: "Status",
    viewProject: "View Project",
    viewCode: "View Code",
    close: "Close",
    mediaContent: "Media content coming soon...",
    videos: "Videos",
    screenshots: "Screenshots",
    documentation: "Documentation"
  },
  ES: {
    detailsTitle: "Detalles del Proyecto",
    techStack: "Stack Tecnológico",
    keyFeatures: "Características Clave",
    status: "Estado",
    viewProject: "Ver Proyecto",
    viewCode: "Ver Código",
    close: "Cerrar",
    mediaContent: "Contenido multimedia próximamente...",
    videos: "Videos",
    screenshots: "Capturas",
    documentation: "Documentación"
  }
};

const ProjectModal = ({ project: baseProject, isOpen, onClose }) => {
  const { language } = useLanguage();
  const { contentKey } = usePageTransition();

  const [activeTab, setActiveTab] = useState("overview");
  const modalRef = useRef(null);

  // Proyecto en el idioma activo
  const project = useMemo(() => {
    if (!baseProject) return null;
    return (
      projectsData[language]?.find((p) => p.id === baseProject.id) ||
      baseProject
    );
  }, [baseProject, language]);

  // Reset to overview when project changes
  useEffect(() => {
    if (
      project &&
      (project.name === "Curriculum Website" ||
        project.name === "Página Web Curriculum") &&
      activeTab === "media"
    ) {
      setActiveTab("overview");
    }
  }, [project, activeTab]);

  // Reset to overview when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab("overview");
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const statusColorClass =
    project.status === "In Production" || project.status === "En Producción"
      ? "bg-electric"
      : project.status === "Completed" || project.status === "Completado"
        ? "bg-green-400"
        : project.status === "Live"
          ? "bg-electric"
          : "bg-yellow-400";

  const shouldPulse = statusColorClass === "bg-electric";
  const statusDotClasses = [
    "w-2",
    "h-2",
    "rounded-full",
    statusColorClass,
    shouldPulse ? "animate-pulse shadow-[0_0_8px_rgba(100,255,218,0.6)]" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-navy-900/80 backdrop-blur-md transition-opacity duration-300"></div>

      {/* Modal Container - Floating Header Style */}
      <div
        key={`${contentKey}-${project.id}-${language}`}
        ref={modalRef}
        className="relative w-full max-w-3xl h-auto max-h-[90vh] bg-navy-900/90 backdrop-blur-2xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/40 text-white/80 hover:bg-electric/20 hover:text-electric border border-white/10 transition-all duration-300 backdrop-blur-md"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18M6 6l12 12"></path>
          </svg>
        </button>

        {/* Header Image Area */}
        <div className="relative h-48 md:h-64 flex-shrink-0 w-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.name}
            layout="fill"
            objectFit="cover"
            className="filter brightness-[0.6]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/20 to-transparent"></div>

          <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
            <div className="flex items-center gap-3 mb-2">
              <div className={statusDotClasses}></div>
              <span className="font-mono text-xs text-electric tracking-wider uppercase bg-electric/10 px-2 py-0.5 rounded border border-electric/20 backdrop-blur-sm">
                {project.status}
              </span>
            </div>
            <h2 className="font-heading text-2xl md:text-4xl text-white font-bold leading-tight drop-shadow-lg">
              {project.name}
            </h2>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center gap-1 px-6 md:px-8 py-2 border-b border-white/5 bg-navy-900/50 flex-shrink-0 overflow-x-auto no-scrollbar">
          {[
            { id: "overview", label: "Overview" },
            { id: "tech", label: texts[language].techStack },
            ...(project.name !== "Curriculum Website" && project.name !== "Página Web Curriculum"
              ? [{ id: "media", label: "Media" }]
              : [])
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-mono transition-all duration-300 border-b-2 ${activeTab === tab.id
                ? "border-electric text-electric"
                : "border-transparent text-slate-400 hover:text-white"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar bg-navy-900/50">
          {activeTab === "overview" && (
            <div key={`overview-${contentKey}-${language}`} className="animate-fadeIn">
              <p className="font-sans text-slate-300 text-base md:text-lg leading-relaxed mb-8">
                {project.longDescription}
              </p>

              <h3 className="font-heading text-xl text-white mb-5 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-electric"></span>
                {texts[language].keyFeatures}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {project.features.map((feature, index) => (
                  <div
                    key={`feature-${index}-${contentKey}-${language}`}
                    className="flex items-start gap-3 group/feature"
                  >
                    <div className="mt-1.5 w-1.5 h-1.5 bg-electric rounded-full group-hover/feature:shadow-[0_0_8px_rgba(100,255,218,0.8)] transition-all duration-300"></div>
                    <span className="font-sans text-sm md:text-base text-slate-400 group-hover/feature:text-slate-200 transition-colors duration-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "tech" && (
            <div key={`tech-${contentKey}-${language}`} className="animate-fadeIn">
              <div className="flex flex-wrap gap-3">
                {project.tech.map((tech, index) => (
                  <div
                    key={`tech-${index}-${contentKey}-${language}`}
                    className="bg-white/5 border border-white/10 hover:border-electric/30 rounded-xl px-4 py-3 flex items-center justify-center text-center hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-default group/tech"
                  >
                    <span className="font-mono text-electric/80 group-hover/tech:text-electric text-sm">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "media" && (
            <div key={`media-${contentKey}-${language}`} className="space-y-8 animate-fadeIn">
              {/* Videos Section */}
              {project.videos && project.videos.length > 0 && (
                <div className="space-y-8">
                  {/* PC View Section */}
                  {project.videos.filter((v) => v.title.includes("PC")).length > 0 && (
                    <div>
                      <h4 className="font-heading text-sm text-slate-400 uppercase tracking-widest mb-4">
                        {language === "ES" ? "Vista PC" : "PC View"}
                      </h4>
                      <div className="grid grid-cols-1 gap-6">
                        {project.videos
                          .filter((video) => video.title.includes("PC"))
                          .map((video, index) => (
                            <div
                              key={`pc-video-${index}-${contentKey}-${language}`}
                              className="rounded-xl overflow-hidden bg-black/40 border border-white/5 shadow-lg group/video"
                            >
                              <div className="aspect-video bg-black/50 relative">
                                <video
                                  controls
                                  className="w-full h-full object-contain"
                                  poster={video.thumbnail}
                                >
                                  <source src={video.url} type="video/mp4" />
                                </video>
                              </div>
                              <div className="p-3 bg-white/5 border-t border-white/5">
                                <p className="font-mono text-xs text-slate-400 text-center">
                                  {video.title}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Mobile View Section */}
                  {project.videos.filter((v) => v.title.includes("Móvil") || v.title.includes("Mobile")).length > 0 && (
                    <div>
                      <h4 className="font-heading text-sm text-slate-400 uppercase tracking-widest mb-4">
                        {language === "ES" ? "Vista Móvil" : "Mobile View"}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {project.videos
                          .filter((video) => video.title.includes("Móvil") || video.title.includes("Mobile"))
                          .map((video, index) => (
                            <div
                              key={`mobile-video-${index}-${contentKey}-${language}`}
                              className="rounded-xl overflow-hidden bg-black/40 border border-white/5 shadow-lg"
                            >
                              <div className="aspect-[9/16] bg-black/50 relative">
                                <video
                                  controls
                                  className="w-full h-full object-contain"
                                  poster={video.thumbnail}
                                >
                                  <source src={video.url} type="video/mp4" />
                                </video>
                              </div>
                              <div className="p-3 bg-white/5 border-t border-white/5">
                                <p className="font-mono text-xs text-slate-400 text-center">
                                  {video.title}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Other Videos */}
                  {project.videos.filter(
                    (v) =>
                      !v.title.includes("PC") &&
                      !v.title.includes("Móvil") &&
                      !v.title.includes("Mobile")
                  ).length > 0 && (
                      <div>
                        <h4 className="font-heading text-sm text-slate-400 uppercase tracking-widest mb-4">
                          {language === "ES" ? "Otros" : "Others"}
                        </h4>
                        <div className="grid grid-cols-1 gap-4">
                          {project.videos
                            .filter(
                              (video) =>
                                !video.title.includes("PC") &&
                                !video.title.includes("Móvil") &&
                                !video.title.includes("Mobile")
                            )
                            .map((video, index) => (
                              <div
                                key={`content-video-${index}-${contentKey}-${language}`}
                                className="rounded-xl overflow-hidden bg-black/40 border border-white/5 shadow-lg"
                              >
                                <div className="aspect-video bg-black/50 relative">
                                  <video
                                    controls
                                    className="w-full h-full object-contain"
                                    poster={video.thumbnail}
                                  >
                                    <source src={video.url} type="video/mp4" />
                                  </video>
                                </div>
                                <div className="p-3 bg-white/5 border-t border-white/5">
                                  <p className="font-mono text-xs text-slate-400 text-center">
                                    {video.title}
                                  </p>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                </div>
              )}

              {/* Screenshots Section */}
              {project.screenshots && project.screenshots.length > 0 && (
                <div>
                  <h4 className="font-heading text-sm text-slate-400 uppercase tracking-widest mb-4">
                    {texts[language].screenshots}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.screenshots.map((screenshot, index) => (
                      <div
                        key={`screenshot-${index}-${contentKey}-${language}`}
                        className="aspect-video bg-black/40 rounded-xl overflow-hidden border border-white/10 hover:border-electric/30 transition-all duration-300 group/screen"
                      >
                        <Image
                          src={screenshot}
                          alt={`Screenshot ${index + 1}`}
                          width={400}
                          height={225}
                          className="w-full h-full object-cover group-hover/screen:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Placeholder if no media */}
              {(!project.videos || project.videos.length === 0) &&
                (!project.screenshots || project.screenshots.length === 0) && (
                  <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                    <svg className="w-12 h-12 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <p className="font-mono text-sm">
                      {texts[language].mediaContent}
                    </p>
                  </div>
                )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-white/5 bg-navy-900/40 backdrop-blur-sm flex gap-4 flex-shrink-0">
          {project.liveUrl && (
            <button
              className="flex-1 py-3.5 bg-electric text-navy-900 rounded-xl hover:bg-electric/90 hover:shadow-[0_0_20px_rgba(100,255,218,0.4)] transition-all duration-300 font-mono font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 group/btn"
              onClick={() => window.open(project.liveUrl, "_blank")}
            >
              <span>{texts[language].viewProject}</span>
              <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </button>
          )}
          {project.githubUrl && (
            <button
              className="flex-1 py-3.5 bg-transparent border border-electric/30 text-electric rounded-xl hover:bg-electric/10 hover:border-electric/60 transition-all duration-300 font-mono font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2"
              onClick={() => window.open(project.githubUrl, "_blank")}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path></svg>
              <span>{texts[language].viewCode}</span>
            </button>
          )}
          {!project.liveUrl && !project.githubUrl && (
            <div
              className="font-mono text-slate-500 text-center w-full py-3.5 bg-white/5 rounded-xl border border-white/5"
            >
              {language === "ES" ? "Proyecto privado" : "Private project"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;