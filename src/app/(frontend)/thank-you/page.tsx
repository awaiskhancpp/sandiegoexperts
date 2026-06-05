'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import data from '../../../../website-data.json'

const { brand } = data

// ── Confetti particle ────────────────────────────────────────────────
function Confetti() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.8,
    duration: 1.5 + Math.random() * 1.5,
    size: 4 + Math.random() * 6,
    color: ['#3863ff', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f472b6', '#fbbf24'][
      Math.floor(Math.random() * 8)
    ],
    rotation: Math.random() * 360,
    drift: (Math.random() - 0.5) * 80,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-sm"
          style={
            {
              left: `${p.left}%`,
              top: '45%',
              width: p.size,
              height: p.size * (0.5 + Math.random() * 0.5),
              background: p.color,
              borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              transform: `rotate(${p.rotation}deg)`,
              animation: `confetti-fall ${p.duration}s ${p.delay}s cubic-bezier(0.25, 0.46, 0.45, 0.94) both`,
              '--drift': `${p.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}

// ── Animated checkmark SVG ───────────────────────────────────────────
function AnimatedCheck({ show }: { show: boolean }) {
  return (
    <div
      className="relative w-28 h-28 flex items-center justify-center"
      style={{
        transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: show ? 'scale(1)' : 'scale(0)',
        opacity: show ? 1 : 0,
      }}
    >
      {/* Outer pulse ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'rgba(34, 197, 94, 0.08)',
          animation: show ? 'thankyou-ring-pulse 2s ease-in-out infinite' : 'none',
        }}
      />
      {/* Middle ring */}
      <div
        className="absolute inset-2 rounded-full"
        style={{
          background: 'rgba(34, 197, 94, 0.15)',
          transition: 'all 0.5s 0.2s ease',
          transform: show ? 'scale(1)' : 'scale(0)',
        }}
      />
      {/* Inner circle */}
      <div
        className="relative w-[72px] h-[72px] rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #22c55e, #16a34a)',
          boxShadow: '0 8px 32px rgba(34, 197, 94, 0.35)',
          transition: 'all 0.4s 0.3s ease',
          transform: show ? 'scale(1)' : 'scale(0)',
        }}
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5 13L9 17L19 7"
            stroke="white"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 24,
              strokeDashoffset: show ? 0 : 24,
              transition: 'stroke-dashoffset 0.6s 0.6s cubic-bezier(0.65, 0, 0.35, 1)',
            }}
          />
        </svg>
      </div>
    </div>
  )
}

// ── Animated envelope icon ───────────────────────────────────────────
function AnimatedEnvelope({ show }: { show: boolean }) {
  return (
    <div
      className="relative w-28 h-28 flex items-center justify-center"
      style={{
        transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: show ? 'scale(1)' : 'scale(0)',
        opacity: show ? 1 : 0,
      }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'rgba(56, 99, 255, 0.08)',
          animation: show ? 'thankyou-ring-pulse 2s ease-in-out infinite' : 'none',
        }}
      />
      <div
        className="absolute inset-2 rounded-full"
        style={{
          background: 'rgba(56, 99, 255, 0.15)',
          transition: 'all 0.5s 0.2s ease',
          transform: show ? 'scale(1)' : 'scale(0)',
        }}
      />
      <div
        className="relative w-[72px] h-[72px] rounded-full flex items-center justify-center"
        style={{
          background: '#ffffff',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.18)',
          transition: 'all 0.4s 0.3s ease',
          transform: show ? 'scale(1)' : 'scale(0)',
        }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2" y="5" width="20" height="14" rx="2" stroke="#3863ff" strokeWidth="1.8" />
          <path
            d="M2 5L12 14L22 5"
            stroke="#3863ff"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 32,
              strokeDashoffset: show ? 0 : 32,
              transition: 'stroke-dashoffset 0.6s 0.6s cubic-bezier(0.65, 0, 0.35, 1)',
            }}
          />
        </svg>
      </div>
    </div>
  )
}

// ── Floating dots background ─────────────────────────────────────────
function FloatingDots() {
  const dots = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: 5 + Math.random() * 90,
    top: 10 + Math.random() * 80,
    size: 3 + Math.random() * 5,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 3,
    opacity: 0.08 + Math.random() * 0.12,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute rounded-full bg-[#3863ff]"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            opacity: d.opacity,
            animation: `thankyou-float ${d.duration}s ${d.delay}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  )
}

