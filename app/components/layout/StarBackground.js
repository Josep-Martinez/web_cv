/**
 * StarBackground Component
 * 
 * Creates an animated 3D starfield background with depth, color variation, and twinkling effect.
 * Uses HTML5 Canvas and perspective projection for a space-like atmosphere.
 * 
 * HOW TO MODIFY:
 * - Star density: Change numStars (currently 800)
 * - Colors: Modify starColors array
 * - Speed: Adjust star.speed range in reset() method
 * - Twinkle rate: Change twinkleSpeed range
 * - Brightness: Adjust baseOpacity range (currently 0.3-1.0)
 */

"use client";

import React, { useEffect, useRef } from "react";

export default function StarBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        let animationFrameId;
        let stars = [];
        const numStars = 800; // High count for dense starfield

        // Color palette: white + cyan/blue tints for space atmosphere
        const starColors = ["#ffffff", "#64ffda", "#8892b0", "#a8b2d1", "#ffffff", "#ffffff"];

        // Keep canvas sized to viewport
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        // Star class with 3D position and animation properties
        class Star {
            constructor() {
                this.reset();
                // Initialize at random depth to fill screen immediately
                this.z = Math.random() * canvas.width;
            }

            reset() {
                // 3D position: x,y spread across screen, z = depth
                this.x = (Math.random() - 0.5) * canvas.width * 2;
                this.y = (Math.random() - 0.5) * canvas.height * 2;
                this.z = canvas.width; // Start far away

                this.size = Math.random() * 2.5;
                this.baseOpacity = Math.random() * 0.7 + 0.3; // Brighter stars
                this.opacity = this.baseOpacity;
                this.color = starColors[Math.floor(Math.random() * starColors.length)];

                // Movement and animation
                this.speed = Math.random() * 0.5 + 0.1; // Individual speed variation
                this.twinkleSpeed = Math.random() * 0.05 + 0.01;
                this.twinkleDir = 1; // Direction of opacity change
            }

            update() {
                // Move star toward viewer (decreasing z)
                this.z -= this.speed * 1.5;
                if (this.z <= 0) {
                    this.reset(); // Recycle star when it passes viewer
                }

                // Twinkle effect: oscillate opacity
                this.opacity += this.twinkleSpeed * this.twinkleDir;
                if (this.opacity > 1 || this.opacity < 0.2) {
                    this.twinkleDir *= -1; // Reverse direction at limits
                }
            }

            draw() {
                // Perspective projection: convert 3D (x,y,z) to 2D screen coordinates
                const x = (this.x / this.z) * canvas.width * 0.5 + canvas.width / 2;
                const y = (this.y / this.z) * canvas.width * 0.5 + canvas.height / 2;

                // Size and opacity based on depth (closer = bigger & brighter)
                const r = (1 - this.z / canvas.width) * this.size * 2;
                const alpha = (1 - this.z / canvas.width) * this.opacity;

                // Only draw if star is within viewport
                if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height && r > 0) {
                    ctx.beginPath();
                    ctx.fillStyle = this.color;
                    ctx.globalAlpha = Math.max(0, Math.min(1, alpha)); // Clamp alpha to valid range
                    ctx.arc(x, y, r, 0, Math.PI * 2);
                    ctx.fill();

                    // Add glow to closer/brighter stars
                    if (alpha > 0.6) {
                        ctx.shadowBlur = 15;
                        ctx.shadowColor = this.color;
                        ctx.fill();
                        ctx.shadowBlur = 0;
                    }
                    ctx.globalAlpha = 1.0;
                }
            }
        }

        // Initialize star array
        for (let i = 0; i < numStars; i++) {
            stars.push(new Star());
        }

        // Animation loop
        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            stars.forEach(star => {
                star.update();
                star.draw();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        // Cleanup
        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]"
            style={{ opacity: 1 }} // Full opacity for maximum visibility
        />
    );
}
