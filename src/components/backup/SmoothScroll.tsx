'use client';

import { ReactLenis } from 'lenis/react';
import { useEffect, useState } from 'react';

function SmoothScroll({ children }: { children: React.ReactNode }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Basic mobile detection
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (isMobile) {
        return <>{children}</>;
    }

    return (
        <ReactLenis root options={{
            lerp: 0.1,
            duration: 1.5,
            smoothWheel: true,
            wheelMultiplier: 1,
        }}>
            {children}
        </ReactLenis>
    );
}

export default SmoothScroll;
