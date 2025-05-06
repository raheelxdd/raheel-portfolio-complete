import { useEffect, useState, useRef } from "react";

export default function PortfolioPage() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [offsetY, setOffsetY] = useState(0);
  const gridRef = useRef(null);
  const backGridRef = useRef(null);

  useEffect(() => {
    let y = 0;
    const interval = setInterval(() => {
      y -= 0.2;
      setOffsetY(y);
      if (gridRef.current) gridRef.current.style.backgroundPositionY = `${y}px`;
      if (backGridRef.current) backGridRef.current.style.backgroundPositionY = `${y * 0.5}px`;
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

  const parallaxX = ((cursor.x - centerX) / centerX) * 12;
  const parallaxY = ((cursor.y - centerY) / centerY) * 12;

  const parallaxBackX = ((cursor.x - centerX) / centerX) * 24;
  const parallaxBackY = ((cursor.y - centerY) / centerY) * 24;

  return (
    <div className="fixed inset-0 text-white overflow-hidden" style={{ background: "#000000" }}>
      {/* Navbar */}
      <nav className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between px-6 py-3 bg-black/80 rounded-2xl backdrop-blur-md border border-white/10">
        <div className="flex items-center space-x-3">
          <img src="/export.jpg" alt="Logo" className="w-6 h-6 rounded-full object-cover" />
          
        </div>
        <a
          href="https://www.linkedin.com/in/raheelsaleem21/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white flex items-center space-x-2 hover:underline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path d="M20.45 20.45h-3.55v-5.4c0-1.29-.03-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85v5.5h-3.55v-11h3.41v1.5h.05c.47-.9 1.6-1.84 3.3-1.84 3.53 0 4.18 2.3 4.18 5.3v6.04zM5.34 8.5a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 11.95h-3.55v-11h3.55v11zM22.22 0H1.78C.8 0 0 .78 0 1.73v20.54C0 23.22.8 24 1.78 24h20.44C23.2 24 24 23.22 24 22.27V1.73C24 .78 23.2 0 22.22 0z" />
          </svg>
          
        </a>
      </nav>

      {/* Back Grid for depth */}
      <div
        ref={backGridRef}
        className="absolute w-[1600px] h-[1600px] -translate-x-1/2 -translate-y-1/2 z-[-10] pointer-events-none"
        style={{
          top: `calc(50% + ${parallaxBackY}px)`,
          left: `calc(50% + ${parallaxBackX}px)`,
          position: "absolute",
          backgroundImage:
            "linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.1,
          maskImage:
            "radial-gradient(ellipse 60% 100% at center, rgba(0,0,0,1) 10%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0) 95%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 100% at center, rgba(0,0,0,1) 10%, rgba(0,0,0,0.1) 65%, rgba(0,0,0,0) 95%)",
          transition: "top 0.2s ease-out, left 0.2s ease-out",
        }}
      />

      {/* Highlighted Grid Cell */}
      <div
        className="absolute z-10 pointer-events-none transition-all duration-200 ease-out"
        style={{
          top: Math.round(gridTop + highlightY + offsetY),
          left: Math.round(gridLeft + highlightX),
          width: boxSize,
          height: boxSize,
          backgroundColor: `rgba(255, 255, 255, ${brightness.toFixed(3)})`,
        }}
      />

      {/* Foreground Grid Line with parallax */}
      <div
        id="animated-grid"
        ref={gridRef}
        className="absolute w-[1200px] h-[1200px] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"
        style={{
          top: `calc(50% + ${parallaxY}px)`,
          left: `calc(50% + ${parallaxX}px)`,
          position: "absolute",
          backgroundImage:
            "linear-gradient(#aaa 1px, transparent 1px), linear-gradient(90deg, #aaa 1px, transparent 1px)",
          backgroundSize: "20.2px 20.2px",
          opacity: 0.2,
          maskImage:
            "radial-gradient(ellipse 60% 100% at center, rgba(0,0,0,1) 15%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 120% 100% at center, rgba(0,0,0,1) 15%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 90%)",
          transition: "top 0.1s ease-out, left 0.1s ease-out",
        }}
      />

      {/* Name Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none translate-y-[3%]">
        <h1 className="text-white text-[3.4rem] font-semibold">Raheel Saleem</h1>
        <h2 className="text-white text-[1.7rem] font-light mt-[-0.5rem]">Customer Experience</h2>
        <p className="text-white text-base font-light mt-6 max-w-2xl text-center px-4">
          Passion, attention to detail and sheer will — would be the best way to describe how I make my team, and customer's lives easier on a daily basis!
        </p>
        
      </div>
    </div>
  );
}
