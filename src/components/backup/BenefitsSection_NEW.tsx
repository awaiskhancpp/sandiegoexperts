'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Server, Shield, Clock, MousePointer2, Terminal, Code2, Cpu, User } from 'lucide-react';

export default function BenefitsSection() {
    return (
        <section className="relative bg-white py-20 md:py-32 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.015] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.div
                        className="inline-block mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-green-500   text-sm uppercase tracking-[0.3em] border border-green-500/20 px-4 py-2 bg-green-500/5">
                            Why Choose Us
                        </span>
                    </motion.div>
                    <motion.h2
                        className="text-4xl md:text-6xl font-black text-black mb-6 leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Engineered for <span className="text-green-500">Dominance</span>
                    </motion.h2>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Card 1: Expertise on Demand */}
                    <div className="md:col-span-5 bg-white border border-black/10 p-8 md:p-10 relative overflow-hidden group min-h-[450px] flex flex-col justify-between shadow-sm">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-green-500/10 via-transparent to-transparent opacity-50" />

                        {/* Floating Icons */}
                        <div className="absolute inset-0 pointer-events-none">
                            {[Terminal, Code2, Server].map((Icon, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute"
                                    style={{
                                        left: `${20 + i * 30}%`,
                                        top: `${15 + i * 20}%`,
                                    }}
                                    animate={{
                                        y: [0, -20, 0],
                                        opacity: [0.1, 0.2, 0.1],
                                    }}
                                    transition={{
                                        duration: 4 + i,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <Icon size={40} className="text-green-500" />
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-8 relative z-10 shrink-0">
                            <h3 className="text-3xl font-bold text-black mb-2">Expertise on Demand</h3>
                            <p className="text-sm text-gray-600   leading-relaxed">
                                Access specialized engineering units instantly. From kernel-level optimization to frontend ballistics.
                            </p>
                        </div>
                    </div>

                    {/* Card 2: Top 1% - ORBITAL DESIGN */}
                    <div className="md:col-span-7 bg-white border border-black/10 p-8 md:p-10 relative overflow-hidden group min-h-[450px] flex flex-col items-center justify-end text-center shadow-sm">
                        {/* Orbital Avatar System */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            {/* Orbit Rings */}
                            {[200, 280, 360].map((radius, ringIndex) => (
                                <motion.div
                                    key={`ring-${ringIndex}`}
                                    className="absolute border border-black/5 rounded-full"
                                    style={{
                                        width: radius,
                                        height: radius,
                                    }}
                                    animate={{
                                        rotate: ringIndex % 2 === 0 ? 360 : -360,
                                        scale: [1, 1.05, 1],
                                    }}
                                    transition={{
                                        rotate: {
                                            duration: 30 + (ringIndex * 10),
                                            repeat: Infinity,
                                            ease: "linear"
                                        },
                                        scale: {
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }
                                    }}
                                />
                            ))}

                            {/* Orbiting Avatars */}
                            {Array(12).fill(0).map((_, i) => {
                                const angle = (i / 12) * Math.PI * 2;
                                const orbitRadius = 150 + (i % 3) * 70;
                                const x = Math.cos(angle) * orbitRadius;
                                const y = Math.sin(angle) * orbitRadius;

                                return (
                                    <motion.div
                                        key={i}
                                        className="absolute w-20 h-20"
                                        style={{
                                            left: '50%',
                                            top: '50%',
                                        }}
                                        animate={{
                                            x: [x, x * 1.1, x],
                                            y: [y, y * 1.1, y],
                                            rotate: [0, 360],
                                        }}
                                        transition={{
                                            duration: 20 + (i * 2),
                                            repeat: Infinity,
                                            ease: "linear",
                                            delay: i * 0.5,
                                        }}
                                        whileHover={{
                                            scale: 1.5,
                                            zIndex: 20,
                                            transition: { duration: 0.3 }
                                        }}
                                    >
                                        <motion.div
                                            className="w-full h-full rounded-full border-2 border-green-500/30 overflow-hidden bg-white/40 backdrop-blur-sm shadow-[0_0_20px_rgba(34,197,94,0.2)]"
                                            whileHover={{
                                                borderColor: "rgba(34,197,94,1)",
                                                boxShadow: "0 0 30px rgba(34,197,94,0.6)",
                                            }}
                                        >
                                            <img
                                                src={`https://i.pravatar.cc/150?img=${(i % 70) + 1}`}
                                                alt="Team member"
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                            />
                                        </motion.div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Gradient Fade */}
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent z-0" />

                        {/* Enhanced 24/7 Badge */}
                        <motion.div
                            className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                            whileHover={{ scale: 1.15 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Rotating Ring */}
                            <motion.div
                                className="absolute inset-0 w-48 h-48 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            >
                                <div className="w-full h-full rounded-full border-2 border-dashed border-green-500/30" />
                            </motion.div>

                            {/* Main Badge */}
                            <motion.div
                                className="relative w-40 h-40 bg-gradient-to-br from-green-500 via-green-600 to-emerald-700 rounded-full flex items-center justify-center border-[6px] border-white shadow-[0_0_60px_rgba(34,197,94,0.4)]"
                                animate={{
                                    boxShadow: [
                                        "0 0 60px rgba(34,197,94,0.4)",
                                        "0 0 100px rgba(34,197,94,0.8)",
                                        "0 0 60px rgba(34,197,94,0.4)",
                                    ]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                {/* Decorative dots */}
                                <motion.div
                                    className="absolute -top-2 left-[35%] w-5 h-5 bg-green-400 rounded-full shadow-lg"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                                <motion.div
                                    className="absolute -top-2 right-[35%] w-5 h-5 bg-green-400 rounded-full shadow-lg"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
                                />

                                <span className="text-5xl md:text-6xl font-black italic text-white  drop-shadow-2xl">24/7</span>
                            </motion.div>
                        </motion.div>

                        {/* Content */}
                        <div className="relative z-10 mt-auto max-w-2xl">
                            <motion.h3
                                className="text-3xl md:text-4xl font-bold text-black mb-4 leading-tight"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                Top 1% tier work – delivered <br className="hidden md:block" />at <span className="text-green-500">lightning fast speed</span>
                            </motion.h3>
                            <motion.p
                                className="text-sm text-gray-600   leading-relaxed max-w-lg mx-auto"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                Think of us as an extension of your team. Our seamless integration process delivers your request within 24-48 hours.
                            </motion.p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
