'use client';

import React from 'react';
import { motion } from 'framer-motion';

const HeroVideo = () => {
    return (
        <section className="w-full bg-white py-20 md:py-32 px-6 relative overflow-hidden">

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px)] bg-[size:40px_40px] opacity-10 pointer-events-none" />

            <div className="max-w-[1400px] mx-auto relative z-10">

                {/* Heading and Description - Above Video */}
                <div className="mb-12 md:mb-16 text-center">
                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                        className="font-bold text-black leading-[0.9] uppercase mb-6"
                    >
                        <div className="flex flex-wrap items-center justify-center gap-x-3 md:gap-x-4 mb-2">
                            <span className="text-5xl md:text-7xl lg:text-8xl">Stop Losing Customers</span>
                        </div>
                        <div className="bg-clip-text text-transparent bg-gradient-to-b from-black to-black/60 text-5xl md:text-7xl lg:text-8xl ">
                            To Boring Websites
                        </div>
                    </motion.h1>

                    {/* Subtext */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-gray-600 text-sm md:text-base lg:text-lg max-w-2xl leading-relaxed mx-auto"
                    >
                        We build high-performance websites that grab attention and drive conversions. No templates. No boring designs. Just results.
                    </motion.p>
                </div>

                {/* Video - Below Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="relative w-full aspect-video rounded-sm overflow-hidden "
                >
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    >
                        <source src="/hero.mp4" type="video/mp4" />
                    </video>

                    {/* Grain texture overlay */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay pointer-events-none" />
                </motion.div>
            </div>
        </section>
    );
};

export default HeroVideo;
