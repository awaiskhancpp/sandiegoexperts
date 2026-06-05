'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
    // Mouse Position for Spotlight & Parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024); // Treat tablets/mobile as mobile for performance
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        if (isMobile) return;
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    // Smooth spotlight effect - only compute if necessary
    const spotlightBackground = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.06), transparent 80%)`;

    return (
        <section
            onMouseMove={handleMouseMove}
            className="h-screen w-full relative flex flex-col items-center justify-center overflow-hidden bg-white group"
        >

            {/* 1. Precise Grid Background with Spotlight Reveal */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:50px_50px] opacity-20 pointer-events-none" />
            {/* Spotlight Reveal - Desktop Only */}
            {!isMobile && (
                <motion.div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    style={{ background: spotlightBackground }}
                />
            )}

            {/* 2. Random Twinkling Stars with subtle parallax */}
            <StarBackground mouseX={mouseX} mouseY={mouseY} isMobile={isMobile} />

            {/* 3. The "Shining Horizon" - Deep & Curved */}
            <div className="absolute bottom-[-40%] left-[-20%] right-[-20%] h-[80%] bg-[#a855f7] opacity-[0.15] blur-[150px] rounded-[100%] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[-100px] left-0 right-0 h-[250px] bg-gradient-to-t from-[#a855f7]/20 to-transparent blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center px-4">

                {/* 4. Typography: PROBLEM SOLVERS, NOT INVENTORS */}
                <h1 className="font-bold  text-black leading-[0.9] flex flex-col items-center gap-2 select-none uppercase">

                    {/* Line 1: PROBLEM SOLVERS, */}
                    <div className="flex flex-wrap items-center justify-center gap-x-4 md:gap-x-6 overflow-hidden">
                        <KineticText text="Problem" delay={0.1} isMobile={isMobile} />
                        <KineticText text="Solvers," delay={0.2} isMobile={isMobile} />
                    </div>

                    {/* Line 2: NOT INVENTORS. */}
                    <div className="overflow-hidden">
                        <motion.span
                            initial={{ y: isMobile ? 0 : "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
                            className="block bg-clip-text text-transparent bg-gradient-to-b from-black to-black/60 text-5xl md:text-7xl lg:text-[7rem]"
                        >
                            Not Inventors.
                        </motion.span>
                    </div>
                </h1>

                {/* Subtext description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="mt-12 text-black/60 text-base md:text-lg max-w-3xl font-light tracking-wide leading-relaxed"
                >
                    San Diego expertise without the San Diego salary, benefits, or overhead. While your competitors are posting job listings and waiting months to fill positions, you&apos;re already launching. Get frontend developers, backend engineers, UX designers, and strategists—all working together to solve your real business problems.
                </motion.p>
            </div>

            {/* 5. Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
            >
                <span className="text-[10px] uppercase tracking-[0.2em] text-black/30">Scroll</span>
                <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                    <ChevronDown className="text-black/30 w-4 h-4" />
                </motion.div>
            </motion.div>

            {/* Bottom Curve Silhouette (Planet Edge) */}
            <div className="absolute bottom-0 w-full h-[15vh] overflow-hidden pointer-events-none">
                <div className="absolute top-[50%] left-1/2 -translate-x-1/2 w-[150%] h-[400%] bg-black rounded-[50%] blur-xl" />
            </div>

        </section>
    );
};

const KineticText = ({ text, delay, isMobile }: { text: string; delay: number; isMobile: boolean }) => (
    <motion.span
        initial={{ y: isMobile ? 0 : "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay, ease: [0.33, 1, 0.68, 1] }}
        className="block text-5xl md:text-7xl lg:text-[7rem]"
    >
        {text}
    </motion.span>
);

// Star Background with Parallax
const StarBackground = ({ mouseX, mouseY, isMobile }: { mouseX: any; mouseY: any; isMobile: boolean }) => {
    const [stars, setStars] = useState<{ id: number; top: number; left: number; size: string; delay: string; duration: string; depth: number }[]>([]);

    useEffect(() => {
        const starCount = isMobile ? 20 : 50; // Fewer stars on mobile
        const newStars = Array.from({ length: starCount }).map((_, i) => ({
            id: i,
            top: Math.random() * 100,
            left: Math.random() * 100,
            size: Math.random() > 0.8 ? 'h-1.5 w-1.5' : 'h-1 w-1',
            delay: `${Math.random() * 5}s`,
            duration: `${2 + Math.random() * 3}s`,
            depth: Math.random() * 20 + 10, // Parallax depth factor
        }));
        setStars(newStars);
    }, [isMobile]);

    // Conditional transformations
    // If mobile, we don't apply the transform to avoid calculating/re-rendering
    // But we need to follow hook rules. We can just pass 0 or use ternary in style.

    // Slight parallax movement opposite to mouse - Only verify on Desktop
    // We can conditionally use the transform or just pass static 0
    // But hooks must run.
    // We can disable the transform output logic.

    // Let's rely on standard logic but if isMobile, we don't connect `x` `y` to the div.

    return (
        <div className="absolute inset-0 pointer-events-none">
            {/* We can use a motion div wrapper but only animate if !isMobile */}
            {isMobile ? (
                <div className="absolute inset-0">
                    {stars.map((star) => (
                        <div
                            key={star.id}
                            className={`absolute rounded-full bg-black shadow-[0_0_4px_black] animate-pulse ${star.size}`}
                            style={{
                                top: `${star.top}%`,
                                left: `${star.left}%`,
                                animationDelay: star.delay,
                                animationDuration: star.duration,
                                opacity: Math.random() * 0.5 + 0.3,
                            }}
                        />
                    ))}
                </div>
            ) : (
                <ParallaxStars stars={stars} mouseX={mouseX} mouseY={mouseY} />
            )}
        </div>
    );
};

const ParallaxStars = ({ stars, mouseX, mouseY }: { stars: any[], mouseX: any, mouseY: any }) => {
    const x = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [20, -20]);
    const y = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [20, -20]);

    return (
        <motion.div style={{ x, y }} className="absolute inset-0">
            {stars.map((star) => (
                <div
                    key={star.id}
                    className={`absolute rounded-full bg-black shadow-[0_0_4px_black] animate-pulse ${star.size}`}
                    style={{
                        top: `${star.top}%`,
                        left: `${star.left}%`,
                        animationDelay: star.delay,
                        animationDuration: star.duration,
                        opacity: Math.random() * 0.5 + 0.3,
                    }}
                />
            ))}
        </motion.div>
    )
}

export default Hero;
