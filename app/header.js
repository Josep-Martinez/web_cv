"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Sobre mi" },
    { href: "/works", label: "Trayectoria" },
    { href: "/projects", label: "Proyectos" },
    { href: "/contact", label: "Contacto" },
  ];

  return (
    <header className="w-full py-4 bg-gray-900 text-white fixed top-0 z-50 shadow-md">
      <div className="max-w-6xl w-full mx-auto flex justify-between items-center font-mono">
        {/* Nombre a la izquierda */}
        <div className="text-xl font-bold">
          <Link href="/" className="no-underline text-white">
            JOSEP MARTÍNEZ BOIX
          </Link>
        </div>
        {/* Navegación a la derecha */}
        <nav className="flex gap-8">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-blue-500 ${
                  isActive ? "line-through" : ""
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}