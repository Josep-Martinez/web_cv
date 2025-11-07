// app/fonts.js  (Server Module por defecto)
import { Nixie_One, Martian_Mono } from "next/font/google";

export const nixieOne = Nixie_One({
  weight: "400",
  subsets: ["latin"],
});

export const martianMono = Martian_Mono({
  weight: "400",
  subsets: ["latin"],
});