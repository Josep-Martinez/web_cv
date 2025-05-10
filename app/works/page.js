"use client";
import { Nixie_One, Martian_Mono } from "next/font/google";
import Image from "next/image";
import { useLanguage } from "../../app/LanguageContext";
import { useState, useEffect, useRef } from "react";
import { Terminal, Code, Braces, Database, Layout, Globe, Users, Brain, Server } from 'lucide-react';

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
    description: (
      <>
        This section presents a comprehensive view of my{" "}
        <span className="line-through text-blue-500">professional journey</span>, a path marked by constant evolution and overcoming challenges in various contexts. 
        Throughout my career, I have cultivated{" "}
        <span className="line-through text-blue-500">technical skills</span> and strategic thinking that allow me to{" "}
        <span className="line-through text-blue-500">adapt</span> and generate innovative solutions.
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
    close: "Close",
    issued: "Issued",
    skills_label: "Skills",
  },
  ES: {
    title: "Trayectoria",
    description: (
      <>
        Esta sección presenta una visión integral de mi{" "}
        <span className="line-through text-blue-500">trayectoria profesional</span>, un recorrido marcado por la evolución constante y la superación de desafíos en diversos contextos. 
        A lo largo de mi carrera, he cultivado{" "}
        <span className="line-through text-blue-500">habilidades</span> técnicas y estratégicas que me permiten{" "}
        <span className="line-through text-blue-500">adaptarme</span> y generar soluciones innovadoras.
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
        logo: "/infoverity_logo.jpeg",
      },
      {
        title: "Developer",
        company: "Lãberit",
        period: "Febrero 2022 - Julio 2022",
        location: "Valencia, Comunidad Valenciana, España",
        description: "Desarrollo en Microsoft Dynamics ERP y Power Platform, con enfoque en investigación y desarrollo de soluciones empresariales.",
        skills: "Programación, Microsoft Dynamics ERP, Microsoft Power Automate, PowerApps, Dynamics NAV, I+D",
        logo: "/laberit_logo.jpeg",
      },
      {
        title: "Conductor",
        company: "SACYR",
        period: "Julio 2023 - Septiembre 2023 & Agosto 2022 - Septiembre 2022",
        location: "L'Alcúdia, Comunidad Valenciana, España",
        description: "Conductor de personas mayores en el Centro de Dia de L'Alcúdia, desarrollando habilidades en gestión y atención de personas mayores.",
        skills: "Gestión de personas, Habilidades sociales, Personas mayores, Actitud positiva",
        logo: "/sacyr_logo.jpeg",
      },
      {
        title: "Diseñador de páginas web",
        company: "Centro SomRiure",
        period: "Julio 2021 - Agosto 2021",
        location: "L'Alcúdia, Comunidad Valenciana, España",
        description: "Diseño y desarrollo de la página web corporativa utilizando WordPress y tecnologías web modernas.",
        skills: "WordPress, HTML, CSS, Adobe Photoshop, Diseño web, Programación",
        logo: "/somriure.png",
      },
      {
        title: "Árbitro de fútbol",
        company: "FFCV - Federació Futbol Comunitat Valenciana",
        period: "Septiembre 2020 - Julio 2024",
        location: "Alberic, Comunidad Valenciana, España",
        description: "Arbitraje de partidos de fútbol, desarrollando habilidades de liderazgo, comunicación y gestión de conflictos.",
        skills: "Hablar en público, Resolución de conflictos, Facilidad de adaptación, Actitud positiva",
        logo: "/ffcv_logo.jpeg",
      },
    ],
    skills: "Habilidades",
    certificates: "Certificados",
    close: "Cerrar",
    issued: "Expedición",
    skills_label: "Aptitudes",
  },
};

