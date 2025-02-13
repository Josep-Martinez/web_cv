"use client";
import { Nixie_One, Martian_Mono } from "next/font/google";
import { Terminal, Github, Linkedin, Mail, MapPin } from "lucide-react";

const nixieOne = Nixie_One({
  weight: "400",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  weight: "400",
  subsets: ["latin"],
});

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#101827] text-white p-20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className={`${nixieOne.className} text-7xl font-bold tracking-wider mb-10`}>
            Contacto
          </h1>
        </div>

        <div className="bg-[#1a2537] rounded-lg p-6 shadow-xl">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 border-b border-gray-700 pb-4 mb-6">
            <Terminal className="text-green-500" />
            <span className={`${martianMono.className} text-green-500`}>contact.exe</span>
          </div>

          {/* Terminal Content */}
          <div className={`${martianMono.className} space-y-6`}>
            {/* whoami en una línea y su salida en otra */}
            <div className="typing-animation">
              <span className="text-green-500">$ </span>
              <span className="text-blue-400">whoami</span>
            </div>
            <div className="typing-animation-2 text-gray-300">
              Josep Martínez Boix - Developer & Data Engineer
            </div>

            {/* Ubicación después de "whoami" */}
            <div className="typing-animation-3">
              <div className="flex items-center gap-3">
                <MapPin className="text-gray-400" />
                <span className="text-gray-300">Valencia, Comunidad Valenciana, España</span>
              </div>
            </div>

            {/* Contact list command */}
            <div className="typing-animation-4">
              <span className="text-green-500">$ </span>
              <span className="text-blue-400">contact --list-all</span>
            </div>

            {/* Contact list items */}
            <div className="typing-animation-5 flex items-center gap-3">
              <Mail className="text-gray-400" />
              <a href="mailto:jmartinezboix@gmail.com" 
                 className="text-gray-300 hover:text-blue-400 transition-colors">
                jmartinezboix@gmail.com
              </a>
            </div>

            <div className="typing-animation-6 flex items-center gap-3">
              <Linkedin className="text-gray-400" />
              <a href="https://www.linkedin.com/in/josepmartinezboix/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-gray-300 hover:text-blue-400 transition-colors">
                linkedin.com/in/josepmartinezboix
              </a>
            </div>

            <div className="typing-animation-7 flex items-center gap-3">
              <Github className="text-gray-400" />
              <a href="https://github.com/Josep-martinez" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-gray-300 hover:text-blue-400 transition-colors">
                github.com/Josep-martinez
              </a>
            </div>

            {/* get message en una línea y su salida en otra */}
            <div className="typing-animation-8">
              <span className="text-green-500">$ </span>
              <span className="text-blue-400">get message</span>
            </div>
            <div className="typing-animation-9 text-gray-300">
              ¡Hablemos! Estoy siempre abierto a nuevas oportunidades y colaboraciones.
            </div>

            <div className="animate-blink">
              <span className="text-green-500">$ </span>
              <span className="text-gray-400">█</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
