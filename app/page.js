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

export default function Home() {
  const { language } = useLanguage(); // Obtener el idioma actual

  // Traducciones
  const texts = {
    EN: {
      name: "JOSEP MARTÍNEZ BOIX",
      jobTitle: "Computer Engineer",
      description: "I am a proactive and hardworking person with a strong interest in data analysis and computer technology. I have experience in problem-solving and customer support, focusing on providing effective solutions. I am looking for opportunities to work in dynamic environments that drive my professional development.",
    },
    ES: {
      name: "JOSEP MARTÍNEZ BOIX",
      jobTitle: "Ingeniero de Computadores",
      description: "Soy una persona proactiva y trabajadora, con gran interés en el análisis de datos y la tecnología informática. Tengo experiencia en la resolución de problemas y atención al cliente, centrándome en proporcionar soluciones efectivas. Estoy en búsqueda de oportunidades de trabajo en entornos dinámicos que impulsen mi desarrollo.",
    },
  };

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
            {texts[language].name}
          </h1>
          <h2 className={`${nixieOne.className} text-lg md:text-xl text-gray-400`}>
            {texts[language].jobTitle}
          </h2>
        </div>

        {/* Descripción */}
        <div className="col-span-2 mt-6">
          <p className={`${martianMono.className} text-sm md:text-base leading-relaxed text-gray-300`}>
            {texts[language].description}
          </p>
        </div>
      </div>
    </div>
  );
}