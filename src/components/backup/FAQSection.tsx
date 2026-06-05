'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
    {
        id: "01",
        q: "What is the typical deployment timeline?",
        a: "We move fast. Standard builds take 2-4 weeks. For urgent campaigns, our 'Velocity Track' can deliver a core MVP in as little as 7 days."
    },
    {
        id: "02",
        q: "Do you offer post-launch support?",
        a: "Absolutely. We don't just launch and leave. We offer continuous engineering support, performance monitoring, and iterative feature updates."
    },
    {
        id: "03",
        q: "Can you modernize our existing codebase?",
        a: "Yes. Refactoring is one of our specialties. We can migrate legacy systems to Next.js, often improving performance metrics by 300% or more."
    },
    {
        id: "04",
        q: "Why shouldn't I just hire a freelancer?",
        a: "Freelancers are single points of failure. If they get sick or ghost, your business stops. We are a dedicated team with redundant systems and guaranteed uptime."
    },
    {
        id: "05",
        q: "How do you handle hosting and security?",
        a: "We deploy on resilient edge networks (Vercel/AWS) with global CDN caching. Security is baked in: SSL, DDoS protection, and automated backups are standard."
    }
];

import SectionHeading from './ui/SectionHeading';

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="w-full bg-white py-32 px-6 relative border-t border-black/5" id="faq">
            <div className="max-w-[1000px] mx-auto">
                <SectionHeading
                    tag="System Knowledge"
                    title="Common"
                    highlight="Queries"
                />

                <div className="divide-y divide-black/10 border-t border-b border-black/10">
                    {FAQS.map((faq, i) => (
                        <div key={i} className="group border-b border-black/5 last:border-none">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full py-10 flex items-start justify-between text-left focus:outline-none group-hover:bg-black/[0.02] transition-colors px-4 md:px-6"
                            >
                                <div className="flex items-baseline gap-6 md:gap-8">
                                    <span className={`  text-sm transition-colors ${openIndex === i ? 'text-purple-500' : 'text-black/30 group-hover:text-purple-500'}`}>
                                        {faq.id}
                                    </span>
                                    <h3 className={`text-xl md:text-2xl font-medium transition-colors duration-300 ${openIndex === i ? 'text-black' : 'text-black/70 group-hover:text-black'}`}>
                                        {faq.q}
                                    </h3>
                                </div>
                                <div className={`ml-4 flex items-center justify-center w-8 h-8 relative transition-all duration-300`}>
                                    <div className={`absolute inset-0 bg-purple-500/20 transition-all duration-300 ${openIndex === i ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />
                                    <Plus
                                        size={18}
                                        className={`transition-all duration-300 ${openIndex === i ? 'rotate-45 text-purple-500' : 'text-black/30 group-hover:text-black'}`}
                                    />
                                </div>
                            </button>

                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                                    >
                                        <div className="pl-[calc(2rem+1rem)] md:pl-[calc(3rem+2rem)] pr-6 pb-10 px-4 md:px-6">
                                            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl border-l-2 border-purple-500/30 pl-6">
                                                {faq.a}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
