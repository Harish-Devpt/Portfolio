import React, { useState, useEffect, useRef } from "react";

const WaveCircleLoader = ({ progress, showClick, onClick, circleScaled, textFade }) => {
  const circleRadius = 300;
  const diameter = circleRadius * 2;
  const centerOffset = 15;
  const amplitude = 10;
  const waveLength = 200;
  const extraFill = 150;

  // Dynamically load Galada font
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Galada&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const generateWavePath = (offset) => {
    const bottom = diameter + extraFill;
    let path = `M 0 ${bottom}`;
    for (let x = 0; x <= diameter + extraFill; x++) {
      const y = amplitude * (1 + Math.sin(((x + offset) * 2 * Math.PI) / waveLength));
      path += ` L ${x} ${y}`;
    }
    path += ` L ${diameter + extraFill} ${bottom} Z`;
    return path;
  };

  const [offset, setOffset] = useState(0);
  const reqRef = useRef();

  useEffect(() => {
    const animate = () => {
      setOffset((prev) => (prev + 2) % waveLength);
      reqRef.current = requestAnimationFrame(animate);
    };
    reqRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(reqRef.current);
  }, []);

  const translateY = (1 - progress / 100) * (diameter + amplitude / 2);
  const circleScale = circleScaled ? 6 : 1;

  return (
    <svg
      width={diameter + centerOffset * 2 + extraFill / 2}
      height={diameter + centerOffset * 2 + extraFill / 2}
      viewBox={`0 0 ${diameter + centerOffset * 2 + extraFill / 2} ${
        diameter + centerOffset * 2 + extraFill / 2
      }`}
      preserveAspectRatio="xMidYMid meet"
      style={{
        display: "block",
        margin: "1em auto",
        transform: `translateX(20px) scale(${circleScale})`,
        transformOrigin: "center center",
        transition: "transform 0.7s cubic-bezier(.68,-0.55,.27,1.55)",
        cursor: showClick ? "pointer" : "default",

        // ✅ Mobile responsiveness
        maxWidth: "90vw",
        height: "auto",
      }}
      onClick={showClick ? onClick : null}
    >
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0f4c75" />
          <stop offset="40%" stopColor="#3282b8" />
          <stop offset="70%" stopColor="#74ebd5" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
      </defs>

      <circle
        cx={circleRadius + centerOffset}
        cy={circleRadius + centerOffset}
        r={circleRadius}
        fill="#111"
        stroke="white"
        strokeWidth="5"
      />

      <clipPath id="waveClip">
        <circle
          cx={circleRadius + centerOffset}
          cy={circleRadius + centerOffset}
          r={circleRadius}
        />
      </clipPath>

      <g clipPath="url(#waveClip)">
        <rect
          x={centerOffset - extraFill / 4}
          y={centerOffset - extraFill / 4}
          width={diameter + extraFill / 2}
          height={diameter + extraFill}
          fill="#222"
        />
        <path
          d={generateWavePath(offset)}
          fill="url(#waveGradient)"
          transform={`translate(${centerOffset - extraFill / 4}, ${translateY}) scale(1.2)`}
        />
      </g>

      {showClick && (
        <g
          style={{
            opacity: textFade ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
        >
          <text
            x={circleRadius + centerOffset}
            y={circleRadius + centerOffset + 20}
            fontSize="52"
            fill="white"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="'Galada', cursive"
            style={{
              pointerEvents: "all",
              transition: "transform 0.3s ease",
              transformOrigin: "center center",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Click here
          </text>
        </g>
      )}
    </svg>
  );
};

const Loading = ({ onFinish, onMusicStart }) => {
  const [progress, setProgress] = useState(0);
  const [pageScaled, setPageScaled] = useState(false);
  const [circleScaled, setCircleScaled] = useState(false);
  const [textFade, setTextFade] = useState(false);
  const [hideLoader, setHideLoader] = useState(false);

  useEffect(() => {
    if (progress < 100) {
      const t = setInterval(() => setProgress((p) => Math.min(p + 1, 100)), 40);
      return () => clearInterval(t);
    }
  }, [progress]);

  const handleClick = () => {
    if (onMusicStart) onMusicStart();

    setTextFade(true);
    setCircleScaled(true);
    setPageScaled(true);

    setTimeout(() => {
      setHideLoader(true);
      setTimeout(() => {
        if (onFinish) onFinish();
      }, 700);
    }, 700);
  };

  return (
    <div
      style={{
        textAlign: "center",
        paddingTop: "15vh",
        color: "white",
        backgroundColor: "#0D0D0D",
        height: "100vh",
        position: "fixed",
        width: "100vw",
        top: -2,
        left: 0,
        zIndex: 100,
        pointerEvents: hideLoader ? "none" : "auto",
        opacity: hideLoader ? 0 : 1,
        transition: "opacity 0.7s, transform 0.7s cubic-bezier(.68,-0.55,.27,1.55)",
        transform: pageScaled ? "scale(2)" : "scale(1)",
        transformOrigin: "center center",

        // ✅ Flex centering for mobile
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <WaveCircleLoader
        progress={progress}
        showClick={progress === 100}
        onClick={handleClick}
        circleScaled={circleScaled}
        textFade={textFade}
      />
    </div>
  );
};

export default Loading;
