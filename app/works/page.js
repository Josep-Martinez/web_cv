"use client";
import { Nixie_One, Martian_Mono } from "next/font/google";
import Image from "next/image";
import { useLanguage } from "../../app/LanguageContext"; // Importar el contexto de idioma

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
    title: "Career Path",
    description: (
      <>
        This section presents a comprehensive view of my{" "}
        <span className="line-through text-blue-500">professional journey</span>, a path marked by constant evolution and overcoming challenges in various contexts. 
        Throughout my career, I have cultivated{" "}
        <span className="line-through text-blue-500">technical skills</span> and strategic thinking that allow me to{" "}
        <span className="line-through text-blue-500">adapt</span> and generate innovative solutions.
      </>
    ),
    experiences: [
      {
        title: "Data Engineer Intern",
        company: "Infoverity",
        period: "October 2024 - Present",
        location: "Valencia, Valencian Community, Spain",
        description: "Internship as a Data Engineer, working with MDM technologies and cloud tools.",
        skills: "Informatica MDM, Dell Boomi, Cloud Applications, Master Data Management",
        logo: "/infoverity_logo.jpeg",
      },
      {
        title: "Developer",
        company: "Lãberit",
        period: "February 2022 - July 2022",
        location: "Valencia, Valencian Community, Spain",
        description: "Development in Microsoft Dynamics ERP and Power Platform, focused on research and business solutions.",
        skills: "Programming, Microsoft Dynamics ERP, Microsoft Power Automate, PowerApps, Dynamics NAV, R&D",
        logo: "/laberit_logo.jpeg",
      },
      {
        title: "Driver",
        company: "SACYR",
        period: "July 2023 - September 2023 & August 2022 - September 2022",
        location: "L'Alcúdia, Valencian Community, Spain",
        description: "Driver for elderly people at the L'Alcúdia Day Center, developing skills in management and elderly care.",
        skills: "People Management, Social Skills, Elderly Care, Positive Attitude",
        logo: "/sacyr_logo.jpeg",
      },
      {
        title: "Web Designer",
        company: "Centro SomRiure",
        period: "July 2021 - August 2021",
        location: "L'Alcúdia, Valencian Community, Spain",
        description: "Design and development of the corporate website using WordPress and modern web technologies.",
        skills: "WordPress, HTML, CSS, Adobe Photoshop, Web Design, Programming",
        logo: "/somriure.png",
      },
      {
        title: "Football Referee",
        company: "FFCV - Federació Futbol Comunitat Valenciana",
        period: "September 2020 - July 2024",
        location: "Alberic, Valencian Community, Spain",
        description: "Refereeing football matches, developing leadership, communication, and conflict management skills.",
        skills: "Public Speaking, Conflict Resolution, Adaptability, Positive Attitude",
        logo: "/ffcv_logo.jpeg",
      },
    ],
  },
  ES: {
    title: "Trayectoria",
    description: (
      <>
        Esta sección presenta una visión integral de mi{" "}
        <span className="line-through text-blue-500">trayectoria profesional</span>, un recorrido marcado por la evolución constante y la superación de desafíos en diversos contextos. 
        A lo largo de mi carrera, he cultivado{" "}
        <span className="line-through text-blue-500">habilidades</span> técnicas y estratégicas que me permiten{" "}
        <span className="line-through text-blue-500">adaptarme</span> y generar soluciones innovadoras.
      </>
    ),
    experiences: [
      {
        title: "Data Engineer Intern",
        company: "Infoverity",
        period: "Octubre 2024 - Actualidad",
        location: "Valencia, Comunidad Valenciana, España",
        description: "Prácticas como Data Engineer, trabajando con tecnologías MDM y herramientas cloud.",
        skills: "Informática MDM, Dell Boomi, Aplicaciones en la nube, Gestión de datos maestros",
        logo: "/infoverity_logo.jpeg",
      },
      {
        title: "Developer",
        company: "Lãberit",
        period: "Febrero 2022 - Julio 2022",
        location: "Valencia, Comunidad Valenciana, España",
        description: "Desarrollo en Microsoft Dynamics ERP y Power Platform, con enfoque en investigación y desarrollo de soluciones empresariales.",
        skills: "Programación, Microsoft Dynamics ERP, Microsoft Power Automate, PowerApps, Dynamics NAV, I+D",
        logo: "/laberit_logo.jpeg",
      },
      {
        title: "Conductor",
        company: "SACYR",
        period: "Julio 2023 - Septiembre 2023 & Agosto 2022 - Septiembre 2022",
        location: "L'Alcúdia, Comunidad Valenciana, España",
        description: "Conductor de personas mayores en el Centro de Dia de L'Alcúdia, desarrollando habilidades en gestión y atención de personas mayores.",
        skills: "Gestión de personas, Habilidades sociales, Personas mayores, Actitud positiva",
        logo: "/sacyr_logo.jpeg",
      },
      {
        title: "Diseñador de páginas web",
        company: "Centro SomRiure",
        period: "Julio 2021 - Agosto 2021",
        location: "L'Alcúdia, Comunidad Valenciana, España",
        description: "Diseño y desarrollo de la página web corporativa utilizando WordPress y tecnologías web modernas.",
        skills: "WordPress, HTML, CSS, Adobe Photoshop, Diseño web, Programación",
        logo: "/somriure.png",
      },
      {
        title: "Árbitro de fútbol",
        company: "FFCV - Federació Futbol Comunitat Valenciana",
        period: "Septiembre 2020 - Julio 2024",
        location: "Alberic, Comunidad Valenciana, España",
        description: "Arbitraje de partidos de fútbol, desarrollando habilidades de liderazgo, comunicación y gestión de conflictos.",
        skills: "Hablar en público, Resolución de conflictos, Facilidad de adaptación, Actitud positiva",
        logo: "/ffcv_logo.jpeg",
      },
    ],
  },
};

export default function ExperiencePage() {
  const { language } = useLanguage(); // Obtener el idioma actual

  return (
    <div className="min-h-screen bg-[#101827] text-white p-6 md:p-20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className={`${nixieOne.className} text-4xl md:text-7xl font-bold tracking-wider mb-10`}>
            {texts[language].title}
          </h1>
          <p className={`${martianMono.className} text-sm md:text-base text-gray-300`}>
            {texts[language].description}
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-700 hidden md:block"></div>

          {texts[language].experiences.map((exp, index) => (
            <div key={index} className="relative mb-16">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-700 rounded-full hidden md:block"></div>

              <div className={`flex w-full flex-col md:flex-row ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                <div className="w-full md:w-7/12 px-6 md:px-0 text-left md:text-left">
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
                      <h3 className={`${nixieOne.className} text-2xl font-bold text-blue-400 ${index % 2 !== 0 ? 'text-right' : 'text-left'}`}>
                          {exp.title}
                        </h3>
                        <h4 className={`${martianMono.className} text-sm text-gray-400 ${index % 2 !== 0 ? 'text-right' : 'text-left'}`}>
                          {exp.company}
                        </h4>
                      </div>
                    </div>
                    
                    <p className={`${martianMono.className} text-xs text-gray-500 mb-3`}>
                      {exp.period} | {exp.location}
                    </p>
                    <p className={`${martianMono.className} text-sm text-gray-300 mb-4`}>
                      {exp.description}
                    </p>
                    <div className="border-t border-gray-700 pt-3">
                      <p className={`${martianMono.className} text-xs text-blue-400`}>
                        <span className="font-bold">{language === "EN" ? "Skills" : "Aptitudes"}:</span> {exp.skills}
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