"use client";
import Image from "next/image";
import { Nixie_One, Martian_Mono } from "next/font/google";

const nixieOne = Nixie_One({
  weight: "400",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="min-h-screen bg-[#101827] text-white flex items-center justify-center p-6 md:p-20">
      <div className="max-w-6xl w-full flex flex-col md:grid md:grid-cols-[250px,1fr] gap-6">
        {/* Foto en la primera columna */}
        <div className="flex justify-center md:mt-[-6.5rem]">
          <Image
            className="rounded-full"
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
            JOSEP<br />MARTÍNEZ BOIX
          </h1>
          <h2 className={`${nixieOne.className} text-lg md:text-xl text-gray-400`}>
            INGENIERO DE COMPUTADORES
          </h2>
        </div>

        {/* Descripción */}
        <div className="col-span-2 mt-6">
          <p className={`${martianMono.className} text-sm md:text-base leading-relaxed text-gray-300`}>
            Soy una persona proactiva y trabajadora, con gran interés en el análisis de datos y la tecnología informática. 
            Tengo experiencia en la resolución de problemas y atención al cliente, centrándome en proporcionar soluciones efectivas. 
            Estoy en búsqueda de oportunidades de trabajo en entornos dinámicos que impulsen mi desarrollo.
          </p>
        </div>
      </div>
    </div>
  );
}