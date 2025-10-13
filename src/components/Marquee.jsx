import React from 'react';

const Marquee = () => {
  return (
    <div
      // data-scroll
      // data-scroll-section
      // data-scroll-speed=".10"
      className='relative z-10 w-full py-30 bg-[#F1F1F1] text-black rounded-tr-[2.3vw] rounded-tl-[2.3vw] overflow-hidden'
    >
      {/* Import Charm font using style jsx */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Charm:wght@400;700&display=swap');

        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-20%);
          }
        }
      `}</style>

      <div className="text-section border-t-3 border-b-3 border-zinc-500 flex whitespace-nowrap overflow-hidden">
        <div
          style={{
            display: 'flex',
            animation: 'scroll-left 120s linear infinite',
            willChange: 'transform',
          }}
        >
          {[...Array(12)].map((_, i) => (
            <h1
              key={i}
              style={{
                fontFamily: "'Charm', cursive",
                wordSpacing: '5vw',
                letterSpacing: "-0.6vw"
              }}
              className="text-[18vw] uppercase leading-none tracking-tight pt-15 mb-15 pr-35 font-bold"
            >
              Creativity for me is not just design, it’s motion, emotion, and stories that leave an impact
            </h1>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
