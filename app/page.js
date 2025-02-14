"use client";
import Image from "next/image";
import { Nixie_One, Martian_Mono } from "next/font/google";
import { useLanguage } from "../app/LanguageContext"; // Importar el contexto de idioma

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
    name: "JOSEP\nMARTINEZ BOIX",
    jobTitle: "Computer Engineer",
    description: [
      <>
        Hello, I’m Josep Martínez Boix. My passion for{" "}
        <span className="line-through text-blue-500">innovation</span> and continuous{" "}
        <span className="line-through text-blue-500">learning</span> has led me to transform every challenge into an opportunity for growth, both professionally and personally.
      </>,
      <>
        With a solid background and experience in computer engineer, I’ve learned that the key to success lies in combining creativity,{" "}
        <span className="line-through text-blue-500">adaptability</span> and a proactive attitude toward change. Every project I undertake is a chance to explore new ideas and provide{" "}
        <span className="line-through text-blue-500">solutions</span> to complex problems.
      </>,
      <>
        I firmly believe that technology and creativity can merge to{" "}
        <span className="line-through text-blue-500">transform</span> realities, and this conviction drives my career. In this space, I share not only my professional journey but also the projects and ideas that inspire me to continually reinvent myself.
      </>,
      <>
        Thank you for visiting, and I invite you to explore my professional world.
      </>,
    ],
  },
  ES: {
    name: "JOSEP\nMARTINEZ BOIX",
    jobTitle: "Ingeniero de Computadores",
    description: [
      <>
        Hola, soy Josep Martínez Boix. Mi pasión por la{" "}
        <span className="line-through text-blue-500">innovación</span> y el{" "}
        <span className="line-through text-blue-500">aprendizaje</span> continuo me ha llevado a transformar cada desafío en una oportunidad para crecer, tanto profesional como personalmente.
      </>,
      <>
        Con una sólida formación en ingeniería informática, he aprendido que la clave del éxito radica en combinar creatividad,{" "}
        <span className="line-through text-blue-500">adaptabilidad</span> y una actitud proactiva ante los cambios. Cada proyecto en el que me involucro es una ocasión para explorar nuevas ideas y aportar{" "}
        <span className="line-through text-blue-500">soluciones</span> originales a problemas complejos.
      </>,
      <>
        Creo firmemente que la tecnología y la creatividad pueden fusionarse para{" "}
        <span className="line-through text-blue-500">transformar</span> realidades, y es esta convicción la que impulsa mi trayectoria. En este espacio, comparto no solo mi recorrido profesional, sino también las inquietudes y proyectos que me inspiran a seguir reinventándome día a día.
      </>,
      <>
        Gracias por visitarme. Te invito a descubrir mi mundo profesional.
      </>,
    ],
  },
};

export default function Home() {
  const { language } = useLanguage(); // Obtener el idioma actual

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
          <h1 className={`${nixieOne.className} text-4xl md:text-6xl font-light tracking-wider mb-4`}>
            {texts[language].name.split("\n").map((line, index, arr) => (
              <span key={index}>
                {line}
                {index !== arr.length - 1 && <br />}
              </span>
            ))}
          </h1>
          <h2 className={`${nixieOne.className} text-lg md:text-xl text-gray-400`}>
            {texts[language].jobTitle}
          </h2>
        </div>

        {/* Descripción */}
        <div className="col-span-2 mt-6">
          {texts[language].description.map((para, index, array) => (
            <p
              key={index}
              className={`${martianMono.className} text-sm md:text-base leading-relaxed text-gray-300 ${index < array.length - 1 ? "mb-4" : ""}`}
              style={{ textAlign: "justify" }}
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}