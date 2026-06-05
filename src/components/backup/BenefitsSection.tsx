'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Server, Shield, Clock, MousePointer2, Terminal, Code2, Cpu, User } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Button from './ui/Button';

const BenefitsSection = () => {
    return (
        <section className="w-full bg-white py-32 px-6 relative border-t border-black/5 overflow-hidden" id="benefits">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px)] bg-[size:40px_40px] opacity-10 pointer-events-none" />

            <div className="max-w-[1400px] mx-auto relative z-10">
                <SectionHeading
                    tag="Core_Capabilities"
                    title="Engineered"
                    highlight="Dominance"
                />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[auto]">

                    {/* Card 1: Expertise on Demand (Command Center) - Tall Left */}
                    <div className="md:col-span-5 bg-white border border-black/10 p-8 md:p-10 flex flex-col justify-between group overflow-hidden relative min-h-[450px]">
                        {/* Corner Accents */}

                        <div className="relative z-10 flex-grow flex flex-col">
                            <div className="flex items-center gap-2 mb-8 text-black/50   text-xs uppercase tracking-widest shrink-0">
                                <Terminal size={14} />
                                Service_Center.sh
                            </div>

                            {/* Vertical Marquee Container */}
                            <div className="relative h-[320px] overflow-hidden group/marquee">
                                <motion.div
                                    className="w-full"
                                    animate={{ y: "-50%" }}
                                    transition={{
                                        duration: 20,
                                        ease: "linear",
                                        repeat: Infinity
                                    }}
                                >
                                    {/* Double List for Infinite Loop */}
                                    <div className="space-y-3 pb-3">
                                        {[
                                            { icon: MousePointer2, label: "UI/UX Systems" },
                                            { icon: Zap, label: "Ad Campaigns" },
                                            { icon: Code2, label: "Full-Stack Dev" },
                                            { icon: Server, label: "Infrastructure" },
                                            { icon: Shield, label: "Security Audits" },
                                            { icon: Clock, label: "Speed Opt." },
                                            { icon: Terminal, label: "Backend API" },
                                            { icon: Cpu, label: "AI Integration" },
                                            { icon: MousePointer2, label: "UI/UX Systems" },
                                        ].map((item, i) => (
                                            <motion.li
                                                key={`l1-${i}`}
                                                className="relative flex items-center gap-4 p-3 bg-gradient-to-r from-purple-500/5 via-transparent to-transparent border border-black/10 cursor-pointer group/item overflow-hidden"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{
                                                    opacity: 1,
                                                    x: 0,
                                                    borderColor: [
                                                        "rgba(0,0,0,0.1)",
                                                        "rgba(168,85,247,0.3)",
                                                        "rgba(0,0,0,0.1)",
                                                    ]
                                                }}
                                                transition={{
                                                    opacity: { duration: 0.3, delay: i * 0.05 },
                                                    x: { duration: 0.3, delay: i * 0.05 },
                                                    borderColor: {
                                                        duration: 3,
                                                        delay: i * 0.2,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    }
                                                }}
                                                whileHover={{
                                                    x: 6,
                                                    backgroundColor: "rgba(168,85,247,0.1)",
                                                    borderColor: "rgba(168,85,247,0.6)"
                                                }}
                                            >
                                                {/* Animated background pulse */}
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0"
                                                    animate={{
                                                        opacity: [0, 0.5, 0],
                                                        x: ["-100%", "100%"]
                                                    }}
                                                    transition={{
                                                        duration: 3,
                                                        delay: i * 0.3,
                                                        repeat: Infinity,
                                                        ease: "linear"
                                                    }}
                                                />

                                                {/* Icon with continuous glow */}
                                                <motion.div
                                                    className="relative w-11 h-11 flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30 shrink-0"
                                                    animate={{
                                                        boxShadow: [
                                                            "0 0 10px rgba(168,85,247,0.2)",
                                                            "0 0 20px rgba(168,85,247,0.4)",
                                                            "0 0 10px rgba(168,85,247,0.2)",
                                                        ]
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        delay: i * 0.15,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    }}
                                                    whileHover={{
                                                        scale: 1.1,
                                                        rotate: 5
                                                    }}
                                                >
                                                    <motion.div
                                                        animate={{
                                                            rotate: [0, 5, 0, -5, 0]
                                                        }}
                                                        transition={{
                                                            duration: 4,
                                                            delay: i * 0.2,
                                                            repeat: Infinity,
                                                            ease: "easeInOut"
                                                        }}
                                                    >
                                                        <item.icon size={18} className="text-purple-500/80" />
                                                    </motion.div>
                                                </motion.div>

                                                <div className="flex-1 min-w-0">
                                                    <span className="  text-sm font-semibold uppercase tracking-wider text-black/80 group-hover/item:text-black transition-colors">
                                                        {item.label}
                                                    </span>
                                                    {/* Animated underline */}
                                                    <motion.div
                                                        className="h-px bg-gradient-to-r from-purple-500 via-purple-400 to-transparent mt-1"
                                                        initial={{ width: "0%" }}
                                                        animate={{
                                                            width: ["0%", "60%", "0%"],
                                                            opacity: [0.3, 1, 0.3]
                                                        }}
                                                        transition={{
                                                            duration: 3,
                                                            delay: i * 0.25,
                                                            repeat: Infinity,
                                                            ease: "easeInOut"
                                                        }}
                                                    />
                                                </div>

                                                {/* Pulsing status indicator */}
                                                <motion.div
                                                    className="w-1.5 h-1.5 bg-purple-500 shrink-0"
                                                    animate={{
                                                        opacity: [0.3, 1, 0.3],
                                                        scale: [0.8, 1.2, 0.8]
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        delay: i * 0.1,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    }}
                                                />
                                            </motion.li>
                                        ))}
                                    </div>
                                    <div className="space-y-3 pb-3">
                                        {[
                                            { icon: MousePointer2, label: "UI/UX Systems" },
                                            { icon: Zap, label: "Ad Campaigns" },
                                            { icon: Code2, label: "Full-Stack Dev" },
                                            { icon: Server, label: "Infrastructure" },
                                            { icon: Shield, label: "Security Audits" },
                                            { icon: Clock, label: "Speed Opt." },
                                            { icon: Terminal, label: "Backend API" },
                                            { icon: Cpu, label: "AI Integration" },
                                            { icon: MousePointer2, label: "UI/UX Systems" },
                                        ].map((item, i) => (
                                            <motion.li
                                                key={`l2-${i}`}
                                                className="relative flex items-center gap-4 p-3 bg-gradient-to-r from-purple-500/5 via-transparent to-transparent border border-black/10 cursor-pointer group/item overflow-hidden"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{
                                                    opacity: 1,
                                                    x: 0,
                                                    borderColor: [
                                                        "rgba(0,0,0,0.1)",
                                                        "rgba(168,85,247,0.3)",
                                                        "rgba(0,0,0,0.1)",
                                                    ]
                                                }}
                                                transition={{
                                                    opacity: { duration: 0.3, delay: i * 0.05 },
                                                    x: { duration: 0.3, delay: i * 0.05 },
                                                    borderColor: {
                                                        duration: 3,
                                                        delay: i * 0.2,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    }
                                                }}
                                                whileHover={{
                                                    x: 6,
                                                    backgroundColor: "rgba(168,85,247,0.1)",
                                                    borderColor: "rgba(168,85,247,0.6)"
                                                }}
                                            >
                                                {/* Animated background pulse */}
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0"
                                                    animate={{
                                                        opacity: [0, 0.5, 0],
                                                        x: ["-100%", "100%"]
                                                    }}
                                                    transition={{
                                                        duration: 3,
                                                        delay: i * 0.3,
                                                        repeat: Infinity,
                                                        ease: "linear"
                                                    }}
                                                />

                                                {/* Icon with continuous glow */}
                                                <motion.div
                                                    className="relative w-11 h-11 flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30 shrink-0"
                                                    animate={{
                                                        boxShadow: [
                                                            "0 0 10px rgba(168,85,247,0.2)",
                                                            "0 0 20px rgba(168,85,247,0.4)",
                                                            "0 0 10px rgba(168,85,247,0.2)",
                                                        ]
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        delay: i * 0.15,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    }}
                                                    whileHover={{
                                                        scale: 1.1,
                                                        rotate: 5
                                                    }}
                                                >
                                                    <motion.div
                                                        animate={{
                                                            rotate: [0, 5, 0, -5, 0]
                                                        }}
                                                        transition={{
                                                            duration: 4,
                                                            delay: i * 0.2,
                                                            repeat: Infinity,
                                                            ease: "easeInOut"
                                                        }}
                                                    >
                                                        <item.icon size={18} className="text-purple-500/80" />
                                                    </motion.div>
                                                </motion.div>

                                                <div className="flex-1 min-w-0">
                                                    <span className="  text-sm font-semibold uppercase tracking-wider text-black/80 group-hover/item:text-black transition-colors">
                                                        {item.label}
                                                    </span>
                                                    {/* Animated underline */}
                                                    <motion.div
                                                        className="h-px bg-gradient-to-r from-purple-500 via-purple-400 to-transparent mt-1"
                                                        initial={{ width: "0%" }}
                                                        animate={{
                                                            width: ["0%", "60%", "0%"],
                                                            opacity: [0.3, 1, 0.3]
                                                        }}
                                                        transition={{
                                                            duration: 3,
                                                            delay: i * 0.25,
                                                            repeat: Infinity,
                                                            ease: "easeInOut"
                                                        }}
                                                    />
                                                </div>

                                                {/* Pulsing status indicator */}
                                                <motion.div
                                                    className="w-1.5 h-1.5 bg-purple-500 shrink-0"
                                                    animate={{
                                                        opacity: [0.3, 1, 0.3],
                                                        scale: [0.8, 1.2, 0.8]
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        delay: i * 0.1,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    }}
                                                />
                                            </motion.li>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Gradient Masks */}
                                <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
                                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
                            </div>
                        </div>

                        <div className="mt-8 relative z-10 shrink-0">
                            <h3 className="text-3xl font-bold text-black mb-2 uppercase">Expertise on Demand</h3>
                            <p className="text-sm text-gray-600   leading-relaxed">
                                Access specialized engineering units instantly. From kernel-level optimization to frontend ballistics.
                            </p>
                        </div>
                    </div>

                    {/* Card 2: Top 1% - MARQUEE AVATARS */}
                    <div className="md:col-span-7 bg-white border border-black/10 relative overflow-hidden group min-h-[450px] flex flex-col items-center justify-end text-center">
                        {/* Scrolling Avatar Marquee - 6 Rows - TRUE INFINITE */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none py-4">
                            {[0, 1, 2, 3, 4, 5].map((rowIndex) => {
                                const isRightScroll = rowIndex % 2 === 0;
                                const avatarOffset = rowIndex * 10;

                                return (
                                    <motion.div
                                        key={`row-${rowIndex}`}
                                        className="flex gap-4"
                                        animate={{
                                            x: isRightScroll ? [0, "-33.333%"] : ["-33.333%", 0],
                                        }}
                                        transition={{
                                            duration: 80,
                                            repeat: Infinity,
                                            ease: "linear",
                                            repeatType: "loop",
                                        }}
                                    >
                                        {/* Triple the array for seamless infinite scroll */}
                                        {[...Array(3)].map((_, setIndex) => (
                                            <div key={`set-${setIndex}`} className="flex gap-4">
                                                {[...Array(20)].map((_, i) => (
                                                    <motion.div
                                                        key={`${rowIndex}-${setIndex}-${i}`}
                                                        className="w-20 h-20 rounded-full border-2 border-purple-500/30 overflow-hidden bg-black/5 backdrop-blur-sm shadow-[0_0_20px_rgba(168,85,247,0.2)] flex-shrink-0 pointer-events-auto"
                                                        whileHover={{
                                                            scale: 1.3,
                                                            borderColor: "rgba(168,85,247,1)",
                                                            boxShadow: "0 0 30px rgba(168,85,247,0.6)",
                                                            zIndex: 20,
                                                        }}
                                                    >
                                                        <img
                                                            src={`https://i.pravatar.cc/150?img=${((i + avatarOffset) % 70) + 1}`}
                                                            alt="Team member"
                                                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                                        />
                                                    </motion.div>
                                                ))}
                                            </div>
                                        ))}
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Gradient Fade - All Sides */}
                        <div className="absolute inset-0 pointer-events-none z-10">
                            {/* Top gradient */}
                            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent"></div>
                            {/* Bottom gradient */}
                            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
                            {/* Left gradient */}
                            <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent"></div>
                            {/* Right gradient */}
                            <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent"></div>
                        </div>

                        {/* Centered Content - Badge + Text Combined - COMPACT */}
                        <div className="absolute inset-0 flex items-center justify-center z-20 p-8">
                            <motion.div
                                className="relative max-w-xl w-full bg-white/95 backdrop-blur-xl border-2 border-purple-500/40 shadow-[0_0_40px_rgba(168,85,247,0.3)] p-6"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6 }}
                                animate={{
                                    boxShadow: [
                                        "0 0 30px rgba(168,85,247,0.2)",
                                        "0 0 50px rgba(168,85,247,0.4)",
                                        "0 0 30px rgba(168,85,247,0.2)",
                                    ]
                                }}
                            >

                                {/* Pulsing top line */}
                                <motion.div
                                    className="absolute top-0 left-0 right-0 h-0.5 bg-purple-500"
                                    animate={{
                                        opacity: [0.3, 1, 0.3],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />

                                <div className="flex flex-col items-center text-center gap-3">
                                    {/* 24/7 Badge - Compact */}
                                    <div className="flex items-center gap-2">
                                        <motion.div
                                            className="w-1.5 h-1.5 bg-purple-500"
                                            animate={{
                                                opacity: [1, 0.3, 1],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        />
                                        <span className="text-4xl font-black text-black ">24/7</span>
                                        <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Available</span>
                                    </div>

                                    {/* Divider */}
                                    <div className="w-16 h-px bg-purple-500/30"></div>

                                    {/* Main Text - Compact */}
                                    <motion.h3
                                        className="text-2xl md:text-3xl uppercase font-bold text-black leading-tight"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                    >
                                        Top 1% tier work – delivered at <span className="text-purple-500">lightning fast speed</span>
                                    </motion.h3>

                                    <motion.p
                                        className="text-xs text-gray-600   leading-relaxed"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.3 }}
                                    >
                                        Seamless integration. 24-48 hour delivery.
                                    </motion.p>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Card 3: 100% Creative Work (Dual Marquee) */}
                    <div className="md:col-span-7 bg-white border border-black/10 flex flex-col relative overflow-hidden group min-h-[450px]">

                        {/* Background Marquees (Grid Layout - Dense) */}
                        <div className="absolute inset-0 flex flex-col justify-center pointer-events-none select-none z-0 bg-white overflow-hidden">
                            {/* Background Marquees (Horizontal Scroll) */}
                            <div className="absolute inset-0 flex flex-col justify-center pointer-events-none select-none z-0 bg-white overflow-hidden">
                                {/* Row 1 */}
                                <div className="relative w-full h-24 flex items-center border-b border-black/[0.05]">
                                    <motion.div
                                        className="flex absolute"
                                        animate={{ x: [0, -1000] }}
                                        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
                                    >
                                        {Array(20).fill(0).map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="w-max px-16 h-[96px] flex items-center justify-center border-r border-black/[0.05] bg-white text-xl   whitespace-nowrap relative"
                                                animate={{
                                                    color: ["rgba(0,0,0,0.3)", "rgba(0,0,0,0.8)", "rgba(0,0,0,0.3)"],
                                                }}
                                                transition={{
                                                    duration: 3,
                                                    delay: i * 0.2,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            >
                                                {["Pure Design", "System Architecture", "Flow State", "Motion Physics", "WebGL Shaders", "Direct Engineering", "Rapid Prototyping", "High Velocity"][i % 8]}
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </div>

                                {/* Row 2 */}
                                <div className="relative w-full h-24 flex items-center border-b border-black/[0.05]">
                                    <motion.div
                                        className="flex absolute left-[-150px]"
                                        animate={{ x: [-1000, 0] }}
                                        transition={{ duration: 70, ease: "linear", repeat: Infinity }}
                                    >
                                        {Array(20).fill(0).map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="w-max px-16 h-[96px] flex items-center justify-center border-r border-black/[0.05] bg-white text-xl   whitespace-nowrap relative"
                                                animate={{
                                                    color: ["rgba(0,0,0,0.3)", "rgba(0,0,0,0.8)", "rgba(0,0,0,0.3)"],
                                                }}
                                                transition={{
                                                    duration: 3.5,
                                                    delay: i * 0.25,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            >
                                                {["Full Stack", "Micro-Interactions", "Performance First", "Clean Code", "Modern Stack", "Zero Legacy", "Pixel Perfect", "User Centric"][i % 8]}
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </div>

                                {/* Row 3 */}
                                <div className="relative w-full h-24 flex items-center border-b border-black/[0.05]">
                                    <motion.div
                                        className="flex absolute"
                                        animate={{ x: [0, -1000] }}
                                        transition={{ duration: 65, ease: "linear", repeat: Infinity }}
                                    >
                                        {Array(20).fill(0).map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="w-max px-16 h-[96px] flex items-center justify-center border-r border-black/[0.05] bg-white text-xl   whitespace-nowrap relative"
                                                animate={{
                                                    color: ["rgba(0,0,0,0.3)", "rgba(0,0,0,0.8)", "rgba(0,0,0,0.3)"],
                                                }}
                                                transition={{
                                                    duration: 3.2,
                                                    delay: i * 0.22,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            >
                                                {["Pure Design", "System Architecture", "Flow State", "Motion Physics", "WebGL Shaders", "Direct Engineering", "Rapid Prototyping", "High Velocity"][i % 8]}
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </div>

                                {/* Row 4 */}
                                <div className="relative w-full h-24 flex items-center border-b border-black/[0.05]">
                                    <motion.div
                                        className="flex absolute left-[-75px]"
                                        animate={{ x: [-1000, 0] }}
                                        transition={{ duration: 75, ease: "linear", repeat: Infinity }}
                                    >
                                        {Array(20).fill(0).map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="w-max px-16 h-[96px] flex items-center justify-center border-r border-black/[0.05] bg-white text-xl   whitespace-nowrap relative"
                                                animate={{
                                                    color: ["rgba(0,0,0,0.3)", "rgba(0,0,0,0.8)", "rgba(0,0,0,0.3)"],
                                                }}
                                                transition={{
                                                    duration: 3.8,
                                                    delay: i * 0.28,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            >
                                                {["Full Stack", "Micro-Interactions", "Performance First", "Clean Code", "Modern Stack", "Zero Legacy", "Pixel Perfect", "User Centric"][i % 8]}
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </div>

                                {/* Row 5 (Extra coverage) */}
                                <div className="relative w-full h-24 flex items-center">
                                    <motion.div
                                        className="flex absolute"
                                        animate={{ x: [0, -1000] }}
                                        transition={{ duration: 62, ease: "linear", repeat: Infinity }}
                                    >
                                        {Array(20).fill(0).map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="w-max px-16 h-[96px] flex items-center justify-center border-r border-black/[0.05] bg-white text-xl   whitespace-nowrap relative"
                                                animate={{
                                                    color: ["rgba(0,0,0,0.3)", "rgba(0,0,0,0.8)", "rgba(0,0,0,0.3)"],
                                                }}
                                                transition={{
                                                    duration: 3.3,
                                                    delay: i * 0.23,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            >
                                                {["Pure Design", "System Architecture", "Flow State", "Motion Physics", "WebGL Shaders", "Direct Engineering", "Rapid Prototyping", "High Velocity"][i % 8]}
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        {/* Diagonal Overlay - Steeper & Darker */}
                        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_48%,#F9FAFB_48%)] z-10" />
                        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_48%,rgba(14, 255, 103, 0.05)_48%)] z-10" />

                        {/* Content */}
                        <div className="relative z-20 pl-[48%] pr-12 py-8 text-right flex flex-col justify-center h-full">
                            <motion.h3
                                className="text-7xl md:text-8xl font-bold  mb-2 drop-shadow-2xl bg-clip-text text-transparent bg-gradient-to-b from-black to-black/60"

                            >
                                100%
                            </motion.h3>
                            <motion.div
                                className="flex justify-end gap-2 mb-6"
                                initial="initial"
                                animate="animate"
                            >
                                {["C", "r", "e", "a", "t", "i", "v", "e", " ", "W", "o", "r", "k"].map((char, i) => (
                                    <motion.span
                                        key={i}
                                        className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-purple-500 inline-block drop-shadow-lg"
                                        variants={{
                                            initial: { opacity: 1 },
                                            animate: {
                                                color: ["#a855f7", "#d8b4fe", "#a855f7"],
                                                textShadow: [
                                                    "0 0 10px rgba(168,85,247,0.3)",
                                                    "0 0 20px rgba(168,85,247,0.6)",
                                                    "0 0 10px rgba(168,85,247,0.3)"
                                                ]
                                            }
                                        }}
                                        transition={{
                                            duration: 2,
                                            delay: i * 0.1,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        {char === " " ? "\u00A0" : char}
                                    </motion.span>
                                ))}
                            </motion.div>
                            <p className="  text-xs text-black/60 leading-relaxed max-w-[240px] ml-auto">
                                No time wasted in contracts and boring on-boardings. Straight to your work.
                            </p>
                        </div>
                    </div>

                    {/* Card 4: Comparison (Velocity) - Bottom Right */}
                    <div className="md:col-span-5 bg-white border border-black/10 p-8 flex flex-col justify-center relative group min-h-[450px]">
                        <div className="flex flex-col justify-center h-full max-w-[85%] mx-auto w-full">
                            {/* Slider Section */}
                            <div className="mb-16 relative">
                                <div className="flex justify-between text-sm md:text-base mb-6  ">
                                    <span className="text-black">With us</span>
                                    <span className="text-black/30">Regular hours</span>
                                </div>

                                {/* Timeline Track */}
                                <div className="relative w-full h-16 bg-gray-50 border border-black/10 rounded-full flex items-center shadow-inner overflow-visible">
                                    {/* Active Potion (Left) */}
                                    <div className="absolute left-2 top-2 bottom-2 w-[25%] bg-purple-500/10 rounded-l-full border border-purple-500/20" />

                                    {/* Marker 1 (48h) */}
                                    <div className="absolute left-[25%] top-[-10px] bottom-[-10px] w-px border-l-2 border-dashed border-purple-500 z-10">
                                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-purple-500 font-bold   text-xl">2w</div>
                                    </div>

                                    {/* Marker 2 (2w) */}
                                    <div className="absolute right-[25%] top-[-10px] bottom-[-10px] w-px border-l-2 border-dashed border-black/10 z-10">
                                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-black/30 font-bold   text-xl">3M</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 text-center md:text-left">
                                <h3 className="text-3xl md:text-4xl font-bold text-black mb-4 uppercase">We launch fast!</h3>
                                <p className="text-sm text-gray-600   leading-relaxed">
                                    We don't just build websites. We create digital platforms engineered to turn your traffic into customers and grow your bottom line.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Banner */}
                <div className="mt-6 bg-white border border-black/10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-purple-500/50 transition-colors">
                    <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-black uppercase  mb-2">
                            Ready for system upgrade?
                        </h3>
                        <p className="text-gray-600   text-sm">
                            Limited intake slots available for Q3. Secure your allocation.
                        </p>
                    </div>
                    <div>
                        <Button text="Start Sequence" href="#contact" />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default BenefitsSection;
