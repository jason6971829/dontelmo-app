import { useEffect, useState } from "react";

/**
 * PandaMascot — mascota animada de Me Inspiras 17
 *
 * Props:
 *   expression: "gift" | "wave" | "celebrate" | "sad"
 *   size: número en px (default 120)
 *   message: texto opcional que aparece en burbuja
 *   animate: true/false (default true)
 */
export default function PandaMascot({
  expression = "wave",
  size = 120,
  message,
  animate = true,
}) {
  const images = {
    gift:      "/panda/panda-gift.png",
    wave:      "/panda/panda-wave.png",
    celebrate: "/panda/panda-celebrate.png",
    sad:       "/panda/panda-sad.png",
  };

  // Animaciones CSS por expresión
  const animations = {
    wave:      "panda-bounce",
    gift:      "panda-float",
    celebrate: "panda-jump",
    sad:       "panda-shake",
  };

  const anim = animate ? animations[expression] : "";

  return (
    <div className="panda-mascot-wrapper" style={{ display: "inline-block", position: "relative" }}>
      {/* Burbuja de mensaje */}
      {message && (
        <div
          style={{
            position: "absolute",
            top: -12,
            left: "50%",
            transform: "translateX(-50%)",
            background: "white",
            border: "2px solid #e8b4b8",
            borderRadius: "16px",
            padding: "6px 14px",
            fontSize: "12px",
            fontFamily: "var(--font-heading, sans-serif)",
            letterSpacing: "0.05em",
            color: "#7a5c5c",
            whiteSpace: "nowrap",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            zIndex: 10,
          }}
        >
          {message}
          {/* Triángulo apuntando hacia abajo */}
          <span
            style={{
              position: "absolute",
              bottom: -8,
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "7px solid transparent",
              borderRight: "7px solid transparent",
              borderTop: "8px solid #e8b4b8",
            }}
          />
        </div>
      )}

      {/* Imagen del panda */}
      <img
        src={images[expression]}
        alt={`Panda ${expression}`}
        width={size}
        height={size}
        className={anim}
        style={{ objectFit: "contain", display: "block" }}
      />

      {/* Estilos de animación */}
      <style>{`
        @keyframes pandaBounce {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25%       { transform: translateY(-8px) rotate(-3deg); }
          75%       { transform: translateY(-4px) rotate(3deg); }
        }
        @keyframes pandaFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%       { transform: translateY(-10px) scale(1.03); }
        }
        @keyframes pandaJump {
          0%, 100% { transform: translateY(0px) scale(1) rotate(0deg); }
          20%       { transform: translateY(-18px) scale(1.08) rotate(-5deg); }
          40%       { transform: translateY(-10px) scale(1.05) rotate(5deg); }
          60%       { transform: translateY(-16px) scale(1.07) rotate(-3deg); }
          80%       { transform: translateY(-5px) scale(1.02) rotate(2deg); }
        }
        @keyframes pandaShake {
          0%, 100% { transform: translateX(0px); }
          20%       { transform: translateX(-5px) rotate(-2deg); }
          40%       { transform: translateX(5px) rotate(2deg); }
          60%       { transform: translateX(-3px) rotate(-1deg); }
          80%       { transform: translateX(3px) rotate(1deg); }
        }
        .panda-bounce    { animation: pandaBounce 2s ease-in-out infinite; }
        .panda-float     { animation: pandaFloat 3s ease-in-out infinite; }
        .panda-jump      { animation: pandaJump 1.2s ease-in-out infinite; }
        .panda-shake     { animation: pandaShake 1.5s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
