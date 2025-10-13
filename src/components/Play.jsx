import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";

// Add Mea Culpa font
const meaCulpaStyle = document.createElement("style");
meaCulpaStyle.innerHTML = `
  @import url('https://fonts.googleapis.com/css2?family=Mea+Culpa&display=swap');
`;
document.head.appendChild(meaCulpaStyle);

const Play = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // --- Motion Values ---
  const rotateVal = useMotionValue(0);
  const springConfig = { stiffness: 50, damping: 20, mass: 0.6 };
  const smoothRotate = useSpring(rotateVal, { stiffness: 60, damping: 14 });

  const blackX1 = useMotionValue(0);
  const blackY1 = useMotionValue(0);
  const smoothBlackX1 = useSpring(blackX1, springConfig);
  const smoothBlackY1 = useSpring(blackY1, springConfig);

  const blackX2 = useMotionValue(0);
  const blackY2 = useMotionValue(0);
  const smoothBlackX2 = useSpring(blackX2, springConfig);
  const smoothBlackY2 = useSpring(blackY2, springConfig);

  const miniX1 = useMotionValue(0);
  const miniY1 = useMotionValue(0);
  const smoothMiniX1 = useSpring(miniX1, springConfig);
  const smoothMiniY1 = useSpring(miniY1, springConfig);

  const miniX2 = useMotionValue(0);
  const miniY2 = useMotionValue(0);
  const smoothMiniX2 = useSpring(miniX2, springConfig);
  const smoothMiniY2 = useSpring(miniY2, springConfig);

  const circle1Ref = useRef(null);
  const circle2Ref = useRef(null);
  const imageRef = useRef(null);

  // --- Mouse Move Magnetic Effect ---
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!circle1Ref.current || !circle2Ref.current) return;

      const rect1 = circle1Ref.current.getBoundingClientRect();
      const rect2 = circle2Ref.current.getBoundingClientRect();

      const centerX1 = rect1.left + rect1.width / 2;
      const centerY1 = rect1.top + rect1.height / 2;
      const centerX2 = rect2.left + rect2.width / 2;
      const centerY2 = rect2.top + rect2.height / 2;

      const offsetX1 = e.clientX - centerX1;
      const offsetY1 = e.clientY - centerY1;
      const offsetX2 = e.clientX - centerX2;
      const offsetY2 = e.clientY - centerY2;

      const maxBlack1 = rect1.width * 0.25;
      blackX1.set(Math.max(Math.min(offsetX1 * 0.15, maxBlack1), -maxBlack1));
      blackY1.set(Math.max(Math.min(offsetY1 * 0.15, maxBlack1), -maxBlack1));

      const maxBlack2 = rect2.width * 0.25;
      blackX2.set(Math.max(Math.min(offsetX2 * 0.15, maxBlack2), -maxBlack2));
      blackY2.set(Math.max(Math.min(offsetY2 * 0.15, maxBlack2), -maxBlack2));

      const maxMini = 12;
      miniX1.set(Math.max(Math.min(offsetX1 * 0.05, maxMini), -maxMini));
      miniY1.set(Math.max(Math.min(offsetY1 * 0.05, maxMini), -maxMini));
      miniX2.set(Math.max(Math.min(offsetX2 * 0.05, maxMini), -maxMini));
      miniY2.set(Math.max(Math.min(offsetY2 * 0.05, maxMini), -maxMini));

      const angle =
        (Math.atan2(
          e.clientY - (centerY1 + centerY2) / 2,
          e.clientX - (centerX1 + centerX2) / 2
        ) *
          180) /
        Math.PI;
      rotateVal.set(angle);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [blackX1, blackY1, blackX2, blackY2, miniX1, miniY1, miniX2, miniY2, rotateVal]);

  // --- Scroll Text ---
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ["start 0.1", "start -0.1"] });
  const words = "Interact with me".split(" ");

  // --- Eye Configuration for Each Device ---
  const eyeConfig = {
    leftEye: {
      desktop: { top: "22vh", left: "39%", size: "13.5vw", dotSize: "2vw" },
      tablet: { top: "27vh", left: "27.5%", size: "28vw", dotSize: "4.2vw" },
      mobile: { top: "13.7vh", left: "32%", size: "22vw", dotSize: "3.4vw" },
    },
    rightEye: {
      desktop: { top: "19vh", left: "60%", size: "12.5vw", dotSize: "2vw" },
      tablet: { top: "24vh", left: "70.2%", size: "26.3vw", dotSize: "4.2vw" },
      mobile: { top: "12vh", left: "65%", size: "22vw", dotSize: "3.4vw" },
    },
  };

  const getEyeStyle = (eye) => {
    if (isMobile) return eyeConfig[eye].mobile;
    if (isTablet) return eyeConfig[eye].tablet;
    return eyeConfig[eye].desktop;
  };

  const leftEyeStyle = getEyeStyle("leftEye");
  const rightEyeStyle = getEyeStyle("rightEye");

  return (
    <div className="w-full h-[100vw] md:h-screen md:w-full text-white bg-black overflow-hidden relative">
      <div
        ref={imageRef}
        className="relative w-[90vw] md:w-[90vw] h-[100vw] md:h-full bg-cover ml-[5vw] mt-[1vw] bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1485981133625-f1a03c887f0a?q=80&w=2070&auto=format&fit=crop")',
        }}
      >
        {/* Left Eye */}
        <div
          ref={circle1Ref}
          className="flex items-center justify-center rounded-full bg-zinc-100 overflow-hidden absolute"
          style={{
            top: leftEyeStyle.top,
            left: leftEyeStyle.left,
            width: leftEyeStyle.size,
            height: leftEyeStyle.size,
          }}
        >
          <motion.div
            style={{ x: smoothBlackX1, y: smoothBlackY1 }}
            className="w-1/2 h-1/2 rounded-full bg-black flex items-center justify-center"
          >
            <motion.div
              style={{ x: smoothMiniX1, y: smoothMiniY1, rotate: smoothRotate }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div
                className="rounded-full bg-white"
                style={{ width: leftEyeStyle.dotSize, height: leftEyeStyle.dotSize }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Right Eye */}
        <div
          ref={circle2Ref}
          className="flex items-center justify-center rounded-full bg-zinc-100 overflow-hidden absolute"
          style={{
            top: rightEyeStyle.top,
            left: rightEyeStyle.left,
            width: rightEyeStyle.size,
            height: rightEyeStyle.size,
          }}
        >
          <motion.div
            style={{ x: smoothBlackX2, y: smoothBlackY2 }}
            className="w-1/2 h-1/2 rounded-full bg-black flex items-center justify-center"
          >
            <motion.div
              style={{ x: smoothMiniX2, y: smoothMiniY2, rotate: smoothRotate }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div
                className="rounded-full bg-white"
                style={{ width: rightEyeStyle.dotSize, height: rightEyeStyle.dotSize }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Text */}
        <div className="absolute bottom-[10%] w-[92vw] flex justify-center px-[6vw]" style={{ fontFamily: "'Mea Culpa', cursive" }}>
          <h2
            className="text-white text-center font-light flex flex-wrap justify-center -tracking-[0.1vw]"
            style={{
              fontSize: isMobile ? "14vw" : isTablet ? "12vw" : "10vw",
              lineHeight: isMobile ? "5vw" : isTablet ? "3vw" : "2vw",
            }}
          >
            {words.map((word, i) => {
              const start = i * (isMobile ? 0.02 : isTablet ? 0.05 : 0.1);
              const end = start + (isMobile ? 0.08 : isTablet ? 0.15 : 0.25);
              const translateY = useTransform(scrollYProgress, [start, end], [80, 0]);
              const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
              return (
                <motion.span key={i} style={{ translateY: useSpring(translateY), opacity: useSpring(opacity) }} className="inline-block">
                  {word}&nbsp;
                </motion.span>
              );
            })}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Play;
