"use client";
import { Nixie_One, Martian_Mono } from "next/font/google";
import { useLanguage } from "../../app/LanguageContext";
import { useState, useEffect } from "react";
import AnimatedWord from "../components/AnimatedWord";
import ExperienceItem from "../components/ExperienceItem";
import SkillsTerminal from "../components/SkillsTerminal";
import CertificatesCarousel from "../components/CertificatesCarousel";
import React from "react";

const nixieOne = Nixie_One({
  weight: "400",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  weight: "400",
  subsets: ["latin"],
});

// Traducciones
const texts = {
  EN: {
    title: "Career Path",
    description: (animationStarted, globalInterval) => (
      <>
        This section presents a comprehensive view of my{" "}
        <AnimatedWord word="professional journey" animationStarted={animationStarted} globalInterval={globalInterval} />, a path marked by constant evolution and overcoming challenges in various contexts. 
        Throughout my career, I have cultivated{" "}
        <AnimatedWord word="technical skills" animationStarted={animationStarted} globalInterval={globalInterval} /> and strategic thinking that allow me to{" "}
        <AnimatedWord word="adapt" animationStarted={animationStarted} globalInterval={globalInterval} /> and generate innovative solutions.
      </>
    ),
    experiences: [
      {
        title: "Data Engineer Intern",
        company: "Infoverity",
        period: "October 2024 - Present",
        location: "Valencia, Valencian Community, Spain",
        description: "Internship as a Data Engineer, working with MDM technologies and cloud tools.",
        skills: "Informatica MDM, Dell Boomi, Cloud Applications, Master Data Management",
        logo: "/infoverity_logo.jpeg",
      },
      {
        title: "Developer",
        company: "Lãberit",
        period: "February 2022 - July 2022",
        location: "Valencia, Valencian Community, Spain",
        description: "Development in Microsoft Dynamics ERP and Power Platform, focused on research and business solutions.",
        skills: "Programming, Microsoft Dynamics ERP, Microsoft Power Automate, PowerApps, Dynamics NAV, R&D",
        logo: "/laberit_logo.jpeg",
      },
      {
        title: "Driver",
        company: "SACYR",
        period: "July 2023 - September 2023 & August 2022 - September 2022",
        location: "L'Alcúdia, Valencian Community, Spain",
        description: "Driver for elderly people at the L'Alcúdia Day Center, developing skills in management and elderly care.",
        skills: "People Management, Social Skills, Elderly Care, Positive Attitude",
        logo: "/sacyr_logo.jpeg",
      },
      {
        title: "Web Designer",
        company: "Centro SomRiure",
        period: "July 2021 - August 2021",
        location: "L'Alcúdia, Valencian Community, Spain",
        description: "Design and development of the corporate website using WordPress and modern web technologies.",
        skills: "WordPress, HTML, CSS, Adobe Photoshop, Web Design, Programming",
        logo: "/somriure.png",
      },
      {
        title: "Football Referee",
        company: "FFCV - Federació Futbol Comunitat Valenciana",
        period: "September 2020 - July 2024",
        location: "Alberic, Valencian Community, Spain",
        description: "Refereeing football matches, developing leadership, communication, and conflict management skills.",
        skills: "Public Speaking, Conflict Resolution, Adaptability, Positive Attitude",
        logo: "/ffcv_logo.jpeg",
      },
    ],
    skills: "Skills",
    certificates: "Certificates",
  },
  ES: {
    title: "Trayectoria",
    description: (animationStarted, globalInterval) => (
      <>
        Esta sección presenta una visión integral de mi{" "}
        <AnimatedWord word="trayectoria profesional" animationStarted={animationStarted} globalInterval={globalInterval} />, un recorrido marcado por la evolución constante y la superación de desafíos en diversos contextos. 
        A lo largo de mi carrera, he cultivado{" "}
        <AnimatedWord word="habilidades" animationStarted={animationStarted} globalInterval={globalInterval} /> técnicas y estratégicas que me permiten{" "}
        <AnimatedWord word="adaptarme" animationStarted={animationStarted} globalInterval={globalInterval} /> y generar soluciones innovadoras.
      </>
    ),
    experiences: [
      {
        title: "Data Engineer Intern",
        company: "Infoverity",
        period: "Octubre 2024 - Actualidad",
        location: "Valencia, Comunidad Valenciana, España",
        description: "Prácticas como Data Engineer, trabajando con tecnologías MDM y herramientas cloud.",
        skills: "Informática MDM, Dell Boomi, Aplicaciones en la nube, Gestión de datos maestros",
        logo: "/public/infoverity/infoverity_logo.jpeg",
      },
      {
        title: "Developer",
        company: "Lãberit",
        period: "Febrero 2022 - Julio 2022",
        location: "Valencia, Comunidad Valenciana, España",
        description: "Desarrollo en Microsoft Dynamics ERP y Power Platform, con enfoque en investigación y desarrollo de soluciones empresariales.",
        skills: "Programación, Microsoft Dynamics ERP, Microsoft Power Automate, PowerApps, Dynamics NAV, I+D",
        logo: "/laberit/laberit_logo.jpeg",
      },
      {
        title: "Conductor",
        company: "SACYR",
        period: "Julio 2023 - Septiembre 2023 & Agosto 2022 - Septiembre 2022",
        location: "L'Alcúdia, Comunidad Valenciana, España",
        description: "Conductor de personas mayores en el Centro de Dia de L'Alcúdia, desarrollando habilidades en gestión y atención de personas mayores.",
        skills: "Gestión de personas, Habilidades sociales, Personas mayores, Actitud positiva",
        logo: "/sacyr/sacyr_logo.jpeg",
      },
      {
        title: "Diseñador de páginas web",
        company: "Centro SomRiure",
        period: "Julio 2021 - Agosto 2021",
        location: "L'Alcúdia, Comunidad Valenciana, España",
        description: "Diseño y desarrollo de la página web corporativa utilizando WordPress y tecnologías web modernas.",
        skills: "WordPress, HTML, CSS, Adobe Photoshop, Diseño web, Programación",
        logo: "/somriure/somriure.png",
      },
      {
        title: "Árbitro de fútbol",
        company: "FFCV - Federació Futbol Comunitat Valenciana",
        period: "Septiembre 2020 - Julio 2024",
        location: "Alberic, Comunidad Valenciana, España",
        description: "Arbitraje de partidos de fútbol, desarrollando habilidades de liderazgo, comunicación y gestión de conflictos.",
        skills: "Hablar en público, Resolución de conflictos, Facilidad de adaptación, Actitud positiva",
        logo: "/ffcv/ffcv_logo.jpeg",
      },
    ],
    skills: "Habilidades",
    certificates: "Certificados",
  },
};

