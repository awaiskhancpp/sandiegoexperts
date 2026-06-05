'use client';

import React from 'react';
// import Hero from '../Hero'; // Old hero - hidden
import HeroVideo from '../HeroVideo'; // New video hero
import ProjectShowcase from '../ProjectShowcase'; // Keep Project Showcase high
import TrustSection from '../TrustSection';
import DetailedServicesSection from '../DetailedServicesSection';
import ProcessSection from '../ProcessSection'; // New Import
import TechStack from '../TechStack';
import ProsConsSection from '../ProsConsSection'; // Swapped Comparison for Pros/Cons
import BenefitsSection from '../BenefitsSection';
import TestimonialsSection from '../TestimonialsSection';
import PricingSection from '../PricingSection';
import FAQSection from '../FAQSection';
import Footer from '../Footer';
import MissionSection from '../MissionSection';
import StatsSection from '../StatsSection'; // New Import
import VideoReviewsSection from '../VideoReviewsSection'; // Video testimonials

const Homepage = () => {
    return (
        <main className="bg-black min-h-screen">
            <HeroVideo />
            <StatsSection /> {/* Impact Numbers */}
            <TrustSection /> {/* Moved Trust below Hero for credibility */}
            <MissionSection /> {/* New Bento Grid Mission Statement */}
            <ProjectShowcase /> {/* Proof of Work */}
            <ProcessSection /> {/* How we do it */}
            <DetailedServicesSection /> {/* What we do */}
            <ProsConsSection /> {/* Risk Assessment (Us vs Them) */}
            <BenefitsSection /> {/* Why Us */}
            <TechStack /> {/* Technical Details (Lower priority) */}
            <TestimonialsSection /> {/* Social Proof - Text */}
            <VideoReviewsSection /> {/* Social Proof - Video */}
            <PricingSection />
            <FAQSection />
            <Footer />
        </main>
    );
};

export default Homepage;
