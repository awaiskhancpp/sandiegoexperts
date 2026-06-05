'use client';

import React from 'react';
import { motion } from 'framer-motion';

const services = [
    "Web Development",
    "UI/UX Design",
    "SEO Strategy",
    "E-commerce Solutions",
    "Custom Software",
    "Mobile Apps",
    "Brand Identity",
    "Performance Optimization"
];

const ServicesMarquee = () => {
    return (
        <div className="w-full bg-black py-12 md:py-20 border-t border-white/10 overflow-hidden">
            <div className="relative flex whitespace-nowrap">
                <motion.div
                    className="flex items-center gap-12 md:gap-24"
                    animate={{
                        x: [0, -1000]
                    }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30
                    }}
                >
                    {/* First Loop */}
                    {services.map((service, index) => (
                        <div key={`s1-${index}`} className="flex items-center gap-12 md:gap-24">
                            <span className="text-3xl md:text-5xl font-grotesk font-bold text-transparent bg-clip-text bg-gradient-to-r from-white/40 to-white/90 uppercase ">
                                {service}
                            </span>
                            <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-white/20" />
                        </div>
                    ))}

                    {/* Second Loop for seamless infinity */}
                    {services.map((service, index) => (
                        <div key={`s2-${index}`} className="flex items-center gap-12 md:gap-24">
                            <span className="text-3xl md:text-5xl font-grotesk font-bold text-transparent bg-clip-text bg-gradient-to-r from-white/40 to-white/90 uppercase ">
                                {service}
                            </span>
                            <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-white/20" />
                        </div>
                    ))}
                    {/* Third Loop for safety on wide screens */}
                    {services.map((service, index) => (
                        <div key={`s3-${index}`} className="flex items-center gap-12 md:gap-24">
                            <span className="text-3xl md:text-5xl font-grotesk font-bold text-transparent bg-clip-text bg-gradient-to-r from-white/40 to-white/90 uppercase ">
                                {service}
                            </span>
                            <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-white/20" />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default ServicesMarquee;
