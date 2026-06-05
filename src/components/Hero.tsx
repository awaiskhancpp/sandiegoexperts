'use client'

import Image from 'next/image'
import data from '../../website-data.json'

const TRUST_LOGOS = [
  '/our-logos/anchor.svg',
  '/our-logos/skyline_remodeling.svg',
  '/our-logos/backyard_remodeling.svg',
  '/our-logos/invaincu.svg',
  '/our-logos/aria.svg',
  '/our-logos/dermalactive.svg',
]

export default function Hero() {
  const { hero, services } = data

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-[#ceebff] overflow-hidden relative min-h-screen md:min-h-0 flex flex-col md:block">
        {/* Background blobs */}
        <div className="absolute -left-36 top-32 w-[400px] md:w-[560px] h-[400px] md:h-[560px] rounded-full bg-[rgba(35,112,255,0.5)] blur-3xl pointer-events-none" />
        <div className="absolute right-0 top-32 w-[400px] md:w-[560px] h-[400px] md:h-[560px] rounded-full bg-[rgba(35,112,255,0.5)] blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-[1440px] mx-auto px-4 pt-8 md:pt-16 pb-0 flex flex-col items-center justify-center md:justify-start flex-1">
          {/* Rating badge */}
          <div className="flex items-center gap-2 bg-white/40 rounded-md px-4 py-1.5 mb-5 md:mb-6">
            <span className="text-yellow-400 text-base md:text-lg">★</span>
            <span
              className="text-[#111] font-medium font-darker"
              style={{ fontSize: 'clamp(16px, 2vw, 18px)', lineHeight: '25.2px' }}
            >
              {hero.badge}
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-bold text-center leading-[1.08] tracking-[-0.04em] text-black sm:max-w-[560px] md:max-w-[780px] lg:max-w-[860px] mb-4 md:mb-6"
            style={{ fontSize: 'clamp(42px, 5vw, 56px)', fontFamily: 'var(--font-cairo)' }}
          >
            Turn Your Website Into
            <br />A Lead-Generating Growth Engine
          </h1>

          {/* Subheadline */}
          <p
            className="text-center text-black max-w-[320px] sm:max-w-[560px] md:max-w-[680px] mb-4 md:mb-0 font-medium font-darker"
            style={{ fontSize: '22px', lineHeight: '1.2' }}
          >
            {hero.subheadline}
          </p>

          {/* Masked logo — below description */}
          <Image
            src="/sandiego-masked.png"
            alt=""
            aria-hidden="true"
            width={5760}
            height={1046}
            quality={100}
            className="w-full max-w-[1328px] pointer-events-none select-none mt-10 md:mt-16"
          />

          {/* Hero banner */}
          <div className="w-full max-w-[1284px] mx-auto rounded-[16px] sm:rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl float-anim -mt-6 sm:-mt-8 md:-mt-10">
            <Image
              src={hero.heroBanner}
              alt="Website dashboard"
              width={1284}
              height={720}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* ── Trust Bar ────────────────────────────────────────── */}
      <section className="bg-[#ceebff] py-7 md:py-10">
        <div className="max-w-[1100px] mx-auto text-center px-4">
          <div className="flex items-center justify-center gap-3 mb-6 md:mb-8">
            <span className="w-1 h-1 rounded-full bg-[#ded8d3]" />
            <p className="text-[#111] font-body" style={{ fontSize: '18px', fontWeight: 500 }}>
              {hero.trustLabel}
            </p>
            <span className="w-1 h-1 rounded-full bg-[#ded8d3]" />
          </div>

          {/* Logo marquee */}
          <div className="relative overflow-hidden marquee-fade-edges">
            <div
              className="flex items-center gap-7 md:gap-10 animate-marquee whitespace-nowrap"
              style={{ transform: 'translateZ(0)' }}
            >
              {[...TRUST_LOGOS, ...TRUST_LOGOS, ...TRUST_LOGOS, ...TRUST_LOGOS].map((logo, i) => (
                <div key={i} className="shrink-0 flex items-center justify-center h-10">
                  <Image
                    src={logo}
                    alt=""
                    height={28}
                    width={90}
                    quality={100}
                    className="h-6 md:h-7 w-auto object-contain opacity-70 grayscale"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ticker ──────────────────────────────────── */}
      <section className="bg-[#ceebff] overflow-hidden py-4 md:py-6">
        <div className="marquee-fade-edges">
          <div
            style={{
              display: 'flex',
              gap: 16,
              animation: 'marquee 35s linear infinite',
              width: 'max-content',
              padding: '10px 0 18px',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
            }}
          >
            {[...services, ...services].map((card, i) => (
              <div
                key={i}
                className="w-[260px] md:w-[290px] h-[280px] md:h-[310px] rounded-2xl bg-white flex flex-col  shrink-0 p-5 md:p-6"
                style={{ boxShadow: '0 2px 20px rgba(5,8,12,0.06)' }}
              >
                {/* Icon box */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: card.color }}
                >
                  <Image src={card.icon} alt={card.title} width={44} height={44} />
                  {/* <svg width="26" height="24" viewBox="0 0 38 34" fill="none" aria-hidden="true">
                    <rect x="2" y="2" width="34" height="26" rx="3" fill="none" stroke="rgb(24,24,24)" strokeWidth="2.5"/>
                    <line x1="2" y1="9" x2="36" y2="9" stroke="rgb(24,24,24)" strokeWidth="2"/>
                    <rect x="13" y="28" width="12" height="4" rx="1" fill="rgb(24,24,24)"/>
                    <line x1="8" y1="32" x2="30" y2="32" stroke="rgb(24,24,24)" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="7" cy="5.5" r="1.5" fill="rgb(24,24,24)"/>
                    <circle cx="12" cy="5.5" r="1.5" fill="rgb(24,24,24)"/>
                    <circle cx="17" cy="5.5" r="1.5" fill="rgb(24,24,24)"/>
                  </svg> */}
                </div>
                {/* Text - fixed height */}
                <div className="flex flex-col gap-2 mt-8 md:mt-14">
                  <p
                    className="font-bold leading-[1.2] tracking-[-0.03em] text-[#0a0a0a] font-sofia "
                    style={{ fontSize: '25px' }}
                  >
                    {card.title}
                  </p>
                  <p
                    className="text-[#555] font-body "
                    style={{
                      fontSize: '16px',
                      lineHeight: '23.5px',
                      letterSpacing: '-0.03em',
                      fontWeight: 400,
                    }}
                  >
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
