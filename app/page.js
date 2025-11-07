"use client";
import Image from "next/image";
import { Nixie_One, Martian_Mono } from "next/font/google";
import { useLanguage } from "../app/LanguageContext";
import React, { useState, useEffect } from "react";
import AnimatedWord from "./components/AnimatedWord"; // Importar el componente externo

const nixieOne = Nixie_One({
  weight: "400",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  weight: "400",
  subsets: ["latin"],
});

// Caracteres para el efecto del nombre y título
const effectChars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,_-:;(){}[]|";

// Traducciones
const texts = {
  EN: {
    name: "JOSEP\nMARTINEZ BOIX",
    jobTitle: "Computer Engineer",
    masterTitle: "Master’s in FinTech & Blockchain", // ⬅️ NUEVO
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
    highlightedWords: ["innovation", "learning", "adaptability", "solutions", "transform"],
  },
  ES: {
    name: "JOSEP\nMARTINEZ BOIX",
    jobTitle: "Ingeniero Informático",
    masterTitle: "Máster en Fintech & Blockchain", // ⬅️ NUEVO
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
    highlightedWords: ["innovación", "aprendizaje", "adaptabilidad", "soluciones", "transformar"],
  },
};

export default function Home() {
  const { language } = useLanguage();
  const [displayName, setDisplayName] = useState("");
  const [displayTitle, setDisplayTitle] = useState("");
  const [displayMaster, setDisplayMaster] = useState(""); // ⬅️ NUEVO
  const [isMounted, setIsMounted] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [globalInterval, setGlobalInterval] = useState(null);

  // Usar useEffect para evitar problemas de hidratación
  useEffect(() => {
    setIsMounted(true);

    if (isMounted) {
      setGlobalInterval(80);
      setTimeout(() => {
        setAnimationStarted(true);
      }, 100);
    }
  }, [isMounted]);

  // Renderizar los componentes de texto con palabras animadas
  const renderDescriptionWithAnimatedWords = (descItems) => {
    if (!isMounted) return null;

    return descItems.map((para, index, array) => {
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
          className={`${martianMono.className} text-sm md:text-base leading-relaxed text-gray-300 ${
            index < array.length - 1 ? "mb-4" : ""
          } opacity-100 transition-opacity duration-300`}
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
    if (!isMounted) return;

    const targetName = texts[language].name;
    const targetTitle = texts[language].jobTitle;
    const targetMaster = texts[language].masterTitle; // ⬅️ NUEVO

    // Resetear estados cuando cambia el idioma
    setDisplayName("");
    setDisplayTitle("");
    setDisplayMaster(""); // ⬅️ NUEVO

    const interval = 100;

    let nameInterval;
    let titleInterval;
    let masterInterval; // ⬅️ NUEVO

    // Función para animar el nombre
    const animateName = () => {
      const nameWithoutBreak = targetName.replace("\n", "");
      let currentIndex = 0;
      let stabilityCounter = 0;

      nameInterval = setInterval(() => {
        if (currentIndex >= nameWithoutBreak.length) {
          stabilityCounter++;

          if (stabilityCounter > 8) {
            setDisplayName(targetName);
            return;
          }

          let tempName = "";
          for (let i = 0; i < nameWithoutBreak.length; i++) {
            if (Math.random() > 0.9 - stabilityCounter * 0.1) {
              tempName += effectChars.charAt(Math.floor(Math.random() * effectChars.length));
            } else {
              tempName += nameWithoutBreak[i];
            }
          }

          if (targetName.includes("\n")) {
            const breakPos = targetName.indexOf("\n");
            tempName = tempName.substring(0, breakPos) + "\n" + tempName.substring(breakPos);
          }

          setDisplayName(tempName);
        } else {
          if (Math.random() > 0.5) {
            currentIndex++;
          }

          let tempName = "";
          for (let i = 0; i < nameWithoutBreak.length; i++) {
            if (i < currentIndex) {
              tempName += nameWithoutBreak[i];
            } else {
              tempName += effectChars.charAt(Math.floor(Math.random() * effectChars.length));
            }
          }

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

          if (stabilityCounter > 6) {
            setDisplayTitle(targetTitle);
            return;
          }

          let tempTitle = "";
          for (let i = 0; i < targetTitle.length; i++) {
            if (Math.random() > 0.85 - stabilityCounter * 0.1) {
              tempTitle += effectChars.charAt(Math.floor(Math.random() * effectChars.length));
            } else {
              tempTitle += targetTitle[i];
            }
          }

          setDisplayTitle(tempTitle);
        } else {
          if (Math.random() > 0.4) {
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

    // ⬅️ NUEVO: animación para el Máster, igual que el título
    const animateMaster = () => {
      let currentIndex = 0;
      let stabilityCounter = 0;

      masterInterval = setInterval(() => {
        if (currentIndex >= targetMaster.length) {
          stabilityCounter++;

          if (stabilityCounter > 6) {
            setDisplayMaster(targetMaster);
            return;
          }

          let temp = "";
          for (let i = 0; i < targetMaster.length; i++) {
            if (Math.random() > 0.85 - stabilityCounter * 0.1) {
              temp += effectChars.charAt(Math.floor(Math.random() * effectChars.length));
            } else {
              temp += targetMaster[i];
            }
          }
          setDisplayMaster(temp);
        } else {
          if (Math.random() > 0.4) currentIndex++;

          let temp = "";
          for (let i = 0; i < targetMaster.length; i++) {
            if (i < currentIndex) temp += targetMaster[i];
            else temp += effectChars.charAt(Math.floor(Math.random() * effectChars.length));
          }
          setDisplayMaster(temp);
        }
      }, interval);
    };

    // Iniciar animaciones
    setTimeout(() => {
      animateName();

      setTimeout(() => {
        animateTitle();

        // animamos el master un pelín después del título
        setTimeout(() => {
          animateMaster();
        }, 150);
      }, 150);
    }, 100);

    return () => {
      clearInterval(nameInterval);
      clearInterval(titleInterval);
      clearInterval(masterInterval);
    };
  }, [language, isMounted]);

  // Para prevenir errores de hidratación
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#101827] text-white flex items-center justify-center p-6 md:p-20">
        <div className="max-w-6xl w-full flex flex-col md:grid md:grid-cols-[250px,1fr] gap-6">
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
          <div className="text-center md:text-right">
            <h1 className={`${nixieOne.className} text-4xl md:text-6xl font-light tracking-wider mb-4 text-white`}>
              {texts[language].name}
            </h1>
            <h2 className={`${nixieOne.className} text-lg md:text-xl text-gray-400`}>
              {texts[language].jobTitle}
            </h2>
            {/* ⬇️ Máster en el fallback también */}
            <h3 className={`${nixieOne.className} text-sm md:text-base text-gray-400 mt-1`}>
              {texts[language].masterTitle}
            </h3>
          </div>
          <div className="col-span-2 mt-6">
            <div className={`${martianMono.className} text-sm md:text-base text-gray-300 h-20`}></div>
          </div>
        </div>
      </div>
    );
  }

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

        {/* Nombre y títulos */}
        <div className="text-center md:text-right">
          <h1
            className={`${nixieOne.className} text-4xl md:text-6xl font-light tracking-wider mb-4 text-white transition-all duration-500`}
          >
            {displayName.split("\n").map((line, index, arr) => (
              <span key={index}>
                {line}
                {index !== arr.length - 1 && <br />}
              </span>
            ))}
          </h1>

          {/* Título principal */}
          <h2 className={`${nixieOne.className} text-lg md:text-xl text-gray-400 transition-all duration-500`}>
            {displayTitle}
          </h2>

          {/* ⬇️ Nuevo: Máster justo debajo, mismo estilo un poco más pequeño */}
          <h3 className={`${nixieOne.className} text-sm md:text-base text-gray-400 mt-1 transition-all duration-500`}>
            {displayMaster}
          </h3>
        </div>

        {/* Descripción */}
        <div className="col-span-2 mt-6">
          {renderDescriptionWithAnimatedWords(texts[language].description)}
        </div>
      </div>
    </div>
  );
}