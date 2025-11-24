// app/components/PortalButton.js
import React from "react";

const PortalButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="relative group flex items-center justify-center w-10 h-10 ml-4 focus:outline-none"
            aria-label="Enter the Portal"
        >
            {/* Outer Rotating Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-electric border-b-purple-500 animate-[spin_3s_linear_infinite] opacity-70 group-hover:opacity-100 group-hover:border-t-cyan-400 group-hover:border-b-pink-500 transition-colors duration-500"></div>

            {/* Inner Rotating Ring (Reverse) */}
            <div className="absolute inset-1 rounded-full border-2 border-transparent border-l-purple-500 border-r-electric animate-[spin_2s_linear_infinite_reverse] opacity-70 group-hover:opacity-100 transition-colors duration-500"></div>

            {/* Core Pulse */}
            <div className="absolute inset-3 bg-gradient-to-br from-electric to-purple-600 rounded-full animate-pulse shadow-[0_0_15px_rgba(100,255,218,0.6)] group-hover:shadow-[0_0_25px_rgba(100,255,218,0.9)] transition-all duration-300"></div>

            {/* Particle Effects (Simulated with pseudo-elements or small divs if needed, keeping it simple for now) */}
            <div className="absolute -inset-2 bg-electric/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
        </button>
    );
};

export default PortalButton;
