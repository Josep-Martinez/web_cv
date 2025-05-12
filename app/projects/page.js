"use client";
import { Nixie_One, Martian_Mono } from "next/font/google";
import { useLanguage } from "../../app/LanguageContext";
import React, { useState, useEffect } from "react";
import ProjectCard from "./../components/ProjectCard";
import ProjectModal from "./../components/ProjectModal";
import AnimatedWord from "./../components/AnimatedWord";
import { projectsData } from "./../data/projectsData";

const nixieOne = Nixie_One({
  weight: "400",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  weight: "400",
  subsets: ["latin"],
});

// Traducciones para la página principal
const texts = {
  EN: {
    title: "Projects",
    description: (
      <>
        In this section, you will find a representative selection of{" "}
        <AnimatedWord word="individual projects" />{" "}
        that illustrate my professional experience and my ability to tackle challenges in a structured and creative way. 
        Each project is the result of personal effort and has been developed with a focus on{" "}
        <AnimatedWord word="quality" />{" "}and{" "}
        <AnimatedWord word="innovation" />.
      </>
    ),
  },
  ES: {
    title: "Proyectos",
    description: (
      <>
        En esta sección encontrará una selección representativa de{" "}
        <AnimatedWord word="proyectos individuales" />{" "}
        que ilustran mi experiencia profesional y mi capacidad para abordar desafíos de forma estructurada y creativa. 
        Cada proyecto es fruto de un esfuerzo personal y ha sido desarrollado con un enfoque en la{" "}
        <AnimatedWord word="calidad" />{" "}y la{" "}
        <AnimatedWord word="innovación" />.
      </>
    ),
  },
};

export default function ProjectsPage() {
  const { language } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [globalInterval, setGlobalInterval] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    
    if (isMounted) {
      setGlobalInterval(80);
      setTimeout(() => {
        setAnimationStarted(true);
      }, 100);
    }
  }, [isMounted]);

  const renderDescriptionWithAnimatedWords = (descItem) => {
    if (!isMounted) return null;
    
    return React.cloneElement(descItem, {
      children: React.Children.map(descItem.props.children, child => {
        if (React.isValidElement(child) && child.type === AnimatedWord) {
          return React.cloneElement(child, {
            animationStarted: animationStarted,
            globalInterval: globalInterval
          });
        }
        return child;
      })
    });
  };
  
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#101827] text-white p-6 md:p-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className={`${nixieOne.className} text-4xl md:text-7xl font-bold tracking-wider mb-10`}>
              {texts[language].title}
            </h1>
            <div className={`${martianMono.className} text-sm md:text-base text-gray-300 h-20`}></div>
          </div>
          
          <div className="mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((placeholder) => (
                <div key={placeholder} className="aspect-video bg-[#1a2537] rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#101827] text-white p-6 md:p-20">
      <div className="max-w-6xl mx-auto">
        {/* Sección de título y descripción */}
        <div className="mb-10 text-center">
          <h1 className={`${nixieOne.className} text-4xl md:text-7xl font-bold tracking-wider mb-10`}>
            {texts[language].title}
          </h1>
          <div className={`${martianMono.className} text-sm md:text-base text-gray-300`}>
            {renderDescriptionWithAnimatedWords(texts[language].description)}
          </div>
        </div>

        {/* Sección de proyectos */}
        <div className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {projectsData[language].map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={handleProjectClick}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={modalOpen}
        onClose={handleCloseModal}
        language={language}
      />
    </div>
  );
}