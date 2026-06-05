'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Shield, AlertCircle, Zap, Server } from 'lucide-react';

const ComparisonSection = () => {
    return (
        <section className="w-full bg-black relative border-t border-white/5 overflow-hidden">

            <div className="flex flex-col md:flex-row w-full min-h-screen">

                {/* LEFT SIDE: LEGACY (The Old Way) */}
                <div className="w-full md:w-1/2 bg-[#050505] p-12 md:p-24 border-r border-white/5 flex flex-col justify-center relative group overflow-hidden">
                    {/* Static Noise Overlay */}
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#ffffff03_3px)] pointer-events-none" />

                    {/* Content */}
                    <div className="relative z-10 max-w-lg mx-auto opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-white/5 border border-white/10 rounded flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                                <Server size={24} className="text-white/40" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-gray-400 group-hover:text-white transition-colors">Traditional Agency</h3>
                                <p className="  text-xs text-red-500 mt-1 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                                    SYSTEM DEGRADED
                                </p>
                            </div>
                        </div>

                        <ul className="space-y-8">
                            <ListItem icon={X} color="text-red-500" text="Generic Templates" subtext="No brand identity, high bounce rates." />
                            <ListItem icon={X} color="text-red-500" text="Slow Load Times" subtext="Average 2.5s+ loading speed." />
                            <ListItem icon={X} color="text-red-500" text="Bloated Infrastructure" subtext="Heavy plugins and security risks." />
                            <ListItem icon={X} color="text-red-500" text="Hourly Billing" subtext="Unpredictable costs and delays." />
                        </ul>
                    </div>
                </div>


                {/* RIGHT SIDE: SDWE (The New Way) */}
                <div className="w-full md:w-1/2 bg-black p-12 md:p-24 md:border-l border-white/5 flex flex-col justify-center relative group overflow-hidden">

                    {/* 1. Ambient Background Pulse (No scanning lines) */}
                    <div className="absolute inset-0 bg-purple-900/5 animate-pulse-slow pointer-events-none" />

                    {/* 2. Grid Background (Reveals on Hover) */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8b5cf605_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#8b5cf605_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

                    {/* 3. Mouse-Reactive Glow (Simulated with centered radial gradient for now) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none opacity-50 group-hover:opacity-80 transition-opacity duration-1000" />

                    {/* Content */}
                    <div className="relative z-10 max-w-lg mx-auto">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-purple-500 text-black rounded shadow-[0_0_20px_rgba(168,85,247,0.4)] group-hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-all duration-500 transform group-hover:scale-110">
                                <Zap size={24} className="fill-black" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-white">SDWE Architecture</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    <p className="  text-xs text-green-400">SYSTEM_OPTIMIZED</p>
                                </div>
                            </div>
                        </div>

                        <ul className="space-y-8">
                            <ListItem icon={Check} color="text-purple-400" text="Custom Engineering" subtext="100% Bespoke code. Zero bloat." active />
                            <ListItem icon={Check} color="text-purple-400" text="Instant Performance" subtext="Global Edge Network (<50ms)." active />
                            <ListItem icon={Check} color="text-purple-400" text="Scalable & Secure" subtext="Enterprise-grade architecture." active />
                            <ListItem icon={Check} color="text-purple-400" text="Evolution PaaS" subtext="Continuous integration & growth." active />
                        </ul>

                    </div>

                </div>

            </div>

            {/* Central VS Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-20 h-20 bg-black border border-white/10 rounded-full shadow-2xl backdrop-blur-xl group hover:border-white/30 transition-colors">
                <span className="  text-xl font-bold text-white/20 group-hover:text-white transition-colors">VS</span>
            </div>

        </section>
    );
};

const ListItem = ({ icon: Icon, color, text, subtext, active }: { icon: any, color: string, text: string, subtext: string, active?: boolean }) => (
    <div className={`flex gap-6 items-start group/item transition-all duration-500 ${active ? 'hover:translate-x-4 cursor-default' : ''}`}>
        <div className={`mt-1 shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${active ? 'bg-purple-500/10 border border-purple-500/30 text-purple-400 group-hover/item:bg-purple-500 group-hover/item:text-black group-hover/item:shadow-[0_0_20px_rgba(168,85,247,0.5)]' : 'bg-white/5 border border-white/10 text-gray-600'}`}>
            <Icon size={16} strokeWidth={3} />
        </div>
        <div>
            <h4 className={`text-xl font-bold mb-1 transition-colors ${active ? 'text-white group-hover/item:text-purple-200' : 'text-gray-500 group-hover:text-gray-400'}`}>
                {text}
            </h4>
            <p className="text-sm   text-gray-500 leading-relaxed group-hover/item:text-gray-400 transition-colors">
                {subtext}
            </p>
        </div>
    </div>
);

export default ComparisonSection;
