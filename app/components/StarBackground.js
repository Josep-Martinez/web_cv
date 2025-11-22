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
        const numStars = 800; // Significantly increased star count

        // Colors for a space feel
        const starColors = ["#ffffff", "#64ffda", "#8892b0", "#a8b2d1", "#ffffff", "#ffffff"];

        // Resize canvas
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        // Star class
        class Star {
            constructor() {
                this.reset();
                // Initial random z position to fill the screen
                this.z = Math.random() * canvas.width;
            }

            reset() {
                this.x = (Math.random() - 0.5) * canvas.width * 2;
                this.y = (Math.random() - 0.5) * canvas.height * 2;
                this.z = canvas.width; // Start far away
                this.size = Math.random() * 2.5; // Slightly larger
                this.baseOpacity = Math.random() * 0.7 + 0.3; // Brighter base opacity
                this.opacity = this.baseOpacity;
                this.color = starColors[Math.floor(Math.random() * starColors.length)];
                this.speed = Math.random() * 0.5 + 0.1;
                this.twinkleSpeed = Math.random() * 0.05 + 0.01;
                this.twinkleDir = 1;
            }

            update() {
                this.z -= this.speed * 1.5; // Global speed
                if (this.z <= 0) {
                    this.reset();
                }

                // Twinkle effect
                this.opacity += this.twinkleSpeed * this.twinkleDir;
                if (this.opacity > 1 || this.opacity < 0.2) {
                    this.twinkleDir *= -1;
                }
            }

            draw() {
                // Perspective projection
                const x = (this.x / this.z) * canvas.width * 0.5 + canvas.width / 2;
                const y = (this.y / this.z) * canvas.width * 0.5 + canvas.height / 2;

                // Size based on depth
                const r = (1 - this.z / canvas.width) * this.size * 2;

                // Opacity based on depth
                const alpha = (1 - this.z / canvas.width) * this.opacity;

                if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height && r > 0) {
                    ctx.beginPath();
                    ctx.fillStyle = this.color;
                    ctx.globalAlpha = Math.max(0, Math.min(1, alpha)); // Clamp alpha
                    ctx.arc(x, y, r, 0, Math.PI * 2);
                    ctx.fill();

                    // Glow for closer stars
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

        // Initialize stars
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

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]"
            style={{ opacity: 1 }} // Full opacity for visibility
        />
    );
}
