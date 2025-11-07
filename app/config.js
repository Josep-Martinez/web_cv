// app/config.js
export const FEATURES = {
    // Déjalo en false por defecto (oculto). Actívalo con NEXT_PUBLIC_CHAT_ENABLED=true
    chatEnabled: process.env.NEXT_PUBLIC_CHAT_ENABLED === "true",
  };