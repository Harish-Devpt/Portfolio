import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { SiHtml5, SiCss3, SiJavascript, SiReact, SiFramer, SiGreensock } from 'react-icons/si';
import { FaTrain } from 'react-icons/fa';

const SkillItem = ({ skill, index, hoveredIndex, setHoveredIndex }) => {
  const ref = useRef(null);

  return (
    <div
      className="flex flex-col items-center justify-center mt-[15vw] md:mt-[5vw] lg:mt-[15vw]"
      style={{
        minWidth: '12vw',
        lineHeight: 1,
        textAlign: 'center',
      }}
    >
      <div
        ref={ref}
        className="relative"
        style={{ pointerEvents: 'auto' }}
        data-skill-index={index}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <motion.div
          animate={{ scale: hoveredIndex === index ? 1.4 : 1 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="flex flex-col items-center"
          style={{ color: skill.color }}
        >
          <div
            className="w-[8vw] md:w-[6vw] lg:w-[8vw] flex justify-center mb-2 mx-auto"
            style={skill.label === 'GSAP' ? { transform: 'translateX(-17%)' } : {}}
          >
            <skill.Icon className="text-[8vw] md:text-[6vw] lg:text-[8vw]" />
          </div>
          <span className="font-bold uppercase text-[2vw] md:text-[1.5vw] lg:text-[2vw] text-center w-full block mx-auto">
            {skill.label}
          </span>
        </motion.div>
      </div>
    </div>
  );
};

const About = () => {
  const ref = useRef(null);
  const whatIdoRef = useRef(null);
  const [hoveredSkillIndex, setHoveredSkillIndex] = useState(null);
  const [lastPointerPos, setLastPointerPos] = useState({ x: 0, y: 0 });

  // Poll under-cursor element while marquee animates to clear stale hover
  useEffect(() => {
    let rafId;
    const tick = () => {
      if (hoveredSkillIndex !== null) {
        const el = document.elementFromPoint(lastPointerPos.x, lastPointerPos.y);
        const isOverSkill = el && el.closest && el.closest('[data-skill-index]');
        if (!isOverSkill) {
          setHoveredSkillIndex(null);
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [hoveredSkillIndex, lastPointerPos.x, lastPointerPos.y]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Trigger animation when top border reaches ~60-70% of viewport
  // Delayed trigger for mobile to ensure About para completes first
  const isInView = useInView(whatIdoRef, {
    amount: 0.3, // Increased amount for later trigger
    once: true,
    margin: '0px 0px -30% 0px', // More aggressive bottom margin for mobile
  });

  // Load fonts dynamically
  useEffect(() => {
    const poiretLink = document.createElement('link');
    poiretLink.href = 'https://fonts.googleapis.com/css2?family=Poiret+One&display=swap';
    poiretLink.rel = 'stylesheet';
    document.head.appendChild(poiretLink);

    const serifLink = document.createElement('link');
    serifLink.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif&display=swap';
    serifLink.rel = 'stylesheet';
    document.head.appendChild(serifLink);
  }, []);

  const text =
    'I am Harish Maddal, a Creative Frontend Web Developer & Designer. I create interactive and playful web experiences which not only work they engage, surprise and stay in memory. I love breaking conventions, playing with motion, and turning big ideas into interfaces that feel alive and enjoyable. The web is not just code or design to me it is a space for Creativity, storytelling and interaction, and each project is an opportunity to create impactful Experiences.';

  const words = text.split(' ');
  const minOpacity = 0.1;
  const maxOpacity = 1;
  const highlightWords = ['Creative', 'Frontend', 'Web', 'Developer', '&', 'Designer', 'Creativity', 'Experiences'];

  const skills = [
    { label: 'HTML', Icon: SiHtml5, color: '#E44D26' },
    { label: 'CSS', Icon: SiCss3, color: '#264DE4' },
    { label: 'JavaScript', Icon: SiJavascript, color: '#F0DB4F' },
    { label: 'React JS', Icon: SiReact, color: '#61DBFB' },
    { label: 'Framer Motion', Icon: SiFramer, color: '#000' },
    { label: 'Locomotive JS', Icon: FaTrain, color: '#00A86B' },
    { label: 'GSAP', Icon: SiGreensock, color: '#7D3C98' },
  ];

  return (
    <div
      id="about"
      data-scroll
      data-scroll-section
      data-scroll-speed="0.4"
      ref={ref}
      className="relative z-20 md:-mt-[15vw] lg:-mt-[15vw] -mt-[8vw] w-full md:min-h-[120vw] lg:min-h-[120vw] min-h-[140vw] flex flex-col justify-between md:py-20 lg:py-20 py-16 bg-[#50da62] rounded-[2.3vw] md:leading-[3.7vw] lg:leading-[3.7vw] leading-[5.6vw] tracking-tight text-black md:px-[7vw] lg:px-[7vw] px-[5vw]"
    >
      {/* About Me */}
      <div>
        <h1 className="font-bold md:text-[3vw] lg:text-[3vw] text-[6vw] md:mt-1 lg:mt-10 mt-8 md:mb-10 lg:mb-20 mb-12 uppercase">About Me</h1>
        <h2
          style={{ fontFamily: '"Instrument Serif", serif', fontWeight: 400 }}
          className="md:text-[3.8vw] lg:text-[3.8vw] text-[5.4vw] flex flex-wrap gap-1 md:leading-[4vw] lg:leading-[4vw] leading-[6vw]"
        >
          {words.map((word, i) => {
            const totalWords = words.length;
            // Much faster animation for mobile and tablet (significantly increased step values)
            const step = window.innerWidth < 768 ? 0.5 / totalWords : 
                         window.innerWidth < 1024 ? 0.45 / totalWords : 0.2 / totalWords;
            const start = i * step;
            const end = start + step;

            const rawOpacity = useTransform(scrollYProgress, [start, end], [minOpacity, maxOpacity], { clamp: true });
            // Much faster spring animation for mobile and tablet (very high stiffness, very low damping)
            const getSpringConfig = () => {
              if (window.innerWidth < 768) {
                return { stiffness: 1000, damping: 20 };
              } else if (window.innerWidth < 1024) {
                return { stiffness: 800, damping: 15 };
              } else {
                return { stiffness: 200, damping: 30 };
              }
            };
            const opacity = useSpring(rawOpacity, getSpringConfig());
            const rawColor = useTransform(scrollYProgress, [0, 1], ['#cc5500', '#e67e22']);
            const color = useSpring(rawColor, { stiffness: 50, damping: 20 });

            const isHighlight = highlightWords.includes(word.replace(/[.,]/g, ''));

            return (
              <motion.span
                key={i}
                style={{
                  opacity,
                  color: isHighlight ? color : 'inherit',
                  fontWeight: isHighlight ? 700 : 400,
                }}
                className="inline-block"
              >
                {word}&nbsp;
              </motion.span>
            );
          })}
        </h2>
      </div>

      {/* What I do */}
      <div
        ref={whatIdoRef}
        className="relative md:mt-[10vw] lg:mt-[1vw] mt-[10vw] md:pt-[6vw] lg:pt-[6vw] pt-[12vw] md:-mx-[7vw] lg:-mx-[7vw] -mx-[5vw] border-t-[0.2vw] border-gray-600"
      >
        <div className="md:px-[7vw] lg:px-[7vw] px-[5vw]">
          <h1 className="md:text-[3vw] lg:text-[3vw] text-[6vw] font-bold uppercase md:mb-[-5vw] lg:mb-6 mb-4">What I do :</h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: window.innerWidth < 768 ? 0.8 : 
                       window.innerWidth < 1024 ? 1.0 : 1.2, // Different durations for mobile, tablet, and desktop
              ease: 'circInOut',
              delay: 0 
            }}
            style={{
              willChange: 'transform, opacity',
              fontFamily: '"Poiret One", cursive',
              fontWeight: 800,
            }}
            className="md:text-[3vw] lg:text-[3vw] text-[5vw] md:max-w-[90%] lg:max-w-[90%] max-w-[96%] md:leading-[3.7vw] lg:leading-[3.5vw] leading-[6vw] text-center md:mt-20 lg:mt-20 mt-10 tracking-tight md:mb-0 lg:mb-0 mb-[2vw]"
          >
            I Create bold, playful, and interactive web experiences. I turn ideas into sleek designs, cinematic animations, and memorable interactions. Every project blends creativity, innovation, and fun, making the web come Alive.
          </motion.p>
        </div>
      </div>

      {/* Skills */}
      <div className="relative overflow-hidden md:-mx-[7vw] lg:-mx-[7vw] -mx-[5vw]" style={{ height: '24vw' }}>
        <h2 className="md:text-[3vw] lg:text-[3vw] text-[6vw] font-bold uppercase md:px-[7vw] lg:px-[7vw] px-[5vw] py-[0.8vw] md:mb-10 lg:mb-10 mb-6">Skills</h2>
        <motion.div
          className="absolute md:top-10 lg:top-10 top-[2vw] left-0 flex gap-[8vw] md:gap-[6vw] lg:gap-[8vw] whitespace-nowrap items-center"
          style={{ height: '12vw', willChange: 'transform', pointerEvents: 'auto' }}
          initial={{ x: 0 }}
          animate={{ x: '-50%' }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: window.innerWidth < 768 ? 60 : 
                     window.innerWidth < 1024 ? 50 : 60, // Different animation speeds for mobile, tablet, and desktop
          }}
          onMouseLeave={() => setHoveredSkillIndex(null)}
          onMouseMove={(e) => {
            const target = e.target;
            // If the event target chain doesn't include a skill item wrapper, clear hover
            const isOverSkill = target.closest('[data-skill-index]');
            if (!isOverSkill && hoveredSkillIndex !== null) {
              setHoveredSkillIndex(null);
            }
            // Track last pointer position for RAF-based under-cursor checks
            setLastPointerPos({ x: e.clientX, y: e.clientY });
          }}
        >
          {[...skills, ...skills].map((skill, index) => (
            <SkillItem
              key={index}
              skill={skill}
              index={index}
              hoveredIndex={hoveredSkillIndex}
              setHoveredIndex={setHoveredSkillIndex}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default About;