'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Globe, Cpu, Layout, Server, Zap, Box, Layers, Terminal, Cloud, Shield } from 'lucide-react';

import SectionHeading from './ui/SectionHeading';

const ROW_1 = [
    { name: "Next.js 15", icon: Globe, category: "Framework" },
    { name: "React 19", icon: Code2, category: "Library" },
    { name: "TypeScript", icon: Terminal, category: "Language" },
    { name: "Tailwind CSS", icon: Layout, category: "Styling" },
    { name: "Framer Motion", icon: Zap, category: "Animation" },
    { name: "Three.js", icon: Box, category: "3D Engine" },
];

const ROW_2 = [
    { name: "PostgreSQL", icon: Database, category: "Database" },
    { name: "Supabase", icon: Server, category: "Backend" },
    { name: "Vercel", icon: Cloud, category: "Deploy" },
    { name: "Node.js", icon: Cpu, category: "Runtime" },
    { name: "Redis", icon: Layers, category: "Cache" },
    { name: "Docker", icon: Shield, category: "DevOps" },
];

const TechStack = () => {
    return (
        <section className="w-full bg-white py-32 relative border-t border-black/5 overflow-hidden" id="tech">

            {/* Ambient Pulse */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-500/5 blur-[100px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto relative z-10 mb-20 px-6">
                <SectionHeading
                    tag="High Velocity Stack"
                    title="System"
                    highlight="Core"
                />
            </div>

            <div className="flex flex-col gap-8">
                {/* Row 1: Marquee Left */}
                <div className="flex overflow-hidden relative fade-mask">
                    {/* Track 1 */}
                    <div className="flex gap-4 animate-marquee whitespace-nowrap px-2">
                        {[...ROW_1, ...ROW_1].map((item, i) => (
                            <TechCard key={`r1-t1-${i}`} item={item} />
                        ))}
                    </div>
                    {/* Track 2 (Duplicate for Seamless Loop) */}
                    <div className="flex gap-4 animate-marquee whitespace-nowrap px-2 absolute top-0 left-0 translate-x-[100%]">
                        {[...ROW_1, ...ROW_1].map((item, i) => (
                            <TechCard key={`r1-t2-${i}`} item={item} />
                        ))}
                    </div>
                </div>

                {/* Row 2: Marquee Right */}
                <div className="flex overflow-hidden relative fade-mask">
                    {/* Track 1 */}
                    <div className="flex gap-4 animate-marquee-reverse whitespace-nowrap px-2">
                        {[...ROW_2, ...ROW_2].map((item, i) => (
                            <TechCard key={`r2-t1-${i}`} item={item} />
                        ))}
                    </div>
                    {/* Track 2 (Duplicate for Seamless Loop) */}
                    <div className="flex gap-4 animate-marquee-reverse whitespace-nowrap px-2 absolute top-0 left-0 translate-x-[100%]">
                        {[...ROW_2, ...ROW_2].map((item, i) => (
                            <TechCard key={`r2-t2-${i}`} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const TechCard = ({ item }: { item: any }) => {
    return (
        <div className="group/card relative w-[280px] h-[160px] bg-black/[0.02] border border-black/10 hover:border-purple-500/50 hover:bg-black/[0.05] transition-all duration-300 flex flex-col items-center justify-center gap-4 cursor-default shrink-0">
            {/* Sharp edges (default/no rounded class) */}

            <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="w-10 h-10 border border-black/10 bg-white flex items-center justify-center group-hover/card:border-purple-500 group-hover/card:text-purple-400 transition-colors z-10 scale-100 group-hover/card:scale-110 duration-300">
                <item.icon size={20} className="text-gray-400 group-hover/card:text-purple-400 transition-colors" />
            </div>

            <div className="text-center z-10">
                <h3 className="text-black font-bold text-lg  mb-1">{item.name}</h3>
                <span className="  text-[10px] text-gray-500 uppercase tracking-widest group-hover/card:text-black/50 transition-colors">
                    {item.category}
                </span>
            </div>

        </div>
    );
};

export default TechStack;
