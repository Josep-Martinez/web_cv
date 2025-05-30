import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Nixie_One, Martian_Mono } from 'next/font/google';

const nixieOne = Nixie_One({
  weight: "400",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  weight: "400",
  subsets: ["latin"],
});

const ProjectCard = ({ project, onClick, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    const handleMouseMove = (e) => {
      if (!isHovered) return;
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    };
    
    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isHovered]);
  
  return (
    <div
      ref={cardRef}
      className="relative group cursor-pointer transform transition-all duration-300"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(project)}
    >
      {/* Efecto de brillo */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-400/30 to-blue-600/0 opacity-0 group-hover:opacity-100 transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-all duration-1000 pointer-events-none"></div>
      
      {/* Borde animado */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300"></div>
      
      <div className="relative bg-[#1a2537] rounded-lg overflow-hidden border border-gray-800 group-hover:border-blue-500/50 transition-all duration-300">
        <div className="relative h-48 overflow-hidden bg-[#0f1623]">
          <Image
            src={project.image}
            alt={project.name}
            width={400}
            height={300}
            className="object-contain w-full h-full transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a2537] to-transparent opacity-60"></div>
        </div>
        
        <div className="p-6 min-h-[200px] flex flex-col">
          <h3 className={`${nixieOne.className} text-xl mb-2 text-white group-hover:text-blue-400 transition-colors duration-300`}>
            {project.name}
          </h3>
          <p className={`${martianMono.className} text-sm text-gray-400 mb-4 flex-grow`}>
            {project.description}
          </p>
          
          {/* Tech stack badges */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tech.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="px-2 py-1 text-xs bg-gray-500/10 text-gray-400 rounded-full border border-gray-500/20">
                +{project.tech.length - 3}
              </span>
            )}
          </div>
        </div>
        
        {/* Status indicator */}
        <div className="absolute top-4 right-4">
          <div className={`w-2 h-2 rounded-full ${
            project.status === 'Live' || project.status === 'En Producción' ? 'bg-blue-400': 
            project.status === 'Completed' || project.status === 'Completado' ? 'bg-green-400':
            'bg-yellow-400'
          } animate-pulse`}></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;