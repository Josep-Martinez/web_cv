"use client";
import { Nixie_One, Martian_Mono } from "next/font/google";
import Image from "next/image";

const nixieOne = Nixie_One({
  weight: "400",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  weight: "400",
  subsets: ["latin"],
});

const experiences = [
  {
    id: 1,
    title: "Data Engineer Intern",
    company: "Infoverity",
    period: "Octubre 2024 - Actualidad",
    location: "Valencia, Comunidad Valenciana",
    description: "Prácticas como Data Engineer, trabajando con tecnologías MDM y herramientas cloud.",
    skills: "Informática MDM, Dell Boomi, Aplicaciones en la nube, Gestión de datos maestros",
    logo: "/infoverity_logo.jpeg"
  },
  {
    id: 2,
    title: "Developer",
    company: "Lãberit",
    period: "Febrero 2022 - Julio 2022",
    location: "Valencia, Comunidad Valenciana",
    description: "Desarrollo en Microsoft Dynamics ERP y Power Platform, con enfoque en investigación y desarrollo de soluciones empresariales.",
    skills: "Programación, Microsoft Dynamics ERP, Microsoft Power Automate, PowerApps, Dynamics NAV, I+D",
    logo: "/laberit_logo.jpeg"
  },
  {
    id: 3,
    title: "Conductor",
    company: "SACYR",
    period: "Julio 2023 - Septiembre 2023 | Agosto 2022 - Septiembre 2022",
    location: "L'Alcúdia, Comunidad Valenciana",
    description: "Conductor de personas mayores en el Centro de Dia de L'Alcúdia, desarrollando habilidades en gestión y atención de personas mayores.",
    skills: "Gestión de personas, Habilidades sociales, Personas mayores, Actitud positiva",
    logo: "/sacyr_logo.jpeg"
  },
  {
    id: 4,
    title: "Diseñador de páginas web",
    company: "Centro SomRiure",
    period: "Julio 2021 - Agosto 2021",
    location: "L'Alcúdia, Comunidad Valenciana",
    description: "Diseño y desarrollo de la página web corporativa utilizando WordPress y tecnologías web modernas.",
    skills: "WordPress, HTML, CSS, Adobe Photoshop, Diseño web, Programación",
    logo: "/somriure.png"
  },
  {
    id: 5,
    title: "Árbitro de fútbol",
    company: "FFCV - Federació Futbol Comunitat Valenciana",
    period: "Septiembre 2020 - Julio 2024",
    location: "Alberic, Comunidad Valenciana",
    description: "Arbitraje de partidos de fútbol, desarrollando habilidades de liderazgo, comunicación y gestión de conflictos.",
    skills: "Hablar en público, Resolución de conflictos, Facilidad de adaptación, Actitud positiva",
    logo: "/ffcv_logo.jpeg"
  }
];

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-[#101827] text-white p-6 md:p-20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className={`${nixieOne.className} text-4xl md:text-7xl font-bold tracking-wider mb-10`}>
            Experiencia
          </h1>
          <p className={`${martianMono.className} text-sm md:text-base text-gray-300`}>
            Esta sección presenta una visión integral de mi{" "}
            <span className="line-through text-blue-500">trayectoria profesional</span>, un recorrido marcado por la evolución constante y la superación de desafíos en diversos contextos. 
            A lo largo de mi carrera, he cultivado <span className="line-through text-blue-500">habilidades</span> técnicas y estratégicas que me permiten{" "}
            <span className="line-through text-blue-500">adaptarme</span> y generar soluciones innovadoras.
          </p>
        </div>

        <div className="relative">
          {/* Línea central solo en pantallas grandes */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-700 hidden md:block"></div>

          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative mb-16">
              {/* Punto de conexión en el timeline, solo en pantallas grandes */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-700 rounded-full hidden md:block"></div>

              {/* Contenedor de la experiencia */}
              <div className={`flex w-full flex-col md:flex-row ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                <div className={`w-7/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
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
                        <h3 className={`${nixieOne.className} text-2xl font-bold text-blue-400`}>
                          {exp.title}
                        </h3>
                        <h4 className={`${martianMono.className} text-sm text-gray-400`}>
                          {exp.company}
                        </h4>
                      </div>
                    </div>
                    
                    <p className={`${martianMono.className} text-xs text-gray-500 mb-3`}>
                      {exp.period} | {exp.location}
                    </p>
                    <p className={`${martianMono.className} text-sm text-gray-300 mb-4 text-justify`}>
                      {exp.description}
                    </p>
                    <div className="border-t border-gray-700 pt-3">
                      <p className={`${martianMono.className} text-xs text-blue-400 text-justify`}>
                        <span className="font-bold">Aptitudes:</span> {exp.skills}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}