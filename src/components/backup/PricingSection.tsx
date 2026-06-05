'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';
import { Check, Shield, Zap } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';

const PLANS = [
    {
        name: "Starter",
        price: "$2,495",
        period: "ONE TIME",
        description: "High-performance landing page designed for conversion.",
        features: ["Next.js Architecture", "CMS Integration", "SEO Optimization", "Mobile Responsive", "5 Days Support"],
        highlight: false,
        icon: Shield,
    },
    {
        name: "Business",
        price: "$4,995",
        period: "ONE TIME",
        description: "Complete multi-page website with advanced functionality.",
        features: ["Everything in Starter", "Custom Animations", "Blog/Resource Center", "Analytics Setup", "30 Days Support"],
        highlight: true,
        popular: true,
        icon: Zap,
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "PROJECT",
        description: "Complex web applications and large-scale digital platforms.",
        features: ["Full-Stack Application", "Database Architecture", "User Authentication", "API Integrations", "Priority 24/7 Support"],
        highlight: false,
        icon: Shield,
    }
];

const PricingSection = () => {
    return (
        <section className="w-full bg-white py-32 px-6 relative border-t border-black/5 overflow-hidden" id="pricing">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px)] bg-[size:60px_60px] opacity-20 pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:60px_60px] opacity-20 pointer-events-none" />

            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto relative z-10">
                <SectionHeading
                    tag="Packages"
                    title="Simple"
                    highlight="Pricing"
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mt-20 items-stretch">
                    {PLANS.map((plan, i) => (
                        <PricingCard key={i} plan={plan} />
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <p className="text-gray-600 text-sm   uppercase tracking-widest">
                        Scalable Architecture for Future Growth
                    </p>
                </div>
            </div>
        </section>
    );
};

const PricingCard = ({ plan }: { plan: any }) => {
    const isHighlight = plan.highlight;

    return (
        <div className={`
            group relative bg-white border p-10 md:p-14 flex flex-col transition-all duration-500 overflow-visible h-full
            ${isHighlight
                ? 'border-purple-500/30 bg-purple-500/5'
                : 'border-black/10 hover:border-purple-500/30 hover:bg-purple-500/5'
            }
        `}>

            {/* Most Selling Badge */}
            {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-max">
                    <div className="bg-purple-600 text-white text-[10px]   font-bold uppercase tracking-widest py-1 px-4 border border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                        Most Popular
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="relative z-10 mb-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className={`
                        p-2 border
                        ${isHighlight ? 'border-purple-500 bg-purple-500/10 text-purple-400' : 'border-black/10 bg-black/5 text-black/60'}
                    `}>
                        <plan.icon size={20} />
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-black mb-2 tracking-wide uppercase">{plan.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 h-12  ">{plan.description}</p>

                <div className="flex items-baseline gap-2">
                    <span className="text-4xl lg:text-5xl font-bold text-black uppercase">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-xs text-gray-500  uppercase">{plan.period}</span>}
                </div>
            </div>

            {/* Feature List */}
            <ul className="space-y-4 mb-10 relative z-10 flex-grow">
                {plan.features.map((feat: string, j: number) => (
                    <li key={j} className="flex items-start gap-3 group/item">
                        <Check size={14} className={`mt-1 ${isHighlight ? 'text-purple-500' : 'text-gray-600 group-hover:text-purple-500'} transition-colors`} />
                        <span className="text-gray-600 text-sm group-hover/item:text-gray-800 transition-colors  ">{feat}</span>
                    </li>
                ))}
            </ul>

            {/* Action Button */}
            <div className="relative z-10 mt-auto">
                <Button
                    text={isHighlight ? "Start Growth" : "Get Started"}
                    href="#contact"
                    className={`w-full justify-center ${isHighlight ? '!bg-purple-600 !border-purple-600 hover:!bg-purple-700 !text-white' : '!bg-transparent !border-black/20 hover:!border-purple-500 !text-black'}`}
                />
            </div>
        </div>
    );
};

export default PricingSection;
