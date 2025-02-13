"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Sobre mí" },
    { href: "/works", label: "Trayectoria" },
    { href: "/projects", label: "Proyectos" },
    { href: "/contact", label: "Contacto" },
  ];

  return (
    <header className="w-full py-6 md:py-8 bg-gray-900 text-white fixed top-0 z-50 shadow-lg">
      <div className="max-w-7xl w-full mx-auto flex items-center px-6 md:px-12 
                      justify-center sm:justify-between">
        {/* Nombre (Solo visible en pantallas grandes) */}
        <div className="hidden sm:block text-2xl md:text-4xl font-bold tracking-wide">
          <Link href="/" className="no-underline text-white hover:text-blue-400 transition-colors">
            JOSEP MARTÍNEZ BOIX
          </Link>
        </div>

        {/* Navegación (Centrada en móviles, normal en escritorio) */}
        <nav className="flex gap-4 md:gap-8 text-sm md:text-lg font-medium">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-blue-500 ${
                pathname === link.href ? "line-through text-blue-500" : "text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}