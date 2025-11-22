// components/LanguageTransitionProvider.js - LLUVIA DIGITAL
"use client";
import { createContext, useContext, useState } from "react";

const LanguageTransitionContext = createContext();

// Hook para usar las transiciones
export function useLanguageTransition() {
  return useContext(LanguageTransitionContext);
}

// Componente de overlay global con efecto lluvia digital
function GlobalLanguageSweepOverlay({ isTransitioning }) {
  if (!isTransitioning) return null;

  // Caracteres para el efecto Matrix
  const matrixChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;:,.<>?";

  // Generar columnas de código
  const columns = 40; // Número de columnas
  const columnData = Array.from({ length: columns }, (_, i) => ({
    id: i,
    x: (i * 100) / columns, // Distribuir uniformemente
    delay: Math.random() * 300, // Delay aleatorio
    speed: Math.random() * 200 + 100, // Velocidad variable
  }));

  // Generar caracteres aleatorios
  const generateRandomChars = (count) => {
    return Array.from({ length: count }, () =>
      matrixChars.charAt(Math.floor(Math.random() * matrixChars.length))
    );
  };

  return (
    <div className="fixed inset-0 z-[99999] pointer-events-none overflow-hidden">
      {/* Fondo oscuro */}
      <div
        className="absolute inset-0 bg-navy-900"
        style={{
          animation: isTransitioning ? 'matrixFadeBase 600ms ease-in-out' : 'none'
        }}
      />

      {/* Efecto de líneas de código cayendo */}
      <div className="absolute inset-0 font-mono text-electric">
        {columnData.map((column) => (
          <div
            key={column.id}
            className="absolute top-0 flex flex-col"
            style={{
              left: `${column.x}%`,
              width: '2.5%',
              animation: isTransitioning ? `matrixRain 600ms linear ${column.delay}ms` : 'none'
            }}
          >
            {/* Caracteres principales (más brillantes) */}
            {generateRandomChars(30).map((char, index) => (
              <div
                key={`main-${index}`}
                className="text-electric text-sm leading-tight opacity-90"
                style={{
                  animation: isTransitioning ? `matrixChar 600ms ease-out ${index * 20}ms` : 'none'
                }}
              >
                {char}
              </div>
            ))}

            {/* Caracteres de cola (más opacos) */}
            {generateRandomChars(20).map((char, index) => (
              <div
                key={`tail-${index}`}
                className="text-blue-500 text-xs leading-tight opacity-60"
                style={{
                  animation: isTransitioning ? `matrixCharFade 600ms ease-out ${index * 15 + 200}ms` : 'none'
                }}
              >
                {char}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Efecto de brillo en la parte superior */}
      <div
        className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-electric/20 to-transparent"
        style={{
          animation: isTransitioning ? 'matrixGlow 600ms ease-in-out 100ms' : 'none'
        }}
      />

      {/* Líneas horizontales de escaneo */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px bg-electric/50"
            style={{
              top: `${20 + i * 15}%`,
              animation: isTransitioning ? `matrixScanLine 600ms ease-in-out ${i * 100}ms` : 'none'
            }}
          />
        ))}
      </div>

      {/* Partículas flotantes estilo circuitos */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute border border-electric/30"
            style={{
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: isTransitioning ? `matrixCircuit 600ms ease-out ${i * 40}ms` : 'none'
            }}
          />
        ))}
      </div>

      <style jsx global>{`
        @keyframes matrixFadeBase {
          0% { 
            opacity: 0; 
          }
          25% { 
            opacity: 0.9; 
          }
          75% { 
            opacity: 0.9; 
          }
          100% { 
            opacity: 0; 
          }
        }
        
        @keyframes matrixRain {
          0% { 
            transform: translateY(-100vh); 
            opacity: 0; 
          }
          10% { 
            opacity: 1; 
          }
          90% { 
            opacity: 1; 
          }
          100% { 
            transform: translateY(100vh); 
            opacity: 0; 
          }
        }

        @keyframes matrixChar {
          0% { 
            opacity: 0; 
            transform: scale(0); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1.2); 
          }
          100% { 
            opacity: 0.9; 
            transform: scale(1); 
          }
        }

        @keyframes matrixCharFade {
          0% { 
            opacity: 0; 
          }
          30% { 
            opacity: 0.6; 
          }
          100% { 
            opacity: 0; 
          }
        }

        @keyframes matrixGlow {
          0% { 
            opacity: 0; 
            transform: scaleY(0); 
          }
          50% { 
            opacity: 1; 
            transform: scaleY(1); 
          }
          100% { 
            opacity: 0; 
            transform: scaleY(0.5); 
          }
        }

        @keyframes matrixScanLine {
          0% { 
            opacity: 0; 
            transform: scaleX(0); 
          }
          50% { 
            opacity: 1; 
            transform: scaleX(1); 
          }
          100% { 
            opacity: 0; 
            transform: scaleX(0); 
          }
        }

        @keyframes matrixCircuit {
          0% { 
            opacity: 0; 
            transform: scale(0) rotate(0deg); 
          }
          50% { 
            opacity: 0.7; 
            transform: scale(1) rotate(180deg); 
          }
          100% { 
            opacity: 0; 
            transform: scale(0.5) rotate(360deg); 
          }
        }
      `}</style>
    </div>
  );
}

// Provider principal
export function LanguageTransitionProvider({ children }) {
  const [contentKey, setContentKey] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Función para iniciar transición
  const startTransition = () => {
    setIsTransitioning(true);

    // Cambiar contenido en el punto medio
    setTimeout(() => {
      setContentKey(prev => prev + 1);
    }, 300);

    // Terminar transición
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1800);
  };

  return (
    <LanguageTransitionContext.Provider value={{
      contentKey,
      isTransitioning,
      startTransition
    }}>
      {children}
      <GlobalLanguageSweepOverlay isTransitioning={isTransitioning} />
    </LanguageTransitionContext.Provider>
  );
}

// Hook personalizado para páginas
export function usePageTransition() {
  const { contentKey } = useLanguageTransition();

  return {
    contentKey,
  };
}