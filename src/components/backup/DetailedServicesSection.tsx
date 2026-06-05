'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Globe, Smartphone, Search, Zap, Database } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';

const SERVICES = [
    {
        id: "01",
        title: "Web Design",
        description: "Strategic UI/UX systems designed for conversion. We don't just make it pretty; we make it perform.",
        icon: Layout,
        spec: "UI/UX SYSTEMS"
    },
    {
        id: "02",
        title: "Web Development",
        description: "Enterprise-grade engineering. Secure, scalable, and built on modern stacks that freelancers can't support.",
        icon: Globe,
        spec: "REACT CORE"
    },
    {
        id: "03",
        title: "Mobile Systems",
        description: "Native-quality mobile experiences. Extending your digital footprint to every device seamlessly.",
        icon: Smartphone,
        spec: "NATIVE BRIDGE"
    },
    {
        id: "04",
        title: "SEO Dynamics",
        description: "Technical SEO baked into the code. We build structures that search engines love effectively.",
        icon: Search,
        spec: "GROWTH ALGO"
    },
    {
        id: "05",
        title: "Speed Architecture",
        description: "Obsessive performance optimization. Sub-second load times that keep bounce rates near zero.",
        icon: Zap,
        spec: "TURBO MODE"
    },
    {
        id: "06",
        title: "Custom Infrastructure",
        description: "Beyond templates. We build custom dashboards, APIs, and tools tailored to your specific operations.",
        icon: Database,
        spec: "CUSTOM INFRA"
    }
];

const DetailedServicesSection = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    useEffect(() => {
        // Mobile Auto-Play Logic
        const handleResize = () => {
            if (window.innerWidth < 768) { // md breakpoint
                // Start with first one if none active
                if (activeIndex === null) setActiveIndex(0);
            } else {
                // Determine if we should clear on desktop resize, usually fine to leaving it or clearing
                setActiveIndex(null); // Clear auto-play when switching to desktop
            }
        };

        // Initial check
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 768) {
                setActiveIndex(0);
            }
        }

        // Set up interval for mobile rotation
        const interval = setInterval(() => {
            if (window.innerWidth < 768) {
                setActiveIndex(prev => {
                    const current = prev !== null ? prev : -1;
                    // Random-ish but ensure no repeat if possible, or just sequential?
                    // User asked "randomly start animtion one service then on toher"
                    // Let's do random for more dynamic feel
                    let next = Math.floor(Math.random() * SERVICES.length);
                    while (next === current && SERVICES.length > 1) {
                        next = Math.floor(Math.random() * SERVICES.length);
                    }
                    return next;
                });
            }
        }, 3000); // Change every 3 seconds

        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <section className="w-full bg-white py-40 px-6 relative border-t border-black/5" id="services">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

            <div className="max-w-[1400px] mx-auto relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="  text-xs text-black/50 uppercase tracking-widest border border-black/10 px-3 py-1 rounded-full">
                                System Capabilities
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-grotesk font-bold text-black uppercase  leading-none">
                            Our Core <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-black to-black/30">Services</span>
                        </h2>
                    </div>
                    <div className="max-w-md text-right md:text-right">
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed  ">
                            These aren't just services—they're solutions to problems costing you money right now. Slow websites losing customers. Poor mobile experience driving away sales. Invisible on Google. Generic tools that don't fit your workflow. We fix what's broken and build what's missing.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                    {SERVICES.map((service, i) => (
                        <ServiceCard
                            key={i}
                            service={service}
                            index={i}
                            isActive={activeIndex === i}
                            onHover={(active) => {
                                // Only allow hover interaction to set state if we are likely on desktop (width > 768)
                                // or if we want hover to interrupt auto-play
                                if (window.innerWidth >= 768) {
                                    setActiveIndex(active ? i : null);
                                }
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const ServiceCard = ({ service, index, isActive, onHover }: { service: any, index: number, isActive: boolean, onHover: (active: boolean) => void }) => {

    return (
        <div
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
            className={`group relative h-[320px] bg-white border p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 ${isActive ? 'border-purple-500 shadow-[inset_0_0_30px_rgba(168,85,247,0.1)]' : 'border-black/10'}`}
        >
            {/* Active/Hover Gradient Overlay - "Inside Faded" */}
            <div className={`absolute inset-0 bg-gradient-to-b from-purple-500/10 via-purple-500/5 to-transparent transition-opacity duration-500 pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0'}`} />
            {/* 1. Grid Reveal */}
            <div className={`absolute inset-0 bg-[linear-gradient(to_right,#8b5cf610_1px,transparent_1px)] bg-[size:20px_20px] transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
            <div className={`absolute inset-0 bg-[linear-gradient(to_bottom,#8b5cf610_1px,transparent_1px)] bg-[size:20px_20px] transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} />



            {/* Header */}
            <div className="flex justify-between items-start relative z-10">
                <div className={`p-3 rounded-lg border transition-all duration-300 ${isActive ? 'bg-purple-500/20 border-purple-500/50 text-purple-300' : 'bg-black/5 border-black/10 text-black/40'}`}>
                    <service.icon size={24} />
                </div>
                <div className="flex flex-col items-end">
                    <span className="  text-xs text-black/30">0{index + 1}</span>

                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 mt-auto">
                <div className="overflow-hidden mb-3">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: isActive ? 0 : 20, opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <span className="text-[10px]   text-purple-400 uppercase tracking-widest bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">
                            {service.spec}
                        </span>
                    </motion.div>
                </div>

                <h3 className={`text-3xl font-bold mb-4 uppercase transition-all duration-300 ${isActive ? 'text-black translate-x-2' : 'text-gray-700'}`}>
                    {service.title}
                </h3>
                <p className={`text-sm leading-relaxed max-w-[90%] transition-colors duration-300 ${isActive ? 'text-gray-700' : 'text-gray-500'}`}>
                    {service.description}
                </p>
            </div>


        </div>
    );
};

export default DetailedServicesSection;
