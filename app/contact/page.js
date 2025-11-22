// app/contact/page.js
"use client";
import React, { useEffect, useState } from "react";
import { Terminal, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { useLanguage } from "../../app/LanguageContext";

// Traducciones
const texts = {
  EN: {
    whoami: "whoami",
    identity: "Josep Martínez Boix - Developer & Data Engineer",
    location: "Valencia, Valencian Community, Spain",
    contactList: "contact --list-all",
    messageCommand: "get message",
    messageText: "Let's talk! I am always open to new opportunities.",
    email: "contact@josepmartinezboix.com",
    linkedin: "linkedin.com/in/josepmartinezboix",
    github: "github.com/Josep-martinez",
  },
  ES: {
    whoami: "whoami",
    identity: "Josep Martínez Boix - Desarrollador & Ingeniero de Datos",
    location: "Valencia, Comunidad Valenciana, España",
    contactList: "contact --list-all",
    messageCommand: "get message",
    messageText: "¡Hablemos! Estoy siempre abierto a nuevas oportunidades.",
    email: "contact@josepmartinezboix.com",
    linkedin: "linkedin.com/in/josepmartinezboix",
    github: "github.com/Josep-martinez",
  },
};

/* ============ Typewriter por segmentos ============ */
function SegmentedTypeWriter({
  segments,        // [{ text, className }]
  start,
  speed = 24,
  onDone,
  onFirstChar,
  cursorColorClass = "border-electric",
}) {
  const [typedLen, setTypedLen] = useState(0);
  const totalLen = segments.reduce((acc, s) => acc + s.text.length, 0);

  useEffect(() => {
    if (!start) return;
    setTypedLen(0);
    let i = 0;
    let timer;
    const step = () => {
      if (i === 1 && onFirstChar) onFirstChar();
      if (i <= totalLen) {
        setTypedLen(i);
        i += 1;
        timer = setTimeout(step, speed);
      } else {
        onDone?.();
      }
    };
    step();
    return () => clearTimeout(timer);
  }, [start, totalLen, speed, onDone, onFirstChar]);

  let remaining = typedLen;
  return (
    <span className="align-baseline">
      {segments.map((seg, idx) => {
        const take = Math.max(0, Math.min(seg.text.length, remaining));
        remaining = Math.max(0, remaining - seg.text.length);
        return (
          <span
            key={idx}
            className={`${seg.className ?? ""} break-words break-all whitespace-normal`}
          >
            {seg.text.slice(0, take)}
          </span>
        );
      })}
      {start && typedLen < totalLen && (
        <span className={`ml-0.5 border-r-2 ${cursorColorClass} inline-block animate-pulse`} />
      )}
    </span>
  );
}

/* ============ Fila con icono que aparece con fade + micro-pop (lento) ============ */
function IconTypeRow({
  icon: Icon,
  text,
  start,
  onDone,
  href,
}) {
  const [showIcon, setShowIcon] = useState(false);
  const textNode = (
    <SegmentedTypeWriter
      start={start}
      onDone={onDone}
      onFirstChar={() => setShowIcon(true)}
      segments={[{ text, className: "" }]}
      cursorColorClass="border-electric"
    />
  );

  return (
    <div className="flex items-start gap-4">
      <Icon
        className={`text-slate-light w-5 h-5 md:w-6 md:h-6 shrink-0 mt-[2px] 
                    transition-opacity transition-transform duration-500 ease-out will-change-transform
                    ${showIcon ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      />
      <div className="min-w-0">
        <div className="text-slate-light break-words break-all whitespace-normal md:break-words">
          {href ? (
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="hover:text-electric transition-colors"
            >
              {textNode}
            </a>
          ) : (
            textNode
          )}
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const { language } = useLanguage();
  const t = texts[language] || texts.EN;

  // Step machine: 0..8 secuencial
  const [step, setStep] = useState(0);
  const next = () => setStep((s) => s + 1);

  useEffect(() => {
    setStep(0);
  }, [language]);

  return (
    <div className="min-h-screen pt-28 md:pt-32 p-6 md:p-20 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto">
        <div className="glass-panel rounded-xl p-6 md:p-10 shadow-2xl overflow-visible border border-slate-dark/50 relative">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-electric to-transparent opacity-50"></div>

          {/* Header tipo terminal */}
          <div className="flex items-center gap-2 border-b border-slate-dark/50 pb-4 mb-6">
            <Terminal className="text-electric w-6 h-6 md:w-8 md:h-8" />
            <span className="font-mono text-electric text-sm md:text-base font-bold">
              contact.exe
            </span>
          </div>

          {/* Contenido secuencial */}
          <div className="font-mono space-y-6 text-sm md:text-lg">

            {/* 0) "$ " + whoami */}
            <div>
              {step > 0 ? (
                <>
                  <span className="text-electric text-sm md:text-lg font-bold">$ </span>
                  <span className="text-blue-400 text-sm md:text-lg">{t.whoami}</span>
                </>
              ) : (
                <SegmentedTypeWriter
                  start={step === 0}
                  onDone={next}
                  segments={[
                    { text: "$ ", className: "text-electric text-sm md:text-lg font-bold" },
                    { text: t.whoami, className: "text-blue-400 text-sm md:text-lg" },
                  ]}
                  cursorColorClass="border-electric"
                />
              )}
            </div>

            {/* 1) identidad */}
            <div className="text-slate-light">
              {step > 1 ? (
                t.identity
              ) : (
                step === 1 && (
                  <SegmentedTypeWriter
                    start
                    onDone={next}
                    segments={[{ text: t.identity, className: "" }]}
                    cursorColorClass="border-electric"
                  />
                )
              )}
            </div>

            {/* 2) ubicación */}
            {step > 2 ? (
              <div className="flex items-start gap-4">
                <MapPin className="text-slate-light w-5 h-5 md:w-6 md:h-6 shrink-0 mt-[2px]" />
                <div className="min-w-0">
                  <div className="text-slate-light break-words break-all whitespace-normal md:break-words">
                    {t.location}
                  </div>
                </div>
              </div>
            ) : (
              step === 2 && (
                <IconTypeRow
                  icon={MapPin}
                  text={t.location}
                  start
                  onDone={next}
                />
              )
            )}

            {/* 3) "$ " + contact --list-all */}
            <div>
              {step > 3 ? (
                <>
                  <span className="text-electric text-sm md:text-lg font-bold">$ </span>
                  <span className="text-blue-400 text-sm md:text-lg">{t.contactList}</span>
                </>
              ) : (
                step === 3 && (
                  <SegmentedTypeWriter
                    start
                    onDone={next}
                    segments={[
                      { text: "$ ", className: "text-electric text-sm md:text-lg font-bold" },
                      { text: t.contactList, className: "text-blue-400 text-sm md:text-lg" },
                    ]}
                    cursorColorClass="border-electric"
                  />
                )
              )}
            </div>

            {/* 4) email */}
            {step > 4 ? (
              <div className="flex items-start gap-4">
                <Mail className="text-slate-light w-5 h-5 md:w-6 md:h-6 shrink-0 mt-[2px]" />
                <div className="min-w-0">
                  <div className="text-slate-light break-words break-all whitespace-normal md:break-words">
                    <a
                      href={`mailto:${t.email}`}
                      className="hover:text-electric transition-colors break-all"
                    >
                      {t.email}
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              step === 4 && (
                <IconTypeRow
                  icon={Mail}
                  text={t.email}
                  start
                  onDone={next}
                  href={`mailto:${t.email}`}
                />
              )
            )}

            {/* 5) LinkedIn */}
            {step > 5 ? (
              <div className="flex items-start gap-4">
                <Linkedin className="text-slate-light w-5 h-5 md:w-6 md:h-6 shrink-0 mt-[2px]" />
                <div className="min-w-0">
                  <div className="text-slate-light break-words break-all whitespace-normal md:break-words">
                    <a
                      href="https://www.linkedin.com/in/josepmartinezboix/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-electric transition-colors break-all"
                    >
                      {t.linkedin}
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              step === 5 && (
                <IconTypeRow
                  icon={Linkedin}
                  text={t.linkedin}
                  start
                  onDone={next}
                  href="https://www.linkedin.com/in/josepmartinezboix/"
                />
              )
            )}

            {/* 6) GitHub */}
            {step > 6 ? (
              <div className="flex items-start gap-4">
                <Github className="text-slate-light w-5 h-5 md:w-6 md:h-6 shrink-0 mt-[2px]" />
                <div className="min-w-0">
                  <div className="text-slate-light break-words break-all whitespace-normal md:break-words">
                    <a
                      href="https://github.com/Josep-martinez"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-electric transition-colors break-all"
                    >
                      {t.github}
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              step === 6 && (
                <IconTypeRow
                  icon={Github}
                  text={t.github}
                  start
                  onDone={next}
                  href="https://github.com/Josep-martinez"
                />
              )
            )}

            {/* 7) "$ " + get message */}
            <div>
              {step > 7 ? (
                <>
                  <span className="text-electric text-sm md:text-lg font-bold">$ </span>
                  <span className="text-blue-400 text-sm md:text-lg">{t.messageCommand}</span>
                </>
              ) : (
                step === 7 && (
                  <SegmentedTypeWriter
                    start
                    onDone={next}
                    segments={[
                      { text: "$ ", className: "text-electric text-sm md:text-lg font-bold" },
                      { text: t.messageCommand, className: "text-blue-400 text-sm md:text-lg" },
                    ]}
                    cursorColorClass="border-electric"
                  />
                )
              )}
            </div>

            {/* 8) mensaje final */}
            <div className="text-slate-light">
              {step > 8 ? (
                t.messageText
              ) : (
                step === 8 && (
                  <SegmentedTypeWriter
                    start
                    onDone={next}
                    segments={[{ text: t.messageText, className: "" }]}
                    cursorColorClass="border-electric"
                  />
                )
              )}
            </div>

            {/* cursor final */}
            {step > 8 && (
              <div className="flex items-center">
                <span className="text-electric text-sm md:text-lg font-bold">$ </span>
                <span className="text-slate-light ml-2 animate-pulse">█</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}