// app/components/ExperienceItem.js
import React from 'react';
import Image from 'next/image';
import { Nixie_One, Martian_Mono } from "next/font/google";

const nixieOne = Nixie_One({
  weight: "400",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  weight: "400",
  subsets: ["latin"],
});

const ExperienceItem = ({ experience, index, language }) => {
  return (
    <div className="relative mb-16">
      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-700 rounded-full hidden md:block"></div>

      <div className={`flex w-full flex-col md:flex-row ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
        <div className="w-full md:w-7/12 px-6 md:px-0 text-left md:text-left">
          <div className="bg-[#1a2537] p-6 rounded-lg shadow-lg hover:bg-[#1e2c42] transition-colors duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className={`${index % 2 === 0 ? 'order-2' : 'order-1'}`}>
                <div className="relative w-16 h-16 bg-white rounded-full overflow-hidden">
                  <Image
                    src={experience.logo}
                    alt={`${experience.company} logo`}
                    width={64}
                    height={64}
                    className="object-contain p-2"
                  />
                </div>
              </div>
              <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                <h3 className={`${nixieOne.className} text-2xl font-bold text-blue-400 ${index % 2 !== 0 ? 'text-right' : 'text-left'}`}>
                  {experience.title}
                </h3>
                <h4 className={`${martianMono.className} text-sm text-gray-400 ${index % 2 !== 0 ? 'text-right' : 'text-left'}`}>
                  {experience.company}
                </h4>
              </div>
            </div>
            
            <p className={`${martianMono.className} text-xs text-gray-500 mb-3`}>
              {experience.period} | {experience.location}
            </p>
            <p className={`${martianMono.className} text-sm text-gray-300 mb-4`}>
              {experience.description}
            </p>
            <div className="border-t border-gray-700 pt-3">
              <p className={`${martianMono.className} text-xs text-blue-400`}>
                <span className="font-bold">{language === "EN" ? "Skills" : "Aptitudes"}:</span> {experience.skills}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceItem;