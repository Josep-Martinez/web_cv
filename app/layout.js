// app/layout.js
import "./globals.css";
import { Outfit, Inter, Martian_Mono } from "next/font/google";
import Header from "../app/header";
import { LanguageProvider } from "../app/LanguageContext";
import LanguageButton from "../app/LanguageButton";
import { LanguageTransitionProvider } from "../app/components/layout/LanguageTransitionProvider";
import StarBackground from "../app/components/layout/StarBackground";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
      <body className={`${outfit.variable} ${inter.variable} ${martianMono.variable} antialiased bg-navy-900 text-slate-light selection:bg-electric selection:text-navy-900`}>
        <StarBackground />
        <LanguageTransitionProvider>
          <LanguageProvider>
            <Header />
            <main className="mt-20 md:mt-16">{children}</main>
            <LanguageButton />
          </LanguageProvider>
        </LanguageTransitionProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}