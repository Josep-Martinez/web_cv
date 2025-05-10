"use client";
import Image from "next/image";
import { Nixie_One, Martian_Mono } from "next/font/google";
import { useLanguage } from "../../app/LanguageContext";
import React, { useState, useEffect, useRef, isValidElement, cloneElement, Children } from "react";

const nixieOne = Nixie_One({
  weight: "400",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  weight: "400",
  subsets: ["latin"],
});

// Caracteres para el efecto (alfanuméricos y símbolos comunes)
const effectChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,_-:;(){}[]|";

// Duración total de la animación - 2 segundos para un efecto rápido
const ANIMATION_DURATION = 2000;

// Función para generar texto aleatorio
const generateRandomText = (length) => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += effectChars.charAt(Math.floor(Math.random() * effectChars.length));
  }
  return result;
};

// Componente para palabras con efecto de animación
const AnimatedWord = ({ word, animationStarted, globalInterval }) => {
  const [displayText, setDisplayText] = useState(generateRandomText(word.length));
  
  useEffect(() => {
    if (!animationStarted || !globalInterval) return;
    
    let currentIndex = 0;
    let stabilityCounter = 0;
    
    const interval = setInterval(() => {
      // Si ya hemos completado la palabra
      if (currentIndex >= word.length) {
        stabilityCounter++;
        
        // Estabilización rápida
        if (stabilityCounter > 5) {  // Reducido a 5 para ser muy rápido
          setDisplayText(word);
          return;
        }
        
        // Variaciones rápidas
        let tempText = "";
        for (let i = 0; i < word.length; i++) {
          // Mayor probabilidad de estabilizar rápido
          if (Math.random() > 0.85 - (stabilityCounter * 0.15)) {
            tempText += effectChars.charAt(Math.floor(Math.random() * effectChars.length));
          } else {
            tempText += word[i];
          }
        }
        
        setDisplayText(tempText);
      } else {
        // Incrementamos rápidamente el índice
        if (Math.random() > 0.3) {  // Probabilidad muy alta de avance
          currentIndex++;
        }
        
        // Construimos la palabra: caracteres correctos + caracteres aleatorios
        let tempText = "";
        for (let i = 0; i < word.length; i++) {
          if (i < currentIndex) {
            tempText += word[i];
          } else {
            tempText += effectChars.charAt(Math.floor(Math.random() * effectChars.length));
          }
        }
        
        setDisplayText(tempText);
      }
    }, globalInterval);
    
    // Limpiar intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, [word, animationStarted, globalInterval]);
  
  return (
    <span className="line-through text-blue-500">
      {displayText}
    </span>
  );
};

// Traducciones con palabras tachadas y en azul
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
    projects: [
      { id: 1, name: "SomRiiure Website", image: "/somriure.png" },
      { id: 2, name: "LipsTalk", image: "/lipstalk.png" },
      { id: 3, name: "Curriculum Website", image: "/pgweb.png" },
    ],
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
    projects: [
      { id: 1, name: "Página Web SomRiiure", image: "/somriure.png" },
      { id: 2, name: "LipsTalk", image: "/lipstalk.png" },
      { id: 3, name: "Página Web Curriculum", image: "/pgweb.png" },
    ],
  },
};

export default function ProjectsPage() {
  const { language } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [globalInterval, setGlobalInterval] = useState(null);
  
  // Usar useEffect para evitar problemas de hidratación
  useEffect(() => {
    setIsMounted(true);
    
    // Si está montado, iniciamos la animación con un breve retraso
    if (isMounted) {
      // Usamos un intervalo rápido de 80ms para la animación
      setGlobalInterval(80);
      
      // Pequeño retraso antes de iniciar la animación
      setTimeout(() => {
        setAnimationStarted(true);
      }, 100);
    }
  }, [isMounted]);

  // Renderizar los componentes de texto con palabras animadas
  const renderDescriptionWithAnimatedWords = (descItem) => {
    if (!isMounted) return null;
    
    // Crear una versión del párrafo con palabras animadas
    let content = descItem;
    
    if (isValidElement(descItem)) {
      content = cloneElement(descItem, {
        children: Children.map(descItem.props.children, child => {
          if (isValidElement(child) && child.type === AnimatedWord) {
            return cloneElement(child, {
              animationStarted: animationStarted,
              globalInterval: globalInterval
            });
          }
          return child;
        })
      });
    }
    
    return content;
  };

  // Para prevenir errores de hidratación, renderizamos una versión muy simple en el servidor
  // y la versión completa solo en el cliente después del montaje
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#101827] text-white p-6 md:p-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className={`${nixieOne.className} text-4xl md:text-7xl font-bold tracking-wider mb-10`}>
              {texts[language].title}
            </h1>
            {/* Marcador de posición para la descripción */}
            <div className={`${martianMono.className} text-sm md:text-base text-gray-300 h-20`}></div>
          </div>
          
          {/* Marcador de posición para los proyectos */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {texts[language].projects.map((project) => (
              <div key={project.id} className="relative group overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={project.image}
                  alt={project.name}
                  width={400}
                  height={300}
                  className="object-cover w-full h-auto transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-blue-900/50 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className={`${martianMono.className} text-sm md:text-lg`}>
                    {project.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}