// Lista de certificados con sus imágenes exactas y datos detallados
const certificateImages = [
  // Certificados Boomi
  { 
    id: 1, 
    name: "Professional Integration Developer", 
    image: "/certificates/Professional Integration Developer.png", 
    type: "boomi",
    issued: "December 2024",
    skills: ["Enterprise Integration", "Process Automation"]
  },
  { 
    id: 2, 
    name: "Professional API Management", 
    image: "/certificates/Professional API Management.png", 
    type: "boomi",
    issued: "February 2025",
    skills: ["API Gateway", "API Security"]
  },
  { 
    id: 3, 
    name: "Professional API Design", 
    image: "/certificates/Professional API Design.png", 
    type: "boomi",
    issued: "December 2024",
    skills: ["REST APIs", "OpenAPI"]
  },
  { 
    id: 4, 
    name: "Development & Application Architecture", 
    image: "/certificates/Development & Application Architecture Badge Acquired.png", 
    type: "boomi",
    issued: "January 2024",
    skills: ["Solution Architecture", "Enterprise Design"]
  },
  { 
    id: 5, 
    name: "Associate Runtime Architect", 
    image: "/certificates/Associate Runtime Architect.png", 
    type: "boomi",
    issued: "February 2025",
    skills: ["Architecture Design", "Performance Optimization"]
  },
  { 
    id: 6, 
    name: "Associate Integration Developer", 
    image: "/certificates/Associate Integration Developer.png", 
    type: "boomi",
    issued: "December 2024",
    skills: ["Integration Patterns", "Data Mapping"]
  },
  { 
    id: 7, 
    name: "Associate Flow Essentials", 
    image: "/certificates/Associate Flow Essentials.png", 
    type: "boomi",
    issued: "February 2025",
    skills: ["Process Flows", "Workflow Design"]
  },
  { 
    id: 8, 
    name: "Associate Event Streams", 
    image: "/certificates/Associate Event Streams.png", 
    type: "boomi",
    issued: "January 2025",
    skills: ["Event-Driven Architecture", "Real-time Processing"]
  },
  { 
    id: 9, 
    name: "Associate DataHub", 
    image: "/certificates/Associate DataHub.png", 
    type: "boomi",
    issued: "February 2025",
    skills: ["Data Management", "Master Data"]
  },
  // Certificados Informatica
  { 
    id: 10, 
    name: "Implementation Advanced Topic: CAI Query and Tag Objects in CAI", 
    image: "/certificates/informatica_logo.png", 
    type: "informatica",
    issued: "November 2024",
    skills: ["Cloud Application Integration", "Object Tagging"]
  },
  { 
    id: 11, 
    name: "MDM C360 SaaS Implementation Intermediate Series", 
    image: "/certificates/informatica_logo.png", 
    type: "informatica",
    issued: "November 2024",
    skills: ["Master Data Management", "SaaS Implementation"]
  },
  { 
    id: 12, 
    name: "MDM Implementation Beginner Series", 
    image: "/certificates/informatica_logo.png", 
    type: "informatica",
    issued: "November 2024",
    skills: ["Data Governance", "Data Quality"]
  },
  { 
    id: 13, 
    name: "Synergy of IDMC Services - CDI vs CAI Course", 
    image: "/certificates/informatica_logo.png", 
    type: "informatica",
    issued: "November 2024",
    skills: ["IDMC Services", "Data Integration"]
  },
  { 
    id: 14, 
    name: "Cloud Application Integration (CAI) Training Path", 
    image: "/certificates/informatica_logo.png", 
    type: "informatica",
    issued: "October 2024",
    skills: ["iPaaS", "Application Connectivity"]
  },
  { 
    id: 15, 
    name: "Cloud Application Integration Services for Developers R42", 
    image: "/certificates/informatica_logo.png", 
    type: "informatica",
    issued: "2024",
    skills: ["Developer Tools", "API Integration"]
  },
];

