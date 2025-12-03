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
  title: {
    default: "Josep Martínez Boix - Computer Engineer & Data Engineer",
    template: "%s | Josep Martínez Boix"
  },
  description: "Portfolio of Josep Martínez Boix, Computer Engineer and Data Engineer specialized in FinTech & Blockchain. Explore my professional journey, projects, and technical expertise in software development and data engineering.",
  keywords: ["Josep Martínez Boix", "Computer Engineer", "Data Engineer", "FinTech", "Blockchain", "Software Developer", "Portfolio", "Valencia", "Web Development", "MDM", "Dell Boomi", "Microsoft Dynamics"],
  authors: [{ name: "Josep Martínez Boix", url: "https://josepmartinezboix.com" }],
  creator: "Josep Martínez Boix",
  publisher: "Josep Martínez Boix",
  metadataBase: new URL('https://josepmartinezboix.com'),
  alternates: {
    canonical: '/',
    languages: {
      'es': '/es',
      'en': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    alternateLocale: ['en_US'],
    url: 'https://josepmartinezboix.com',
    title: 'Josep Martínez Boix - Computer Engineer & Data Engineer',
    description: 'Portfolio of Josep Martínez Boix, Computer Engineer and Data Engineer specialized in FinTech & Blockchain. Explore my professional journey, projects, and technical expertise.',
    siteName: 'Josep Martínez Boix Portfolio',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Josep Martínez Boix - Computer Engineer & Data Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Josep Martínez Boix - Computer Engineer & Data Engineer',
    description: 'Portfolio of Josep Martínez Boix, Computer Engineer and Data Engineer specialized in FinTech & Blockchain.',
    images: ['/opengraph-image.png'],
    creator: '@josepmartinezboix',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code', // User should replace this with actual verification code
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#0a192f" />
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