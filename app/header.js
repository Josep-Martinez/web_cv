"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../app/LanguageContext"; // Importar el contexto de idioma

export default function Header() {
  const pathname = usePathname();
  const { language } = useLanguage(); // Obtener el idioma actual

  // Traducciones del Header
  const texts = {
    EN: {
      about: "About Me",
      experience: "Career Path",
      projects: "Projects",
      chat: "Chat",
      contact: "Contact",
    },
    ES: {
      about: "Sobre mí",
      experience: "Trayectoria",
      projects: "Proyectos",
      chat: "Chat",
      contact: "Contacto",
    },
  };

  return (
    <header className="w-full py-2 md:py-4 bg-gray-900 text-white fixed top-0 z-50 shadow-lg">
      <div className="max-w-7xl w-full mx-auto flex items-center px-6 md:px-12 justify-center sm:justify-between">
        {/* Nombre (Solo visible en pantallas grandes) */}
        <div className="hidden sm:block text-2xl md:text-4xl font-bold tracking-wide">
          <Link href="/" className="no-underline text-white">
            JOSEP MARTÍNEZ BOIX
          </Link>
        </div>

        {/* Navegación (Centrada en móviles, normal en escritorio) */}
        <nav className="flex gap-4 md:gap-8 text-sm md:text-lg font-medium">
          <Link
            href="/"
            className={`transition-colors hover:text-blue-500 ${
              pathname === "/" ? "line-through text-blue-500" : "text-white"
            }`}
          >
            {texts[language].about}
          </Link>
          <Link
            href="/works"
            className={`transition-colors hover:text-blue-500 ${
              pathname === "/works" ? "line-through text-blue-500" : "text-white"
            }`}
          >
            {texts[language].experience}
          </Link>
          <Link
            href="/projects"
            className={`transition-colors hover:text-blue-500 ${
              pathname === "/projects" ? "line-through text-blue-500" : "text-white"
            }`}
          >
            {texts[language].projects}
          </Link>
          <Link
            href="/contact"
            className={`transition-colors hover:text-blue-500 ${
              pathname === "/contact" ? "line-through text-blue-500" : "text-white"
            }`}
          >
            {texts[language].contact}
          </Link>
        </nav>
      </div>
    </header>
  );
}