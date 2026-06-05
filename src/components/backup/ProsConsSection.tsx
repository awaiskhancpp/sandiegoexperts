'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, AlertTriangle, Zap, TrendingDown, TrendingUp, Shield, Users, Clock } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';

const COMPARISONS = [
    {
        category: "Communication",
        them: {
            title: "The Runaround",
            points: [
                "Multiple layers between you and your developer",
                "Wait days for simple feedback",
                "Messages get lost in translation",
                "Never talk to who's actually building it"
            ],
            stat: "3 days",
            statLabel: "typical wait",
            icon: AlertTriangle,
        },
        us: {
            title: "Direct Access",
            points: [
                "Talk directly to your developer",
                "Get answers in hours, not days",
                "Make changes on the same call",
                "No middlemen slowing you down"
            ],
            stat: "2 hours",
            statLabel: "typical wait",
            icon: Zap,
        }
    },
    {
        category: "Your Budget",
        them: {
            title: "Hidden Costs",
            points: [
                "Most of your money goes to overhead",
                "Fancy offices and sales teams",
                "Account managers who don't build anything",
                "You're funding their business, not yours"
            ],
            stat: "30%",
            statLabel: "goes to development",
            icon: TrendingDown,
        },
        us: {
            title: "Full Value",
            points: [
                "100% goes to building your product",
                "No sales team or fancy offices",
                "Small, efficient team structure",
                "Every dollar makes real progress"
            ],
            stat: "100%",
            statLabel: "goes to development",
            icon: TrendingUp,
        }
    },
    {
        category: "Who's Building It",
        them: {
            title: "Mystery Team",
            points: [
                "Outsourced to the cheapest option",
                "Junior developers learning as they go",
                "Never know who's actually coding",
                "Offshore teams in different timezones"
            ],
            stat: "Unknown",
            statLabel: "experience level",
            icon: Users,
        },
        us: {
            title: "Expert Team",
            points: [
                "Small team of senior developers",
                "5+ years of real experience",
                "Same people from start to finish",
                "Based in San Diego, your timezone"
            ],
            stat: "Senior",
            statLabel: "experience level",
            icon: Shield,
        }
    },
    {
        category: "Time to Launch",
        them: {
            title: "Endless Delays",
            points: [
                "Weeks just to get a proposal",
                "Approval needed for every tiny change",
                "Endless meetings about meetings",
                "Finally launch in 4-6 months"
            ],
            stat: "6 months",
            statLabel: "to launch",
            icon: Clock,
        },
        us: {
            title: "Move Fast",
            points: [
                "Start building the same week",
                "No endless approval chains",
                "See progress daily, deploy weekly",
                "Launch in 4-6 weeks"
            ],
            stat: "6 weeks",
            statLabel: "to launch",
            icon: Zap,
        }
    }
];

