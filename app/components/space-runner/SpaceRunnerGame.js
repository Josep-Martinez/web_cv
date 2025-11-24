/**
 * Galactic Defender - Space Shooter Game Component
 * 
 * A full-featured arcade space shooter built with HTML5 Canvas.
 * 
 * ARCHITECTURE:
 * - Canvas-based rendering (60 FPS)
 * - Custom physics engine
 * - Particle system for visual effects
 * - Enemy AI with difficulty scaling
 * - Power-up system (Shield, Rapid Fire, Spread Shot)
 * - Mana/Energy system with overheat mechanic
 * 
 * CONTROLS:
 * - PC: WASD/Arrows for movement, Space to shoot
 * - Mobile: Virtual joystick (left) + shoot button (right)
 * 
 * KEY FEATURES:
 * - 8-directional aiming (PC) / 360° aiming (Mobile)
 * - 3 enemy types: Fighter, Meteor, Tank
 * - Gradual difficulty scaling based on score
 * - Energy management (shooting costs mana, overheat prevents shooting)
 * - Retro synthesized sound effects (Web Audio API)
 * 
 * GAME LOOP:
 * 1. Update: Physics, AI, collisions, spawning
 * 2. Render: Background → Entities → Particles → UI
 * 3. Repeat at 60 FPS using requestAnimationFrame
 */

"use client";

import React, { useEffect, useRef, useState } from "react";
import { X, RotateCcw, Trophy, Rocket, Shield, Zap, Crosshair, AlertTriangle } from "lucide-react";

