'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import data from '../../website-data.json'
import ArrowButton from '@/components/ui/ArrowButton'

const { howWeWork } = data
const SLIDES = howWeWork.mockupSlides ?? [howWeWork.mockupImage]
const TOTAL = SLIDES.length

export default function HowWeWork() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const [slide, setSlide] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)
  const dragStartX = useRef<number | null>(null)
  const slideRef = useRef(0)
  const progressRef = useRef(0)

  const goTo = (next: number) => {
    if (next === slide) return
    setPrev(slide)
    setSlide(next)
    slideRef.current = next
    progressRef.current = 0
    setProgress(0)
    setTimeout(() => setPrev(null), 500)
  }

  const handleDragStart = (x: number) => {
    dragStartX.current = x
  }
  const handleDragEnd = (x: number) => {
    if (dragStartX.current === null) return
    const diff = dragStartX.current - x
    if (Math.abs(diff) > 40) {
      const next = diff > 0 ? Math.min(TOTAL - 1, slide + 1) : Math.max(0, slide - 1)
      goTo(next)
    }
    dragStartX.current = null
  }

  // Auto-advance with smooth progress animation
  useEffect(() => {
    let animationId: number
    let startTime: number | null = null
    const duration = 4000 // 4 seconds

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp
      const elapsed = timestamp - startTime
      const progressValue = Math.min(elapsed / duration, 1)

      progressRef.current = progressValue
      setProgress(progressValue)

      if (progressValue >= 1) {
        // Move to next slide (with wraparound)
        setSlide((currentSlide) => {
          const next = (currentSlide + 1) % TOTAL
          slideRef.current = next
          setPrev(currentSlide)
          setTimeout(() => setPrev(null), 500)
          return next
        })
        // Reset timing for next iteration
        startTime = null
        setProgress(0)
        animationId = requestAnimationFrame(animate)
      } else {
        animationId = requestAnimationFrame(animate)
      }
    }

    animationId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <section className="bg-[#fff]/35 px-4 lg:px-6 py-0 pb-12 md:pb-20">
      <div className="max-w-[1359px] mx-auto rounded-2xl md:rounded-3xl   p-4 sm:p-6 ">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <span className="text-[#3863ff] font-bold font-display" style={{ fontSize: '20px' }}>
            {howWeWork.label}
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/curvedline.svg"
            alt=""
            className="mx-auto mt-[-4px] h-auto"
            style={{ width: '80px' }}
          />
          <h2
            className="font-bold text-[#111] leading-[1.2] tracking-[-0.02em] mt-4 mb-4"
            style={{ fontSize: '42px', fontFamily: 'var(--font-cairo)' }}
          >
            {howWeWork.headline}
          </h2>
          <p
            className="text-[#111] max-w-[572px] mx-auto font-sofia"
            style={{
              fontSize: '20px',
              fontWeight: 600,
              lineHeight: '22px',
              letterSpacing: '-0.02em',
            }}
          >
            {howWeWork.subheadline}
          </p>
        </div>

        {/* Mockup + Solution cards */}
        <div className="flex flex-col lg:flex-row gap-6 items-center mb-10 md:mb-16">
          {/* Mockup panel */}
          <div
            className="relative w-full lg:w-[480px] xl:w-[614px] min-h-[480px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[704px] xl:min-h-[720px] shrink-0 rounded-[11px] overflow-hidden bg-[#05080c] cursor-grab active:cursor-grabbing select-none"
            onMouseDown={(e) => handleDragStart(e.clientX)}
            onMouseUp={(e) => handleDragEnd(e.clientX)}
            onMouseLeave={() => {
              dragStartX.current = null
            }}
            onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
            onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
            onDragStart={(e) => {
              e.preventDefault()
            }}
          >
            {/* Slides — cross-fade */}
            {SLIDES.map((src, i) => (
              <Image
                key={src + i}
                src={src}
                alt={`Website mockup slide ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 614px"
                style={{
                  opacity: i === slide ? 0.7 : i === prev ? 0 : 0,
                  transition: 'opacity 0.5s ease',
                  zIndex: i === slide ? 2 : i === prev ? 1 : 0,
                }}
                priority={i === 0}
              />
            ))}

            {/* Progress bar */}
            <div
              className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-10"
              style={{ width: '80%' }}
            >
              <div className="flex items-center gap-1.5">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Slide ${i + 1}`}
                    className="rounded-full transition-all duration-300 cursor-pointer relative overflow-hidden"
                    style={{
                      height: '5px',
                      background: i < slide ? 'white' : 'rgba(255,255,255,0.4)',
                      flex: '1 1 0%',
                    }}
                  >
                    {i === slide && (
                      <div
                        className="absolute top-0 left-0 h-full rounded-full"
                        style={{
                          width: `${progress * 100}%`,
                          background: 'white',
                          transition: 'none',
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Solution cards — 1 col mobile, 2 col sm+ */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 content-start">
            {howWeWork.solutions.map((solution, i) => (
              <div
                key={`${solution.title}-${i}`}
                className="card-hover bg-white rounded-[11px] p-4 md:p-6 border border-white/60 shadow-sm flex items-start gap-3 md:block"
              >
                <div
                  className="rounded-full bg-[#3863ff] flex items-center justify-center shrink-0 md:mb-4"
                  style={{ width: 40, height: 40 }}
                >
                  <img
                    src="/Check.svg"
                    alt=""
                    aria-hidden="true"
                    style={{ width: 24, height: 24 }}
                  />
                </div>
                <div>
                  <h3
                    className="font-bold text-[#111] mb-1 font-sofia"
                    style={{ fontSize: '22px', lineHeight: '27.7px', letterSpacing: '-0.02em' }}
                  >
                    {solution.title}
                  </h3>
                  <p
                    className="text-gray-500"
                    style={{
                      fontFamily: 'var(--font-outfit)',
                      fontSize: '16px',
                      lineHeight: '24px',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {solution.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA block */}
        <div className="text-center">
          <h3
            className="font-sofia text-[#111] mb-3"
            style={{
              fontSize: '32px',
              fontWeight: 600,
              lineHeight: '26px',
              letterSpacing: '-0.02em',
            }}
          >
            {howWeWork.ctaPrompt}
          </h3>
          <p
            className="font-sofia text-[#111] mb-6 md:mb-8 max-w-[540px] mx-auto"
            style={{
              fontSize: '16px',
              fontWeight: 600,
              lineHeight: '22px',
              letterSpacing: '-0.02em',
            }}
          >
            {howWeWork.ctaSubtext}
          </p>

          <div className="flex justify-center">
            <ArrowButton
              label={howWeWork.ctaButton}
              onClick={scrollToContact}
              variant="dark"
              size="md"
            />
          </div>

          {/* Chips container */}
          <div className="mt-6 md:mt-8 mx-auto max-w-full px-4 relative overflow-visible">
            {/* Eclipse shapes */}
            <div
              className="absolute bottom-0 left-0 w-[150px] h-[150px] md:w-[383px] md:h-[383px] rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(56,99,255,0.4) 0%, rgba(56,99,255,0.1) 50%, transparent 70%)',
                opacity: 0.3,
              }}
            />
            <div
              className="absolute bottom-0 right-0 w-[150px] h-[150px] md:w-[383px] md:h-[383px] rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(56,99,255,0.4) 0%, rgba(56,99,255,0.1) 50%, transparent 70%)',
                opacity: 0.3,
              }}
            />

            <div className="bg-[rgba(255,255,255,0.38)] md:backdrop-blur-sm border border-white/60 rounded-[7px] p-4 md:p-6 max-w-4xl mx-auto relative z-10">
              {/* Positive chips */}
              <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-3 min-h-[40px]">
                {howWeWork.positives.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-3"
                    style={{
                      fontFamily: 'var(--font-darker-grotesque)',
                      fontSize: '17px',
                      fontWeight: 'bold',
                      lineHeight: '17px',
                      letterSpacing: '-0.43%',
                      color: '#111',
                    }}
                  >
                    <span
                      className="shrink-0 rounded-full bg-[#3863ff] flex items-center justify-center"
                      style={{ width: '18px', height: '18px' }}
                    >
                      <svg width="12" height="12" viewBox="0 0 10 8" fill="none">
                        <path
                          d="M1 4L3.5 6.5L9 1"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {item}
                  </span>
                ))}
              </div>

              {/* Separator line */}
              <div className="flex justify-center my-3">
                <div
                  className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"
                  style={{ width: '80%' }}
                />
              </div>

              {/* Negative chips */}
              <div className="flex flex-wrap justify-center gap-2 md:gap-3  min-h-[20px]">
                {howWeWork.negatives.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 relative"
                    style={{
                      fontFamily: 'var(--font-darker-grotesque)',
                      fontSize: '16px',
                      lineHeight: '20px',
                      color: '#6F6F6F',
                      fontWeight: 600,
                    }}
                  >
                    <div
                      className="rounded-full shrink-0"
                      style={{
                        width: '16px',
                        height: '16px',
                        background: 'linear-gradient(135deg, #B4AFB6 1%, #C0B2C6 33%, #918994 93%)',
                        display: 'grid',
                        placeItems: 'center',
                      }}
                    >
                      <img src="/cross.svg" alt="" width="8" height="8" />
                    </div>
                    <span style={{ position: 'relative', display: 'inline-block' }}>
                      {item}
                      <span
                        style={{
                          position: 'absolute',
                          top: '60%',
                          left: 0,
                          right: 0,
                          height: '1px',
                          background: '#918994',
                          transform: 'translateY(-50%)',
                        }}
                      />
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
