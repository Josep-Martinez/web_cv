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

const projects = [
  {
    id: 1,
    name: "Pagina Web SomRiiure",
    image: "/somriure.png",
  },
  {
    id: 2,
    name: "LibsTalk",
    image: "/lipstalk.png",
  },
  {
    id: 3,
    name: "Pagina Web Curriculum",
    image: "/pgweb.png",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#101827] text-white p-6 md:p-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className={`${nixieOne.className} text-4xl md:text-7xl font-bold tracking-wider mb-10`}>
            Proyectos
          </h1>
          <p className={`${martianMono.className} text-sm md:text-base text-gray-300`}>
            En esta sección encontrará una selección representativa de{" "}
            <span className="line-through text-blue-700">proyectos individuales</span> que ilustran mi experiencia profesional y mi capacidad para abordar desafíos de forma estructurada y creativa. 
            Cada proyecto es fruto de un esfuerzo personal y ha sido desarrollado con un enfoque en la{" "}
            <span className="line-through text-blue-700">calidad</span> y la{" "}
            <span className="line-through text-blue-700">innovación</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="relative group overflow-hidden">
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
  );
}