'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Loader2 } from 'lucide-react';

interface ButtonProps {
    text: string;
    href?: string;
    className?: string;
    isLoading?: boolean;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    text,
    href,
    className = '',
    isLoading = false,
    type = 'button',
    onClick,
    disabled
}) => {
    const isExternal = href?.startsWith('http');

    const content = (
        <div className={`
            group relative overflow-hidden bg-black text-white font-bold uppercase tracking-widest py-4 px-8 
            flex items-center justify-center gap-4 transition-all duration-300
            hover:bg-purple-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
        `}>
            {isLoading ? (
                <span className="flex items-center gap-4">
                    <Loader2 className="animate-spin" size={18} />
                    Processing...
                </span>
            ) : (
                <>
                    <span className="relative z-10">{text}</span>
                    <ArrowUpRight size={18} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </>
            )}
        </div>
    );

    if (href) {
        if (isExternal) {
            return (
                <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block w-full sm:w-auto">
                    {content}
                </a>
            );
        }
        return (
            <Link href={href} className="inline-block w-full sm:w-auto">
                {content}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className="inline-block w-full sm:w-auto"
        >
            {content}
        </button>
    );
};

export default Button;
