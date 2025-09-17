import React, { useEffect, useRef, useState } from "react";

// List of math symbols to animate
const allSymbols = ["π", "∑", "∞", "√", "∫", "Δ", "α", "β", "Σ", "θ", "λ", "Ω", "μ", "δ", "∇", "Ψ", "φ", "ζ", "η", "κ"];

const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

const SYMBOL_SIZE = 48; // px, all symbols same size

const AnimatedSymbols: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive: remove 5 symbols on mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const symbols = isMobile ? allSymbols.slice(0, allSymbols.length - 8) : allSymbols;

  const [positions, setPositions] = useState(
    symbols.map(() => ({
      x: getRandom(0, 80), // percent
      y: getRandom(0, 80), // percent
      dx: getRandom(-0.19, 0.19), // slightly faster movement
      dy: getRandom(-0.19, 0.19),
    }))
  );

  useEffect(() => {
    let animationFrame: number;
    const animate = () => {
      setPositions((prev) =>
        prev.map((pos) => {
          let { x, y, dx, dy } = pos;
          x += dx;
          y += dy;
          // Bounce off edges (0% to 100%-symbol size)
          if (x < 0) { x = 0; dx = -dx; }
          if (x > 100 - (SYMBOL_SIZE / (containerRef.current?.offsetWidth || 1)) * 100) {
            x = 100 - (SYMBOL_SIZE / (containerRef.current?.offsetWidth || 1)) * 100;
            dx = -dx;
          }
          if (y < 0) { y = 0; dy = -dy; }
          if (y > 100 - (SYMBOL_SIZE / (containerRef.current?.offsetHeight || 1)) * 100) {
            y = 100 - (SYMBOL_SIZE / (containerRef.current?.offsetHeight || 1)) * 100;
            dy = -dy;
          }
          return { x, y, dx, dy };
        })
      );
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
    // eslint-disable-next-line
  }, [symbols.length]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 w-full h-full">
      {positions.map((pos, i) => (
        <span
          key={i}
          className="absolute select-none"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            fontSize: `${SYMBOL_SIZE}px`,
            color: i % 3 === 0
              ? "rgba(255,255,255,0.18)"
              : i % 3 === 1
              ? "rgba(251,146,60,0.25)"
              : "rgba(59,130,246,0.22)",
            transition: "none",
            userSelect: "none",
            pointerEvents: "none",
            fontWeight: 700,
            filter: "blur(0.5px)",
          }}
        >
          {symbols[i]}
        </span>
      ))}
    </div>
  );
};

export default AnimatedSymbols;