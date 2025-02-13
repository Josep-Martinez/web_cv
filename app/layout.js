import "./globals.css";
import { Nixie_One, Martian_Mono } from "next/font/google";
import Header from "../app/header"; // Ruta correcta para importar el Header

const nixieOne = Nixie_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-nixie-one",
});

const martianMono = Martian_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-martian-mono",
});

export const metadata = {
  title: "Josep Martínez Boix",
  description: "Portafolio de Josep Martínez Boix",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${nixieOne.variable} ${martianMono.variable} antialiased bg-[#101827] text-white`}>
        <Header /> {/* El Header se muestra en todas las páginas */}
        <main className="mt-16">{children}</main> {/* Asegura espacio debajo del Header */}
      </body>
    </html>
  );
}
