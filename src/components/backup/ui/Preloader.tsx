'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Prevent infinite loading state
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        // Fail-safe to ensure it clears
        const cleanup = () => {
            document.body.style.overflow = '';
        }

        return () => {
            clearTimeout(timer);
            cleanup();
        };
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[10000] flex items-center justify-center bg-black"
                    initial={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                >
                    <div className="flex flex-col items-center">
                        <div className="overflow-hidden mb-2">
                            <motion.p
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-white text-sm md:text-base font-medium tracking-widest uppercase font-grotesk"
                            >
                                San Diego
                            </motion.p>
                        </div>
                        <div className="overflow-hidden">
                            <motion.h1
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="text-4xl md:text-7xl font-bold text-white uppercase font-grotesk"
                            >
                                Website Experts
                            </motion.h1>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