const ProsConsSection = () => {
    return (
        <section className="w-full bg-white py-32 px-6 relative border-t border-black/5 overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px)] bg-[size:40px_40px] opacity-10 pointer-events-none" />

            <div className="max-w-[1400px] mx-auto relative z-10">
                <SectionHeading
                    tag="Reality Check"
                    title="Agencies"
                    highlight="vs. Us"
                />

                {/* Comparison Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {COMPARISONS.map((comparison, idx) => (
                        <ComparisonCard key={idx} comparison={comparison} index={idx} />
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 bg-white border border-black/10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-purple-500/50 transition-colors relative overflow-hidden shadow-sm"
                >
                    {/* Animated background sweep */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100"
                        animate={{
                            x: ["-100%", "100%"]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />

                    <div className="relative z-10">
                        <h3 className="text-2xl md:text-3xl font-bold text-black uppercase mb-2">
                            Cut out the middleman
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Save up to 70% by working directly with senior developers.
                        </p>
                    </div>
                    <motion.div
                        className="flex items-center gap-3 relative z-10"
                        animate={{
                            scale: [1, 1.05, 1]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <span className="text-5xl font-bold text-purple-500">70%</span>
                        <span className="text-sm text-gray-500">savings</span>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

const ComparisonCard = ({ comparison, index }: { comparison: any; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border border-black/10 p-8 md:p-10 relative group overflow-hidden min-h-[400px] flex flex-col shadow-sm"
        >

            {/* Animated background pulse */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-red-500/5 opacity-0"
                animate={{
                    opacity: [0, 0.3, 0]
                }}
                transition={{
                    duration: 4,
                    delay: index * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Category Badge with pulsing dot */}
            <div className="flex items-center gap-2 mb-6 text-purple-500/50 text-xs uppercase tracking-widest relative z-10">
                <motion.div
                    className="w-1.5 h-1.5 bg-purple-500"
                    animate={{
                        opacity: [0.3, 1, 0.3],
                        scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                {comparison.category}
            </div>

            {/* THEM Side */}
            <div className="mb-8 pb-8 border-b border-black/5 relative z-10">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <motion.div
                            className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-red-500/20 to-red-500/5 border border-red-500/30"
                            animate={{
                                boxShadow: [
                                    "0 0 10px rgba(239,68,68,0.2)",
                                    "0 0 20px rgba(239,68,68,0.4)",
                                    "0 0 10px rgba(239,68,68,0.2)",
                                ]
                            }}
                            transition={{
                                duration: 2,
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
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <comparison.them.icon className="text-red-500/80" size={18} />
                            </motion.div>
                        </motion.div>
                        <div>
                            <span className="text-xs text-red-500/60 block mb-1">Typical Agency</span>
                            <h3 className="text-xl font-bold text-black/90">{comparison.them.title}</h3>
                        </div>
                    </div>
                    <div className="text-right">
                        <motion.div
                            className="text-2xl font-bold text-red-500"
                            animate={{
                                color: ["#ef4444", "#dc2626", "#ef4444"]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            {comparison.them.stat}
                        </motion.div>
                        <div className="text-xs text-red-500/60">{comparison.them.statLabel}</div>
                    </div>
                </div>

                <ul className="space-y-2">
                    {comparison.them.points.map((point: string, i: number) => (
                        <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 + i * 0.05 }}
                            className="flex items-start gap-2 text-sm text-gray-600 relative group/item"
                            whileHover={{
                                x: 3,
                                backgroundColor: "rgba(239,68,68,0.05)"
                            }}
                        >
                            <motion.div
                                animate={{
                                    rotate: [0, 90, 0]
                                }}
                                transition={{
                                    duration: 3,
                                    delay: i * 0.2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <X className="text-red-500/60 flex-shrink-0 mt-0.5" size={14} />
                            </motion.div>
                            <span>{point}</span>
                        </motion.li>
                    ))}
                </ul>
            </div>

            {/* US Side */}
            <div className="flex-grow relative z-10">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <motion.div
                            className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30"
                            animate={{
                                boxShadow: [
                                    "0 0 10px rgba(168,85,247,0.2)",
                                    "0 0 20px rgba(168,85,247,0.4)",
                                    "0 0 10px rgba(168,85,247,0.2)",
                                ]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            whileHover={{
                                scale: 1.1,
                                rotate: -5
                            }}
                        >
                            <motion.div
                                animate={{
                                    rotate: [0, -5, 0, 5, 0]
                                }}
                                transition={{
                                    duration: 4,
                                    delay: 0.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <comparison.us.icon className="text-purple-500/80" size={18} />
                            </motion.div>
                        </motion.div>
                        <div>
                            <span className="text-xs text-purple-500/60 block mb-1">Working With Us</span>
                            <h3 className="text-xl font-bold text-black">{comparison.us.title}</h3>
                        </div>
                    </div>
                    <div className="text-right">
                        <motion.div
                            className="text-2xl font-bold text-purple-500"
                            animate={{
                                color: ["#a855f7", "#c084fc", "#a855f7"]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            {comparison.us.stat}
                        </motion.div>
                        <div className="text-xs text-purple-500/60">{comparison.us.statLabel}</div>
                    </div>
                </div>

                <ul className="space-y-2">
                    {comparison.us.points.map((point: string, i: number) => (
                        <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 + i * 0.05 }}
                            className="flex items-start gap-2 text-sm text-gray-700 relative group/item"
                            whileHover={{
                                x: 3,
                                backgroundColor: "rgba(168,85,247,0.05)"
                            }}
                        >
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1]
                                }}
                                transition={{
                                    duration: 2,
                                    delay: i * 0.2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <Check className="text-purple-500 flex-shrink-0 mt-0.5" size={14} />
                            </motion.div>
                            <span>{point}</span>

                            {/* Animated underline on hover */}
                            <motion.div
                                className="absolute bottom-0 left-6 right-0 h-px bg-gradient-to-r from-purple-500 via-purple-400 to-transparent"
                                initial={{ width: "0%" }}
                                whileHover={{ width: "60%" }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.li>
                    ))}
                </ul>
            </div>

            {/* Bottom gradient line with animation */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-red-500/30 via-transparent to-purple-500/30"
                animate={{
                    opacity: [0.3, 1, 0.3]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </motion.div>
    );
};

export default ProsConsSection;
