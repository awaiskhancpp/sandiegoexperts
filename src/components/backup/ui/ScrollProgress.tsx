'use client';

import React from 'react';
import { motion, useScroll } from 'framer-motion';

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();

    return (
        <motion.div
            style={{ scaleX: scrollYProgress }}
            className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-[10001] mix-blend-difference"
        />
    );
};

export default ScrollProgress;
