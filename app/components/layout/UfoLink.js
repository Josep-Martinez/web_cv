/**
 * UfoLink Component - Animated UFO Easter Egg Link
 * 
 * PURPOSE:
 * Creates a dramatic animated entrance for the "MISIÓN" link that appears
 * when the Easter Egg is unlocked. The UFO flies around the screen before
 * "dropping" the link to the game.
 * 
 * ANIMATION SEQUENCE:
 * 1. LAP (0-6s): UFO flies in an organic path around the screen
 * 2. HOVER (6-7s): UFO hovers above the final link position
 * 3. DROP (7-8s): UFO "drops" the link and shrinks away
 * 4. DONE (8s+): Link remains visible, UFO disappears
 * 
 * MOBILE OPTIMIZATION:
 * Separate keyframe animation for screens < 768px to prevent
 * the UFO from flying off-screen on smaller displays.
 * 
 * USAGE:
 * Rendered conditionally in header.js when eggUnlocked === true
 */

// app/components/UfoLink.js
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Rocket } from "lucide-react";

const UfoLink = () => {
    // Animation state machine: start → lap → hover → drop → done
    const [animationStage, setAnimationStage] = useState("start");

    useEffect(() => {
        // Sequence the animation
        // 1. Start -> Lap (0s)
        setAnimationStage("lap");

        // 2. Lap -> Hover (6s - longer, smoother lap)
        const timer1 = setTimeout(() => setAnimationStage("hover"), 6000);

        // 3. Hover -> Drop (7s)
        const timer2 = setTimeout(() => setAnimationStage("drop"), 7000);

        // 4. Drop -> Done (8s)
        const timer3 = setTimeout(() => setAnimationStage("done"), 8000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    return (
        <div className="relative flex items-center ml-4">
            <style jsx>{`
                @keyframes ufoLap {
                    0% { transform: translate(-100vw, 20vh) scale(0.5) rotate(15deg); }
                    20% { transform: translate(30vw, 80vh) scale(0.8) rotate(-10deg); }
                    40% { transform: translate(90vw, 40vh) scale(1.2) rotate(5deg); }
                    60% { transform: translate(60vw, -20vh) scale(0.9) rotate(-15deg); }
                    80% { transform: translate(10vw, 10vh) scale(1.1) rotate(10deg); }
                    100% { transform: translate(0, 0) scale(1) rotate(0deg); }
                }
                @media (max-width: 768px) {
                    @keyframes ufoLap {
                        0% { transform: translate(-50vw, 15vh) scale(0.5) rotate(15deg); }
                        25% { transform: translate(10vw, 60vh) scale(0.7) rotate(-10deg); }
                        50% { transform: translate(80vw, 30vh) scale(0.9) rotate(5deg); }
                        75% { transform: translate(50vw, -10vh) scale(0.8) rotate(-15deg); }
                        100% { transform: translate(0, 0) scale(1) rotate(0deg); }
                    }
                }
            `}</style>

            {/* The Link (Initially hidden) */}
            <Link
                href="/space-runner"
                className={`
            relative px-4 py-2 rounded-full font-mono text-sm font-bold text-navy-900 bg-electric 
            shadow-[0_0_15px_rgba(100,255,218,0.6)] hover:scale-105 transition-all duration-500
            flex items-center gap-2
            ${animationStage === "drop" || animationStage === "done" ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}
        `}
            >
                <Rocket size={16} className="animate-pulse" />
                MISIÓN
            </Link>

            {/* The UFO Animation */}
            {animationStage !== "done" && (
                <div
                    className={`absolute z-[100] pointer-events-none transition-all duration-1000 ease-in-out
                    ${animationStage === "lap" ? "fixed top-0 left-0 w-12 h-8 animate-[ufoLap_6s_ease-in-out_forwards]" : ""}
                    ${animationStage === "hover" ? "absolute left-0 -translate-x-4 -translate-y-8 scale-100" : ""}
                    ${animationStage === "drop" ? "absolute left-0 translate-x-20 -translate-y-20 scale-0" : ""}
                `}
                >
                    <div className="relative w-12 h-8">
                        {/* Dome */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-cyan-300 rounded-full opacity-80 animate-pulse"></div>
                        {/* Body */}
                        <div className="absolute top-3 left-0 w-full h-5 bg-gray-300 rounded-full border-2 border-gray-400 shadow-lg z-10"></div>
                        {/* Lights */}
                        <div className="absolute top-5 left-2 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                        <div className="absolute top-5 right-2 w-2 h-2 bg-green-500 rounded-full animate-ping delay-75"></div>
                        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-2 h-2 bg-yellow-500 rounded-full animate-ping delay-150"></div>

                        {/* Beam (Only during hover/drop) */}
                        {(animationStage === "hover" || animationStage === "drop") && (
                            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-8 h-12 bg-gradient-to-b from-electric/50 to-transparent clip-path-beam animate-pulse"></div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UfoLink;