// ── Main Thank You Page ──────────────────────────────────────────────
export default function ThankYouPageWrapper() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#ceebff] flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-2 border-[#3863ff]/30 border-t-[#3863ff] animate-spin-fast" />
        </div>
      }
    >
      <ThankYouPage />
    </Suspense>
  )
}

function ThankYouPage() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type') === 'appointment' ? 'appointment' : 'contact'
  const bookingUid = searchParams.get('uid') ?? searchParams.get('ref')
  const [show, setShow] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    const t1 = requestAnimationFrame(() => setShow(true))
    const t2 = setTimeout(() => setShowConfetti(true), 600)
    return () => {
      cancelAnimationFrame(t1)
      clearTimeout(t2)
    }
  }, [])

  const isAppointment = type === 'appointment'

  const steps = isAppointment
    ? [
        {
          icon: '📧',
          title: 'Confirmation email',
          desc: "You'll receive a calendar invite with the Google Meet link shortly.",
        },
        {
          icon: '🔔',
          title: 'Reminder notification',
          desc: "We'll send you a reminder 24 hours before the call.",
        },
        {
          icon: '🤝',
          title: "Let's talk!",
          desc: "Join the call at the scheduled time and let's discuss your project.",
        },
      ]
    : [
        {
          icon: '👀',
          title: "We'll review",
          desc: 'Our team reads every message and reviews your inquiry.',
        },
        {
          icon: '✉️',
          title: 'Personal reply',
          desc: 'Expect a thoughtful response within 24 hours.',
        },
        {
          icon: '🚀',
          title: 'Next steps',
          desc: "If it's a fit, we'll schedule a free consultation call.",
        },
      ]

  return (
    <div className="min-h-screen bg-[#ceebff] flex items-center justify-center p-4 sm:p-5 relative overflow-hidden">
      <FloatingDots />

      <div
        className="relative bg-white rounded-[28px] max-w-[540px] w-full overflow-hidden"
        style={{ boxShadow: '0 32px 90px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)' }}
      >
        {/* ── Gradient hero band ── */}
        <div
          className="relative px-8 sm:px-12 pt-11 pb-12 text-center overflow-hidden"
          style={{ background: 'linear-gradient(160deg,#06123d 0%,#10277a 55%,#1c3fb0 100%)' }}
        >
          {/* confetti + decorative glow inside the band */}
          {showConfetti && <Confetti />}
          <div
            className="absolute -top-20 -right-16 w-56 h-56 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle,rgba(56,99,255,0.5),transparent 70%)' }}
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -left-16 w-56 h-56 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle,rgba(123,159,255,0.28),transparent 70%)' }}
            aria-hidden="true"
          />

          {/* brand wordmark */}
          <div
            className="relative flex items-center justify-center gap-1.5 mb-7"
            style={{ transition: 'all 0.5s 0.2s ease', opacity: show ? 1 : 0 }}
          >
            <svg width="15" height="15" viewBox="0 0 20 20" fill="white" aria-hidden="true">
              <path d="M0 10L8 12L10 20L12 12L20 10L12 8L10 0L8 8Z" />
            </svg>
            <span className="text-[12px] font-medium tracking-[0.3px] text-white/90 font-body">
              {brand.name}
            </span>
          </div>

          <div className="relative flex justify-center mb-5">
            {isAppointment ? <AnimatedCheck show={show} /> : <AnimatedEnvelope show={show} />}
          </div>

          <div
            className="relative"
            style={{
              transition: 'all 0.6s 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
              transform: show ? 'translateY(0)' : 'translateY(16px)',
              opacity: show ? 1 : 0,
            }}
          >
            <h1 className="font-bold text-[30px] sm:text-[38px] leading-[1.15] tracking-[-0.5px] text-white mb-2.5 font-heading">
              {isAppointment ? "You're Booked!" : 'Message Sent!'}
            </h1>
            <p className="text-[14px] sm:text-[15px] text-white/65 leading-[1.6] max-w-[360px] mx-auto font-body">
              {isAppointment
                ? "A confirmation email is on its way. We're excited to connect with you soon."
                : "Thanks for reaching out. We'll get back to you within 24 hours."}
            </p>
          </div>
        </div>

        {/* ── White body ── */}
        <div className="px-7 sm:px-10 py-8">
          {/* Booking reference */}
          {isAppointment && bookingUid && (
            <div
              className="flex items-center justify-between gap-3 rounded-[14px] px-5 py-4 mb-7 border border-[#d0e0ff] bg-gradient-to-r from-[#f0f5ff] to-[#eaf1ff]"
              style={{
                transition: 'all 0.5s 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                opacity: show ? 1 : 0,
                transform: show ? 'translateY(0)' : 'translateY(12px)',
              }}
            >
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-[1.5px] text-[#9ab0d8] mb-1 font-body">
                  Booking Reference
                </p>
                <p className="font-bold text-[18px] text-[#05080c] tracking-[2px] font-body">
                  {bookingUid}
                </p>
              </div>
              <span className="w-9 h-9 rounded-full bg-[#3863ff] flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect
                    x="1.5"
                    y="2.5"
                    width="13"
                    height="12"
                    rx="2"
                    stroke="#fff"
                    strokeWidth="1.4"
                  />
                  <line
                    x1="5"
                    y1="1"
                    x2="5"
                    y2="4"
                    stroke="#fff"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                  <line
                    x1="11"
                    y1="1"
                    x2="11"
                    y2="4"
                    stroke="#fff"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                  <line x1="1.5" y1="6.5" x2="14.5" y2="6.5" stroke="#fff" strokeWidth="1.4" />
                </svg>
              </span>
            </div>
          )}

          {/* What happens next — connected vertical timeline */}
          <p
            className="text-[11px] uppercase tracking-[1.5px] text-[#bbb] mb-4 font-body"
            style={{ transition: 'all 0.5s 0.7s ease', opacity: show ? 1 : 0 }}
          >
            What happens next
          </p>
          <div className="relative flex flex-col">
            {/* connecting line */}
            <span
              className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-[#3863ff]/40 via-[#3863ff]/20 to-transparent"
              aria-hidden="true"
            />
            {steps.map((s, i) => (
              <TimelineStep
                key={s.title}
                {...s}
                index={i}
                last={i === steps.length - 1}
                delay={0.8 + i * 0.12}
                show={show}
              />
            ))}
          </div>

          {/* CTAs */}
          <div
            className="mt-8 flex flex-col sm:flex-row gap-2.5"
            style={{
              transition: 'all 0.5s 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
              opacity: show ? 1 : 0,
              transform: show ? 'translateY(0)' : 'translateY(12px)',
            }}
          >
            <Link
              href="/"
              className="flex-1 inline-flex items-center justify-center gap-2 text-white rounded-full px-7 py-[14px] font-semibold text-[14px] no-underline transition-all duration-200 hover:-translate-y-[2px] btn-press font-body"
              style={{
                background: 'linear-gradient(135deg,#3863ff,#2a4fd4)',
                boxShadow: '0 6px 18px rgba(56,99,255,0.35)',
              }}
            >
              Back to Home
              <svg width="14" height="11" viewBox="0 0 16 12" fill="none" aria-hidden="true">
                <path
                  d="M1 6H15M15 6L10 1M15 6L10 11"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <a
              href={`mailto:${brand.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-[14px] font-medium text-[14px] no-underline border border-[#e5e5e5] text-[#555] bg-white transition-colors hover:bg-[#f5f5f5] font-body"
            >
              Contact us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Timeline step ────────────────────────────────────────────────────
function TimelineStep({
  icon,
  title,
  desc,
  last,
  delay,
  show,
}: {
  icon: string
  title: string
  desc: string
  index: number
  last: boolean
  delay: number
  show: boolean
}) {
  return (
    <div
      className={`relative flex items-start gap-3.5 ${last ? '' : 'pb-5'}`}
      style={{
        transition: `all 0.5s ${delay}s cubic-bezier(0.22, 1, 0.36, 1)`,
        opacity: show ? 1 : 0,
        transform: show ? 'translateX(0)' : 'translateX(-12px)',
      }}
    >
      <span className="relative z-10 w-8 h-8 rounded-full bg-white border border-[#d0e0ff] shadow-sm flex items-center justify-center text-[15px] shrink-0">
        {icon}
      </span>
      <div className="pt-0.5">
        <p className="font-semibold text-[13px] text-[#111] font-body">{title}</p>
        <p className="text-[12px] text-[#999] leading-[1.5] font-body">{desc}</p>
      </div>
    </div>
  )
}
