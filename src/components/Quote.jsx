import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const Quote = () => {
  const [hovering, setHovering] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1024,
    height: typeof window !== "undefined" ? window.innerHeight : 768,
  });
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  // Dynamically load Google Fonts once on mount
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Newsreader&family=Updock&family=Waterfall&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const container = document.getElementById("quote");
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const totalHeight = container.offsetHeight - window.innerHeight;
      const scroll = Math.min(Math.max(-rect.top, 0), totalHeight);
      setScrollProgress(scroll / totalHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const progress = scrollProgress;

  // Video scale & morph
  const phase1End = 0.3;
  const videoPhase = Math.min(progress / phase1End, 1);
  const videoScale = 0.7 + 0.3 * videoPhase;

  const textPhaseStart = 0.32;
  const textPhaseEnd = 0.55;
  const textPhase = Math.min(
    Math.max((progress - textPhaseStart) / (textPhaseEnd - textPhaseStart), 0),
    1
  );

  let textOpacity = 0;
  if (textPhase < 0.3) textOpacity = textPhase / 0.3;
  else if (textPhase < 0.6) textOpacity = 1;
  else textOpacity = 1 - (textPhase - 0.6) / 0.4;
  textOpacity = Math.max(0, Math.min(textOpacity, 1));

  const videoBlur = textOpacity * 8;

  const phase3Start = 0.55;
  const phase3End = 0.75;
  const morphPhase = Math.min(
    Math.max((progress - phase3Start) / (phase3End - phase3Start), 0),
    1
  );
  const clipPath = `circle(${100 - 80 * morphPhase}% at 50% 50%)`;
  const circleScale = 1 - 0.7 * morphPhase;

  // Responsive font sizes
  const isMobile = windowSize.width < 768;
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024;

  const mainFontSize = isMobile ? "8vw" : isTablet ? "6.8vw" : "5.6vw";
  const signatureFontSize = isMobile ? "2rem" : isTablet ? "2.4rem" : "3.9rem";
  const lineHeight = isMobile ? 1.1 : isTablet ? 1.05 : 1;
  const letterSpacing = isMobile ? "-2px" : "-4px";

  // Handle video error
  const handleVideoError = () => {
    setVideoError(true);
    console.error("Video failed to load. Using fallback background.");
  };

  return (
    <div id="quote" style={{ height: "300vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          zIndex: 5,
        }}
      >
        {/* Background Video with fallback */}
        {!videoError ? (
          <motion.video
            ref={videoRef}
            style={{
              scale: videoScale * circleScale,
              clipPath,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: `blur(${videoBlur}px)`,
              transition: "filter 0.3s ease",
            }}
            autoPlay
            loop
            muted
            onError={handleVideoError}
            src="video.mp4"
          />
        ) : (
          <motion.div
            style={{
              scale: videoScale * circleScale,
              clipPath,
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, #1e3c72, #2a5298)",
              filter: `blur(${videoBlur}px)`,
              transition: "filter 0.3s ease",
            }}
          />
        )}

        {/* Quote Text Container */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isMobile ? "90%" : "86%",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Quote Text */}
          <motion.h1
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            animate={{ opacity: textOpacity }}
            transition={{ duration: 0.4 }}
            style={{
              padding: isMobile ? "0 8vw" : "0 4vw",
              width: "100%",
              fontSize: mainFontSize,
              color: "salmon",
              textAlign: "center",
              overflow: "hidden",
              textOverflow: "ellipsis",
              pointerEvents: "auto",
              clipPath,
              userSelect: "none",
              whiteSpace: "pre-line",
              lineHeight,
              fontFamily: "'Newsreader', serif",
              fontWeight: 700,
              letterSpacing,
              marginBottom: isMobile ? "1.2rem" : "2rem",
            }}
          >
            Honest ideas, Crafted with skill, can become extraordinary 'Experiences'.
          </motion.h1>

          <motion.span
            animate={{ opacity: textOpacity }}
            transition={{ duration: 0.4 }}
            style={{
              fontSize: signatureFontSize,
              fontWeight: 600,
              fontFamily: "'Waterfall', cursive",
              color: "white",
              letterSpacing: "-1px",
              textAlign: "center",
              userSelect: "none",
            }}
          >
            Harish Maddal
          </motion.span>
        </div>
      </div>
    </div>
  );
};

export default Quote;
