// app/page.js
"use client";
import Image from "next/image";
import { useLanguage } from "../app/LanguageContext";
import React, { useState, useEffect } from "react";
import AnimatedWord from "./components/AnimatedWord";

// Caracteres para el efecto del nombre y título
const effectChars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,_-:;(){}[]|";

// Traducciones
const texts = {
  EN: {
    name: "JOSEP\nMARTINEZ BOIX",
    jobTitle: "Computer Engineer",
    masterTitle: "Master’s in FinTech & Blockchain",
    description: [
      <>
        Hello, I&apos;m Josep Martínez Boix. My passion for{" "}
        <AnimatedWord word="innovation" /> and continuous{" "}
        <AnimatedWord word="learning" /> has led me to transform every challenge
        into an opportunity for growth, both professionally and personally.
      </>,
      <>
        With a solid background and experience in computer engineer, I&apos;ve
        learned that the key to success lies in combining creativity,{" "}
        <AnimatedWord word="adaptability" /> and a proactive attitude toward
        change. Every project I undertake is a chance to explore new ideas and
        provide <AnimatedWord word="solutions" /> to complex problems.
      </>,
      <>
        I firmly believe that technology and creativity can merge to{" "}
        <AnimatedWord word="transform" /> realities, and this conviction drives
        my career. In this space, I share not only my professional journey but
        also the projects and ideas that inspire me to continually reinvent
        myself.
      </>,
      <>Thank you for visiting, and I invite you to explore my professional world.</>,
    ],
  },
  ES: {
    name: "JOSEP\nMARTINEZ BOIX",
    jobTitle: "Ingeniero Informático",
    masterTitle: "Máster en Fintech & Blockchain",
    description: [
      <>
        Hola, soy Josep Martínez Boix. Mi pasión por la{" "}
        <AnimatedWord word="innovación" /> y el{" "}
        <AnimatedWord word="aprendizaje" /> continuo me ha llevado a transformar
        cada desafío en una oportunidad para crecer, tanto profesional como
        personalmente.
      </>,
      <>
        Con una sólida formación en ingeniería informática, he aprendido que la
        clave del éxito radica en combinar creatividad,{" "}
        <AnimatedWord word="adaptabilidad" /> y una actitud proactiva ante los
        cambios. Cada proyecto en el que me involucro es una ocasión para
        explorar nuevas ideas y aportar <AnimatedWord word="soluciones" />{" "}
        originales a problemas complejos.
      </>,
      <>
        Creo firmemente que la tecnología y la creatividad pueden fusionarse para{" "}
        <AnimatedWord word="transformar" /> realidades, y es esta convicción la
        que impulsa mi trayectoria. En este espacio, comparto no solo mi
        recorrido profesional, sino también las inquietudes y proyectos que me
        inspiran a seguir reinventándome día a día.
      </>,
      <>Gracias por visitarme. Te invito a descubrir mi mundo profesional.</>,
    ],
  },
};

export default function Home() {
  const { language } = useLanguage();
  const [displayName, setDisplayName] = useState("");
  const [displayTitle, setDisplayTitle] = useState("");
  const [displayMaster, setDisplayMaster] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [globalInterval, setGlobalInterval] = useState(null);

  useEffect(() => {
    setIsMounted(true);
    if (isMounted) {
      setGlobalInterval(120);
      setTimeout(() => {
        setAnimationStarted(true);
      }, 100);
    }
  }, [isMounted]);

  const renderDescriptionWithAnimatedWords = (descItems) => {
    if (!isMounted) return null;

    return descItems.map((para, index) => {
      let content = para;
      if (React.isValidElement(para)) {
        content = React.cloneElement(para, {
          children: React.Children.map(para.props.children, (child) => {
            if (React.isValidElement(child) && child.type === AnimatedWord) {
              return React.cloneElement(child, {
                animationStarted: animationStarted,
                globalInterval: globalInterval,
              });
            }
            return child;
          }),
        });
      }
      return (
        <p
          key={index}
          className={`font-sans text-slate-light text-base md:text-lg leading-relaxed mb-6 last:mb-0 opacity-0 animate-[fadeIn_0.8s_ease-out_forwards]`}
          style={{ animationDelay: `${0.5 + index * 0.1}s` }}
        >
          {content}
        </p>
      );
    });
  };

  // Matrix-style decoding effect
  useEffect(() => {
    if (!isMounted) return;

    const targetName = texts[language].name;
    const targetTitle = texts[language].jobTitle;
    const targetMaster = texts[language].masterTitle;

    setDisplayName("");
    setDisplayTitle("");
    setDisplayMaster("");

    const animateText = (target, setter, delay = 0) => {
      setTimeout(() => {
        let iterations = 0;
        const interval = setInterval(() => {
          setter(
            target
              .split("")
              .map((letter, index) => {
                if (index < iterations) {
                  return target[index];
                }
                return effectChars[Math.floor(Math.random() * effectChars.length)];
              })
              .join("")
          );

          if (iterations >= target.length) {
            clearInterval(interval);
          }

          iterations += 1 / 3; // Slower decoding for smoother effect
        }, 30);
      }, delay);
    };

    // Start animations sequentially
    animateText(targetName, setDisplayName, 0);
    animateText(targetTitle, setDisplayTitle, 1000);
    animateText(targetMaster, setDisplayMaster, 2000);

  }, [language, isMounted]);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 md:p-20 pt-28 md:pt-32 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-electric/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-navy-700/20 rounded-full blur-[80px] -z-10"></div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start lg:items-center">

        {/* Left Column: Image & Title (Mobile: Top, Desktop: Left) */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 z-10">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-electric to-blue-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-navy-800 shadow-2xl">
              <Image
                src="/foto_cv.png"
                alt="Josep Martínez Boix"
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                priority
              />
            </div>
          </div>

          <div className="space-y-4 w-full">
            {/* Fixed height container to prevent layout shift */}
            <div className="min-h-[100px] lg:min-h-[140px] flex flex-col justify-center">
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-gray-100 leading-tight tracking-tight">
                {displayName.split("\n").map((line, index) => (
                  <span key={index} className="block">
                    {line}
                  </span>
                ))}
              </h1>
            </div>

            <div className="space-y-2">
              <h2 className="font-mono text-xl md:text-2xl text-electric min-h-[32px]">
                {displayTitle}
              </h2>
              <h3 className="font-mono text-sm md:text-base text-slate-light min-h-[24px]">
                {displayMaster}
              </h3>
            </div>
          </div>
        </div>

        {/* Right Column: Description */}
        <div className="lg:col-span-7 z-10">
          <div className="glass-panel p-8 md:p-12 rounded-2xl relative overflow-hidden border border-white/5">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-electric to-transparent opacity-50"></div>
            {renderDescriptionWithAnimatedWords(texts[language].description)}
          </div>
        </div>

      </div>
    </div>
  );
}