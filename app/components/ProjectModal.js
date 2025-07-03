import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Nixie_One, Martian_Mono } from 'next/font/google';

const nixieOne = Nixie_One({
  weight: "400",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  weight: "400",
  subsets: ["latin"],
});

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

const ProjectModal = ({ project, isOpen, onClose, language }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const modalRef = useRef(null);
  
  // Reset to overview when project changes
  useEffect(() => {
    if (project && (project.name === "Curriculum Website" || project.name === "Página Web Curriculum") && activeTab === 'media') {
      setActiveTab('overview');
    }
  }, [project, activeTab]);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen || !project) return null;
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Fondo semi-transparente con blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      
      <div
        ref={modalRef}
        className="relative max-w-4xl w-full max-h-[90vh] bg-[#0f1623]/95 backdrop-blur-md rounded-2xl overflow-hidden border border-blue-500/30 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={project.image}
            alt={project.name}
            layout="fill"
            objectFit="cover"
            className="filter brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1623]/95 to-transparent"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg>
          </button>
          
          <div className="absolute bottom-6 left-6">
            <h2 className={`${nixieOne.className} text-3xl text-white mb-2`}>{project.name}</h2>
            <div className={`flex items-center gap-2 ${martianMono.className} text-sm`}>
              <div className={`w-2 h-2 rounded-full ${
                project.status === 'In Production' || project.status === 'En Producción' ?  'bg-blue-400': 
                project.status === 'Completed' || project.status === 'Completado' ? 'bg-green-400' :
                'bg-yellow-400'
              }`}></div>
              <span className="text-gray-300">{project.status}</span>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-800/50 bg-black/20">
          <button
            className={`px-6 py-3 ${martianMono.className} text-sm transition-colors duration-200 ${
              activeTab === 'overview'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-6 py-3 ${martianMono.className} text-sm transition-colors duration-200 ${
              activeTab === 'tech'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('tech')}
          >
            {texts[language].techStack}
          </button>
          {(project.name !== "Curriculum Website" && project.name !== "Página Web Curriculum") && (
            <button
              className={`px-6 py-3 ${martianMono.className} text-sm transition-colors duration-200 ${
                activeTab === 'media'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('media')}
            >
              Media
            </button>
          )}
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[400px] bg-black/10">
          {activeTab === 'overview' && (
            <div>
              <p className={`${martianMono.className} text-gray-300 mb-6`}>
                {project.longDescription}
              </p>
              
              <h3 className={`${nixieOne.className} text-xl text-white mb-4`}>
                {texts[language].keyFeatures}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className={`${martianMono.className} text-sm text-gray-300`}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'tech' && (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.tech.map((tech, index) => (
                  <div
                    key={index}
                    className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-center hover:bg-blue-500/20 transition-colors duration-200"
                  >
                    <span className={`${martianMono.className} text-blue-400`}>{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'media' && (
            <div className="space-y-6">
              {/* Videos Section */}
              {project.videos && project.videos.length > 0 && (
                <div>
                  {/* PC View Section */}
                  {project.videos.filter(v => v.title.includes("PC")).length > 0 && (
                    <div className="mb-8">
                      <h4 className={`${nixieOne.className} text-lg text-white mb-4`}>
                        {language === 'ES' ? 'Vista PC' : 'PC View'}
                      </h4>
                      <div className="grid grid-cols-1 gap-4">
                        {project.videos
                          .filter(video => video.title.includes("PC"))
                          .map((video, index) => (
                            <div key={index} className="rounded-lg overflow-hidden bg-black/20 p-2">
                              <div className="aspect-video bg-black/30 rounded-lg overflow-hidden">
                                <video 
                                  controls 
                                  className="w-full h-full"
                                  poster={video.thumbnail}
                                >
                                  <source src={video.url} type="video/mp4" />
                                </video>
                              </div>
                              <p className={`${martianMono.className} text-sm text-gray-400 mt-2 text-center`}>
                                {video.title}
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Mobile View Section */}
                  {project.videos.filter(v => v.title.includes("Móvil") || v.title.includes("Mobile")).length > 0 && (
                    <div className="mb-8">
                      <h4 className={`${nixieOne.className} text-lg text-white mb-4`}>
                        {language === 'ES' ? 'Vista Móvil' : 'Mobile View'}
                      </h4>
                      <div className="grid grid-cols-1 gap-4">
                        {project.videos
                          .filter(video => video.title.includes("Móvil") || video.title.includes("Mobile"))
                          .map((video, index) => (
                            <div key={index} className="rounded-lg overflow-hidden bg-black/20 p-2">
                              <div className="aspect-video bg-black/30 rounded-lg overflow-hidden">
                                <video 
                                  controls 
                                  className="w-full h-full"
                                  poster={video.thumbnail}
                                >
                                  <source src={video.url} type="video/mp4" />
                                </video>
                              </div>
                              <p className={`${martianMono.className} text-sm text-gray-400 mt-2 text-center`}>
                                {video.title}
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Content Sections */}
                  {project.videos.filter(v => !v.title.includes("PC") && !v.title.includes("Móvil") && !v.title.includes("Mobile")).length > 0 && (
                    <div>
                      <h4 className={`${nixieOne.className} text-lg text-white mb-4`}>
                        {language === 'ES' ? 'Secciones de Contenido' : 'Content Sections'}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {project.videos
                          .filter(video => !video.title.includes("PC") && !video.title.includes("Móvil") && !video.title.includes("Mobile"))
                          .map((video, index) => (
                            <div key={index} className="rounded-lg overflow-hidden bg-black/20 p-2">
                              <div className="aspect-video bg-black/30 rounded-lg overflow-hidden">
                                <video 
                                  controls 
                                  className="w-full h-full"
                                  poster={video.thumbnail}
                                >
                                  <source src={video.url} type="video/mp4" />
                                </video>
                              </div>
                              <p className={`${martianMono.className} text-sm text-gray-400 mt-2 text-center`}>
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
                  <h4 className={`${nixieOne.className} text-lg text-white mb-4`}>
                    {texts[language].screenshots}
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {project.screenshots.map((screenshot, index) => (
                      <div key={index} className="aspect-video bg-black/30 rounded-lg overflow-hidden">
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
                <p className={`${martianMono.className} text-gray-400 text-center py-8`}>
                  {texts[language].mediaContent}
                </p>
              )}
            </div>
          )}
        </div>
        
        {/* Actions */}
        <div className="p-6 border-t border-gray-800/50 flex gap-4 bg-black/20">
          {project.liveUrl && (
            <button 
              className={`flex-1 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 ${martianMono.className}`}
              onClick={() => window.open(project.liveUrl, '_blank')}
            >
              {texts[language].viewProject}
            </button>
          )}
          {project.githubUrl && (
            <button 
              className={`flex-1 py-3 bg-transparent border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500/10 transition-colors duration-200 ${martianMono.className}`}
              onClick={() => window.open(project.githubUrl, '_blank')}
            >
              {texts[language].viewCode}
            </button>
          )}
          {!project.liveUrl && !project.githubUrl && (
            <div className={`${martianMono.className} text-gray-400 text-center w-full py-3`}>
              {language === 'ES' ? 'Proyecto privado' : 'Private project'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;