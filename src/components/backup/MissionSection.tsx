'use client';

import React from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Globe, Zap, Users, ArrowUpRight, Cpu, Lock, Terminal, Activity, BarChart3, Rocket } from 'lucide-react';
import { useEffect } from 'react';

const Counter = ({ from, to, duration }: { from: number; to: number; duration: number }) => {
    const count = useMotionValue(from);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        const controls = animate(count, to, { duration: duration, ease: "easeOut" });
        return controls.stop;
    }, [count, to, duration]);

    return <motion.span className="text-3xl font-bold text-white">{rounded}</motion.span>;
};

const MissionSection = () => {
    return (
        <section className="w-full bg-white py-40 px-6 relative border-t border-black/5 overflow-hidden">

            {/* Background Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

            <div className="max-w-[1400px] mx-auto relative z-10">

                {/* 1. Typographic Header */}
                <div className="max-w-5xl mx-auto text-center mb-32 leading-tight">
                    <div className="mb-8">
                        <span className="text-xs text-black/50 uppercase tracking-widest border border-black/10 px-3 py-1 rounded-full">
                            Agency Objective
                        </span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-bold text-black uppercase leading-none">
                        We architect <span className="text-transparent bg-clip-text bg-gradient-to-b from-black to-black/50">problem-solving</span>
                        <div className="inline-flex align-middle mx-4 relative group">
                            <motion.div
                                animate={{ opacity: [0.4, 0.8, 0.4] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-0 bg-orange-500/20 blur-lg"
                            />
                            <div className="relative border border-orange-500/50 bg-black w-12 h-12 flex items-center justify-center">
                                <motion.div
                                    animate={{
                                        y: [0, -3, 0]
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <BarChart3 size={24} className="text-orange-500" />
                                </motion.div>
                            </div>
                        </div>
                        digital solutions, merging <span className="text-transparent bg-clip-text bg-gradient-to-b from-black to-black/50">practical expertise</span>
                        <div className="inline-flex align-middle mx-4 relative group">
                            <motion.div
                                animate={{ opacity: [0.4, 0.8, 0.4] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute inset-0 bg-rose-500/20 blur-lg"
                            />
                            <div className="relative border border-rose-500/50 bg-black w-12 h-12 flex items-center justify-center">
                                <motion.div
                                    animate={{
                                        y: [0, -4, 0]
                                    }}
                                    transition={{
                                        duration: 3.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 0.5
                                    }}
                                >
                                    <Rocket size={24} className="text-rose-500" />
                                </motion.div>
                            </div>
                        </div>
                        to deliver <span className="text-transparent bg-clip-text bg-gradient-to-b from-black to-black/50">results</span>
                        <div className="inline-flex align-middle mx-4 relative group">
                            <motion.div
                                animate={{ opacity: [0.4, 0.8, 0.4] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                                className="absolute inset-0 bg-amber-500/20 blur-lg"
                            />
                            <div className="relative border border-amber-500/50 bg-black w-12 h-12 flex items-center justify-center">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 1
                                    }}
                                >
                                    <Zap size={24} className="text-amber-500" />
                                </motion.div>
                            </div>
                        </div>
                        your business needs.
                    </h2>
                </div>

                {/* 2. Bento Grid System - Agency Stats Focus */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-auto md:h-[500px]">

                    {/* Card 1: Problem Solvers (Text Focus) */}
                    <div className="group relative bg-white border border-black/10 p-8 flex flex-col justify-between overflow-hidden hover:border-orange-500/30 transition-all duration-500">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />

                        <div>
                            <h3 className="text-4xl font-bold text-black mb-6 uppercase  leading-none">
                                Engineered <br /> For Speed
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed  ">
                                We don't waste time on unnecessary features. We build fast-loading, high-performance web solutions that keep visitors engaged and converting.
                            </p>
                        </div>

                        <div className="mt-8 pt-6 border-t border-black/10 flex items-center justify-between">
                            <span className="text-[10px]   text-black/30 uppercase tracking-widest">AVG. DELIVERY</span>
                            <span className="text-xl font-bold text-black  ">4-6 WEEKS</span>
                        </div>
                    </div>

                    {/* Card 2: Team Power (Circular Graphic) */}
                    <div className="group relative bg-white border border-black/10 overflow-hidden md:col-span-1 rounded-sm hover:border-amber-500/30 transition-colors ">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.05)_1px,transparent_1px),linear_gradient(90deg,rgba(245,158,11,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />

                        <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <h3 className="text-4xl font-bold text-black uppercase leading-none">Team Power</h3>
                                <span className="text-[10px]   text-amber-500">v1.0</span>
                            </div>

                            <div className="flex items-center justify-center py-4">
                                <div className="relative w-48 h-48 flex items-center justify-center">
                                    {/* Ring 1 (Outermost): Static Glow */}
                                    <div className="absolute inset-[-10px] border border-amber-500/10 rounded-full" />

                                    {/* Ring 2: Rotating Dashed */}
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 border border-amber-500/20 border-dashed rounded-full"
                                    />

                                    {/* Ring 3: Rotating Opposite Dotted */}
                                    <motion.div
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-[10px] border border-black/20 border-dotted rounded-full"
                                    />

                                    {/* Ring 4: Pulsing Gradient */}
                                    <motion.div
                                        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                        className="absolute inset-[20px] bg-gradient-to-tr from-amber-500/0 via-amber-500/10 to-amber-500/0 rounded-full border border-amber-500/20"
                                    />

                                    {/* Ring 5: Fast Spinner */}
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-[30px] border-t border-l border-amber-400/50 rounded-full"
                                    />

                                    {/* Center: Team Node */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-16 h-16 bg-gradient-to-br from-amber-500/20 to-white rounded-full border border-amber-500/40 backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                                            <Users size={24} className="text-black" />
                                        </div>
                                        {/* Orbiting Particle - Set to Ring 3's inset (10px) */}
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-[10px] rounded-full"
                                        >
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_10px_#f59e0b]" />
                                        </motion.div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center border-t border-black/10 pt-4">
                                <span className="text-[10px]   text-black/40 uppercase tracking-widest">FULL_STACK_CAPACITY</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: BUILT FOR CONVERSIONS */}
                    <div className="group relative bg-white border border-black/10 overflow-hidden md:col-span-1 hover:border-rose-500/30 transition-colors ">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />

                        <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                            <div>
                                <h3 className="text-4xl font-bold text-black mb-6 uppercase  leading-none">
                                    Built For <br /> Conversions
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed  ">
                                    We don't just build websites. We create digital platforms engineered to turn your traffic into customers and grow your bottom line.
                                </p>
                            </div>

                            {/* Conversion Animation */}
                            <div className="w-full h-24 relative mt-auto border-t border-black/5 pt-4">
                                <div className="absolute inset-0 flex items-center gap-[2px] px-2">
                                    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                                        <div key={i} className="flex flex-col items-center h-full justify-end flex-1">
                                            <motion.div
                                                className="w-full bg-rose-500/20 border-2 border-rose-500/50 rounded-t-sm"
                                                initial={{ height: "10%" }}
                                                whileInView={{ height: `${20 + Math.random() * 80}%` }}
                                                transition={{ duration: 1, delay: i * 0.1, ease: "backOut" }}
                                            />
                                        </div>
                                    ))}

                                    {/* Connection Line */}
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-500 to-transparent"
                                        animate={{ opacity: [0.2, 1, 0.2] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between items-center border-t border-black/10 pt-4 mt-4">
                                <span className="text-[10px]   text-black/40 uppercase tracking-widest">ROI Focused</span>
                                <Activity size={14} className="text-rose-500" />
                            </div>
                        </div>
                    </div>

                    {/* Card 4: Direct Access */}
                    <div className="group relative bg-white border border-black/10 p-8 flex flex-col justify-between hover:border-emerald-500/30 transition-colors ">
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:10px_10px]" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <motion.div
                                    className="relative w-10 h-10 border border-black/20 bg-black/5 flex items-center justify-center"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Pulsing Glow */}
                                    <motion.div
                                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute inset-0 bg-emerald-500/20 blur-md"
                                    />
                                    <Terminal size={18} className="text-black relative z-10" />
                                </motion.div>
                                <h3 className="text-4xl font-bold text-black uppercase leading-none">Direct Access</h3>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed  ">
                                No account managers. No middlemen. You work directly with the developers building your project. We are your technical partners, not just hired hands.
                            </p>
                        </div>

                        <div className="relative z-10 mt-6">
                            <a href="#contact" className="inline-flex items-center gap-2 group/btn text-sm font-bold text-black hover:text-emerald-500 transition-colors uppercase tracking-wider">
                                Schedule Call
                                <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MissionSection;
