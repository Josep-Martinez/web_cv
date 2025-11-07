// app/chat/page.js
"use client";

import React, { useRef, useState, useEffect } from "react";
import { Send, Sparkles, User, Bot, ArrowLeft } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import { nixieOne, martianMono } from "../fonts";
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
      className={`flex gap-3 items-start animate-fadeIn ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
          isUser
            ? "bg-blue-600/20 border-blue-500/50"
            : "bg-gradient-to-br from-purple-600/20 to-blue-600/20 border-purple-500/50"
        }`}
      >
        {isUser ? (
          <User size={16} className="text-blue-400" />
        ) : (
          <Bot size={16} className="text-purple-400" />
        )}
      </div>

      {/* Message bubble */}
      <div
        className={`max-w-[75%] md:max-w-[65%] rounded-2xl px-4 py-3 border backdrop-blur-sm transition-all duration-300 hover:scale-[1.01] ${
          isUser
            ? "bg-blue-600/10 border-blue-500/30 hover:bg-blue-600/15 hover:border-blue-500/50"
            : "bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700/50 hover:from-slate-900/70 hover:to-slate-800/70"
        }`}
      >
        {isTyping ? (
          <div className="flex gap-1 py-1">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></span>
          </div>
        ) : (
          <p className="whitespace-pre-wrap text-slate-200 text-sm md:text-base leading-relaxed">
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
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const onSend = async (e) => {
    e?.preventDefault?.();
    const content = input.trim();
    if (!content || isTyping) return;

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
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f1e] via-[#101827] to-[#0f172a] text-white flex flex-col">
      {/* Header con gradiente */}
      <div className="sticky top-0 z-10 border-b border-slate-800/50 bg-[#0f172a]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className={`${martianMono.className} flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors text-sm`}
          >
            <ArrowLeft size={18} />
            {t.back}
          </button>
          
          <div className="text-center flex-1">
            <h1
              className={`${nixieOne.className} text-xl md:text-3xl font-bold tracking-wider bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent`}
            >
              {t.title}
            </h1>
            <p
              className={`${martianMono.className} text-[11px] md:text-xs text-slate-400 mt-1`}
            >
              <span className="inline-flex items-center gap-1">
                <Sparkles size={12} className="text-purple-400 animate-pulse" />
                {t.subtitle}
              </span>
            </p>
          </div>
          
          <div className="w-20"></div>
        </div>
      </div>

      {/* Chat container */}
      <main className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 py-6 h-full">
          <div className="bg-gradient-to-br from-slate-900/40 via-slate-900/30 to-slate-800/40 border border-slate-800/60 rounded-3xl h-[calc(100vh-180px)] md:h-[calc(100vh-160px)] flex flex-col backdrop-blur-sm shadow-2xl">
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
              className="border-t border-slate-800/60 p-3 md:p-5 bg-slate-900/30 backdrop-blur-sm rounded-b-3xl"
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
                    className={`w-full bg-slate-900/60 border border-slate-700/60 rounded-2xl px-4 py-3 outline-none ${martianMono.className} text-sm md:text-base text-slate-200 placeholder:text-slate-500 focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none min-h-[48px] max-h-[120px]`}
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
                  className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-3 rounded-2xl font-medium transition-all duration-300 ${
                    !input.trim() || isTyping
                      ? "bg-slate-800/40 text-slate-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 active:scale-95 shadow-lg shadow-blue-500/20 hover:shadow-purple-500/30"
                  }`}
                >
                  <Send size={18} />
                  <span className={`${martianMono.className} text-sm hidden md:inline`}>
                    {t.send}
                  </span>
                </button>
              </div>
              <p className={`${martianMono.className} text-[10px] text-slate-500 mt-2 text-center`}>
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