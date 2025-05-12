// app/components/SkillsTerminal.js
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Code, Braces, Database, Layout, Globe, Users, Brain, Server } from 'lucide-react';
import { Martian_Mono } from "next/font/google";

const martianMono = Martian_Mono({
  weight: "400",
  subsets: ["latin"],
});

const SkillsTerminal = ({ language }) => {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const typingRef = useRef(null);
  const cursorRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  
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
  
  // Skills organized by category
  const skills = {
    frontend: {
      EN: [
        { name: 'React.js', level: 85 },
        { name: 'Next.js', level: 90 },
        { name: 'Tailwind CSS', level: 80 },
        { name: 'JavaScript', level: 85 },
        { name: 'HTML/CSS', level: 95 },
        { name: 'HTML5', level: 95 },
        { name: 'TypeScript', level: 82 },
        { name: 'Expo', level: 78 }
      ],
      ES: [
        { name: 'React.js', level: 85 },
        { name: 'Next.js', level: 90 },
        { name: 'Tailwind CSS', level: 80 },
        { name: 'JavaScript', level: 85 },
        { name: 'HTML/CSS', level: 95 },
        { name: 'HTML5', level: 95 },
        { name: 'TypeScript', level: 82 },
        { name: 'Expo', level: 78 }
      ]
    },
    backend: {
      EN: [
        { name: 'Java', level: 75 },
        { name: 'C++', level: 70 },
        { name: 'SQL', level: 80 },
        { name: 'Azure', level: 65 },
        { name: 'Python', level: 60 },
        { name: 'Node.js', level: 75 },
        { name: 'FastAPI', level: 72 },
        { name: 'JBoss Server', level: 65 }
      ],
      ES: [
        { name: 'Java', level: 75 },
        { name: 'C++', level: 70 },
        { name: 'SQL', level: 80 },
        { name: 'Azure', level: 65 },
        { name: 'Python', level: 60 },
        { name: 'Node.js', level: 75 },
        { name: 'FastAPI', level: 72 },
        { name: 'JBoss Server', level: 65 }
      ]
    },
    integration: {
      EN: [
        { name: 'Dell Boomi', level: 90 },
        { name: 'Informatica', level: 85 },
        { name: 'API Management', level: 80 },
        { name: 'Event Streams', level: 75 },
        { name: 'Data Integration', level: 80 }
      ],
      ES: [
        { name: 'Dell Boomi', level: 90 },
        { name: 'Informatica', level: 85 },
        { name: 'Gestión de APIs', level: 80 },
        { name: 'Event Streams', level: 75 },
        { name: 'Integración de Datos', level: 80 }
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
        { name: 'Dynamics CRM', level: 85 },
        { name: 'Office 365', level: 88 },
        { name: 'Dynamics', level: 83 }
      ],
      ES: [
        { name: 'Dynamics ERP', level: 80 },
        { name: 'Power Automate', level: 75 },
        { name: 'PowerApps', level: 70 },
        { name: 'Office Suite', level: 90 },
        { name: 'Dynamics CRM', level: 85 },
        { name: 'Office 365', level: 88 },
        { name: 'Dynamics', level: 83 }
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
        typingRef.current = setTimeout(typeChar, Math.random() * 30 + 20);
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

export default SkillsTerminal;