import { useEffect, useState, useRef } from "react";

export default function PortfolioPage() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [offsetY, setOffsetY] = useState(0);
  const gridRef = useRef(null);

  useEffect(() => {
    let y = 0;
    const interval = setInterval(() => {
      y -= 0.2;
      setOffsetY(y);
      if (gridRef.current) {
        gridRef.current.style.backgroundPosition = `0px ${y}px`;
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const boxSize = 20.2;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const maxDistance = Math.sqrt(centerX ** 2 + centerY ** 2);
  const cursorDistance = Math.sqrt((cursor.x - centerX) ** 2 + (cursor.y - centerY) ** 2);
  const brightness = 0.25 * (1 - cursorDistance / maxDistance);

  const gridTop = centerY - 400;
  const gridLeft = centerX - 400;

  const adjustedY = cursor.y - gridTop - offsetY;
  const adjustedX = cursor.x - gridLeft;

  const highlightX = Math.floor(adjustedX / boxSize) * boxSize;
  const highlightY = Math.floor(adjustedY / boxSize) * boxSize;

  return (
    <div
      className="fixed inset-0 text-white overflow-hidden"
      style={{ background: "#000000" }}
    >
      <div
        className="absolute z-10 pointer-events-none transition-all duration-200 ease-out"
        style={{
          top: gridTop + highlightY + offsetY,
          left: gridLeft + highlightX,
          width: boxSize,
          height: boxSize,
          backgroundColor: `rgba(255, 255, 255, ${brightness.toFixed(3)})`,
        }}
      />

      <div
        id="animated-grid"
        ref={gridRef}
        className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none rounded-full"
        style={{
          backgroundImage:
            "linear-gradient(#aaa 1px, transparent 1px), linear-gradient(90deg, #aaa 1px, transparent 1px)",
          backgroundSize: "20.2px 20.2px",
          opacity: 0.2,
          maskImage:
            "radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none translate-y-[-80px]">
        <h1 className="text-white text-4xl font-semibold">Raheel Saleem</h1>
        <h2 className="text-white text-lg font-light mt-2">Customer Experience</h2>
      </div>
    </div>
  );
}
