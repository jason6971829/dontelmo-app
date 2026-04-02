import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

const VIDEOS = {
  happy:  "/panda/Secuencia_de_Emociones_de_Iden_Kling_30__80097.mp4",
  angry:  "/panda/Sequence_of_Frustration_Prompt_Kling_30__61266.mp4",
  base:   "/panda/Secuencia_de_Emociones_de_Iden_Kling_30__80097.mp4",
  sad:    "/panda/Sequence_of_Frustration_Prompt_Kling_30__61266.mp4",
};

const MESSAGES = {
  happy:  "¡Hola! ¿En qué te ayudo? 🎁",
  angry:  "¡Ups! Algo salió mal 😤",
  sad:    "Tu carrito está vacío 😢",
  base:   "¡Hola! ¿En qué te ayudo? 🐼",
};

export default function PandaAssistant() {
  const location = useLocation();
  const { totalItems } = useCart();
  const [mood, setMood] = useState("base");
  const [visible, setVisible] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const videoRef = useRef(null);
  const prevMood = useRef("base");

  // Detectar mood según la página y el carrito
  useEffect(() => {
    const path = location.pathname;
    const params = new URLSearchParams(location.search);

    let newMood = "base";

    if (params.get("pedido") === "enviado") {
      newMood = "happy";
    } else if (path === "/carrito" && totalItems === 0) {
      newMood = "sad";
    } else if (path === "/carrito" && totalItems > 0) {
      newMood = "happy";
    } else if (path === "/checkout") {
      newMood = "happy";
    } else {
      newMood = "base";
    }

    if (newMood !== prevMood.current) {
      prevMood.current = newMood;
      setMood(newMood);
      setShowBubble(true);
      // Ocultar burbuja después de 4s
      const t = setTimeout(() => setShowBubble(false), 4000);
      return () => clearTimeout(t);
    }
  }, [location, totalItems]);

  // Cambiar video cuando cambia mood
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [mood]);

  // No mostrar en páginas admin
  if (location.pathname.startsWith("/admin")) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "8px",
        pointerEvents: "none",
      }}
    >
      {/* Burbuja de mensaje */}
      {showBubble && !minimized && (
        <div
          style={{
            background: "white",
            border: "2px solid #f0b8c0",
            borderRadius: "18px 18px 4px 18px",
            padding: "10px 16px",
            fontSize: "13px",
            color: "#7a5050",
            fontWeight: 600,
            boxShadow: "0 4px 20px rgba(200,120,130,0.2)",
            maxWidth: "200px",
            textAlign: "right",
            animation: "bubblePop 0.4s cubic-bezier(0.34,1.56,0.64,1)",
            pointerEvents: "auto",
          }}
        >
          {MESSAGES[mood]}
        </div>
      )}

      {/* Panda video */}
      <div
        style={{
          position: "relative",
          pointerEvents: "auto",
          cursor: "pointer",
        }}
        onClick={() => {
          setMinimized(!minimized);
          if (minimized) setShowBubble(true);
        }}
        title={minimized ? "Abrir asistente" : "Minimizar"}
      >
        {minimized ? (
          /* Mini panda cuando está minimizado */
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #f48ca0, #e87090)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "26px",
              boxShadow: "0 4px 16px rgba(230,100,130,0.4)",
              animation: "float 2s ease-in-out infinite",
            }}
          >
            🐼
          </div>
        ) : (
          /* Video panda completo */
          <div
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(200,120,130,0.3)",
              background: "transparent",
              animation: "float 3s ease-in-out infinite",
              border: "3px solid white",
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                mixBlendMode: "multiply",
                background: "transparent",
              }}
            >
              <source src={VIDEOS[mood]} type="video/mp4" />
            </video>
          </div>
        )}
      </div>

      <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes bubblePop {
          0% { transform: scale(0.8) translateY(8px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