export default function ExperiencePage() {
  const { language } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [globalInterval, setGlobalInterval] = useState(null);
  
  useEffect(() => {
    setIsMounted(true);
    
    if (isMounted) {
      setGlobalInterval(80);
      
      setTimeout(() => {
        setAnimationStarted(true);
      }, 100);
    }
  }, [isMounted]);

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
          
          <div className="mb-20">
            <div className="relative">
              <div className="h-40 bg-[#1a2537] rounded animate-pulse mb-4"></div>
              <div className="h-40 bg-[#1a2537] rounded animate-pulse mb-4"></div>
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
          <p className={`${martianMono.className} text-sm md:text-base text-gray-300`}>
            {texts[language].description(animationStarted, globalInterval)}
          </p>
        </div>

        {/* Sección de experiencia profesional */}
        <div className="relative mb-20">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-700 hidden md:block"></div>

          {texts[language].experiences.map((exp, index) => (
            <ExperienceItem 
              key={index}
              experience={exp}
              index={index}
              language={language}
            />
          ))}
        </div>

        {/* Sección de Skills */}
        <div className="mb-16">
          <h2 className={`${nixieOne.className} text-3xl md:text-5xl font-bold tracking-wider mb-6 text-center`}>
            {texts[language].skills}
          </h2>
          <SkillsTerminal language={language} />
        </div>

        {/* Sección de Certificados */}
        <div className="mb-16">
          <h2 className={`${nixieOne.className} text-3xl md:text-5xl font-bold tracking-wider mb-6 text-center`}>
            {texts[language].certificates}
          </h2>
          <CertificatesCarousel language={language} />
        </div>
      </div>
    </div>
  );
}