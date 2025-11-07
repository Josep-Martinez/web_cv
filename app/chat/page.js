// app/chat/page.js
"use client";

import React, { useRef, useState, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import { nixieOne, martianMono } from "../fonts"; // si tus fuentes están en app/fonts.js cambia a: "../fonts"

const texts = {
  EN: {
    title: "Chat (Beta)",
    subtitle: "Ask anything about my work, projects or background.",
    placeholder: "Type a message…",
    send: "Send",
    hello:
      "Hi! I’m your personal assistant for Josep’s portfolio. How can I help?",
  },
  ES: {
    title: "Chat (Beta)",
    subtitle: "Pregunta sobre mi trabajo, proyectos o trayectoria.",
    placeholder: "Escribe un mensaje…",
    send: "Enviar",
    hello:
      "¡Hola! Soy el asistente del portfolio de Josep. ¿En qué puedo ayudarte?",
  },
};

// id seguro en navegadores sin crypto.randomUUID
const uid = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;

function MessageBubble({ role, content }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-3 py-2 md:px-4 md:py-3 border ${
          isUser
            ? "bg-blue-600/20 border-blue-500/40"
            : "bg-[#0b1220] border-slate-700/70"
        }`}
      >
        <p className="whitespace-pre-wrap text-slate-200 text-sm md:text-base leading-relaxed">
          {content}
        </p>
      </div>
    </div>
  );
}

export default function ChatPage() {
  const { language } = useLanguage();
  const t = texts[language] || texts.EN;

  const [messages, setMessages] = useState([
    { id: "m-1", role: "assistant", content: t.hello },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSend = (e) => {
    e?.preventDefault?.();
    const content = input.trim();
    if (!content) return;

    setMessages((prev) => [
      ...prev,
      { id: uid(), role: "user", content },
      {
        id: uid(),
        role: "assistant",
        content:
          language === "EN"
            ? "Thanks! (Demo UI) — In a future version I’ll answer using your public info and projects."
            : "¡Gracias! (Demo UI) — En una versión futura responderé usando tu info pública y proyectos.",
      },
    ]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-[#101827] text-white flex flex-col">
      {/* Topbar (centrada, sin botón Back) */}
      <div className="sticky top-0 z-10 border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-center">
          <div className="text-center">
            <h1
              className={`${nixieOne.className} text-2xl md:text-4xl font-bold tracking-wider`}
            >
              {t.title}
            </h1>
            <p
              className={`${martianMono.className} text-[12px] md:text-sm text-slate-300 mt-1`}
            >
              <span className="inline-flex items-center gap-1">
                <Sparkles size={14} className="text-blue-400" />
                {t.subtitle}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Chat body */}
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl h-[65vh] md:h-[70vh] flex flex-col">
            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
              {messages.map((m) => (
                <MessageBubble key={m.id} role={m.role} content={m.content} />
              ))}
              <div ref={endRef} />
            </div>

            {/* Composer */}
            <form onSubmit={onSend} className="border-t border-slate-800 p-3 md:p-4">
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t.placeholder}
                  className={`flex-1 bg-[#0b1220] border border-slate-700/70 rounded-xl px-3 py-2 outline-none ${martianMono.className} text-sm md:text-base text-slate-200 placeholder:text-slate-500 focus:border-blue-500`}
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition-colors"
                >
                  <Send size={16} />
                  <span className={`${martianMono.className} text-sm`}>
                    {t.send}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}