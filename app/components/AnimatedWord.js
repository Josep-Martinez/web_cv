import React, { useState, useEffect } from 'react';

// Caracteres para el efecto (alfanuméricos y símbolos comunes)
const effectChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,_-:;(){}[]|";

// Función para generar texto aleatorio
const generateRandomText = (length) => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += effectChars.charAt(Math.floor(Math.random() * effectChars.length));
  }
  return result;
};

const AnimatedWord = ({ word, animationStarted, globalInterval }) => {
  const [displayText, setDisplayText] = useState(generateRandomText(word.length));

  useEffect(() => {
    if (!animationStarted || !globalInterval) return;

    let currentIndex = 0;
    let stabilityCounter = 0;

    const interval = setInterval(() => {
      // Si ya hemos completado la palabra
      if (currentIndex >= word.length) {
        stabilityCounter++;

        // Estabilización rápida
        if (stabilityCounter > 5) {  // Reducido a 5 para ser muy rápido
          setDisplayText(word);
          return;
        }

        // Variaciones rápidas
        let tempText = "";
        for (let i = 0; i < word.length; i++) {
          // Mayor probabilidad de estabilizar rápido
          if (Math.random() > 0.85 - (stabilityCounter * 0.15)) {
            tempText += effectChars.charAt(Math.floor(Math.random() * effectChars.length));
          } else {
            tempText += word[i];
          }
        }

        setDisplayText(tempText);
      } else {
        // Incrementamos el índice de forma más orgánica (menos lineal)
        if (Math.random() > 0.6) {  // Probabilidad reducida para un efecto más suave
          currentIndex++;
        }

        // Construimos la palabra: caracteres correctos + caracteres aleatorios
        let tempText = "";
        for (let i = 0; i < word.length; i++) {
          if (i < currentIndex) {
            tempText += word[i];
          } else {
            tempText += effectChars.charAt(Math.floor(Math.random() * effectChars.length));
          }
        }

        setDisplayText(tempText);
      }
    }, globalInterval);

    // Limpiar intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, [word, animationStarted, globalInterval]);

  return (
    <span className="text-electric font-bold relative inline-block">
      {displayText}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-electric/30"></span>
    </span>
  );
};

export default AnimatedWord;