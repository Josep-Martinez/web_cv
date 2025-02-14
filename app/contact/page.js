"use client";
import { Nixie_One, Martian_Mono } from "next/font/google";
import { Terminal, Github, Linkedin, Mail, MapPin } from "lucide-react";
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
    title: "Contact",
    whoami: "whoami",
    identity: "Josep Martínez Boix - Developer & Data Engineer",
    location: "Valencia, Valencian Community, Spain",
    contactList: "contact --list-all",
    messageCommand: "get message",
    messageText: "Let's talk! I am always open to new opportunities.",
  },
  ES: {
    title: "Contacto",
    whoami: "whoami",
    identity: "Josep Martínez Boix - Desarrollador & Ingeniero de Datos",
    location: "Valencia, Comunidad Valenciana, España",
    contactList: "contact --list-all",
    messageCommand: "get message",
    messageText: "¡Hablemos! Estoy siempre abierto a nuevas oportunidades.",
  },
};

export default function ContactPage() {
  const { language } = useLanguage(); // Obtener el idioma actual

  return (
    <div className="min-h-screen bg-[#101827] text-white p-6 md:p-20">
      <div className="max-w-4xl mx-auto">
        
        <div className="bg-[#1a2537] rounded-lg p-6 md:p-10 shadow-xl">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 border-b border-gray-700 pb-4 mb-6">
            <Terminal className="text-green-500 w-6 h-6 md:w-8 md:h-8" />
            <span className={`${martianMono.className} text-green-500 text-sm md:text-base`}>
              contact.exe
            </span>
          </div>

          {/* Terminal Content */}
          <div className={`${martianMono.className} space-y-6 text-sm md:text-lg`}>
            <div className="typing-animation">
              <span className="text-green-500 text-sm md:text-lg">$ </span>
              <span className="text-blue-400 text-sm md:text-lg">{texts[language].whoami}</span>
            </div>
            <div className="typing-animation-2 text-gray-300">
              {texts[language].identity}
            </div>

            {/* Ubicación después de "whoami" */}
            <div className="typing-animation-3 flex items-center gap-3">
              <MapPin className="text-gray-400 w-5 h-5 md:w-6 md:h-6" />
              <span className="text-gray-300">{texts[language].location}</span>
            </div>

            {/* Contact list command */}
            <div className="typing-animation-4">
              <span className="text-green-500 text-sm md:text-lg">$ </span>
              <span className="text-blue-400 text-sm md:text-lg">{texts[language].contactList}</span>
            </div>

            {/* Contact list items */}
            <div className="typing-animation-5 flex items-center gap-3">
              <Mail className="text-gray-400 w-5 h-5 md:w-6 md:h-6" />
              <a href="mailto:jmartinezboix@gmail.com" className="text-gray-300 hover:text-blue-400 transition-colors">
                jmartinezboix@gmail.com
              </a>
            </div>

            <div className="typing-animation-6 flex items-center gap-3">
              <Linkedin className="text-gray-400 w-5 h-5 md:w-6 md:h-6" />
              <a href="https://www.linkedin.com/in/josepmartinezboix/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-gray-300 hover:text-blue-400 transition-colors">
                linkedin.com/in/josepmartinezboix
              </a>
            </div>

            <div className="typing-animation-7 flex items-center gap-3">
              <Github className="text-gray-400 w-5 h-5 md:w-6 md:h-6" />
              <a href="https://github.com/Josep-martinez" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-gray-300 hover:text-blue-400 transition-colors">
                github.com/Josep-martinez
              </a>
            </div>

            {/* get message en una línea y su salida en otra */}
            <div className="typing-animation-8">
              <span className="text-green-500 text-sm md:text-lg">$ </span>
              <span className="text-blue-400 text-sm md:text-lg">{texts[language].messageCommand}</span>
            </div>
            <div className="typing-animation-9 text-gray-300">
              {texts[language].messageText}
            </div>

            <div className="animate-blink">
              <span className="text-green-500 text-sm md:text-lg">$ </span>
              <span className="text-gray-400">█</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
