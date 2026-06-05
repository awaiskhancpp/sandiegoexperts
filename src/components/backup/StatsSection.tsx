'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { Rocket, Trophy, TrendingUp, Clock } from 'lucide-react';

// Counter Component
const Counter = ({ value, duration = 2 }: { value: string; duration?: number }) => {
    const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
    const suffix = value.replace(/[0-9$]/g, '');
    const prefix = value.startsWith('$') ? '$' : '';

    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, numericValue, { duration: duration, ease: "easeOut" });
            return controls.stop;
        }
    }, [count, numericValue, duration, isInView]);

    return (
        <span ref={ref} className="flex items-baseline">
            {prefix}
            <motion.span>{rounded}</motion.span>
            {suffix}
        </span>
    );
};

const STATS = [
    {
        label: "Projects Launched",
        value: "50+",
        description: "Successful digital products shipped",
        hoverBorder: "group-hover:border-orange-500",
        icon: Rocket
    },
    {
        label: "Revenue Generated",
        value: "$100M+",
        description: "For our partner clients globally",
        hoverBorder: "group-hover:border-emerald-500",
        icon: Trophy
    },
    {
        label: "Conversion Lift",
        value: "30%",
        description: "Average increase in user engagement",
        hoverBorder: "group-hover:border-rose-500",
        icon: TrendingUp
    },
    {
        label: "On-Time Delivery",
        value: "100%",
        description: "We respect deadlines, period",
        hoverBorder: "group-hover:border-amber-500",
        icon: Clock
    },
];

const StatsSection = () => {
    return (
        <section className="w-full bg-white py-8 border-b border-black/5 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear_gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {STATS.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className={`group relative bg-white ${stat.hoverBorder} rounded-2xl p-8 flex flex-col items-center text-center overflow-hidden h-full transition-all duration-300`}
                        >
                            {/* Icon */}
                            <div className="mb-6 p-3 rounded-full bg-black/5 w-16 h-16 flex items-center justify-center mx-auto transition-transform duration-500 group-hover:scale-110">
                                <stat.icon size={28} className="text-black/70" />
                            </div>

                            <h3 className="text-5xl md:text-6xl font-bold text-black mb-3 flex justify-center">
                                <Counter value={stat.value} />
                            </h3>

                            <p className="text-black font-bold uppercase tracking-wider text-sm mb-3">{stat.label}</p>
                            <p className="text-gray-500 text-sm leading-relaxed max-w-[200px] mx-auto">{stat.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