// SkillsTerminal Component
const SkillsTerminal = () => {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const typingRef = useRef(null);
  const cursorRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Usar useEffect para evitar problemas de hidratación
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Skill categories with appropriate icons
  const categories = {
    frontend: { 
      icon: <Layout size={20} />,
      label: { EN: 'Frontend', ES: 'Frontend' } 
    },
    backend: { 
      icon: <Server size={20} />,
      label: { EN: 'Backend', ES: 'Backend' } 
    },
    integration: { 
      icon: <Braces size={20} />,
      label: { EN: 'Integration', ES: 'Integración' } 
    },
    data: { 
      icon: <Database size={20} />,
      label: { EN: 'Data', ES: 'Datos' } 
    },
    tools: { 
      icon: <Code size={20} />,
      label: { EN: 'Tools', ES: 'Herramientas' } 
    },
    web: { 
      icon: <Globe size={20} />,
      label: { EN: 'Web', ES: 'Web' } 
    },
    soft: { 
      icon: <Users size={20} />,
      label: { EN: 'Soft Skills', ES: 'Habilidades Sociales' } 
    },
    microsoft: { 
      icon: <Brain size={20} />,
      label: { EN: 'Microsoft', ES: 'Microsoft' } 
    }
  };
  
  // Skills organized by category with the new skills added
  const skills = {
    frontend: {
      EN: [
        { name: 'React.js', level: 85 },
        { name: 'Next.js', level: 90 },
        { name: 'Tailwind CSS', level: 80 },
        { name: 'JavaScript', level: 85 },
        { name: 'HTML/CSS', level: 95 },
        { name: 'HTML5', level: 95 },     // Añadido desde Centro SomRiure
        { name: 'TypeScript', level: 82 }, // Añadido desde LipsTalk
        { name: 'Expo', level: 78 }        // Añadido desde LipsTalk
      ],
      ES: [
        { name: 'React.js', level: 85 },
        { name: 'Next.js', level: 90 },
        { name: 'Tailwind CSS', level: 80 },
        { name: 'JavaScript', level: 85 },
        { name: 'HTML/CSS', level: 95 },
        { name: 'HTML5', level: 95 },      // Añadido desde Centro SomRiure
        { name: 'TypeScript', level: 82 },  // Añadido desde LipsTalk
        { name: 'Expo', level: 78 }         // Añadido desde LipsTalk
      ]
    },
    backend: {
      EN: [
        { name: 'Java', level: 75 },
        { name: 'C++', level: 70 },
        { name: 'SQL', level: 80 },
        { name: 'Azure', level: 65 },
        { name: 'Python', level: 60 },     // Añadido desde UPV y LipsTalk (ajustado al 60%)
        { name: 'Node.js', level: 75 },    // Añadido desde LipsTalk
        { name: 'FastAPI', level: 72 },    // Añadido desde LipsTalk
        { name: 'JBoss Server', level: 65 } // Añadido desde Infoverity
      ],
      ES: [
        { name: 'Java', level: 75 },
        { name: 'C++', level: 70 },
        { name: 'SQL', level: 80 },
        { name: 'Azure', level: 65 },
        { name: 'Python', level: 60 },     // Añadido desde UPV y LipsTalk (ajustado al 60%)
        { name: 'Node.js', level: 75 },    // Añadido desde LipsTalk
        { name: 'FastAPI', level: 72 },    // Añadido desde LipsTalk
        { name: 'JBoss Server', level: 65 } // Añadido desde Infoverity
      ]
    },
    integration: {
      EN: [
        { name: 'Dell Boomi', level: 90 },
        { name: 'Informatica', level: 85 },
        { name: 'API Management', level: 80 },
        { name: 'Event Streams', level: 75 },
        { name: 'Data Integration', level: 80 } // Añadido desde Infoverity
      ],
      ES: [
        { name: 'Dell Boomi', level: 90 },
        { name: 'Informatica', level: 85 },
        { name: 'Gestión de APIs', level: 80 },
        { name: 'Event Streams', level: 75 },
        { name: 'Integración de Datos', level: 80 } // Añadido desde Infoverity
      ]
    },
    data: {
      EN: [
        { name: 'MDM', level: 85 },
        { name: 'Data Integration', level: 80 },
        { name: 'Power BI', level: 70 },
        { name: 'Data Mapping', level: 85 }
      ],
      ES: [
        { name: 'MDM', level: 85 },
        { name: 'Integración de Datos', level: 80 },
        { name: 'Power BI', level: 70 },
        { name: 'Mapeo de Datos', level: 85 }
      ]
    },
    tools: {
      EN: [
        { name: 'Git', level: 85 },
        { name: 'VS Code', level: 90 },
        { name: 'Adobe Photoshop', level: 70 },
        { name: 'Vercel', level: 85 }
      ],
      ES: [
        { name: 'Git', level: 85 },
        { name: 'VS Code', level: 90 },
        { name: 'Adobe Photoshop', level: 70 },
        { name: 'Vercel', level: 85 }
      ]
    },
    web: {
      EN: [
        { name: 'Web Design', level: 85 },
        { name: 'UX/UI', level: 80 },
        { name: 'WordPress', level: 75 },
        { name: 'Domain Management', level: 90 }
      ],
      ES: [
        { name: 'Diseño Web', level: 85 },
        { name: 'UX/UI', level: 80 },
        { name: 'WordPress', level: 75 },
        { name: 'Gestión de Dominios', level: 90 }
      ]
    },
    soft: {
      EN: [
        { name: 'Teamwork', level: 95 },
        { name: 'Problem Solving', level: 90 },
        { name: 'Adaptability', level: 85 },
        { name: 'Public Speaking', level: 80 }
      ],
      ES: [
        { name: 'Trabajo en Equipo', level: 95 },
        { name: 'Resolución de Problemas', level: 90 },
        { name: 'Adaptabilidad', level: 85 },
        { name: 'Hablar en Público', level: 80 }
      ]
    },
    microsoft: {
      EN: [
        { name: 'Dynamics ERP', level: 80 },
        { name: 'Power Automate', level: 75 },
        { name: 'PowerApps', level: 70 },
        { name: 'Office Suite', level: 90 },
        { name: 'Dynamics CRM', level: 85 },   // Añadido desde Lãberit
        { name: 'Office 365', level: 88 },     // Añadido desde UPV
        { name: 'Dynamics', level: 83 }        // Añadido desde Lãberit
      ],
      ES: [
        { name: 'Dynamics ERP', level: 80 },
        { name: 'Power Automate', level: 75 },
        { name: 'PowerApps', level: 70 },
        { name: 'Office Suite', level: 90 },
        { name: 'Dynamics CRM', level: 85 },   // Añadido desde Lãberit
        { name: 'Office 365', level: 88 },     // Añadido desde UPV
        { name: 'Dynamics', level: 83 }        // Añadido desde Lãberit
      ]
    }
  };
  
  // Text to be typed for each category
  const typingTexts = {
    frontend: {
      EN: "Loading frontend development skills...\nSpecializing in React and Next.js ecosystems with a focus on responsive and elegant UI implementation.",
      ES: "Cargando habilidades de desarrollo frontend...\nEspecializado en ecosistemas React y Next.js con enfoque en implementación de UI elegante y responsiva."
    },
    backend: {
      EN: "Loading backend development skills...\nExpert in building robust server-side solutions and database management systems.",
      ES: "Cargando habilidades de desarrollo backend...\nExperto en construir soluciones robustas del lado del servidor y sistemas de gestión de bases de datos."
    },
    integration: {
      EN: "Loading integration skills...\nSeamlessly connecting systems and orchestrating data flows across enterprise platforms.",
      ES: "Cargando habilidades de integración...\nConectando sistemas y orquestando flujos de datos a través de plataformas empresariales."
    },
    data: {
      EN: "Loading data management skills...\nTransforming raw data into actionable insights through advanced processing techniques.",
      ES: "Cargando habilidades de gestión de datos...\nTransformando datos brutos en conocimientos accionables mediante técnicas avanzadas de procesamiento."
    },
    tools: {
      EN: "Loading development tools...\nLeveraging a comprehensive toolkit to optimize the development workflow.",
      ES: "Cargando herramientas de desarrollo...\nAprovechando un conjunto completo de herramientas para optimizar el flujo de trabajo de desarrollo."
    },
    web: {
      EN: "Loading web design skills...\nCrafting visually stunning and user-friendly digital experiences.",
      ES: "Cargando habilidades de diseño web...\nCreando experiencias digitales visualmente impresionantes y fáciles de usar."
    },
    soft: {
      EN: "Loading soft skills...\nBuilding strong relationships and effectively managing complex challenges through communication.",
      ES: "Cargando habilidades sociales...\nConstruyendo relaciones sólidas y gestionando eficazmente desafíos complejos mediante la comunicación."
    },
    microsoft: {
      EN: "Loading Microsoft technology skills...\nImplementing enterprise solutions using the Microsoft technology stack.",
      ES: "Cargando habilidades en tecnologías Microsoft...\nImplementando soluciones empresariales utilizando el stack tecnológico de Microsoft."
    }
  };
  
  // Typing animation effect
  useEffect(() => {
    if (!isMounted) return;
    
    if (typingRef.current) clearTimeout(typingRef.current);
    
    setTypedText('');
    let currentText = '';
    const textToType = typingTexts[activeCategory][language];
    let charIndex = 0;
    
    const typeChar = () => {
      if (charIndex < textToType.length) {
        currentText += textToType.charAt(charIndex);
        setTypedText(currentText);
        charIndex++;
        typingRef.current = setTimeout(typeChar, Math.random() * 30 + 20); // Varying speed
      }
    };
    
    typeChar();
    
    // Cursor blinking effect
    if (cursorRef.current) clearInterval(cursorRef.current);
    cursorRef.current = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
      if (cursorRef.current) clearInterval(cursorRef.current);
    };
  }, [activeCategory, language, isMounted]);
  
  // Si no está montado, devuelve un placeholder simple
  if (!isMounted) {
    return (
      <div className="bg-[#0f1724] rounded-lg shadow-2xl overflow-hidden border border-gray-800">
        <div className="bg-[#1a2537] px-4 py-2 flex items-center border-b border-gray-800">
          <Terminal size={18} className="text-blue-400 mr-2" />
          <span className="text-blue-400 font-mono text-sm font-bold">
            {language === 'EN' ? 'Skills Terminal' : 'Terminal de Habilidades'} ~ {language === 'EN' ? 'Loading' : 'Cargando'}...
          </span>
        </div>
        <div className="p-4 text-gray-300 font-mono text-sm h-48 overflow-y-auto">
          <div className="text-blue-400">$ skills.loading()</div>
        </div>
        <div className="p-4 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-2">
              <div className="h-2 bg-[#1a2537] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 animate-pulse" style={{ width: '50%' }}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-[#0f1724] rounded-lg shadow-2xl overflow-hidden border border-gray-800">
      {/* Terminal Header */}
      <div className="bg-[#1a2537] px-4 py-2 flex items-center border-b border-gray-800">
        <Terminal size={18} className="text-blue-400 mr-2" />
        <span className="text-blue-400 font-mono text-sm font-bold">
          {language === 'EN' ? 'Skills Terminal' : 'Terminal de Habilidades'} ~ {categories[activeCategory].label[language]}
        </span>
      </div>
      
      {/* Terminal Output */}
      <div className="p-4 text-gray-300 font-mono text-sm h-48 overflow-y-auto">
        <div className="text-blue-400">$ skills.{activeCategory}.load()</div>
        <div className="mt-2 whitespace-pre-line">
          {typedText}
          {showCursor && <span className="border-r-2 border-blue-400 ml-1 animate-pulse">&nbsp;</span>}
        </div>
      </div>
      
      {/* Skills Progress Bars */}
      <div className="p-4 border-t border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills[activeCategory][language].map((skill, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between mb-1">
                <span className="text-xs font-mono text-gray-400">{skill.name}</span>
                <span className="text-xs font-mono text-blue-400">{skill.level}%</span>
              </div>
              <div className="h-2 bg-[#1a2537] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-1000 ease-out" 
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Category Navigation */}
      <div className="bg-[#1a2537] border-t border-gray-800 p-2">
        <div className="flex flex-wrap justify-center gap-2">
          {Object.entries(categories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`flex items-center space-x-1 px-3 py-1 rounded text-xs font-mono transition-colors ${
                activeCategory === key 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:bg-[#0f1724] hover:text-gray-200'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.label[language]}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Command Line */}
      <div className="bg-[#0c1220] border-t border-gray-800 p-3 flex items-center">
        <span className="text-blue-400 font-mono mr-2">$</span>
        <div className="flex-1 bg-[#1a2537] rounded px-3 py-2 font-mono text-sm text-gray-400 flex items-center">
          <span>
            skills.explore(<span className="text-blue-400">'{activeCategory}'</span>)
          </span>
          <span className="border-r-2 border-blue-400 ml-1 h-5 animate-pulse"></span>
        </div>
      </div>
    </div>
  );
};

export default function ExperiencePage() {
  const { language } = useLanguage();
  const [certIndex, setCertIndex] = useState(0);
  const [selectedCert, setSelectedCert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const autoPlayTimerRef = useRef(null);
  const carouselRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Usar useEffect para evitar problemas de hidratación
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Configurar el temporizador de reproducción automática para certificados
  useEffect(() => {
    if (!isMounted) return;
    
    // Inicia el temporizador
    autoPlayTimerRef.current = setInterval(() => {
      setCertIndex(prev => (prev === certificateImages.length - 1 ? 0 : prev + 1));
    }, 2000);
    
    // Limpia el temporizador al desmontar
    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [certificateImages.length, isMounted]);

  // Pausar el carrusel cuando se muestra el modal
  useEffect(() => {
    if (!isMounted) return;
    
    if (showModal) {
      clearInterval(autoPlayTimerRef.current);
    } else if (!showModal && autoPlayTimerRef.current === null) {
      autoPlayTimerRef.current = setInterval(() => {
        setCertIndex(prev => (prev === certificateImages.length - 1 ? 0 : prev + 1));
      }, 2000);
    }
  }, [showModal, certificateImages.length, isMounted]);

  // Función para mostrar el script del certificado
  const showCertificateDetails = (cert) => {
    setSelectedCert(cert);
    setShowModal(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setShowModal(false);
    // Reiniciar el temporizador
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }
    autoPlayTimerRef.current = setInterval(() => {
      setCertIndex(prev => (prev === certificateImages.length - 1 ? 0 : prev + 1));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#101827] text-white p-6 md:p-20">
      <div className="max-w-6xl mx-auto">
        {/* Sección de título y descripción */}
        <div className="mb-10 text-center">
          <h1 className={`${nixieOne.className} text-4xl md:text-7xl font-bold tracking-wider mb-10`}>
            {texts[language].title}
          </h1>
          <p className={`${martianMono.className} text-sm md:text-base text-gray-300`}>
            {texts[language].description}
          </p>
        </div>

        {/* Sección de experiencia profesional */}
        <div className="relative mb-20">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-700 hidden md:block"></div>

          {texts[language].experiences.map((exp, index) => (
            <div key={index} className="relative mb-16">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-700 rounded-full hidden md:block"></div>

              <div className={`flex w-full flex-col md:flex-row ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                <div className="w-full md:w-7/12 px-6 md:px-0 text-left md:text-left">
                  <div className="bg-[#1a2537] p-6 rounded-lg shadow-lg hover:bg-[#1e2c42] transition-colors duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`${index % 2 === 0 ? 'order-2' : 'order-1'}`}>
                        <div className="relative w-16 h-16 bg-white rounded-full overflow-hidden">
                          <Image
                            src={exp.logo}
                            alt={`${exp.company} logo`}
                            width={64}
                            height={64}
                            className="object-contain p-2"
                          />
                        </div>
                      </div>
                      <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <h3 className={`${nixieOne.className} text-2xl font-bold text-blue-400 ${index % 2 !== 0 ? 'text-right' : 'text-left'}`}>
                          {exp.title}
                        </h3>
                        <h4 className={`${martianMono.className} text-sm text-gray-400 ${index % 2 !== 0 ? 'text-right' : 'text-left'}`}>
                          {exp.company}
                        </h4>
                      </div>
                    </div>
                    
                    <p className={`${martianMono.className} text-xs text-gray-500 mb-3`}>
                      {exp.period} | {exp.location}
                    </p>
                    <p className={`${martianMono.className} text-sm text-gray-300 mb-4`}>
                      {exp.description}
                    </p>
                    <div className="border-t border-gray-700 pt-3">
                      <p className={`${martianMono.className} text-xs text-blue-400`}>
                        <span className="font-bold">{language === "EN" ? "Skills" : "Aptitudes"}:</span> {exp.skills}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sección de Skills con el nuevo componente */}
        <div className="mb-16">
          <h2 className={`${nixieOne.className} text-3xl md:text-5xl font-bold tracking-wider mb-6 text-center`}>
            {texts[language].skills}
          </h2>
          <SkillsTerminal />
        </div>

        {/* Sección de Certificados */}
        <div className="mb-16">
          <h2 className={`${nixieOne.className} text-3xl md:text-5xl font-bold tracking-wider mb-6 text-center`}>
            {texts[language].certificates}
          </h2>

          {/* Carrusel mejorado con mejor centrado y certificados clicables */}
          <div 
            ref={carouselRef}
            className="relative bg-gradient-to-br from-[#1a2537] to-[#0c1220] rounded-xl overflow-hidden shadow-2xl p-6 mb-8 mx-auto max-w-5xl"
          >
            {/* Área principal del carrusel */}
            {isMounted ? (
              <div className="relative h-[420px] flex items-center justify-center">
                {certificateImages.map((cert, index) => {
                  // Calcular posición relativa 
                  const position = index - certIndex;
                  
                  // Solo renderizar certificados cercanos para rendimiento
                  if (position < -1 || position > 1) return null;
                  
                  // Configuración de estilo según posición
                  let translateX = '0%';
                  let scale = 1;
                  let zIndex = 10;
                  let opacity = 1;
                  let shadow = 'shadow-lg';
                  
                  if (position === -1) {
                    translateX = '-65%';
                    scale = 0.8;
                    zIndex = 5;
                    opacity = 0.7;
                  } else if (position === 1) {
                    translateX = '65%';
                    scale = 0.8;
                    zIndex = 5;
                    opacity = 0.7;
                  } else if (position === 0) {
                    scale = 1.05;
                    zIndex = 20;
                    shadow = 'shadow-[0_0_30px_5px_rgba(59,130,246,0.6)]';
                  }
                  
                  return (
                    <div
                      key={cert.id}
                      className={`absolute left-1/2 top-1/2 transition-all duration-500 ease-in-out ${shadow} rounded-xl ${position === 0 ? 'border-2 border-blue-400' : 'border border-gray-700'} cursor-pointer hover:scale-105`}
                      style={{
                        transform: `translate(-50%, -50%) translateX(${translateX}) scale(${scale})`,
                        zIndex,
                        opacity
                      }}
                      onClick={() => showCertificateDetails(cert)}
                    >
                      {/* Tarjeta de certificado que mejora el centrado - con imagen arriba y nombre abajo */}
                      <div className="w-72 overflow-hidden">
                        {/* Imagen del certificado con estricto centrado */}
                        <div className="bg-[#0f1724] h-[280px] rounded-t-xl flex items-center justify-center overflow-hidden">
                          <div className="relative w-full h-full flex items-center justify-center">
                            <Image
                              src={cert.image}
                              alt={cert.name}
                              width={250}
                              height={250}
                              className="object-contain max-w-[250px] max-h-[250px]"
                              priority={position === 0}
                              style={{ 
                                margin: 'auto',
                                display: 'block'
                              }}
                            />
                          </div>
                        </div>
                        
                        {/* Nombre del certificado abajo como estaba antes */}
                        <div 
                          className={`${martianMono.className} flex items-center justify-center text-center text-sm min-h-[60px] p-3 bg-[#1a2537] rounded-b-xl border-t border-gray-700 ${position === 0 ? 'text-blue-400' : 'text-gray-300'}`}
                        >
                          <span className="line-clamp-2">{cert.name}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-[420px] flex items-center justify-center">
                <div className="w-72 h-72 bg-[#1a2537] rounded-xl animate-pulse"></div>
              </div>
            )}
            
            {/* Botones de navegación */}
            <div className="absolute inset-y-0 left-4 flex items-center">
              <button
                onClick={() => {
                  if (!isMounted) return;
                  setCertIndex(prev => (prev === 0 ? certificateImages.length - 1 : prev - 1));
                  if (autoPlayTimerRef.current) {
                    clearInterval(autoPlayTimerRef.current);
                    autoPlayTimerRef.current = setInterval(() => {
                      setCertIndex(prev => (prev === certificateImages.length - 1 ? 0 : prev + 1));
                    }, 2000);
                  }
                }}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg transform transition-all hover:scale-110 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 z-30"
                aria-label={language === "EN" ? "Previous certificate" : "Certificado anterior"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            
            <div className="absolute inset-y-0 right-4 flex items-center">
              <button
                onClick={() => {
                  if (!isMounted) return;
                  setCertIndex(prev => (prev === certificateImages.length - 1 ? 0 : prev + 1));
                  if (autoPlayTimerRef.current) {
                    clearInterval(autoPlayTimerRef.current);
                    autoPlayTimerRef.current = setInterval(() => {
                      setCertIndex(prev => (prev === certificateImages.length - 1 ? 0 : prev + 1));
                    }, 2000);
                  }
                }}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg transform transition-all hover:scale-110 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 z-30"
                aria-label={language === "EN" ? "Next certificate" : "Siguiente certificado"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Indicadores en la parte inferior */}
            {isMounted && (
              <div className="flex justify-center mt-8 gap-2 max-w-2xl mx-auto flex-wrap">
                {certificateImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCertIndex(index);
                      if (autoPlayTimerRef.current) {
                        clearInterval(autoPlayTimerRef.current);
                        autoPlayTimerRef.current = setInterval(() => {
                          setCertIndex(prev => (prev === certificateImages.length - 1 ? 0 : prev + 1));
                        }, 2000);
                      }
                    }}
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium transition-all duration-300 ${
                      certIndex === index
                        ? 'bg-blue-600 text-white scale-110'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                    }`}
                    aria-label={`${language === "EN" ? "Certificate" : "Certificado"} ${index + 1}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Modal para mostrar detalles del certificado */}
      {showModal && selectedCert && isMounted && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#101827] border-2 border-blue-500 rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-auto">
            {/* Encabezado del modal */}
            <div className="border-b border-blue-500/30 p-4 flex justify-between items-center">
              <h3 className={`${nixieOne.className} text-2xl text-blue-400`}>
                {selectedCert.name}
              </h3>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-white"
                aria-label={texts[language].close}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Contenido principal con script */}
            <div className="p-6">
              <div className="bg-[#1a2537] rounded-lg p-6 shadow-inner font-mono">
                <pre className={`${martianMono.className} text-sm text-gray-300 whitespace-pre-wrap`}>
{`/* ${selectedCert.name.toUpperCase()} */

const certificateData = {
  name: "${selectedCert.name}",
  ${language === "EN" ? "issued" : "expedicion"}: "${selectedCert.issued}",
  ${language === "EN" ? "skills" : "aptitudes"}: [
    "${selectedCert.skills[0]}",
    "${selectedCert.skills.length > 1 ? selectedCert.skills[1] : ''}"
  ],
  type: "${selectedCert.type}"
};

// ${language === "EN" ? "Certificate details" : "Detalles del certificado"}
console.log(certificateData);`}
                </pre>
              </div>
              
              {/* Detalles adicionales */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
                <div className="col-span-1">
                  <div className="flex flex-col bg-[#1a2537] rounded-lg p-4">
                    <span className={`${martianMono.className} text-xs font-semibold text-blue-400 mb-1`}>
                      {texts[language].issued}:
                    </span>
                    <span className={`${martianMono.className} text-sm`}>
                      {selectedCert.issued}
                    </span>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="flex flex-col bg-[#1a2537] rounded-lg p-4 h-full">
                    <span className={`${martianMono.className} text-xs font-semibold text-blue-400 mb-1`}>
                      {texts[language].skills_label}:
                    </span>
                    <ul className="list-disc pl-5">
                      {selectedCert.skills.map((skill, idx) => (
                        <li key={idx} className={`${martianMono.className} text-sm`}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Pie del modal */}
            <div className="border-t border-blue-500/30 p-4 text-center">
              <button 
                onClick={closeModal}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors"
              >
                {texts[language].close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}