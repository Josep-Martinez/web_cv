// app/chat/page.js
"use client";

import React, { useRef, useState, useEffect } from "react";
import { Send, Sparkles, User, Bot } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import { useRouter } from "next/navigation";

const texts = {
  EN: {
    title: "AI Assistant",
    subtitle: "Ask anything about my work, projects or background.",
    placeholder: "Type your message here...",
    send: "Send",
    hello:
      "Hi! I'm your personal assistant for Josep's portfolio. How can I help you today?",
    typing: "Assistant is typing",
    back: "Back",
  },
  ES: {
    title: "Asistente IA",
    subtitle: "Pregunta sobre mi trabajo, proyectos o trayectoria.",
    placeholder: "Escribe tu mensaje aquí...",
    send: "Enviar",
    hello:
      "¡Hola! Soy el asistente del portfolio de Josep. ¿En qué puedo ayudarte hoy?",
    typing: "El asistente está escribiendo",
    back: "Volver",
  },
};

const uid = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;

function MessageBubble({ role, content, isTyping }) {
  const isUser = role === "user";

  return (
    <div
      className={`flex gap-3 items-start animate-fadeIn ${isUser ? "flex-row-reverse" : "flex-row"
        }`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isUser
            ? "bg-electric/10 border-electric/50"
            : "bg-navy-800 border-slate-dark/50"
          }`}
      >
        {isUser ? (
          <User size={16} className="text-electric" />
        ) : (
          <Bot size={16} className="text-slate-light" />
        )}
      </div>

      {/* Message bubble */}
      <div
        className={`max-w-[75%] md:max-w-[65%] rounded-2xl px-4 py-3 border backdrop-blur-sm transition-all duration-300 hover:scale-[1.01] ${isUser
            ? "bg-electric/10 border-electric/30 hover:bg-electric/15 hover:border-electric/50"
            : "glass-panel border-slate-dark/50"
          }`}
      >
        {isTyping ? (
          <div className="flex gap-1 py-1">
            <span className="w-2 h-2 bg-electric rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-2 h-2 bg-electric rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-2 h-2 bg-electric rounded-full animate-bounce"></span>
          </div>
        ) : (
          <p className="whitespace-pre-wrap text-slate-light text-sm md:text-base leading-relaxed font-sans">
            {content}
          </p>
        )}
      </div>
    </div>
  );
}

export default function ChatPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const t = texts[language] || texts.EN;

  const [messages, setMessages] = useState([
    { id: "m-1", role: "assistant", content: t.hello },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Solo hacer scroll si el usuario ya ha interactuado
    if (hasInteracted) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, hasInteracted]);

  const onSend = async (e) => {
    e?.preventDefault?.();
    const content = input.trim();
    if (!content || isTyping) return;

    setHasInteracted(true);
    const userMessage = { id: uid(), role: "user", content };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simular delay de respuesta
    setTimeout(() => {
      const response = {
        id: uid(),
        role: "assistant",
        content:
          language === "EN"
            ? "Thanks for your message! This is a demo version. In the full version, I'll be powered by AI to answer questions about Josep's work, projects, skills, and experience using real data from his portfolio."
            : "¡Gracias por tu mensaje! Esta es una versión demo. En la versión completa, estaré potenciado por IA para responder preguntas sobre el trabajo, proyectos, habilidades y experiencia de Josep usando datos reales de su portfolio.",
      };
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-20 text-white flex flex-col">
      {/* Header con gradiente */}
      <div className="sticky top-20 z-10 border-b border-slate-dark/30 bg-navy-900/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="text-center">
            <h1
              className="font-heading text-2xl md:text-3xl font-bold tracking-wider text-electric"
            >
              {t.title}
            </h1>
            <p
              className="font-mono text-[11px] md:text-xs text-slate-light mt-1"
            >
              <span className="inline-flex items-center gap-1">
                <Sparkles size={12} className="text-electric animate-pulse" />
                {t.subtitle}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Chat container */}
      <main className="flex-1 overflow-hidden flex items-center">
        <div className="max-w-4xl mx-auto px-4 py-4 md:py-6 w-full">
          <div className="glass-panel border border-slate-dark/50 rounded-3xl h-[calc(100vh-200px)] md:h-[calc(100vh-180px)] flex flex-col shadow-2xl">
            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5">
              {messages.map((m) => (
                <MessageBubble key={m.id} role={m.role} content={m.content} />
              ))}
              {isTyping && (
                <MessageBubble role="assistant" content="" isTyping={true} />
              )}
              <div ref={endRef} />
            </div>

            {/* Input area */}
            <form
              onSubmit={onSend}
              className="border-t border-slate-dark/50 p-3 md:p-5 bg-navy-900/50 backdrop-blur-sm rounded-b-3xl"
            >
              <div className="flex items-end gap-3">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        onSend();
                      }
                    }}
                    placeholder={t.placeholder}
                    rows={1}
                    className="w-full bg-navy-800/60 border border-slate-dark/50 rounded-2xl px-4 py-3 outline-none font-mono text-sm md:text-base text-slate-light placeholder:text-slate-500 focus:border-electric/60 focus:ring-2 focus:ring-electric/20 transition-all duration-300 resize-none min-h-[48px] max-h-[120px]"
                    style={{
                      height: "auto",
                      overflowY: input.split("\n").length > 3 ? "auto" : "hidden",
                    }}
                    onInput={(e) => {
                      e.target.style.height = "auto";
                      e.target.style.height = e.target.scrollHeight + "px";
                    }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-3 rounded-2xl font-medium transition-all duration-300 ${!input.trim() || isTyping
                      ? "bg-navy-800 text-slate-600 cursor-not-allowed"
                      : "bg-electric text-navy-900 hover:bg-electric/90 active:scale-95 shadow-lg shadow-electric/20"
                    }`}
                >
                  <Send size={18} />
                  <span className="font-mono text-sm hidden md:inline font-bold">
                    {t.send}
                  </span>
                </button>
              </div>
              <p className="font-mono text-[10px] text-slate-500 mt-2 text-center">
                Beta • Press Enter to send, Shift+Enter for new line
              </p>
            </form>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}