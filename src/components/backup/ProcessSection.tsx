'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Layout, GitMerge, Globe, ArrowRight } from 'lucide-react';

const STEPS = [
    {
        id: "01",
        title: "Discovery",
        desc: "We diagnose your digital roadblock and map a strategic solution that freelancers can't deliver and agencies overcharge for.",
        icon: Search,
        action: "ANALYZE CHALLENGE"
    },
    {
        id: "02",
        title: "Architecture",
        desc: "Building a scalable foundation. We design systems engineered for growth and performance, not templates that crumble under traffic.",
        icon: Layout,
        action: "PLAN SOLUTION"
    },
    {
        id: "03",
        title: "Development",
        desc: "A dedicated team of senior developers executing the vision with clean, maintainable code built to last.",
        icon: GitMerge,
        action: "BUILD PLATFORM"
    },
    {
        id: "04",
        title: "Launch",
        desc: "e deploy your platform and ensure a seamless launch. Complete training, documentation, and support to keep your digital solution performing at its peak.",
        icon: Globe,
        action: "DEPLOY LIVE"
    }
];

const ProcessSection = () => {
    return (
        <section className="w-full bg-white py-32 border-t border-black/5 overflow-hidden" id="process">
            <div className="w-full max-w-[1400px] mx-auto relative z-10 px-4 md:px-8">

                {/* Header - Aligned with Project Showcase Style */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4 mb-6"
                        >
                            <span className="  text-xs text-black/50 uppercase tracking-widest border border-black/10 px-3 py-1 rounded-full">
                                Our Process
                            </span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-grotesk font-bold text-black uppercase  leading-none"
                        >
                            From Problem <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-black to-black/30">To Performance.</span>
                        </motion.h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="max-w-md text-right md:text-right"
                    >
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed  ">
                            A streamlined, no-nonsense development process designed to take you from business challenge to profitable solution without the agency bloat.
                        </p>
                    </motion.div>
                </div>
                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {STEPS.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="group relative bg-white border border-black/10 p-8 flex flex-col justify-between overflow-hidden hover:border-purple-500/30 transition-all duration-500 min-h-[400px] shadow-sm"
                        >
                            {/* Noise Overlay */}
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />

                            {/* Hover Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            {/* Top Content */}
                            <div className="relative z-10">
                                <div className="mb-8 flex justify-between items-start">
                                    <span className="text-4xl font-bold text-black/10   group-hover:text-purple-500/20 transition-colors duration-500">
                                        {step.id}
                                    </span>
                                    <div className="p-2 rounded bg-black/5 border border-black/10 group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-colors duration-300">
                                        <step.icon size={20} className="text-black group-hover:text-purple-400 transition-colors" />
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-black mb-4 uppercase ">
                                    {step.title}
                                </h3>

                                <p className="text-gray-600 text-sm leading-relaxed   mb-8">
                                    {step.desc}
                                </p>
                            </div>

                            {/* Footer / Action Line */}
                            <div className="relative z-10 pt-6 border-t border-black/10 flex items-center justify-between group-hover:border-purple-500/30 transition-colors duration-500">
                                <span className="text-[10px]   text-black/40 uppercase tracking-widest group-hover:text-purple-400/70 transition-colors">
                                    {step.action}
                                </span>
                                <ArrowRight size={14} className="text-black/30 group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-300" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;
