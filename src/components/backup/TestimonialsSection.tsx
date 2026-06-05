'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import SectionHeading from './ui/SectionHeading';

const TESTIMONIALS = [
    {
        quote: "They didn't just build a website; they engineered a digital presence that instantly elevated our brand value.",
        author: "Sarah Jenkins",
        role: "CMO",
        company: "VORTEX FINANCE"
    },
    {
        quote: "We burnt months with unreliable freelancers. SDWE came in, fixed the code in a week, and launched us globally.",
        author: "David Chen",
        role: "Founder",
        company: "NEXUS AI"
    },
    {
        quote: "Creative, technical, and incredibly professional. It felt like they were an extension of our own team.",
        author: "Elena Rodriguez",
        role: "Director",
        company: "AURA HEALTH"
    },
    {
        quote: "Finally, an agency that understands modern web performance. Blazing fast and looks incredible.",
        author: "Michael Ross",
        role: "CTO",
        company: "QUANTUM LABS"
    },
    {
        quote: "A masterpiece of engineering. The animations are buttery smooth and the code is impeccable.",
        author: "James Wilson",
        role: "VP Engineering",
        company: "SYNTH CORP"
    },
    // Duplicated for seamless infinite loop
    {
        quote: "They didn't just build a website; they engineered a digital presence that instantly elevated our brand value.",
        author: "Sarah Jenkins",
        role: "CMO",
        company: "VORTEX FINANCE"
    },
    {
        quote: "We burnt months with unreliable freelancers. SDWE came in, fixed the code in a week, and launched us globally.",
        author: "David Chen",
        role: "Founder",
        company: "NEXUS AI"
    },
    {
        quote: "Creative, technical, and incredibly professional. It felt like they were an extension of our own team.",
        author: "Elena Rodriguez",
        role: "Director",
        company: "AURA HEALTH"
    },
    {
        quote: "Finally, an agency that understands modern web performance. Blazing fast and looks incredible.",
        author: "Michael Ross",
        role: "CTO",
        company: "QUANTUM LABS"
    },
    {
        quote: "A masterpiece of engineering. The animations are buttery smooth and the code is impeccable.",
        author: "James Wilson",
        role: "VP Engineering",
        company: "SYNTH CORP"
    }
];

const TestimonialsSection = () => {
    return (
        <section className="w-full bg-white py-40 relative border-t border-black/5 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto text-center mb-24 relative z-10">
                <SectionHeading
                    tag="Client Feedback"
                    title="System"
                    highlight="Validation"
                />
            </div>

            <div className="w-full relative z-10 px-4">
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5,
                        slideShadows: false,
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    className="w-full py-12"
                >
                    {TESTIMONIALS.map((t, i) => (
                        <SwiperSlide key={i} className="!w-[85vw] md:!w-[600px]">
                            <div className="group relative bg-white border border-black/10 p-10 md:p-14 flex flex-col items-center text-center backdrop-blur-sm transition-all duration-500 hover:border-purple-500/30 hover:bg-purple-500/5 [.swiper-slide-active_&]:border-purple-500/30 [.swiper-slide-active_&]:bg-purple-500/5 h-full shadow-sm">


                                {/* Technical Header Removed for cleaner look */}

                                <div className="mb-8 relative mt-6">
                                    <div className="w-full flex justify-center mb-6">
                                        <div className="w-12 h-1 bg-purple-500/50" />
                                    </div>
                                    <p className="text-2xl md:text-4xl font-light text-black leading-tight font-grotesk ">
                                        "{t.quote}"
                                    </p>
                                </div>

                                <div className="mt-auto border-t border-black/5 pt-8 w-full flex flex-col items-center">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-2 h-2 bg-purple-500" />
                                        <h4 className="text-lg font-bold text-black tracking-widest uppercase  ">{t.author}</h4>
                                    </div>
                                    <p className="text-xs   text-gray-600 uppercase tracking-widest">
                                        {t.role} <span className="text-purple-500 px-2">@</span> {t.company}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default TestimonialsSection;
