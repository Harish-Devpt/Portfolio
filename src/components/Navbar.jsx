import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";

const Navbar = ({ onLoaded, onNavigate }) => {
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,400;0,700;1,400;1,700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  // Trigger initial navbar animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
      if (onLoaded) onLoaded();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const scale = useMotionValue(1);
  const springScale = useSpring(scale, { stiffness: 300, damping: 20 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const links = ["Work", "About", "Contact"];

  // Hide/show navbar on scroll
  const controlNavbar = () => {
    if (window.scrollY > lastScrollY && window.scrollY > 50) {
      setShow(false);
    } else {
      setShow(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;
    const maxDistance = 30;
    mouseX.set(Math.max(Math.min(deltaX, maxDistance), -maxDistance));
    mouseY.set(Math.max(Math.min(deltaY, maxDistance), -maxDistance));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    scale.set(1);
  };

  const handleMouseEnter = () => {
    scale.set(1.15);
  };

  const handleClick = () => {
    window.location.reload();
  };

  return (
    <AnimatePresence>
      {show && loaded && (
        <motion.div
          id="navbar"
          initial={{ y: -120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="fixed top-0 z-[999] w-full flex items-center justify-between lg:px-20 md:px-12 px-6 md:py-5 py-4"
          style={{
            backdropFilter: "blur(15px)",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            WebkitBackdropFilter: "blur(15px)",
            willChange: "transform",
            fontFamily: "'Source Serif 4', serif",
          }}
        >
          {/* Logo */}
          <motion.img
            src="logo.png"
            alt="Logo"
            className="lg:w-[3vw] lg:h-[3vw] md:w-12 md:h-12 w-10 h-10 object-contain cursor-pointer"
            style={{ scale: springScale, x: springX, y: springY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
          />

          {/* Navigation Links */}
          <ul
            className="relative flex flex-row items-center space-x-4 md:space-x-6"
            onMouseLeave={() => setPosition((p) => ({ ...p, opacity: 0 }))}
          >
            {links.map((item, index) => (
              <Tab
                key={index}
                setPosition={setPosition}
                isLast={index === links.length - 1}
                onClick={() => {
                  if (onNavigate) onNavigate(item.toLowerCase());
                }}
              >
                {item}
              </Tab>
            ))}

            {/* Moving Highlight */}
            <motion.li
              animate={{ ...position }}
              className="absolute top-0 h-full rounded-full bg-orange-500 z-0"
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
            />
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Tab = ({ children, setPosition, isLast, onClick }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      className={`relative z-10 px-3 md:px-6 lg:px-8 py-2 text-sm md:text-base lg:text-[1.1vw] font-bold cursor-pointer`}
      style={{
        color: "#918777",
        fontFamily: "'Source Serif 4', serif",
        fontWeight: 900,
      }}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width, left } = ref.current.getBoundingClientRect();
        const parentLeft =
          ref.current.parentElement.getBoundingClientRect().left;
        setPosition({ left: left - parentLeft, width, opacity: 1 });
      }}
    >
      <a
        href={`#${String(children).toLowerCase()}`}
        onClick={(e) => {
          if (onClick) {
            const handled = onClick(e);
            if (handled === true) {
              e.preventDefault();
            }
          }
        }}
        className="block"
      >
        {children}
      </a>
    </li>
  );
};

export default Navbar;
