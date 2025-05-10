"use client";
import Image from "next/image";
import { Nixie_One, Martian_Mono } from "next/font/google";
import { useLanguage } from "../app/LanguageContext";
import React, { useState, useEffect, isValidElement, cloneElement, Children } from "react";

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

// Duración total de la animación - reducida a 3 segundos para un efecto más rápido
const ANIMATION_DURATION = 3000;

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
        
        // Estabilización más rápida
        if (stabilityCounter > 8) {  // Reducido de 20 a 8
          setDisplayText(word);
          return;
        }
        
        // Variaciones más rápidas
        let tempText = "";
        for (let i = 0; i < word.length; i++) {
          // Mayor probabilidad de estabilizar rápido
          if (Math.random() > 0.9 - (stabilityCounter * 0.1)) {  // Ajustado para estabilizarse más rápido
            tempText += effectChars.charAt(Math.floor(Math.random() * effectChars.length));
          } else {
            tempText += word[i];
          }
        }
        
        setDisplayText(tempText);
      } else {
        // Incrementamos más rápidamente el índice
        if (Math.random() > 0.5) {  // Probabilidad aumentada de avance
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

// Traducciones
const texts = {
  EN: {
    name: "JOSEP\nMARTINEZ BOIX",
    jobTitle: "Computer Engineer",
    description: [
      <>
        Hello, I&apos;m Josep Martínez Boix. My passion for{" "}
        <AnimatedWord word="innovation" />{" "}and continuous{" "}
        <AnimatedWord word="learning" />{" "}has led me to transform every challenge into an opportunity for growth, both professionally and personally.
      </>,
      <>
        With a solid background and experience in computer engineer, I&apos;ve learned that the key to success lies in combining creativity,{" "}
        <AnimatedWord word="adaptability" />{" "}and a proactive attitude toward change. Every project I undertake is a chance to explore new ideas and provide{" "}
        <AnimatedWord word="solutions" />{" "}to complex problems.
      </>,
      <>
        I firmly believe that technology and creativity can merge to{" "}
        <AnimatedWord word="transform" />{" "}realities, and this conviction drives my career. In this space, I share not only my professional journey but also the projects and ideas that inspire me to continually reinvent myself.
      </>,
      <>
        Thank you for visiting, and I invite you to explore my professional world.
      </>,
    ],
    highlightedWords: ["innovation", "learning", "adaptability", "solutions", "transform"]
  },
  ES: {
    name: "JOSEP\nMARTINEZ BOIX",
    jobTitle: "Ingeniero de Computadores",
    description: [
      <>
        Hola, soy Josep Martínez Boix. Mi pasión por la{" "}
        <AnimatedWord word="innovación" />{" "}y el{" "}
        <AnimatedWord word="aprendizaje" />{" "}continuo me ha llevado a transformar cada desafío en una oportunidad para crecer, tanto profesional como personalmente.
      </>,
      <>
        Con una sólida formación en ingeniería informática, he aprendido que la clave del éxito radica en combinar creatividad,{" "}
        <AnimatedWord word="adaptabilidad" />{" "}y una actitud proactiva ante los cambios. Cada proyecto en el que me involucro es una ocasión para explorar nuevas ideas y aportar{" "}
        <AnimatedWord word="soluciones" />{" "}originales a problemas complejos.
      </>,
      <>
        Creo firmemente que la tecnología y la creatividad pueden fusionarse para{" "}
        <AnimatedWord word="transformar" />{" "}realidades, y es esta convicción la que impulsa mi trayectoria. En este espacio, comparto no solo mi recorrido profesional, sino también las inquietudes y proyectos que me inspiran a seguir reinventándome día a día.
      </>,
      <>
        Gracias por visitarme. Te invito a descubrir mi mundo profesional.
      </>,
    ],
    highlightedWords: ["innovación", "aprendizaje", "adaptabilidad", "soluciones", "transformar"]
  },
};

export default function Home() {
  const { language } = useLanguage();
  const [displayName, setDisplayName] = useState("");
  const [displayTitle, setDisplayTitle] = useState("");
  const [animationStarted, setAnimationStarted] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [globalInterval, setGlobalInterval] = useState(null);
  
  // Renderizar los componentes de texto con palabras animadas
  const renderDescriptionWithAnimatedWords = (descItems) => {
    return descItems.map((para, index, array) => {
      // Crear una versión del párrafo con palabras animadas
      let content = para;
      
      if (isValidElement(para)) {
        content = cloneElement(para, {
          children: Children.map(para.props.children, child => {
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
      
      return (
        <p
          key={index}
          className={`${martianMono.className} text-sm md:text-base leading-relaxed text-gray-300 ${index < array.length - 1 ? "mb-4" : ""} opacity-100 transition-opacity duration-300`}
          style={{ 
            textAlign: "justify",
          }}
        >
          {content}
        </p>
      );
    });
  };

  useEffect(() => {
    const targetName = texts[language].name;
    const targetTitle = texts[language].jobTitle;
    
    // Inicializar estados
    setDisplayName("");
    setDisplayTitle("");
    setAnimationComplete(false);
    setAnimationStarted(false);
    
    // Intervalo más rápido - 100ms en lugar de 180ms
    const interval = 100;
    setGlobalInterval(interval);
    
    // Función para finalizar todas las animaciones después de un tiempo fijo
    const finishAnimations = () => {
      setDisplayName(targetName);
      setDisplayTitle(targetTitle);
      setAnimationComplete(true);
    };
    
    let nameInterval;
    let titleInterval;
    
    // Función para animar el nombre
    const animateName = () => {
      const nameWithoutBreak = targetName.replace("\n", "");
      let currentIndex = 0;
      let stabilityCounter = 0;
      
      nameInterval = setInterval(() => {
        // Si ya hemos completado el nombre
        if (currentIndex >= nameWithoutBreak.length) {
          stabilityCounter++;
          
          if (stabilityCounter > 8) {  // Reducido de 20 a 8
            // Reinsertamos el salto de línea
            setDisplayName(targetName);
            return;
          }
          
          // Pequeñas variaciones - aceleradas
          let tempName = "";
          for (let i = 0; i < nameWithoutBreak.length; i++) {
            // Mayor probabilidad de estabilizar
            if (Math.random() > 0.9 - (stabilityCounter * 0.1)) {
              tempName += effectChars.charAt(Math.floor(Math.random() * effectChars.length));
            } else {
              tempName += nameWithoutBreak[i];
            }
          }
          
          // Reinsertamos el salto de línea si es necesario
          if (targetName.includes("\n")) {
            const breakPos = targetName.indexOf("\n");
            tempName = tempName.substring(0, breakPos) + "\n" + tempName.substring(breakPos);
          }
          
          setDisplayName(tempName);
        } else {
          // Incrementamos más rápidamente el índice
          if (Math.random() > 0.5) {  // Aumentada de 0.8 a 0.5
            currentIndex++;
          }
          
          // Construimos el nombre: caracteres correctos + caracteres aleatorios
          let tempName = "";
          for (let i = 0; i < nameWithoutBreak.length; i++) {
            if (i < currentIndex) {
              tempName += nameWithoutBreak[i];
            } else {
              tempName += effectChars.charAt(Math.floor(Math.random() * effectChars.length));
            }
          }
          
          // Reinsertamos el salto de línea si es necesario
          if (targetName.includes("\n")) {
            const breakPos = targetName.indexOf("\n");
            tempName = tempName.substring(0, breakPos) + "\n" + tempName.substring(breakPos);
          }
          
          setDisplayName(tempName);
        }
      }, interval);
    };
    
    // Función para animar el título
    const animateTitle = () => {
      let currentIndex = 0;
      let stabilityCounter = 0;
      
      titleInterval = setInterval(() => {
        if (currentIndex >= targetTitle.length) {
          stabilityCounter++;
          
          if (stabilityCounter > 6) {  // Reducido de 15 a 6
            setDisplayTitle(targetTitle);
            return;
          }
          
          // Pequeñas variaciones - más rápidas
          let tempTitle = "";
          for (let i = 0; i < targetTitle.length; i++) {
            // Mayor probabilidad de estabilizar
            if (Math.random() > 0.85 - (stabilityCounter * 0.1)) {
              tempTitle += effectChars.charAt(Math.floor(Math.random() * effectChars.length));
            } else {
              tempTitle += targetTitle[i];
            }
          }
          
          setDisplayTitle(tempTitle);
        } else {
          // Incrementar índice con mayor probabilidad
          if (Math.random() > 0.4) {  // Reducido de 0.75 a 0.4
            currentIndex++;
          }
          
          let tempTitle = "";
          for (let i = 0; i < targetTitle.length; i++) {
            if (i < currentIndex) {
              tempTitle += targetTitle[i];
            } else {
              tempTitle += effectChars.charAt(Math.floor(Math.random() * effectChars.length));
            }
          }
          
          setDisplayTitle(tempTitle);
        }
      }, interval);
    };
    
    // Iniciar todas las animaciones a la vez, con menos retraso
    setTimeout(() => {
      setAnimationStarted(true);
      animateName();
      
      // Pequeño retraso entre nombre y título para efecto natural pero más rápido
      setTimeout(() => {
        animateTitle();
      }, 150); // Reducido de 300 a 150
      
      // Forzar finalización de todas las animaciones más rápido
      setTimeout(finishAnimations, ANIMATION_DURATION);
    }, 100); // Reducido de 200 a 100
    
    return () => {
      clearInterval(nameInterval);
      clearInterval(titleInterval);
    };
  }, [language]);

  return (
    <div className="min-h-screen bg-[#101827] text-white flex items-center justify-center p-6 md:p-20">
      <div className="max-w-6xl w-full flex flex-col md:grid md:grid-cols-[250px,1fr] gap-6">
        {/* Foto en la primera columna */}
        <div className="flex justify-center md:mt-[-6.5rem]">
          <Image
            className="rounded-full shadow-lg"
            src="/foto_cv.png"
            alt="Foto de Josep Martínez Boix"
            width={250}
            height={250}
            priority
          />
        </div>

        {/* Nombre y título */}
        <div className="text-center md:text-right">
          <h1 className={`${nixieOne.className} text-4xl md:text-6xl font-light tracking-wider mb-4 text-white transition-all duration-500`}>
            {displayName.split("\n").map((line, index, arr) => (
              <span key={index}>
                {line}
                {index !== arr.length - 1 && <br />}
              </span>
            ))}
          </h1>
          <h2 className={`${nixieOne.className} text-lg md:text-xl text-gray-400 transition-all duration-500`}>
            {displayTitle}
          </h2>
        </div>

        {/* Descripción - aparece inmediatamente con palabras destacadas animadas */}
        <div className="col-span-2 mt-6">
          {renderDescriptionWithAnimatedWords(texts[language].description)}
        </div>
      </div>
    </div>
  );
}