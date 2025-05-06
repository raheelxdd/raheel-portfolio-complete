import { useEffect, useState, useRef, useCallback } from "react";

export default function PortfolioPage() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [offsetY, setOffsetY] = useState(0);
  const [showExperience, setShowExperience] = useState(false);

  const gridRef = useRef(null);
  const backGridRef = useRef(null);
  const intervalRef = useRef(null);

  const updateGrid = useCallback(() => {
    let y = 0;
    intervalRef.current = window.setInterval(() => {
      y -= 0.2;
      setOffsetY(y);
    }, 30);
  }, []);

  useEffect(() => {
    updateGrid();
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [updateGrid]);

  const handleMouseMove = useRef(null);
  useEffect(() => {
    let ticking = false;
    handleMouseMove.current = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setCursor({ x: e.clientX, y: e.clientY });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("mousemove", handleMouseMove.current);
    return () => {
      if (handleMouseMove.current) {
        window.removeEventListener("mousemove", handleMouseMove.current);
      }
    };
  }, []);

  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => {
    const onResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const boxSize = 20.2;
  const centerX = windowSize.width / 2;
  const centerY = windowSize.height / 2;
  const maxDistance = Math.hypot(centerX, centerY);
  const cursorDistance = Math.hypot(cursor.x - centerX, cursor.y - centerY);
  const brightness = 0.25 * (1 - cursorDistance / maxDistance);

  const gridTop = centerY - 400;
  const gridLeft = centerX - 400;
  const highlightX = Math.floor((cursor.x - gridLeft) / boxSize) * boxSize;
  const highlightY = Math.floor((cursor.y - gridTop - offsetY) / boxSize) * boxSize;

  const parallaxX = ((cursor.x - centerX) / centerX) * 12;
  const parallaxY = ((cursor.y - centerY) / centerY) * 12;
  const parallaxBackX = ((cursor.x - centerX) / centerX) * 24;
  const parallaxBackY = ((cursor.y - centerY) / centerY) * 24;

  const gridStyle = {
    top: `calc(50% + ${parallaxY}px)`,
    left: `calc(50% + ${parallaxX}px)`,
    backgroundImage: "linear-gradient(#aaa 1px, transparent 1px), linear-gradient(90deg, #aaa 1px, transparent 1px)",
    backgroundSize: "20.2px 20.2px",
    backgroundPositionY: `${offsetY}px`,
    opacity: 0.2,
    maskImage: "radial-gradient(ellipse 120% 100% at center, rgba(0,0,0,1) 15%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 90%)",
    WebkitMaskImage: "radial-gradient(ellipse 120% 100% at center, rgba(0,0,0,1) 15%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 90%)",
    transition: "top 0.1s ease-out, left 0.1s ease-out"
  };

  const backGridStyle = {
    top: `calc(50% + ${parallaxBackY}px)`,
    left: `calc(50% + ${parallaxBackX}px)`,
    backgroundImage: "linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)",
    backgroundSize: "40px 40px",
    backgroundPositionY: `${offsetY * 0.5}px`,
    opacity: 0.1,
    maskImage: "radial-gradient(ellipse 90% 100% at center, rgba(0,0,0,1) 10%, rgba(0,0,0,0.1) 65%, rgba(0,0,0,0) 95%)",
    WebkitMaskImage: "radial-gradient(ellipse 90% 100% at center, rgba(0,0,0,1) 10%, rgba(0,0,0,0.1) 65%, rgba(0,0,0,0) 95%)",
    transition: "top 0.2s ease-out, left 0.2s ease-out"
  };

  const highlightStyle = {
    top: Math.round(gridTop + highlightY + offsetY),
    left: Math.round(gridLeft + highlightX),
    width: boxSize,
    height: boxSize,
    backgroundColor: `rgba(255,255,255,${brightness.toFixed(3)})`
  };

  return (
    <main className="overflow-y-auto h-screen bg-black">
      <div className="relative min-h-screen text-white overflow-hidden">
        <nav className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between px-6 py-3 bg-black/80 rounded-2xl backdrop-blur-md border border-white/10 transition-all duration-300 hover:shadow-lg hover:scale-[1.03] hover:shadow-white/5">
          <a href="https://www.instagram.com/raheel.xdd/" target="_blank" rel="noopener noreferrer" className="group flex items-center space-x-2 transition-transform duration-200 hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white transition-colors duration-300 group-hover:text-pink-500">
              <path d="M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5Zm0 1.5h8.5A4.25 4.25 0 0 1 20.5 7.75v8.5a4.25 4.25 0 0 1-4.25 4.25h-8.5A4.25 4.25 0 0 1 3.5 16.25v-8.5A4.25 4.25 0 0 1 7.75 3.5ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 1.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Zm5.25-.75a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/raheelsaleem21/" target="_blank" rel="noopener noreferrer" className="group flex items-center space-x-2 transition-transform duration-200 hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white transition-colors duration-300 group-hover:text-blue-500">
              <path d="M20.45 20.45h-3.55v-5.4c0-1.29-.03-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85v5.5h-3.55v-11h3.41v1.5h.05c.47-.9 1.6-1.84 3.3-1.84 3.53 0 4.18 2.3 4.18 5.3v6.04zM5.34 8.5a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 11.95h-3.55v-11h3.55v11zM22.22 0H1.78C.8 0 0 .78 0 1.73v20.54C0 23.22.8 24 1.78 24h20.44C23.2 24 24 23.22 24 22.27V1.73C24 .78 23.2 0 22.22 0z" />
            </svg>
          </a>
        </nav>

        <div ref={backGridRef} className="absolute w-[1600px] h-[1600px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={backGridStyle} />
        <div style={highlightStyle} className="absolute z-10 pointer-events-none transition-all duration-200 ease-out" />
        <div ref={gridRef} className="absolute w-[1200px] h-[1200px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={gridStyle} />

        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none translate-y-[-3%]">
          <h1 className="text-[3.4rem] font-semibold">Raheel Saleem</h1>
          <h2 className="text-[1.7rem] font-light mt-[-0.5rem]">Customer Experience</h2>
          <p className="text-base font-light mt-6 max-w-2xl text-center px-4">
            Passion, attention to detail and sheer will — would be the best way to describe how I make my team, and customers' lives easier on a daily basis!
          </p>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
          <button
            className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 hover:border-white bg-black/60 hover:bg-black/80 transition-all duration-300"
            onClick={() => {
              setShowExperience(true);
              setTimeout(() => {
                const el = document.getElementById("next-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25L12 15.75L4.5 8.25" />
            </svg>
          </button>
        </div>
      </div>

      {showExperience && (
        <div id="next-section" className="relative w-full h-screen text-white flex items-center justify-center overflow-hidden" style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,1) 100%)" }}>
          <div ref={backGridRef} className="absolute w-[1600px] h-[1600px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ ...backGridStyle, opacity: backGridStyle.opacity * 0.5 }} />
          <div ref={gridRef} className="absolute w-[1200px] h-[1200px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ ...gridStyle, opacity: gridStyle.opacity * 0.5 }} />
          <div className="text-center px-4 z-10">
            <h2 className="text-3xl font-bold mb-4">Experience</h2>
            <p className="text-lg max-w-xl mx-auto text-white/70">
              Here's where I’ll talk about the companies I've worked at, the roles I've played, and how I've contributed to user success and product growth.
            </p>
          </div>
        </div>
      )}
    </main>
  );
} 
