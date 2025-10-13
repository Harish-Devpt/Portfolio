import React, { useState, useRef, useEffect } from "react";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Play from "./components/Play";
import Work from "./components/Work";
import Quote from "./components/Quote";
import Excited from "./components/Excited";
import Contact from "./components/Contact";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import backgroundMusic from "/src/assets/Vangelis.mp3";

const App = () => {
  const [showLoading, setShowLoading] = useState(true);
  const [startLandingAnimations, setStartLandingAnimations] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [fade, setFade] = useState(true);
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1024,
    height: typeof window !== "undefined" ? window.innerHeight : 768,
  });

  const audioRef = useRef(null);
  const scrollRef = useRef(null);
  const locoScrollInstance = useRef(null);

  // Track screen size for responsive adjustments (still useful for any logic)
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load fonts
  useEffect(() => {
    const fontLink = document.createElement("link");
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=DM+Serif+Text&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);
  }, []);

  // Audio play/pause
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) playPromise.catch(() => {});
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [isMuted, isPlaying]);

  const toggleMute = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      setIsMuted(false);
    } else {
      setFade(false);
      setTimeout(() => {
        setIsMuted((prev) => !prev);
        setFade(true);
      }, 200);
    }
  };

  // Locomotive Scroll initialization after loading
  useEffect(() => {
    if (!showLoading && scrollRef.current) {
      locoScrollInstance.current = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        smoothMobile: true,
        lerp: 0.065,
        multiplier: 1.0,
        smartphone: { smooth: true, breakpoint: 0 },
        tablet: { smooth: true, breakpoint: 0 },
      });
    }
    return () => {
      if (locoScrollInstance.current) {
        locoScrollInstance.current.destroy();
        locoScrollInstance.current = null;
      }
    };
  }, [showLoading]);

  const handleLoadingFinish = () => {
    setIsPlaying(true);
    setIsMuted(false);
    setShowLoading(false);
  };

  const handleNavbarLoaded = () => {
    setStartLandingAnimations(true);
  };

  const handleNavigate = (sectionId) => {
    const selector = `#${sectionId}`;
    const target = document.querySelector(selector);
    if (!target) return false;
    const navbarEl = document.getElementById("navbar");
    const navbarOffset = navbarEl ? Math.ceil(navbarEl.getBoundingClientRect().height + 16) : 140;
    try {
      if (locoScrollInstance.current) {
        locoScrollInstance.current.update();
        locoScrollInstance.current.scrollTo(selector, {
          offset: -navbarOffset,
          duration: 1.45,
          easing: [0.22, 0.61, 0.36, 1],
        });
        requestAnimationFrame(() => {
          locoScrollInstance.current &&
            locoScrollInstance.current.scrollTo(selector, {
              offset: -navbarOffset,
              duration: 1.45,
              easing: [0.22, 0.61, 0.36, 1],
            });
        });
        return true;
      }
      // Fallback smooth scroll without Locomotive
      if (scrollRef.current) {
        const container = scrollRef.current;
        const targetY = target.getBoundingClientRect().top + container.scrollTop - navbarOffset;
        container.scrollTo({ top: targetY, behavior: "smooth" });
      } else {
        const absoluteTop = target.getBoundingClientRect().top + window.pageYOffset - navbarOffset;
        window.scrollTo({ top: absoluteTop, behavior: "smooth" });
      }
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <>
      {showLoading && (
        <div className="fixed inset-0 w-screen h-screen bg-[#0D0D0D] z-[9999999] flex items-center justify-center">
          <Loading onFinish={handleLoadingFinish} />
        </div>
      )}

      {!showLoading && (
        <div
          ref={scrollRef}
          className="w-full min-h-screen bg-[#0D0D0D] text-white antialiased box-border"
          data-scroll-container
        >
          <Navbar onLoaded={handleNavbarLoaded} onNavigate={handleNavigate} />

          <main>
            <Landing startAnimations={startLandingAnimations} onNavigate={handleNavigate} />
            <Marquee />
            <About />
            <Play />
            <Work />
            <div className="relative">
              <Quote />
              <Excited />
            </div>
            <Contact />
          </main>

          <audio ref={audioRef} loop>
            <source src={backgroundMusic} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>

          {/* Mute / Sound control (tailwind responsive + arbitrary values) */}
          <div
            onClick={toggleMute}
            tabIndex={0}
            role="button"
            aria-pressed={isMuted}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                toggleMute();
                e.preventDefault();
              }
            }}
            className={
              // mobile: bottom 150px, right -30px, text 40px
              // md: bottom 400px, right -42px, text 46px
              // lg: bottom ~18vw (approx via rem fallback), right -1vw, text 2vw
              "fixed right-[-30px] bottom-[150px] md:bottom-[400px] md:right-[-42px] lg:bottom-[18vw] lg:right-[-1vw] z-[2147483647] cursor-pointer select-none " +
              'font-[DM\\ Serif\\ Text] whitespace-nowrap -rotate-90 text-[#383821] font-bold' +
              "text-[40px] md:text-[46px] lg:text-[2vw]"
            }
            style={{ userSelect: "none", WebkitTapHighlightColor: "transparent" }}
          >
            {isPlaying ? (
              <>
                Sound{" "}
                <span
                  style={{
                    color: "orange",
                    opacity: fade ? 1 : 0,
                    transition: "opacity 0.4s ease",
                  }}
                >
                  {isMuted ? "Off" : "On"}
                </span>
              </>
            ) : (
              "Play Sound"
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default App;
