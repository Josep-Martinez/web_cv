/**
 * AnimatedWord Component
 * 
 * Creates a "decoding" text effect where random characters gradually reveal the actual word.
 * Used in the home page description to highlight key terms.
 * 
 * @param {string} word - The final word to display
 * @param {boolean} animationStarted - Controls when animation begins
 * @param {number} globalInterval - Update interval in ms (higher = slower animation)
 * 
 * HOW TO MODIFY:
 * - Speed: Adjust globalInterval in page.js (currently 150ms)
 * - Character set: Modify effectChars constant
 * - Advancement speed: Change probability in line 49 (currently 0.6 = 40% chance per frame)
 * - Stabilization: Adjust stabilityCounter threshold in line 30 (currently 5 iterations)
 */

import React, { useState, useEffect } from 'react';

// Character pool for the random decoding effect
const effectChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,_-:;(){}[]|";

// Generate initial random text matching the word length
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

    let currentIndex = 0; // Tracks how many characters have been "decoded"
    let stabilityCounter = 0; // Counts frames after full decode for final stabilization

    const interval = setInterval(() => {
      // Phase 2: Word is fully decoded, now stabilizing
      if (currentIndex >= word.length) {
        stabilityCounter++;

        // After 5 frames of stabilization, lock in the final word
        if (stabilityCounter > 5) {
          setDisplayText(word);
          return;
        }

        // During stabilization: mostly correct with occasional random flickers
        let tempText = "";
        for (let i = 0; i < word.length; i++) {
          // Gradually reduce randomness as stabilityCounter increases
          if (Math.random() > 0.85 - (stabilityCounter * 0.15)) {
            tempText += effectChars.charAt(Math.floor(Math.random() * effectChars.length));
          } else {
            tempText += word[i];
          }
        }

        setDisplayText(tempText);
      } else {
        // Phase 1: Decoding in progress
        // Probabilistic advancement creates organic, non-linear feel
        // Lower probability = slower, more "struggling" effect
        if (Math.random() > 0.6) {  // 40% chance to advance each frame
          currentIndex++;
        }

        // Build display: decoded characters + random characters
        let tempText = "";
        for (let i = 0; i < word.length; i++) {
          if (i < currentIndex) {
            tempText += word[i]; // Already decoded
          } else {
            tempText += effectChars.charAt(Math.floor(Math.random() * effectChars.length)); // Still random
          }
        }

        setDisplayText(tempText);
      }
    }, globalInterval);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [word, animationStarted, globalInterval]);

  return (
    <span className="text-electric font-bold relative inline-block">
      {displayText}
      {/* Subtle underline accent */}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-electric/30"></span>
    </span>
  );
};

export default AnimatedWord;