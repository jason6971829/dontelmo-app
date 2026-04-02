import { useRef, useEffect } from "react";

const VIDEOS = {
  wave:      "/panda/Secuencia_de_Emociones_de_Iden_Kling_30__80097.mp4",
  gift:      "/panda/Secuencia_de_Emociones_de_Iden_Kling_30__80097.mp4",
  celebrate: "/panda/Secuencia_de_Emociones_de_Iden_Kling_30__80097.mp4",
  sad:       "/panda/Sequence_of_Frustration_Prompt_Kling_30__61266.mp4",
};

const ANIMATIONS = {
  wave:      "panda-bounce",
  gift:      "panda-float",
  celebrate: "panda-jump",
  sad:       "panda-shake",
};

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
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [expression]);

  const anim = animate ? ANIMATIONS[expression] : "";

  return (
    <div style={{ display: "inline-block", position: "relative" }}>
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

      {/* Video del panda */}
      <div
        className={anim}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          overflow: "hidden",
          background: "linear-gradient(135deg, #fef2f4 0%, #fde8ec 100%)",
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
            display: "block",
          }}
        >
          <source src={VIDEOS[expression]} type="video/mp4" />
        </video>
      </div>

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
