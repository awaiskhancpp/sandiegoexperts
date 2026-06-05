'use client';

import React, { useState, useEffect, useRef } from 'react';

interface TextScrambleProps {
    text: string;
    className?: string; // Allow custom styling
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

const TextScramble: React.FC<TextScrambleProps> = ({ text, className = '' }) => {
    const [displayText, setDisplayText] = useState(text);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startScramble = () => {
        let iteration = 0;

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText((prev) =>
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }

            iteration += 1 / 3; // Speed of scramble
        }, 30);
    };

    const stopScramble = () => {
        // Optional: Reset immediately or let it finish naturally?
        // Let's settle it to the final text immediately to avoid stuck chars
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
    };

    return (
        <span
            onMouseEnter={startScramble}
            onMouseLeave={stopScramble}
            className={`inline-block   cursor-pointer ${className}`}
        >
            {displayText}
        </span>
    );
};

export default TextScramble;
