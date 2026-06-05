'use client';

import React from 'react';
import Link from 'next/link';

const Header = () => {
    return (
        <header className="fixed top-0 left-0 w-full z-[1000] px-6 py-4 mix-blend-difference text-white transition-all duration-300">
            <div className="max-w-[1400px] mx-auto flex justify-between items-center">

                {/* Logo */}
                <Link href="/" className="z-50 mix-blend-difference block">
                    <img src="/logo-new.png" alt="SDWE Logo" className="w-auto h-[60px] invert" />
                </Link>

                {/* WhatsApp Button */}
                <a
                    href="https://wa.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 px-6 py-2.5 border border-purple-500/30 bg-purple-500/5 backdrop-blur-md text-sm font-bold uppercase tracking-widest text-purple-400 hover:bg-purple-500 hover:text-white hover:border-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                    </span>
                    <span>Contact us on WhatsApp</span>
                </a>
            </div>
        </header>
    );
};

export default Header;
