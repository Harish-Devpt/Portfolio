import React, { useRef, useEffect, useState } from 'react';
import { HiChevronDoubleRight } from "react-icons/hi";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";

const Contact = () => {
  const footerRef = useRef(null);
  const thankControls = useAnimation();
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    // Detect tablet
    const checkDevice = () => {
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  useEffect(() => {
    // Load fonts dynamically
    const fonts = [
      "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&display=swap",
      "https://fonts.googleapis.com/css2?family=Instrument+Serif:wght@400&display=swap",
      "https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap",
    ];
    fonts.forEach((href) => {
      const link = document.createElement("link");
      link.href = href;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    });

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (!footerRef.current) return;
      const rect = footerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollingDown = window.scrollY > lastScrollY;
      lastScrollY = window.scrollY;
      if (rect.bottom <= windowHeight && scrollingDown) {
        thankControls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 1.5, ease: "easeOut" },
        });
      } else if (!scrollingDown) {
        thankControls.set({ opacity: 0, y: 100 });
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [thankControls]);

  const [hovered, setHovered] = useState({
    github: false,
    linkedin: false,
    email: false,
    phone: false,
  });

  const fontItalic = {
    fontFamily: "'Instrument Serif', serif",
    fontStyle: "italic",
    fontWeight: 400,
  };
  const instrumentRegular = {
    fontFamily: "'Instrument Serif', serif",
    fontWeight: 400,
    fontStyle: "normal",
  };
  const linkFontStyle = {
    fontFamily: "'Roboto Condensed', sans-serif",
    fontWeight: 400,
  };

  // Tablet-specific slower animation
  const hoverTransition = isTablet
    ? { duration: 1.2, ease: "easeOut" }  // slower on tablet
    : { duration: 0.5, ease: "easeOut" }; // default for desktop

  return (
    <div
      id="contact"
      ref={footerRef}
      data-scroll
      data-scroll-section
      data-scroll-speed="-1.7"
      className="w-full min-h-screen bg-white text-black border-gray-800 flex flex-col md:flex-row relative overflow-hidden"
    >
      {/* Left Section */}
      <div className="lft md:w-1/2 w-full flex flex-col justify-between py-10 sm:py- md:py-20">
        <div>
          <h1
            style={fontItalic}
            className="font-medium tracking-tight px-[8vw] sm:px-[10vw] md:px-[12vw] py-10 sm:py-14 md:py-18 text-5xl sm:text-6xl md:text-8xl uppercase"
          >
            Connect Me :
          </h1>
        </div>
        <div className="px-8 sm:px-9 md:px-10 pb-20 sm:pb-28 md:pb-35">
          <h1 style={fontItalic} className="text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight">
            Inspired by :
          </h1>
          <h1
            style={instrumentRegular}
            className="text-[4.2vw] sm:text-[3.5vw] md:text-[2vw] mt-6 sm:mt-8 md:mt-10 flex items-center gap-2"
          >
            <HiChevronDoubleRight className="text-[5vw] sm:text-[4vw] md:text-[3vw] py-2 sm:py-3 md:py-4" />
            <a href="https://ochi.design/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors duration-300">
              Ochi.Design
            </a>
          </h1>
          <h1
            style={instrumentRegular}
            className="text-[4.2vw] sm:text-[3.5vw] md:text-[2vw] flex items-center gap-2"
          >
            <HiChevronDoubleRight className="text-[5vw] sm:text-[4vw] md:text-[3vw] py-2 sm:py-3 md:py-4" />
            <a href="https://minhpham.design/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors duration-300">
              minhpham.design
            </a>
          </h1>
        </div>
      </div>

      {/* Right Section */}
      <div
        className="lft md:w-1/2 w-full relative flex flex-col py-10 sm:py-[8vw] md:py-[10vw] items-start px-8 sm:px-12 md:px-20 gap-8 sm:gap-9 md:gap-10
        bg-white/20 backdrop-blur-[1px] border border-white/30
        shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-1px_0_rgba(255,255,255,0.1),inset_0_0_6px_3px_rgba(255,255,255,0.3)]
        before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-px
        before:bg-gradient-to-r before:from-transparent before:via-white/80 before:to-transparent
        after:content-[''] after:absolute after:top-0 after:left-0 after:h-full after:w-px
        after:bg-gradient-to-b after:from-white/80 after:via-transparent after:to-white/30"
      >
        <h1 style={fontItalic} className="text-5xl sm:text-7xl md:text-8xl uppercase leading-none tracking-tight font-medium">
          Social :
        </h1>
        <div className="flex flex-col gap-8 sm:gap-9 md:gap-10 mt-8 sm:mt-9 md:mt-10">
          {/* GitHub */}
          <div className="inline-flex items-center gap-4 text-2xl sm:text-[1.75rem] md:text-3xl group relative">
            <a
              href="https://github.com/Harish-Devpt"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHovered((h) => ({ ...h, github: true }))}
              onMouseLeave={() => setHovered((h) => ({ ...h, github: false }))}
              style={linkFontStyle}
              className="flex items-center gap-4 cursor-pointer z-10"
            >
              <FaGithub className="group-hover:scale-125 group-hover:text-gray-800" />
              GitHub
            </a>
            <motion.h1
              style={fontItalic}
              initial={{ opacity: 0, x: 40 }}
              animate={hovered.github ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
              transition={hoverTransition} // <-- tablet slower
              className="hidden md:block absolute left-[12vw] text-[1.2vw] pointer-events-none font-bold w-[100vw]"
            >
              Proof that I actually write code most of the time. 😅
            </motion.h1>
          </div>

          {/* LinkedIn */}
          <div className="inline-flex items-center gap-4 text-2xl sm:text-[1.75rem] md:text-3xl group relative">
            <a
              href="https://www.linkedin.com/in/harish-m-a44975303/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHovered((h) => ({ ...h, linkedin: true }))}
              onMouseLeave={() => setHovered((h) => ({ ...h, linkedin: false }))}
              style={linkFontStyle}
              className="flex items-center gap-4 cursor-pointer z-10"
            >
              <FaLinkedin className="group-hover:scale-125 group-hover:text-blue-600" />
              LinkedIn
            </a>
            <motion.h1
              style={fontItalic}
              initial={{ opacity: 0, x: 40 }}
              animate={hovered.linkedin ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
              transition={hoverTransition} // <-- tablet slower
              className="hidden md:block absolute left-[15vw] text-[1.2vw] pointer-events-none w-[26vw] font-bold text-center"
            >
              Connecting with creatives while turning caffeine into code. (Yes, it's a lifestyle.)
            </motion.h1>
          </div>

          {/* Email */}
          <div className="inline-flex items-center gap-4 text-2xl sm:text-[1.75rem] md:text-3xl group relative">
            <a
              href="mailto:maddalharish@gmail.com"
              onMouseEnter={() => setHovered((h) => ({ ...h, email: true }))}
              onMouseLeave={() => setHovered((h) => ({ ...h, email: false }))}
              style={linkFontStyle}
              className="flex items-center gap-4 cursor-pointer z-10"
            >
              <FaEnvelope className="group-hover:scale-125 group-hover:text-orange-500" />
              <span className="break-all">maddalharish@gmail.com</span>
            </a>
            <motion.h1
              style={fontItalic}
              initial={{ opacity: 0, x: 40 }}
              animate={hovered.email ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
              transition={hoverTransition} // <-- tablet slower
              className="hidden md:block absolute left-[22vw] text-[1.2vw] pointer-events-none w-[20vw] font-bold text-center"
            >
              100% Response Rate. even if it is a spam mail.💯
            </motion.h1>
          </div>

          {/* Phone */}
          <div className="inline-flex items-center gap-4 text-2xl sm:text-[1.75rem] md:text-3xl group relative">
            <a
              href="tel:+918291482681"
              onMouseEnter={() => setHovered((h) => ({ ...h, phone: true }))}
              onMouseLeave={() => setHovered((h) => ({ ...h, phone: false }))}
              style={linkFontStyle}
              className="flex items-center gap-4 cursor-pointer z-10"
            >
              <FaPhone className="group-hover:scale-125 group-hover:text-gray-600" />
              +91 8291482681
            </a>
            <motion.h1
              style={fontItalic}
              initial={{ opacity: 0, x: 40 }}
              animate={hovered.phone ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
              transition={hoverTransition} // <-- tablet slower
              className="hidden md:block absolute left-[17vw] text-[1.2vw] pointer-events-none w-[20vw] font-bold"
            >
              90% Chances that I won't pick up.
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Thank You */}
      <motion.h2
        style={{
          ...instrumentRegular,
          WebkitTextStroke: "2px black",
        }}
        className="absolute bottom-[-12vw] sm:bottom-[-14vw] md:bottom-[-17vw] left-0 w-full text-center text-[21vw] sm:text-[23vw] md:text-[25vw] font-bold tracking-tight pointer-events-none select-none uppercase
        text-orange-500/30 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
        initial={{ opacity: 0, y: 1200 }}
        animate={thankControls}
        transition={{ duration: 20, ease: "easeOut" }}
      >
        Thank You
      </motion.h2>
    </div>
  );
};

export default Contact;