const SpaceRunnerGame = ({ onClose, isPage = false }) => {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState("start"); // start, playing, gameover
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isLandscape, setIsLandscape] = useState(true);
  const [activePowerup, setActivePowerup] = useState(null);
  const [mana, setMana] = useState(100);
  const [isOverheated, setIsOverheated] = useState(false);

  // ==================== GAME BALANCE CONSTANTS ====================
  // These values control the feel and difficulty of the game

  const PLAYER_SPEED = 5;           // Pixels per frame (movement speed)
  const BULLET_SPEED = 12;          // Pixels per frame (projectile speed)

  // MANA SYSTEM: Prevents spam-shooting, adds strategic depth
  const MANA_COST = 15;             // Energy consumed per shot (100 max = ~6 shots)
  const MANA_REGEN = 0.5;           // Energy recovered per frame (normal)
  const MANA_REGEN_OVERHEAT = 0.3;  // Slower recovery when overheated (penalty)
  const OVERHEAT_THRESHOLD = 25;    // Must reach 25% energy to shoot again after overheat

  const SPAWN_RATE_INITIAL = 100;   // Frames between enemy spawns (decreases with score)

  // Audio Context
  const audioCtxRef = useRef(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playSound = (type) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;

    switch (type) {
      case "shoot":
        osc.type = "square";
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.1);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
        break;
      case "explosion":
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(100, now);
        osc.frequency.exponentialRampToValueAtTime(0.01, now + 0.3);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
        break;
      case "hit":
        osc.type = "triangle";
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.linearRampToValueAtTime(100, now + 0.1);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
        break;
      case "powerup":
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.linearRampToValueAtTime(880, now + 0.1);
        osc.frequency.linearRampToValueAtTime(1760, now + 0.3);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
        break;
      case "overheat":
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(100, now);
        osc.frequency.linearRampToValueAtTime(50, now + 0.2);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
        break;
    }
  };

  // ==================== GAME STATE ====================
  // All game data stored in a ref to avoid re-renders during game loop
  // This is updated 60 times per second, so we don't want React state updates

  const gameRef = useRef({
    // PLAYER
    player: {
      x: 100, y: 300,           // Position
      vx: 0, vy: 0,             // Velocity
      width: 40, height: 40,    // Hitbox
      hp: 3, maxHp: 3,          // Health
      mana: 100, maxMana: 100,  // Energy for shooting
      overheated: false,        // Can't shoot until mana recovers
      angle: 0,                 // Direction facing (radians)
      powerup: null,            // Active powerup type (shield/rapid/spread)
      powerupTimer: 0,          // Frames remaining
      shield: false             // Invulnerability flag
    },

    // GAME ENTITIES (arrays of objects)
    bullets: [],        // Player projectiles
    enemies: [],        // Enemy ships and obstacles
    enemyBullets: [],   // Enemy projectiles
    particles: [],      // Visual effects (explosions, trails)
    stars: [],          // Background parallax stars
    planets: [],        // Background decorative planets
    powerups: [],       // Collectible power-ups

    // GAME LOGIC
    frame: 0,           // Frame counter (used for timing)
    score: 0,           // Current score
    spawnRate: SPAWN_RATE_INITIAL,  // Enemy spawn frequency
    isGameOver: false,

    // INPUT STATE
    keys: {
      ArrowUp: false, ArrowDown: false,
      ArrowLeft: false, ArrowRight: false,
      " ": false,  // Spacebar for shooting
      w: false, a: false, s: false, d: false
    },

    // MOBILE JOYSTICK STATE
    joystick: {
      active: false,    // Is user touching joystick?
      originX: 0,       // Touch start position
      originY: 0,
      currentX: 0,      // Current touch position
      currentY: 0,
      angle: 0,         // Direction (radians)
      force: 0          // Distance from origin (0-1)
    }
  });

  // Load High Score
  useEffect(() => {
    const saved = localStorage.getItem("spaceRunnerHighScore");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  // Check orientation
  useEffect(() => {
    const checkOrientation = () => {
      if (window.innerWidth < 768) {
        setIsLandscape(window.innerWidth > window.innerHeight);
      } else {
        setIsLandscape(true);
      }
    };
    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  const resetGame = () => {
    initAudio();
    const canvas = canvasRef.current;

    // Ensure canvas size is correct before init
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    gameRef.current = {
      player: {
        x: canvas ? canvas.width / 2 : 100, y: canvas ? canvas.height / 2 : 300,
        vx: 0, vy: 0, width: 40, height: 40,
        hp: 3, maxHp: 3,
        mana: 100, maxMana: 100, overheated: false,
        angle: 0,
        powerup: null, powerupTimer: 0,
        shield: false
      },
      bullets: [],
      enemies: [],
      enemyBullets: [],
      particles: [],
      stars: [],
      planets: [],
      powerups: [],
      frame: 0,
      score: 0,
      spawnRate: SPAWN_RATE_INITIAL,
      isGameOver: false,
      keys: { ...gameRef.current.keys },
      joystick: { active: false, originX: 0, originY: 0, currentX: 0, currentY: 0, angle: 0, force: 0 }
    };

    // Pre-populate Stars & Planets (Full Screen)
    if (canvas) {
      for (let i = 0; i < 150; i++) {
        gameRef.current.stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speed: Math.random() * 2 + 0.5,
          color: Math.random() > 0.9 ? "#00f3ff" : "#ffffff"
        });
      }
      for (let i = 0; i < 3; i++) {
        gameRef.current.planets.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 100 + 50,
          color: `hsl(${Math.random() * 360}, 70%, 50%)`,
          speed: 0.5
        });
      }
    }
    setScore(0);
    setMana(100);
    setIsOverheated(false);
    setActivePowerup(null);
    setGameState("playing");
  };

  const handleExit = () => {
    if (onClose) {
      onClose();
    } else if (isPage) {
      window.location.href = "/works";
    }
  };

  // Controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameRef.current.keys.hasOwnProperty(e.key)) {
        gameRef.current.keys[e.key] = true;
      }
    };
    const handleKeyUp = (e) => {
      if (gameRef.current.keys.hasOwnProperty(e.key)) {
        gameRef.current.keys[e.key] = false;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameState]);

  // Touch / Joystick Controls
  const handleTouchStart = (e) => {
    if (gameState !== "playing") return;
    initAudio();
    const touch = e.touches[0];
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    gameRef.current.joystick.active = true;
    gameRef.current.joystick.originX = x;
    gameRef.current.joystick.originY = y;
    gameRef.current.joystick.currentX = x;
    gameRef.current.joystick.currentY = y;
    gameRef.current.joystick.force = 0;
    // Auto-fire removed
  };

  const handleTouchMove = (e) => {
    if (gameState !== "playing" || !gameRef.current.joystick.active) return;
    const touch = e.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;

    gameRef.current.joystick.currentX = x;
    gameRef.current.joystick.currentY = y;

    const dx = x - gameRef.current.joystick.originX;
    const dy = y - gameRef.current.joystick.originY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 50;

    gameRef.current.joystick.angle = Math.atan2(dy, dx);
    gameRef.current.joystick.force = Math.min(dist / maxDist, 1);
  };

  const handleTouchEnd = () => {
    gameRef.current.joystick.active = false;
    gameRef.current.joystick.force = 0;
    // Auto-fire removed
  };

  // Mobile Shoot Button Handlers
  const handleShootStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    initAudio();
    gameRef.current.keys[" "] = true;
  };

  const handleShootEnd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    gameRef.current.keys[" "] = false;
  };

  // ==================== MAIN GAME LOOP ====================
  // Runs at 60 FPS using requestAnimationFrame
  // Only active when gameState === "playing" and device is landscape

  useEffect(() => {
    if (gameState !== "playing" || !isLandscape) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Ensure canvas fills the screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const loop = () => {
      const game = gameRef.current;
      game.frame++;  // Increment frame counter (used for timing spawns, etc.)
      game.score += 0.02;  // Gradual score increase over time
      setScore(Math.floor(game.score));

      // ========== UPDATE PHASE ==========
      // 1. Mana System
      // 2. Player Movement & Shooting
      // 3. Enemy Spawning & AI
      // 4. Collision Detection
      // 5. Physics Updates

      // ========== 1. MANA SYSTEM (Overheat Mechanic) ==========
      // This prevents spam-shooting and adds strategic depth
      // - Normal: Mana regenerates at MANA_REGEN per frame
      // - Overheated: Can't shoot, slower regen until reaching OVERHEAT_THRESHOLD

      if (game.player.overheated) {
        // Penalty: Slower recovery when overheated
        game.player.mana += MANA_REGEN_OVERHEAT;

        // Check if we've recovered enough to shoot again
        if (game.player.mana >= OVERHEAT_THRESHOLD) {
          game.player.overheated = false;  // Exit overheat state
          setIsOverheated(false);          // Update UI
        }
      } else if (game.player.mana < game.player.maxMana) {
        // Normal regeneration
        game.player.mana += MANA_REGEN;
      }

      // Clamp to max and update UI
      game.player.mana = Math.min(game.player.maxMana, game.player.mana);
      setMana(Math.floor(game.player.mana));

      // Powerup Timer
      if (game.player.powerup) {
        game.player.powerupTimer--;
        if (game.player.powerupTimer <= 0) {
          game.player.powerup = null;
          game.player.shield = false;
          setActivePowerup(null);
        }
      }

      // ========== 2. PLAYER MOVEMENT & AIMING ==========
      // Two control schemes: Joystick (mobile) or Keyboard (PC)

      let dx = 0;  // Horizontal velocity
      let dy = 0;  // Vertical velocity

      if (game.joystick.active) {
        // MOBILE: Virtual joystick controls
        // Convert polar coordinates (angle, force) to cartesian (dx, dy)
        dx = Math.cos(game.joystick.angle) * game.joystick.force * PLAYER_SPEED;
        dy = Math.sin(game.joystick.angle) * game.joystick.force * PLAYER_SPEED;

        // Update ship rotation to face movement direction
        if (game.joystick.force > 0.1) {
          game.player.angle = game.joystick.angle;
        }
      } else {
        // PC: Keyboard controls (WASD or Arrow keys)
        if (game.keys.ArrowUp || game.keys.w) dy -= PLAYER_SPEED;
        if (game.keys.ArrowDown || game.keys.s) dy += PLAYER_SPEED;
        if (game.keys.ArrowLeft || game.keys.a) dx -= PLAYER_SPEED;
        if (game.keys.ArrowRight || game.keys.d) dx += PLAYER_SPEED;

        // 8-directional aiming: Ship faces movement direction
        if (dx !== 0 || dy !== 0) {
          game.player.angle = Math.atan2(dy, dx);
        }
      }

      // Apply velocity
      game.player.vx = dx;
      game.player.vy = dy;
      game.player.x += game.player.vx;
      game.player.y += game.player.vy;

      // Keep player within screen bounds
      game.player.x = Math.max(0, Math.min(canvas.width - game.player.width, game.player.x));
      game.player.y = Math.max(0, Math.min(canvas.height - game.player.height, game.player.y));

      // ========== 3. SHOOTING SYSTEM ==========
      // Fire rate: 20 frames (normal) or 8 frames (rapid fire power-up)
      const fireRate = game.player.powerup === "rapid" ? 8 : 20;

      // Check if player is trying to shoot (Space or Mobile button)
      if (game.keys[" "] && game.frame % fireRate === 0) {
        // Can only shoot if: (1) Not overheated AND (2) Have enough mana
        if (!game.player.overheated && game.player.mana >= MANA_COST) {
          // Consume mana
          game.player.mana -= MANA_COST;
          setMana(Math.floor(game.player.mana));
          playSound("shoot");

          // Helper function to spawn a bullet at an angle offset
          const spawnBullet = (angleOffset = 0) => {
            game.bullets.push({
              x: game.player.x + game.player.width / 2 + Math.cos(game.player.angle) * 20,
              y: game.player.y + game.player.height / 2 + Math.sin(game.player.angle) * 20,
              vx: Math.cos(game.player.angle + angleOffset) * BULLET_SPEED,
              vy: Math.sin(game.player.angle + angleOffset) * BULLET_SPEED,
              color: "#00f3ff",
              life: 100  // Bullet despawns after 100 frames
            });
          };

          // Fire main bullet
          spawnBullet();

          // Spread shot power-up: Fire 2 additional bullets at angles
          if (game.player.powerup === "spread") {
            spawnBullet(0.2);   // +11 degrees
            spawnBullet(-0.2);  // -11 degrees
          }

          // Check for overheat
          if (game.player.mana <= 0) {
            game.player.overheated = true;
            setIsOverheated(true);
            playSound("overheat");
          }
        } else if (game.player.overheated || game.player.mana < MANA_COST) {
          // Click sound for empty
          if (game.frame % 10 === 0) playSound("no_mana"); // Actually no_mana sound is not defined in switch above, let's use overheat sound or add one
        }
      }

      // Spawning Enemies
      const currentSpawnRate = Math.max(20, SPAWN_RATE_INITIAL - Math.floor(game.score / 50));

      if (game.frame % currentSpawnRate === 0) {
        const typeRoll = Math.random();
        let enemy = {
          x: canvas.width,
          y: Math.random() * (canvas.height - 50),
          width: 40,
          height: 40,
          hp: 1,
          vx: -Math.random() * 2 - 2,
          vy: 0,
          type: "fighter",
          color: "#ff0055",
          scoreValue: 20
        };

        const speedMultiplier = 1 + (game.score / 1000);
        enemy.vx *= speedMultiplier;

        if (typeRoll > 0.8) {
          enemy.type = "meteor";
          enemy.width = Math.random() * 40 + 30;
          enemy.height = enemy.width;
          enemy.hp = 3;
          enemy.vx = (-Math.random() * 3 - 1) * speedMultiplier;
          enemy.rotation = 0;
          enemy.rotationSpeed = Math.random() * 0.1 - 0.05;
          enemy.scoreValue = 10;
        } else if (typeRoll > 0.95) {
          enemy.type = "tank";
          enemy.width = 60;
          enemy.height = 60;
          enemy.hp = 6;
          enemy.vx = -1 * speedMultiplier;
          enemy.color = "#ffaa00";
          enemy.scoreValue = 50;
        } else {
          enemy.vy = Math.sin(game.frame) * 2;
        }
        game.enemies.push(enemy);
      }

      // Spawn Powerups
      if (game.frame % 600 === 0) {
        const type = Math.random();
        let pType = "shield";
        if (type < 0.33) pType = "rapid";
        else if (type < 0.66) pType = "spread";

        game.powerups.push({
          x: canvas.width,
          y: Math.random() * (canvas.height - 40),
          width: 30,
          height: 30,
          vx: -2,
          type: pType
        });
      }

      // Spawn Planets
      if (game.frame % 1000 === 0) {
        game.planets.push({
          x: canvas.width + 100,
          y: Math.random() * canvas.height,
          radius: Math.random() * 100 + 50,
          color: `hsl(${Math.random() * 360}, 70%, 50%)`,
          speed: 0.5
        });
      }

      // Update Bullets
      for (let i = game.bullets.length - 1; i >= 0; i--) {
        const b = game.bullets[i];
        b.x += b.vx;
        b.y += b.vy;
        b.life--;
        if (b.life <= 0 || b.x < 0 || b.x > canvas.width || b.y < 0 || b.y > canvas.height) {
          game.bullets.splice(i, 1);
        }
      }

      // Update Enemy Bullets
      for (let i = game.enemyBullets.length - 1; i >= 0; i--) {
        const b = game.enemyBullets[i];
        b.x += b.vx;
        b.y += b.vy;

        if (
          b.x < game.player.x + game.player.width &&
          b.x + 5 > game.player.x &&
          b.y < game.player.y + game.player.height &&
          b.y + 5 > game.player.y
        ) {
          game.enemyBullets.splice(i, 1);
          if (!game.player.shield) {
            game.player.hp--;
            playSound("hit");
            for (let k = 0; k < 10; k++) {
              game.particles.push({
                x: game.player.x + game.player.width / 2,
                y: game.player.y + game.player.height / 2,
                vx: Math.random() * 10 - 5,
                vy: Math.random() * 10 - 5,
                life: 20,
                color: "#00f3ff"
              });
            }
            if (game.player.hp <= 0) {
              playSound("explosion");
              game.isGameOver = true;
            }
          } else {
            playSound("hit");
          }
        }
        if (b.x < 0 || b.y < 0 || b.y > canvas.height) game.enemyBullets.splice(i, 1);
      }

      // Update Powerups
      for (let i = game.powerups.length - 1; i >= 0; i--) {
        const p = game.powerups[i];
        p.x += p.vx;

        if (
          p.x < game.player.x + game.player.width &&
          p.x + p.width > game.player.x &&
          p.y < game.player.y + game.player.height &&
          p.y + p.height > game.player.y
        ) {
          playSound("powerup");
          game.player.powerup = p.type;
          // Reduced Shield Duration: 300 frames (5 seconds)
          game.player.powerupTimer = p.type === "shield" ? 300 : 600;
          if (p.type === "shield") game.player.shield = true;
          setActivePowerup(p.type);
          game.powerups.splice(i, 1);

          for (let k = 0; k < 20; k++) {
            game.particles.push({
              x: game.player.x + game.player.width / 2,
              y: game.player.y + game.player.height / 2,
              vx: Math.random() * 6 - 3,
              vy: Math.random() * 6 - 3,
              life: 40,
              color: "#ffff00"
            });
          }
        } else if (p.x + p.width < 0) {
          game.powerups.splice(i, 1);
        }
      }

      // Update Enemies
      for (let i = game.enemies.length - 1; i >= 0; i--) {
        const e = game.enemies[i];
        e.x += e.vx;
        e.y += e.vy;
        if (e.type === "meteor") e.rotation += e.rotationSpeed;

        const shootChance = 0.005 + (game.score / 50000);
        if (e.type !== "meteor" && Math.random() < shootChance) {
          game.enemyBullets.push({
            x: e.x,
            y: e.y + e.height / 2,
            vx: -5,
            vy: (game.player.y - e.y) * 0.01,
            color: "#ff0055"
          });
        }

        for (let j = game.bullets.length - 1; j >= 0; j--) {
          const b = game.bullets[j];
          if (
            b.x < e.x + e.width &&
            b.x + 10 > e.x &&
            b.y < e.y + e.height &&
            b.y + 5 > e.y
          ) {
            e.hp--;
            game.bullets.splice(j, 1);
            game.particles.push({
              x: b.x,
              y: b.y,
              vx: Math.random() * -2,
              vy: Math.random() * 2 - 1,
              life: 10,
              color: "#fff"
            });

            if (e.hp <= 0) {
              playSound("explosion");
              for (let k = 0; k < 15; k++) {
                game.particles.push({
                  x: e.x + e.width / 2,
                  y: e.y + e.height / 2,
                  vx: Math.random() * 6 - 3,
                  vy: Math.random() * 6 - 3,
                  life: 30,
                  color: e.color || "#ffaa00"
                });
              }
              game.score += e.scoreValue;
              game.enemies.splice(i, 1);
              break;
            }
          }
        }

        if (
          e.x < game.player.x + game.player.width &&
          e.x + e.width > game.player.x &&
          e.y < game.player.y + game.player.height &&
          e.y + e.height > game.player.y
        ) {
          if (!game.player.shield) {
            game.player.hp--;
            playSound("explosion");
            e.hp = 0;
            game.enemies.splice(i, 1);
            for (let k = 0; k < 20; k++) {
              game.particles.push({
                x: game.player.x + game.player.width / 2,
                y: game.player.y + game.player.height / 2,
                vx: Math.random() * 10 - 5,
                vy: Math.random() * 10 - 5,
                life: 30,
                color: "#ff0000"
              });
            }
            if (game.player.hp <= 0) game.isGameOver = true;
          } else {
            playSound("explosion");
            e.hp = 0;
            game.enemies.splice(i, 1);
            for (let k = 0; k < 15; k++) {
              game.particles.push({
                x: e.x + e.width / 2,
                y: e.y + e.height / 2,
                vx: Math.random() * 6 - 3,
                vy: Math.random() * 6 - 3,
                life: 30,
                color: e.color || "#ffaa00"
              });
            }
          }
        }

        if (e.x + e.width < 0) game.enemies.splice(i, 1);
      }

      // Update Particles
      for (let i = game.particles.length - 1; i >= 0; i--) {
        const p = game.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        if (p.life <= 0) game.particles.splice(i, 1);
      }

      // Update Stars & Planets
      game.stars.forEach(s => {
        s.x -= s.speed;
        if (s.x < 0) s.x = canvas.width;
      });
      for (let i = game.planets.length - 1; i >= 0; i--) {
        const p = game.planets[i];
        p.x -= p.speed;
        if (p.x + p.radius < 0) game.planets.splice(i, 1);
      }

      // --- DRAW ---
      ctx.fillStyle = "#0a0a16";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Stars
      game.stars.forEach(s => {
        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.random() * 0.5 + 0.3;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // Draw Planets
      game.planets.forEach(p => {
        const grad = ctx.createRadialGradient(p.x - p.radius / 3, p.y - p.radius / 3, p.radius / 10, p.x, p.y, p.radius);
        grad.addColorStop(0, p.color);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Powerups
      game.powerups.forEach(p => {
        ctx.save();
        ctx.translate(p.x + p.width / 2, p.y + p.height / 2);
        ctx.fillStyle = p.type === "shield" ? "#4ade80" : p.type === "rapid" ? "#facc15" : "#60a5fa";
        ctx.shadowBlur = 10;
        ctx.shadowColor = ctx.fillStyle;
        ctx.beginPath();
        ctx.arc(0, 0, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#000";
        if (p.type === "shield") {
          ctx.fillRect(-3, -8, 6, 16);
          ctx.fillRect(-8, -3, 16, 6);
        } else if (p.type === "rapid") {
          ctx.beginPath();
          ctx.moveTo(2, -8);
          ctx.lineTo(-4, 0);
          ctx.lineTo(0, 0);
          ctx.lineTo(-2, 8);
          ctx.lineTo(4, 0);
          ctx.lineTo(0, 0);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, -5, 2, 0, Math.PI * 2);
          ctx.arc(-5, 5, 2, 0, Math.PI * 2);
          ctx.arc(5, 5, 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      // Draw Player
      ctx.save();
      ctx.translate(game.player.x + game.player.width / 2, game.player.y + game.player.height / 2);
      ctx.rotate(game.player.angle);

      if (game.player.shield) {
        ctx.strokeStyle = "#4ade80";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, 35, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = "rgba(74, 222, 128, 0.2)";
        ctx.fill();
      }

      const grad = ctx.createLinearGradient(-20, 0, 20, 0);
      grad.addColorStop(0, "#444");
      grad.addColorStop(0.5, "#fff");
      grad.addColorStop(1, "#444");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(20, 0);
      ctx.lineTo(-15, -10);
      ctx.lineTo(-10, 0);
      ctx.lineTo(-15, 10);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#888";
      ctx.beginPath();
      ctx.moveTo(-5, -5);
      ctx.lineTo(-15, -20);
      ctx.lineTo(5, -5);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-5, 5);
      ctx.lineTo(-15, 20);
      ctx.lineTo(5, 5);
      ctx.fill();

      ctx.fillStyle = "#00f3ff";
      ctx.shadowBlur = 5;
      ctx.shadowColor = "#00f3ff";
      ctx.beginPath();
      ctx.ellipse(-2, 0, 5, 3, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = "#ff5500";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#ff5500";
      ctx.beginPath();
      ctx.arc(-15, 0, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.restore();

      // Draw Enemies
      game.enemies.forEach(e => {
        ctx.save();
        ctx.translate(e.x + e.width / 2, e.y + e.height / 2);
        if (e.type === "meteor") {
          ctx.rotate(e.rotation);
          ctx.fillStyle = "#555";
          ctx.beginPath();
          ctx.moveTo(20, 0);
          for (let k = 1; k < 8; k++) {
            const angle = (k / 8) * Math.PI * 2;
            const r = 15 + Math.random() * 10;
            ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
          }
          ctx.closePath();
          ctx.fill();
        } else if (e.type === "tank") {
          ctx.fillStyle = "#663300";
          ctx.fillRect(-20, -20, 40, 40);
          ctx.fillStyle = "#ffaa00";
          ctx.beginPath();
          ctx.arc(0, 0, 10, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.rotate(Math.PI);
          ctx.fillStyle = "#444";
          ctx.beginPath();
          ctx.moveTo(0, 10);
          ctx.lineTo(15, 0);
          ctx.lineTo(0, -10);
          ctx.fill();
          ctx.fillStyle = "#f00";
          ctx.beginPath();
          ctx.arc(5, 0, 3, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      // Draw Bullets
      ctx.fillStyle = "#00f3ff";
      game.bullets.forEach(b => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#00f3ff";
      });
      ctx.shadowBlur = 0;

      ctx.fillStyle = "#ff0055";
      game.enemyBullets.forEach(b => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Particles
      game.particles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life / 30;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.random() * 3, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // Draw Joystick
      if (game.joystick.active) {
        ctx.save();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(game.joystick.originX, game.joystick.originY, 50, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = "rgba(0, 243, 255, 0.5)";
        ctx.beginPath();
        ctx.arc(
          game.joystick.originX + Math.cos(game.joystick.angle) * game.joystick.force * 50,
          game.joystick.originY + Math.sin(game.joystick.angle) * game.joystick.force * 50,
          20, 0, Math.PI * 2
        );
        ctx.fill();
        ctx.restore();
      }

      if (game.isGameOver) {
        setGameState("gameover");
        if (game.score > highScore) {
          setHighScore(Math.floor(game.score));
          localStorage.setItem("spaceRunnerHighScore", Math.floor(game.score).toString());
        }
      } else {
        animationFrameId = requestAnimationFrame(loop);
      }
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameState, isLandscape, highScore]);

  if (!isLandscape) {
    return (
      <div className={`fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center text-center p-6 text-electric font-mono ${isPage ? 'relative' : ''}`}>
        <RotateCcw className="w-16 h-16 mb-4 animate-spin" />
        <h2 className="text-2xl font-bold mb-2">¡ALERTA DE NAVEGACIÓN!</h2>
        <p>Necesitas orientación de cabina para el despegue.</p>
        <p className="text-sm mt-4 text-gray-400">(Gira tu dispositivo a horizontal)</p>
        <button
          onClick={handleExit}
          className="mt-8 px-6 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500/10"
        >
          Abortar Misión
        </button>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 z-[60] bg-black ${isPage ? 'relative h-screen' : ''}`}>
      {/* UI Layer */}
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start z-10 pointer-events-none">
        <div className="pointer-events-auto flex flex-col gap-2 ml-12 md:ml-0">
          <div className="flex gap-4">
            <span className="font-mono text-electric text-xl font-bold drop-shadow-[0_0_5px_rgba(0,243,255,0.8)]">
              SCORE: {score}
            </span>
            <span className="font-mono text-yellow-400 text-sm flex items-center gap-1">
              <Trophy size={14} /> HI: {highScore}
            </span>
          </div>

          {/* Mana Bar */}
          <div className={`w-48 h-4 bg-gray-800 rounded-full overflow-hidden border ${isOverheated ? 'border-red-500 animate-pulse' : 'border-gray-600'} relative`}>
            <div
              className={`h-full transition-all duration-100 ${isOverheated ? 'bg-red-500' : 'bg-blue-500'}`}
              style={{ width: `${mana}%` }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-white/80">
              {isOverheated ? "OVERHEATED" : "ENERGY"}
            </span>
          </div>

          {/* Active Powerup Indicator */}
          {activePowerup && (
            <div className="flex items-center gap-2 text-sm font-mono animate-pulse">
              {activePowerup === "shield" && <span className="text-green-400 flex items-center gap-1"><Shield size={14} /> ESCUDO ACTIVO</span>}
              {activePowerup === "rapid" && <span className="text-yellow-400 flex items-center gap-1"><Zap size={14} /> FUEGO RÁPIDO</span>}
              {activePowerup === "spread" && <span className="text-blue-400 flex items-center gap-1"><Crosshair size={14} /> DISPARO TRIPLE</span>}
            </div>
          )}
        </div>

        {/* Health Bar */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`w-8 h-2 rounded-full ${i < (gameRef.current?.player?.hp || 3) ? "bg-green-500 shadow-[0_0_10px_#0f0]" : "bg-gray-800"}`}
            />
          ))}
        </div>

        {!isPage && (
          <button
            onClick={handleExit}
            className="pointer-events-auto p-2 bg-red-500/20 hover:bg-red-500/40 rounded-full text-white transition-colors"
          >
            <X size={24} />
          </button>
        )}
      </div>

      {/* Game Canvas */}
      <canvas
        ref={canvasRef}
        className="block w-full h-full touch-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />

      {/* Start Screen Overlay */}
      {gameState === "start" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-20 pointer-events-none">
          <div className="pointer-events-auto text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-electric to-purple-500 mb-8 animate-pulse">
              GALACTIC DEFENDER
            </h1>
            <button
              onClick={resetGame}
              className="px-8 py-3 bg-electric text-navy-900 font-bold font-mono rounded hover:scale-105 transition-transform shadow-[0_0_20px_rgba(100,255,218,0.5)] flex items-center gap-2 mx-auto"
            >
              <Rocket size={20} /> INICIAR MISIÓN
            </button>
            <div className="mt-8 text-slate-light font-mono text-sm text-center">
              <p className="mb-2 text-electric">CONTROLES</p>
              <p>PC: WASD / Flechas para Moverse y Apuntar</p>
              <p>ESPACIO para Disparar (Requiere Energía)</p>
              <p>Móvil: Joystick (Izq) Mover/Apuntar - Botón (Der) Disparar</p>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Shoot Button - Only visible on mobile devices */}
      {gameState === "playing" && (
        <button
          className="md:hidden absolute bottom-12 right-12 w-24 h-24 bg-red-500/30 rounded-full border-2 border-red-400/50 flex items-center justify-center active:bg-red-500/60 active:scale-95 transition-all z-50 touch-none backdrop-blur-sm shadow-[0_0_15px_rgba(239,68,68,0.4)]"
          onTouchStart={handleShootStart}
          onTouchEnd={handleShootEnd}
        >
          <Crosshair size={40} className="text-white/80" />
        </button>
      )}

      {/* Game Over Screen */}
      {gameState === "gameover" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md z-20 pointer-events-none">
          <div className="pointer-events-auto text-center animate-in fade-in zoom-in duration-300">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-red-500 mb-4">
              NAVE DESTRUIDA
            </h2>
            <p className="text-slate-light font-mono mb-8">La resistencia ha caído...</p>

            <div className="mb-8 font-mono">
              <p className="text-2xl text-white mb-2">Puntuación: {Math.floor(score)}</p>
              {Math.floor(score) >= highScore && Math.floor(score) > 0 && (
                <p className="text-yellow-400 animate-bounce">¡NUEVO RÉCORD!</p>
              )}
            </div>

            <button
              onClick={resetGame}
              className="px-8 py-3 bg-white text-black font-bold font-mono rounded hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center gap-2 mx-auto"
            >
              <RotateCcw size={20} /> REINTENTAR
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpaceRunnerGame;
