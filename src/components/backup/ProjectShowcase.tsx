'use client';

import React from 'react';
import { motion } from 'framer-motion';

const PROJECTS = [
    { title: "Neon Horizon", type: "Fintech Platform", image: "/project_1.avif" },
    { title: "Velocita", type: "E-Commerce", image: "/project_2.avif" },
    { title: "Aura Systems", type: "SaaS Dashboard", image: "/project_3.avif" },
    { title: "Cyber Core", type: "AI Infrastructure", image: "/project_4.avif" },
];

const ProjectShowcase = () => {
    return (
        <section className="w-full bg-white py-24 overflow-hidden border-t border-black/5" id="projects">
            {/* Header */}
            <div className="px-6 md:px-12 mb-16 max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="flex flex-col items-start">
                    <span className="  text-xs text-black/50 uppercase tracking-widest border border-black/10 px-3 py-1 rounded-full mb-6">
                        Case Studies
                    </span>
                    <h2 className="text-5xl md:text-8xl font-grotesk font-bold text-black uppercase leading-[0.9]">
                        Project <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-black to-black/30">Showcase</span>
                    </h2>
                </div>

                <div className="max-w-md text-right md:text-right">
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed  ">
                        Real projects. Real results. We don't just build websites—we solve business problems. From e-commerce platforms that convert to web apps that scale, every project is engineered with one goal: measurable impact on your bottom line.
                    </p>
                </div>
            </div>

            {/* Marquee Container */}
            <div className="relative w-full overflow-hidden">
                <div className="flex gap-3 animate-marquee whitespace-nowrap">
                    {/* Double the list for infinite loop */}
                    {[...PROJECTS, ...PROJECTS, ...PROJECTS].map((project, i) => (
                        <div
                            key={i}
                            className="relative group w-[500px] md:w-[800px] aspect-[4/3] flex-shrink-0  overflow-hidden cursor-pointer"
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
                                <h3 className="text-3xl md:text-4xl font-bold text-white uppercase  mb-2">{project.title}</h3>
                                <p className="text-white/60   text-sm uppercase tracking-widest">{project.type}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectShowcase;
