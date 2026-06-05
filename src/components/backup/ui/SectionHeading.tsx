import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
    tag: string;
    title: string;
    highlight?: string;
    align?: 'left' | 'center';
    className?: string;
}

const SectionHeading = ({ tag, title, highlight, align = 'center', className = '' }: SectionHeadingProps) => {
    return (
        <div className={`flex flex-col ${align === 'center' ? 'items-center text-center' : 'items-start text-left'} mb-24 md:mb-32 relative z-10 ${className}`}>
            {/* Tag */}
            <span className="  text-xs text-black/50 uppercase tracking-widest border border-black/10 px-3 py-1 rounded-full mb-6">
                {tag}
            </span>

            {/* Title */}
            <h2 className="text-5xl md:text-8xl font-grotesk font-bold text-black uppercase  leading-[0.9] max-w-5xl">
                {title} <br />
                {highlight && (
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-black to-black/30">
                        {highlight}
                    </span>
                )}
            </h2>
        </div>
    );
};

export default SectionHeading;
