import { motion, useMotionValue, useSpring } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';
import { FaArrowRightLong } from "react-icons/fa6";

const Landing = ({ startAnimations, onNavigate }) => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [hover, setHover] = useState(false);
  const [imgHover, setImgHover] = useState(false);

  // Show scroll indicator only after animations start
  useEffect(() => {
    if (!startAnimations) return;
    
    const timer = setTimeout(() => setShowScrollIndicator(true), 2000);
    const handleScroll = () => {
      if (showScrollIndicator) setShowScrollIndicator(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showScrollIndicator, startAnimations]);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const arrowRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 400, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 400, damping: 20 });

  const handleMouseMove = (e) => {
    if (!arrowRef.current) return;
    const rect = arrowRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = Math.min(Math.max(e.clientX - centerX, -20), 20);
    const deltaY = Math.min(Math.max(e.clientY - centerY, -20), 20);
    mouseX.set(deltaX);
    mouseY.set(deltaY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleGoToWork = () => {
    if (onNavigate) onNavigate('work');
  };

  return (
    <div
      data-scroll
      data-scroll-section
      data-scroll-speed="-0.10"
      className='w-full h-full bg-[#0D0D0D] pt-1 relative'
      style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 200 }}
    >
      {/* Text Structure */}
      <div className="text-structure mt-67 px-26 mb-[-1vw] max-md:mt-57 max-md:px-6 max-md:mb-40 max-lg:mt-72 max-lg:px-10 max-lg:mb-30">
        {["Crafting", "interactive", "experiences"].map((item, index) => (
          <div key={index} className="masker">
            <div className='w-full h-[11vh] flex overflow-hidden items-center max-md:h-[5vh] max-lg:h-[7vh]'>
              {index === 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: startAnimations ? 1 : 0 }}
                  transition={{ ease: [0.76, 0, 0.24, 1], duration: 1.8 }}
                  className='origin-left w-[6vw] h-[6vw] relative top-[0.1vw] bg-zinc-700 mr-[0.7vw] rounded-[1vw] overflow-hidden max-md:w-[12vw] max-md:h-[12vw] max-md:mr-[1vw] max-lg:w-[10vw] max-lg:h-[8vw] max-lg:mr-[1.2vw]'
                >
                  <motion.img
                    onMouseEnter={() => setImgHover(true)}
                    onMouseLeave={() => setImgHover(false)}
                    animate={{ scale: imgHover ? 1.2 : 1 }}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                    className='w-full h-full object-cover'
                    src="pic.png"
                    alt=""
                  />
                </motion.div>
              )}
              <motion.h1
                initial={{ x: -100, opacity: 0 }}
                animate={{
                  x: startAnimations ? 0 : -100,
                  opacity: startAnimations ? 1 : 0
                }}
                transition={{ ease: [0.76, 0, 0.24, 1], duration: 1.2, delay: startAnimations ? index * 0.3 : 0 }}
                className='uppercase font-semibold text-9xl leading-[5.9vw] max-md:text-[10vw] max-md:leading-[1vw] max-lg:text-[10vw] max-lg:leading-[1  0vw]'
                style={{
                  fontFamily: "'Merriweather', serif",
                  fontWeight: 700,
                  letterSpacing: "-0.40vw",
                }}
              >
                {item}
              </motion.h1>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Line */}
      <div className="line border-t-[2px] border-zinc-700 mt-[7.6vw] mb-[10vw] flex items-center justify-between px-[2.3vw] py-1 max-md:flex-row max-md:items-center max-md:gap-4 max-md:mt-20 max-md:mb-70 max-md:px-4 max-lg:flex-row max-lg:items-start max-lg:gap-3 max-lg:mt-46 max-lg:mb-44 max-lg:px-3">
        {["I create experiences, not just websites.", "For creative minds and global projects."].map((item, index) => (
          <p key={index} className='font-light text-2xl leading-[3.9vw] max-md:text-[2vw] max-md:leading-relaxed max-md:mt-10 max-lg:mt-10 max-lg:text-lg max-lg:leading-relaxed'>
            {item}
          </p>
        ))}

        {/* Start Project + Arrow */}
        <div
          className='flex items-center gap-4 max-md:gap-[1vw] max-md:mt-10  max-md:w-full max-md:justify-between max-lg:gap-3 max-lg:mt-9'
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <a href="#work" className='inline-block' aria-label='Go to Work section' onClick={handleGoToWork}>
            <motion.div
              className='relative uppercase text-1.8xl border-2 border-zinc-700 px-4 py-2 rounded-full cursor-pointer overflow-hidden max-md:px-10 max-md:py-2 max-lg:px-4 max-lg:py-2.5'
              animate={{ borderColor: hover ? '#ffffff' : '#3f3f46' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <motion.div
                className='absolute top-0 left-0 w-full h-full bg-orange-500 rounded-full z-0 origin-center'
                initial={{ scale: 0 }}
                animate={{ scale: hover ? 1 : 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              />
              <span className='relative z-10 text-white font-light text-xl max-md:text-xs max-lg:text-sm'>
                <span>Experiences I Built</span>
              </span>
            </motion.div>
          </a>

          <a href="#work" aria-label='Go to Work section (arrow)' onClick={handleGoToWork}>
            <motion.div
              ref={arrowRef}
              className='h-10 w-10 rounded-full border-2 flex items-center justify-center cursor-pointer bg-transparent max-lg:h-12 max-lg:w-12'
              style={{
                x: springX,
                y: springY,
                borderColor: hover ? '#ffffff' : '#3f3f46',
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{
                scale: hover ? 1.5 : 1,
                backgroundColor: hover ? "#f5550b" : "transparent",
              }}
              transition={{ duration: 0.2 }}
            >
              <span className='rotate-[-45deg] max-md:text-sm'>
                <FaArrowRightLong />
              </span>
            </motion.div>
          </a>
        </div>
      </div>

      {showScrollIndicator && startAnimations && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute -bottom-[6vw] left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-white pointer-events-none max-md:-bottom-30 max-lg:-bottom-36"
        >
          <span className="text-lg tracking-tight uppercase max-md:text-xs max-lg:text-sm">Scroll Down</span>
          <div className="w-5 h-10 border-2 border-white rounded-full flex justify-center overflow-hidden max-md:w-4 max-md:h-8 max-lg:w-5 max-lg:h-9">
            <motion.div
              className="w-2 h-2 bg-white rounded-full max-md:w-1.5 max-md:h-1.5"
              animate={{ y: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Landing;