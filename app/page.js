// app/page.js
import Image from 'next/image';
import { Nixie_One } from 'next/font/google';
import { Martian_Mono } from 'next/font/google';

const nixieOne = Nixie_One({
  weight: '400',
  subsets: ['latin'],
});

const martianMono = Martian_Mono({
  weight: '400',
  subsets: ['latin'],
});

export default function Home() {
  return (
    <div className="min-h-screen bg-[#101827] text-white flex items-center justify-center p-8">
      <div className="max-w-6xl w-full grid grid-cols-[250px,1fr] gap-4">
        {/* Fila 1: Foto en la primera columna - se sube con -mt-6 */}
        <div className="flex justify-center" style={{ marginTop: '-6.5rem' }}>
          <Image
            className="rounded-full"
            src="/foto_cv.png"  // Asegúrate de que esté en public/
            alt="Foto de Josep Martínez Boix"
            width={250}
            height={250}
            priority
          />
        </div>
        {/* Fila 1: Título en la segunda columna */}
        <div className="text-right">
          <h1 className={`${nixieOne.className} text-6xl font-light tracking-wider mb-4`}>
            JOSEP<br />MARTINEZ BOIX
          </h1>
          <h2 className={`${nixieOne.className} text-xl text-gray-400`}>
            INGENIERO DE COMPUTADORES
          </h2>
        </div>
        {/* Fila 2: Descripción larga que abarca ambas columnas */}
        <div className="col-span-2 mt-10">
          <p className={`${martianMono.className} text-sm leading-relaxed text-gray-300`}>
            Soy una persona proactiva e trabajadora, con gran interés en el análisis de datos y la tecnología informática. Tengo experiencia en la resolución de problemas y atención al cliente, centrándome en proporcionar soluciones efectivas. Estoy en búsqueda de oportunidades de trabajo en entornos dinámicos que impulsen mi desarrollo.
          </p>
        </div>
      </div>
    </div>
  );
}