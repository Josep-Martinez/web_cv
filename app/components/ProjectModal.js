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
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Fondo semi-transparente con blur */}
      <div className="absolute inset-0 bg-navy-900/40 backdrop-blur-sm"></div>

      {/* KEY IMPORTANTE: Usar contentKey, project.id y language para forzar re-render */}
      <div
        key={`${contentKey}-${project.id}-${language}`}
        ref={modalRef}
        className="relative max-w-4xl w-full max-h-[90vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-navy-900/30 backdrop-blur-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative h-64 overflow-hidden flex-shrink-0">
          <Image
            src={project.image}
            alt={project.name}
            layout="fill"
            objectFit="cover"
            className="filter brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 to-transparent"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 hover:text-electric transition-colors duration-200 z-10"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg>
          </button>

          <div className="absolute bottom-6 left-6">
            <h2 className="font-heading text-3xl text-gray-100 mb-2 font-bold">
              {project.name}
            </h2>
            <div
              className="flex items-center gap-2 font-mono text-sm"
            >
              <div className={statusDotClasses}></div>
              <span className="text-slate-light">{project.status}</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-dark/50 bg-navy-800/50 flex-shrink-0">
          <button
            className={`px-6 py-3 font-mono text-sm transition-colors duration-200 ${activeTab === "overview"
              ? "text-electric border-b-2 border-electric"
              : "text-slate-light hover:text-white"
              }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`px-6 py-3 font-mono text-sm transition-colors duration-200 ${activeTab === "tech"
              ? "text-electric border-b-2 border-electric"
              : "text-slate-light hover:text-white"
              }`}
            onClick={() => setActiveTab("tech")}
          >
            {texts[language].techStack}
          </button>
          {project.name !== "Curriculum Website" &&
            project.name !== "Página Web Curriculum" && (
              <button
                className={`px-6 py-3 font-mono text-sm transition-colors duration-200 ${activeTab === "media"
                  ? "text-electric border-b-2 border-electric"
                  : "text-slate-light hover:text-white"
                  }`}
                onClick={() => setActiveTab("media")}
              >
                Media
              </button>
            )}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto bg-navy-900/50 flex-grow">
          {activeTab === "overview" && (
            <div key={`overview-${contentKey}-${language}`}>
              <p className="font-sans text-slate-light mb-6 leading-relaxed">
                {project.longDescription}
              </p>

              <h3 className="font-heading text-xl text-gray-100 mb-4 font-bold">
                {texts[language].keyFeatures}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature, index) => (
                  <div
                    key={`feature-${index}-${contentKey}-${language}`}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-electric rounded-full"></div>
                    <span
                      className="font-sans text-sm text-slate-light"
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "tech" && (
            <div key={`tech-${contentKey}-${language}`}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.tech.map((tech, index) => (
                  <div
                    key={`tech-${index}-${contentKey}-${language}`}
                    className="bg-electric/5 border border-electric/20 rounded-lg p-4 text-center hover:bg-electric/10 transition-colors duration-200"
                  >
                    <span className="font-mono text-electric text-sm">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "media" && (
            <div key={`media-${contentKey}-${language}`} className="space-y-6">
              {/* Videos Section */}
              {project.videos && project.videos.length > 0 && (
                <div>
                  {/* PC View Section */}
                  {project.videos.filter((v) => v.title.includes("PC")).length >
                    0 && (
                      <div className="mb-8">
                        <h4
                          className="font-heading text-lg text-gray-100 mb-4 font-bold"
                        >
                          {language === "ES" ? "Vista PC" : "PC View"}
                        </h4>
                        <div className="grid grid-cols-1 gap-4">
                          {project.videos
                            .filter((video) => video.title.includes("PC"))
                            .map((video, index) => (
                              <div
                                key={`pc-video-${index}-${contentKey}-${language}`}
                                className="rounded-lg overflow-hidden bg-navy-800 p-2 border border-slate-dark/50"
                              >
                                <div className="aspect-video bg-black/30 rounded-lg overflow-hidden">
                                  <video
                                    controls
                                    className="w-full h-full"
                                    poster={video.thumbnail}
                                  >
                                    <source src={video.url} type="video/mp4" />
                                  </video>
                                </div>
                                <p
                                  className="font-mono text-sm text-slate-light mt-2 text-center"
                                >
                                  {video.title}
                                </p>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                  {/* Mobile View Section */}
                  {project.videos.filter(
                    (v) =>
                      v.title.includes("Móvil") || v.title.includes("Mobile")
                  ).length > 0 && (
                      <div className="mb-8">
                        <h4
                          className="font-heading text-lg text-gray-100 mb-4 font-bold"
                        >
                          {language === "ES" ? "Vista Móvil" : "Mobile View"}
                        </h4>
                        <div className="grid grid-cols-1 gap-4">
                          {project.videos
                            .filter(
                              (video) =>
                                video.title.includes("Móvil") ||
                                video.title.includes("Mobile")
                            )
                            .map((video, index) => (
                              <div
                                key={`mobile-video-${index}-${contentKey}-${language}`}
                                className="rounded-lg overflow-hidden bg-navy-800 p-2 border border-slate-dark/50"
                              >
                                <div className="aspect-video bg-black/30 rounded-lg overflow-hidden">
                                  <video
                                    controls
                                    className="w-full h-full"
                                    poster={video.thumbnail}
                                  >
                                    <source src={video.url} type="video/mp4" />
                                  </video>
                                </div>
                                <p
                                  className="font-mono text-sm text-slate-light mt-2 text-center"
                                >
                                  {video.title}
                                </p>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                  {/* Content Sections */}
                  {project.videos.filter(
                    (v) =>
                      !v.title.includes("PC") &&
                      !v.title.includes("Móvil") &&
                      !v.title.includes("Mobile")
                  ).length > 0 && (
                      <div>
                        <h4
                          className="font-heading text-lg text-gray-100 mb-4 font-bold"
                        >
                          {language === "ES"
                            ? "Secciones de Contenido"
                            : "Content Sections"}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                className="rounded-lg overflow-hidden bg-navy-800 p-2 border border-slate-dark/50"
                              >
                                <div className="aspect-video bg-black/30 rounded-lg overflow-hidden">
                                  <video
                                    controls
                                    className="w-full h-full"
                                    poster={video.thumbnail}
                                  >
                                    <source src={video.url} type="video/mp4" />
                                  </video>
                                </div>
                                <p
                                  className="font-mono text-sm text-slate-light mt-2 text-center"
                                >
                                  {video.title}
                                </p>
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
                  <h4
                    className="font-heading text-lg text-gray-100 mb-4 font-bold"
                  >
                    {texts[language].screenshots}
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {project.screenshots.map((screenshot, index) => (
                      <div
                        key={`screenshot-${index}-${contentKey}-${language}`}
                        className="aspect-video bg-black/30 rounded-lg overflow-hidden border border-slate-dark/30"
                      >
                        <Image
                          src={screenshot}
                          alt={`Screenshot ${index + 1}`}
                          width={400}
                          height={225}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Placeholder if no media */}
              {(!project.videos || project.videos.length === 0) &&
                (!project.screenshots || project.screenshots.length === 0) && (
                  <p
                    className="font-mono text-slate-light text-center py-8"
                  >
                    {texts[language].mediaContent}
                  </p>
                )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-slate-dark/50 flex gap-4 bg-navy-800/50 flex-shrink-0">
          {project.liveUrl && (
            <button
              className="flex-1 py-3 bg-electric text-navy-900 rounded-lg hover:bg-electric/90 transition-colors duration-200 font-mono font-bold"
              onClick={() => window.open(project.liveUrl, "_blank")}
            >
              {texts[language].viewProject}
            </button>
          )}
          {project.githubUrl && (
            <button
              className="flex-1 py-3 bg-transparent border border-electric text-electric rounded-lg hover:bg-electric/10 transition-colors duration-200 font-mono"
              onClick={() => window.open(project.githubUrl, "_blank")}
            >
              {texts[language].viewCode}
            </button>
          )}
          {!project.liveUrl && !project.githubUrl && (
            <div
              className="font-mono text-slate-light text-center w-full py-3"
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