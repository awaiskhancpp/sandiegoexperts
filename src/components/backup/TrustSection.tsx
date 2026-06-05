'use client';

import React from 'react';
import Image from 'next/image';

const LOGOS = [
    "/logos/logo (1).svg",
    "/logos/logo (2).svg",
    "/logos/logo (3).svg",
    "/logos/logo (4).svg",
    "/logos/logo (5).svg",
    "/logos/logo (6).svg",
    "/logos/logo (7).svg",
    "/logos/logo (8).svg",
    "/logos/logo (9).svg",
    "/logos/logo (10).svg",
    "/logos/logo (11).svg",
    "/logos/logo (12).svg",
];

const TrustSection = () => {
    return (
        <section className="w-full bg-white py-20 border-b border-black/5 relative overflow-hidden">

            {/* Text Header */}
            <div className="text-center mb-12 px-6">
                <p className="text-lg md:text-xl text-gray-600 font-light tracking-wide">
                    Over <span className="text-black font-bold">4,500+ brands</span> trust us with their web development.
                </p>
            </div>

            {/* Fades */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

            <div className="flex overflow-hidden relative group">
                {/* Track 1 */}
                <div
                    className="flex gap-4 md:gap-8 animate-marquee whitespace-nowrap px-4 items-center"
                    style={{ animationDuration: '80s' }}
                >
                    {[...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
                        <div key={`l1-${i}`} className="relative w-24 h-10 md:w-32 md:h-12 shrink-0 transition-opacity duration-300">
                            <Image
                                src={logo}
                                alt={`Partner Logo ${i}`}
                                fill
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>

                {/* Track 2 (Seamless) */}
                <div
                    className="flex gap-4 md:gap-8 animate-marquee whitespace-nowrap px-4 items-center absolute top-0 left-0 translate-x-[100%]"
                    style={{ animationDuration: '80s' }}
                >
                    {[...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
                        <div key={`l2-${i}`} className="relative w-24 h-10 md:w-32 md:h-12 shrink-0 transition-opacity duration-300">
                            <Image
                                src={logo}
                                alt={`Partner Logo ${i}`}
                                fill
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
