import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { WHATSAPP_NUMBER } from "../data/products";

const VIDEOS = {
  happy:  "/panda/Secuencia_de_Emociones_de_Iden_Kling_30__80097.mp4",
  angry:  "/panda/Sequence_of_Frustration_Prompt_Kling_30__61266.mp4",
  base:   "/panda/Secuencia_de_Emociones_de_Iden_Kling_30__80097.mp4",
  sad:    "/panda/Sequence_of_Frustration_Prompt_Kling_30__61266.mp4",
};

const MESSAGES = {
  happy:  "¡Tu pedido va en camino! 🎁",
  angry:  "¡Ups! Algo salió mal 😤",
  sad:    "Tu carrito está vacío 😢",
  base:   "¡Hola! ¿En qué te ayudo?",
};

const WA_ICON = (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="#25D366" style={{ flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function PandaAssistant() {
  const location = useLocation();
  const { totalItems } = useCart();
  const [mood, setMood] = useState("base");
  const [minimized, setMinimized] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const videoRef = useRef(null);
  const prevMood = useRef("base");

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("¡Hola! Me gustaría hacer un pedido 🐼")}`;

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
      const t = setTimeout(() => setShowBubble(false), 5000);
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

  const handlePandaClick = () => {
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const handleBubbleClick = (e) => {
    e.stopPropagation();
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

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
      {/* Burbuja de mensaje con ícono WhatsApp */}
      {showBubble && !minimized && (
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "white",
            border: "2px solid #f0b8c0",
            borderRadius: "18px 18px 4px 18px",
            padding: "10px 14px",
            fontSize: "13px",
            color: "#7a5050",
            fontWeight: 600,
            boxShadow: "0 4px 20px rgba(200,120,130,0.2)",
            maxWidth: "210px",
            textAlign: "right",
            animation: "bubblePop 0.4s cubic-bezier(0.34,1.56,0.64,1)",
            pointerEvents: "auto",
            cursor: "pointer",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "6px",
          }}
        >
          <span>{MESSAGES[mood]}</span>
          {WA_ICON}
        </a>
      )}

      {/* Panda */}
      <div
        style={{
          position: "relative",
          pointerEvents: "auto",
          cursor: "pointer",
        }}
        onClick={minimized ? () => setMinimized(false) : handlePandaClick}
        title="Escríbenos por WhatsApp"
      >
        {/* Botón mini minimizar */}
        {!minimized && (
          <button
            onClick={(e) => { e.stopPropagation(); setMinimized(true); }}
            style={{
              position: "absolute",
              top: 2,
              left: 2,
              zIndex: 10,
              background: "rgba(255,255,255,0.85)",
              border: "none",
              borderRadius: "50%",
              width: "22px",
              height: "22px",
              fontSize: "12px",
              lineHeight: "22px",
              textAlign: "center",
              cursor: "pointer",
              color: "#999",
              boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
              padding: 0,
            }}
            title="Minimizar"
          >
            ×
          </button>
        )}

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
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "160px",
              height: "160px",
              objectFit: "cover",
              display: "block",
              mixBlendMode: "multiply",
              clipPath: "circle(50%)",
              animation: "float 3s ease-in-out infinite",
            }}
          >
            <source src={VIDEOS[mood]} type="video/mp4" />
          </video>
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
