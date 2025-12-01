import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

function Work() {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);

    // Check if device is mobile or tablet
    useEffect(() => {
        const checkDevice = () => {
            setIsMobile(window.innerWidth < 768);
            setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
        };

        checkDevice();
        window.addEventListener('resize', checkDevice);

        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    const [Hovered1, setHovered1] = React.useState(false)
    const [Hovered2, setHovered2] = React.useState(false)
    const [Hovered3, setHovered3] = React.useState(false)
    const [Hovered4, setHovered4] = React.useState(false)
    const [buttonHover, setButtonHover] = React.useState(false)

    // GitHub icon scales only on text hover
    const GitHubLink = ({ url }) => {
        const [iconHover, setIconHover] = React.useState(false)
        return (
            <div className="flex mt-6 items-center justify-center gap-2">
                <motion.svg
                    animate={iconHover ? { scale: 1.5 } : { scale: 1 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="pointer-events-none"
                >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 
            2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 
            0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49
            -2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15
            -.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 
            1.2 1.87.86 2.33.65.07-.52.28-.86.51-1.06
            -1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82
            -2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 
            2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 
            2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16
            1.92.08 2.12.51.56.82 1.27.82 2.15 0 
            3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 
            1.48 0 1.07-.01 1.93-.01 2.19 0 
            .21.15.46.55.38A8.01 8.01 0 0 0 16 
            8c0-4.42-3.58-8-8-8z" />
                </motion.svg>
                <motion.a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[1.7vw] font-medium text-black transition-colors"
                    style={isTablet ? { fontSize: '2.5vw' } : {}}
                    onMouseEnter={() => setIconHover(true)}
                    onMouseLeave={() => setIconHover(false)}
                >
                    GitHub
                </motion.a>
            </div>
        )
    }

    // Mobile text animation component
    const MobileTextAnimation = ({ text, isHovered }) => {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                style={{ display: isMobile && !isTablet ? 'flex' : 'none' }}
            >
                <motion.h1
                    className="text-white text-[8vw] font-bold tracking-tight z-30 drop-shadow-lg"
                >
                    {text.split("").map((char, index) => (
                        <motion.span
                            key={index}
                            initial={{ y: "30%", opacity: 0 }}
                            animate={isHovered ? { y: 0, opacity: 1 } : { y: "30%", opacity: 0 }}
                            transition={{ ease: "easeOut", duration: 0.5, delay: index * 0.05 }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </motion.h1>
            </motion.div>
        )
    }

    // Tablet text animation component - matching desktop positioning with black text and tight tracking
    const TabletTextAnimation = ({ text, isHovered, position }) => {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute z-50 pointer-events-none"
                style={{
                    display: isTablet ? 'flex' : 'none',
                    top: position.top,
                    left: position.left,
                    right: position.right,
                    gap: position.gap,
                    fontSize: position.fontSize,
                    letterSpacing: position.letterSpacing
                }}
            >
                {text.split("").map((char, index) => (
                    <motion.span
                        key={index}
                        initial={{ y: "30%", opacity: 0 }}
                        animate={isHovered ? { y: 0, opacity: 1 } : { y: "30%", opacity: 0 }}
                        transition={{ ease: "easeOut", duration: 0.5, delay: index * 0.05 }}
                        className="font-bold"
                        style={{
                            color: '#000000',
                            letterSpacing: '-0.10em',
                        }}
                    >
                        {char}
                    </motion.span>
                ))}
            </motion.div>
        )
    }

    return (
        <div id="work" className="w-full md:py-20 py-14 bg-[#F1F1F1] text-black rounded-[2.3vw]" data-scroll data-scroll-section data-scroll-speed="1.2">
            <div
                className="w-full md:px-20 px-6"
                style={isTablet ? { paddingLeft: '3vw', paddingRight: '3vw' } : {}}
            >
                <h1 className="md:text-[4.6vw] text-[7vw] tracking-tight border-b-[1px] border-zinc-700 pb-10 md:pb-15">Featured Projects :</h1>

                {/* First Row */}
                <div className="px-1 relative">
                    <div className="cards w-full flex flex-col md:flex-row gap-10 md:gap-15 pt-12 md:pt-20 relative">
                        {/* Container 1 */}
                        <div className="flex flex-col items-center cursor-pointer"
                            style={{ marginLeft: '-1vw' }}>

                            <motion.div
                                onClick={() => window.open("https://colossal-lab-up-grade.vercel.app/", "_blank")}
                                onMouseEnter={() => setHovered1(true)}
                                onMouseLeave={() => setHovered1(false)}
                                className="container md:w-[45vw] md:h-[30vw] w-full h-[56vw] relative rounded-4xl z-10"
                                style={isTablet ? { width: '42vw', height: '28vw' } : {}}
                                initial={{ scale: 1 }}
                                animate={Hovered1 ? { scale: 0.97 } : { scale: 1 }}
                                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                            >
                                <div className="absolute inset-0 overflow-hidden rounded-4xl z-0">
                                    <motion.img
                                        initial={{ scale: 1, filter: 'blur(0px)' }}
                                        animate={Hovered1 ? { scale: 1.05, filter: 'blur(8px)' } : { scale: 1, filter: 'blur(0px)' }}
                                        transition={{ duration: 0.6, ease: 'easeOut' }}
                                        className="w-full h-full object-cover"
                                        src="/Project-1.png"
                                        alt=""
                                    />
                                </div>
                                {/* Mobile text animation */}
                                <MobileTextAnimation text="the Collosal Lab " isHovered={Hovered1} />
                            </motion.div>
                            <GitHubLink url="https://github.com/Harish-Devpt/Colossal-Lab_UpGrade" />


                        </div>

                        {/* Container 2 */}
                        <div className="flex flex-col items-center cursor-pointer">
                            <motion.div
                                onClick={() => window.open("https://chilli-mash-co-fiery-flavors-sustai.vercel.app/", "_blank")}
                                onMouseEnter={() => setHovered2(true)}
                                onMouseLeave={() => setHovered2(false)}
                                className="container md:w-[45vw] md:h-[30vw] w-full h-[56vw] relative rounded-4xl z-10"
                                style={isTablet ? { width: '42vw', height: '28vw' } : {}}
                                initial={{ scale: 1 }}
                                animate={Hovered2 ? { scale: 0.97 } : { scale: 1 }}
                                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                            >
                                <div className="absolute inset-0 overflow-hidden rounded-4xl z-0">
                                    <motion.img
                                        initial={{ scale: 1, filter: 'blur(0px)' }}
                                        animate={Hovered2 ? { scale: 1.05, filter: 'blur(8px)' } : { scale: 1, filter: 'blur(0px)' }}
                                        transition={{ duration: 0.6, ease: 'easeOut' }}
                                        className="w-full h-full object-cover"
                                        src="/Project-2.png"
                                        alt=""
                                    />
                                </div>
                                {/* Mobile text animation */}
                                <MobileTextAnimation text="Chilli Mash Co." isHovered={Hovered2} />
                            </motion.div>
                            <GitHubLink url="https://github.com/Harish-Devpt/Chilli-Mash-Co.---Fiery-Flavors-Sustainable-Heat" />
                        </div>
                    </div>

                    {/* Text Animations for row 1 (Desktop only) */}
                    <motion.h1
                        initial={{ y: "-20%", opacity: 0 }}
                        animate={Hovered1 ? { y: 0, opacity: 1 } : { y: "-20%", opacity: 0 }}
                        transition={{ ease: "easeOut", duration: 0.5 }}
                        className="hidden lg:flex absolute top-[3vw] right-[23vw] gap-[1.3vw] text-[12vw] -tracking-[2vw] z-50 pointer-events-none text-green-600"
                        style={{ display: !isMobile && !isTablet ? 'flex' : 'none' }}
                    >
                        {"Colossal Lab".split("").map((event, index) => (
                            <motion.span key={index} initial={{ y: "30%", opacity: 0 }} animate={Hovered1 ? { y: 0, opacity: 1 } : { y: "30%", opacity: 0 }} transition={{ ease: "easeOut", duration: 0.5, delay: index * 0.05 }}>
                                {event}
                            </motion.span>
                        ))}
                    </motion.h1>
                    <motion.p initial={{ y: "-20%", opacity: 0 }}
                        animate={Hovered1 ? { y: 0, opacity: 1 } : { y: "-20%", opacity: 0 }}
                        transition={{ ease: "easeOut", duration: 0.5 }}
                        className="hidden lg:flex absolute top-[19vw] w-[90vw] right-[1vw] gap-[1vw] text-[2.2vw] leading-[2.2vw] text-center z-50 pointer-events-none text-orange-600 "
                        style={{ display: !isMobile && !isTablet ? 'flex' : 'none' }}>
                        <p>Colossal Lab Upgrade is a sleek and minimal web interface crafted using modern frontend technologies. The goal of this project is to create a smooth, fast, and visually clean starting point for building digital experiences. It focuses on performance, simplicity, and a structured development environment making it easy to extend into any real product or creative concept.</p>
                    </motion.p>
                    <motion.h1
                        initial={{ y: "-20%", opacity: 0 }}
                        animate={Hovered2 ? { y: 0, opacity: 1 } : { y: "-20%", opacity: 0 }}
                        transition={{ ease: "easeOut", duration: 0.6, staggerChildren: 0.05 }}
                        className="hidden lg:flex absolute top-[3vw] right-[12vw] gap-[1.3vw] text-[12vw] -tracking-[1.8vw] z-50 pointer-events-none text-red-500"
                        style={{ display: !isMobile && !isTablet ? 'flex' : 'none' }}
                    >
                        {"Chilli Mash Co.".split("").map((event, index) => (
                            <motion.span key={index} initial={{ y: "30%", opacity: 0 }} animate={Hovered2 ? { y: 0, opacity: 1 } : { y: "30%", opacity: 0 }} transition={{ ease: "easeOut", duration: 0.5, delay: index * 0.05 }}>
                                {event}
                            </motion.span>
                        ))}
                    </motion.h1>
                    <motion.p initial={{ y: "-20%", opacity: 0 }}
                        animate={Hovered2 ? { y: 0, opacity: 1 } : { y: "-20%", opacity: 0 }}
                        transition={{ ease: "easeOut", duration: 0.5 }}
                        className="hidden lg:flex absolute top-[19vw] w-[70vw] right-[11vw] gap-[1vw] text-[2.2vw] leading-[2vw] text-center z-50 pointer-events-none text-orange-600 "
                        style={{ display: !isMobile && !isTablet ? 'flex' : 'none' }}>
                        <p>Chilli Mash Co. is a clean and modern front-end mockup for a food/spice brand’s website built to showcase products, brand story, and a smooth browsing experience. The project aims to present a compelling, minimalistic digital storefront for a brand that values flavor, authenticity, and sustainability.</p>
                    </motion.p>

                    {/* Tablet-specific text animations for row 1 - matching desktop positioning with black text and tight tracking */}
                    <TabletTextAnimation
                        text="The Colossan Lab"
                        isHovered={Hovered1}
                        position={{
                            top: '10vw',  // Moved down from 5vw
                            right: '33vw',
                            gap: '1vw',
                            fontSize: '14vw',
                            letterSpacing: '-1.8vw'
                        }}
                    />
                    <TabletTextAnimation
                        text="World"
                        isHovered={Hovered2}
                        position={{
                            top: '10vw',  // Moved down from 5vw
                            right: '31vw',
                            gap: '1vw',
                            fontSize: '14vw',
                            letterSpacing: '-1.9vw'
                        }}
                    />
                </div>

                {/* Second Row */}
                <div className="px-1 relative">
                    <div className="cards w-full flex flex-col md:flex-row gap-10 md:gap-15 pt-12 md:pt-20 relative">
                        {/* Container 3 */}
                        <div className="flex flex-col items-center cursor-pointer"
                            style={{ marginLeft: '-1vw' }}>

                            <motion.div
                                onClick={() => window.open("https://colossal-lab-up-grade.vercel.app/", "_blank")}
                                onMouseEnter={() => setHovered3(true)}
                                onMouseLeave={() => setHovered3(false)}
                                className="container md:w-[45vw] md:h-[30vw] w-full h-[56vw] relative rounded-4xl z-10"
                                style={isTablet ? { width: '42vw', height: '28vw' } : {}}
                                initial={{ scale: 1 }}
                                animate={Hovered1 ? { scale: 0.97 } : { scale: 1 }}
                                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                            >
                                <div className="absolute inset-0 overflow-hidden rounded-4xl z-0">
                                    <motion.img
                                        initial={{ scale: 1, filter: 'blur(0px)' }}
                                        animate={Hovered3 ? { scale: 1.05, filter: 'blur(8px)' } : { scale: 1, filter: 'blur(0px)' }}
                                        transition={{ duration: 0.6, ease: 'easeOut' }}
                                        className="w-full h-full object-cover"
                                        src="/Project-1.png"
                                        alt=""
                                    />
                                </div>
                                {/* Mobile text animation */}
                                <MobileTextAnimation text="the Collosan Lab " isHovered={Hovered3} />
                            </motion.div>
                            <GitHubLink url="https://github.com/Harish-Devpt/Colossal-Lab_UpGrade" />


                        </div>

                        {/* Container 4 */}
                        <div className="flex flex-col items-center cursor-pointer">
                            <motion.div
                                onClick={() => window.open("https://chilli-mash-co-fiery-flavors-sustai.vercel.app/", "_blank")}
                                onMouseEnter={() => setHovered4(true)}
                                onMouseLeave={() => setHovered4(false)}
                                className="container md:w-[45vw] md:h-[30vw] w-full h-[56vw] relative rounded-4xl z-10"
                                style={isTablet ? { width: '42vw', height: '28vw' } : {}}
                                initial={{ scale: 1 }}
                                animate={Hovered4 ? { scale: 0.97 } : { scale: 1 }}
                                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                            >
                                <div className="absolute inset-0 overflow-hidden rounded-4xl z-0">
                                    <motion.img
                                        initial={{ scale: 1, filter: 'blur(0px)' }}
                                        animate={Hovered4 ? { scale: 1.05, filter: 'blur(8px)' } : { scale: 1, filter: 'blur(0px)' }}
                                        transition={{ duration: 0.6, ease: 'easeOut' }}
                                        className="w-full h-full object-cover"
                                        src="/Project-2.png"
                                        alt=""
                                    />
                                </div>
                                {/* Mobile text animation */}
                                <MobileTextAnimation text="Chilli Mash Co." isHovered={Hovered4} />
                            </motion.div>
                            <GitHubLink url="https://github.com/Harish-Devpt/Chilli-Mash-Co.---Fiery-Flavors-Sustainable-Heat" />
                        </div>
                    </div>

                    {/* Text Animations for row 1 (Desktop only) */}
                    <motion.h1
                        initial={{ y: "-20%", opacity: 0 }}
                        animate={Hovered3 ? { y: 0, opacity: 1 } : { y: "-20%", opacity: 0 }}
                        transition={{ ease: "easeOut", duration: 0.5 }}
                        className="hidden lg:flex absolute top-[3vw] right-[18vw] gap-[1.3vw] text-[12vw] -tracking-[1.8vw] z-50 pointer-events-none text-green-600"
                        style={{ display: !isMobile && !isTablet ? 'flex' : 'none' }}
                    >
                        {"Colossan Lab".split("").map((event, index) => (
                            <motion.span key={index} initial={{ y: "30%", opacity: 0 }} animate={Hovered3 ? { y: 0, opacity: 1 } : { y: "30%", opacity: 0 }} transition={{ ease: "easeOut", duration: 0.5, delay: index * 0.05 }}>
                                {event}
                            </motion.span>
                        ))}
                    </motion.h1>
                    <motion.p initial={{ y: "-20%", opacity: 0 }}
                        animate={Hovered3 ? { y: 0, opacity: 1 } : { y: "-20%", opacity: 0 }}
                        transition={{ ease: "easeOut", duration: 0.5 }}
                        className="hidden lg:flex absolute top-[19vw] w-[70vw] right-[13.8vw] gap-[1vw] text-[2.2vw] leading-[2vw] text-center z-50 pointer-events-none text-orange-600 "
                        style={{ display: !isMobile && !isTablet ? 'flex' : 'none' }}>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis corrupti quidem voluptates nesciunt, nam repudiandae! Autem nemo delectus error in, eos impedit dicta unde illo non, quibusdam beatae, necessitatibus libero?</p>
                    </motion.p>
                    <motion.h1
                        initial={{ y: "-20%", opacity: 0 }}
                        animate={Hovered4 ? { y: 0, opacity: 1 } : { y: "-20%", opacity: 0 }}
                        transition={{ ease: "easeOut", duration: 0.6, staggerChildren: 0.05 }}
                        className="hidden lg:flex absolute top-[3vw] right-[12vw] gap-[1.3vw] text-[12vw] -tracking-[1.8vw] z-50 pointer-events-none text-red-500"
                        style={{ display: !isMobile && !isTablet ? 'flex' : 'none' }}
                    >
                        {"Chilli Mash Co.".split("").map((event, index) => (
                            <motion.span key={index} initial={{ y: "30%", opacity: 0 }} animate={Hovered4 ? { y: 0, opacity: 1 } : { y: "30%", opacity: 0 }} transition={{ ease: "easeOut", duration: 0.5, delay: index * 0.05 }}>
                                {event}
                            </motion.span>
                        ))}
                    </motion.h1>
                    <motion.p initial={{ y: "-20%", opacity: 0 }}
                        animate={Hovered4 ? { y: 0, opacity: 1 } : { y: "-20%", opacity: 0 }}
                        transition={{ ease: "easeOut", duration: 0.5 }}
                        className="hidden lg:flex absolute top-[19vw] w-[70vw] right-[11vw] gap-[1vw] text-[2.2vw] leading-[2vw] text-center z-50 pointer-events-none text-orange-600 "
                        style={{ display: !isMobile && !isTablet ? 'flex' : 'none' }}>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis corrupti quidem voluptates nesciunt, nam repudiandae! Autem nemo delectus error in, eos impedit dicta unde illo non, quibusdam beatae, necessitatibus libero?</p>
                    </motion.p>

                    {/* Tablet-specific text animations for row 2 - matching desktop positioning with black text and tight tracking */}
                    <TabletTextAnimation
                        text="The Colossan Lab"
                        isHovered={Hovered3}
                        position={{
                            top: '10vw',  // Moved down from 5vw
                            right: '33vw',
                            gap: '1vw',
                            fontSize: '14vw',
                            letterSpacing: '-1.8vw'
                        }}
                    />
                    <TabletTextAnimation
                        text="World"
                        isHovered={Hovered4}
                        position={{
                            top: '10vw',  // Moved down from 5vw
                            right: '31vw',
                            gap: '1vw',
                            fontSize: '14vw',
                            letterSpacing: '-1.9vw'
                        }}
                    />
                </div>

                {/* Bottom Button with orange border */}
                <div className="w-full flex justify-center mt-[6vw] md:mt-[3vw]">
                    <motion.a
                        href="https://github.com/Harish-Devpt?tab=repositories"
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => setButtonHover(true)}
                        onMouseLeave={() => setButtonHover(false)}
                        animate={buttonHover ? { borderColor: "#ff7300" } : { borderColor: "transparent" }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="relative flex items-center justify-center gap-6 bg-black text-white px-10 md:px-16 py-5 md:py-6 rounded-full text-base md:text-[1.2vw] font-semibold border-[2px] border-transparent"
                        style={isTablet ? { padding: '4vw 8vw', fontSize: '2vw' } : {}}
                    >
                        Visit all my Projects
                        <motion.div
                            className="flex items-center justify-center w-5 h-5 md:w-[1vw] md:h-[1vw] rounded-full bg-white shadow-md origin-center"
                            style={isTablet ? { width: '3vw', height: '3vw' } : {}}
                            animate={buttonHover ? { scale: 1.7 } : { scale: 1 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <motion.svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="black"
                                strokeWidth={2.5}
                                className="w-3 h-3 md:w-[0.6vw] md:h-[0.6vw] flex items-center justify-center"
                                style={isTablet ? { width: '1.5vw', height: '1.5vw' } : {}}
                                initial={{ opacity: 0, rotate: 0 }}
                                animate={buttonHover ? { opacity: 1, rotate: -25, y: 0 } : { opacity: 0, rotate: 0, y: 0 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                            </motion.svg>
                        </motion.div>
                    </motion.a>
                </div>
            </div>
        </div>
    )
}

export default Work;