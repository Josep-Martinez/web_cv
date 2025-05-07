import "./globals.css";
import { Nixie_One, Martian_Mono } from "next/font/google";
import Header from "../app/header";
import { LanguageProvider } from "../app/LanguageContext"; // Importa el contexto
import LanguageButton from "../app/LanguageButton"; // Importa el botón de idioma
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

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
        <LanguageProvider> {/* Ahora toda la app puede cambiar de idioma */}
          <Header />
          <main className="mt-20 md:mt-16">{children}</main>
          <LanguageButton /> {/* Agregamos el botón en toda la app */}
        </LanguageProvider>
        <SpeedInsights/>
        <Analytics />
      </body>
    </html>
  );
}
