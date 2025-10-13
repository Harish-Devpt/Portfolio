import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Excited = () => {
  const containerRef = useRef(null);
  const linesRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(linesRef.current, { y: 120, opacity: 0 });

      // Create the animation
      gsap.to(linesRef.current, {
        y: 0,
        opacity: 1,
        stagger: 0.4,
        ease: "spring.out(1, 0.8)",
        duration: 1.5,
        delay: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          pin: true,
          scrub: 0.7,
          markers: false,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen flex justify-center items-center flex-col text-center bg-[#EDE9E4] text-[#170F0B] px-4 md:px-8 lg:px-12"
      style={{ position: "relative", zIndex: 2 }}
    >
      {/* Import MonteCarlo font */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=MonteCarlo&display=swap');`}
      </style>

      {["Just Scroll", "Let's Make Something", "Together !"].map((text, i) => (
        <h1
          key={i}
          ref={(el) => (linesRef.current[i] = el)}
          className="text-[12vw] md:text-[14vw] lg:text-[12vw] leading-[17vw] md:leading-[14vw] lg:leading-[15vw] tracking-tighter"
          style={{ fontFamily: "'MonteCarlo', cursive" }}
        >
          {text}
        </h1>
      ))}
    </div>
  );
};

export default Excited;