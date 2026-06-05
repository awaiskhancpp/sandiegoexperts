'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import data from '../../website-data.json'

const { waveGoodbye } = data
const items = waveGoodbye.items

// ── Inline icons ──────────────────────────────────────────────
const IconBadge = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2l2.4 4.9L20 8l-4 3.9.9 5.5L12 15l-4.9 2.4.9-5.5L4 8l5.6-1.1z" />
  </svg>
)
const IconBriefcase = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <line x1="12" y1="12" x2="12" y2="12" />
  </svg>
)
const IconZap = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)

const STAT_ICONS = ['.', '/tick-mark.png', '/brief_case.png', '/zap_icon.png']

// ── Count-up hook ─────────────────────────────────────────────
function useCountUp(target: number, duration = 1600, started = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!started) return
    let start: number | null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      setVal(Math.floor(p * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target, duration])
  return val
}

// ── Single stat ───────────────────────────────────────────────
function StatItem({
  stat,
  icon,
  avatarImage,
  started,
}: {
  stat: { value: string; label: string; useAvatars?: boolean }
  icon: React.ReactNode
  avatarImage: string
  started: boolean
}) {
  const numeric = parseInt(stat.value.replace(/\D/g, ''), 10)
  const suffix = stat.value.replace(/[\d]/g, '')
  const count = useCountUp(numeric, 1600, started)

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      {/* Icon / avatars */}
      {stat.useAvatars ? (
        <div className="flex items-center justify-center -space-x-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-11 h-11 rounded-full border-2 border-[#ceebff] overflow-hidden relative"
            >
              <Image src={avatarImage} alt="avatar" fill className="object-cover" sizes="44px" />
            </div>
          ))}
        </div>
      ) : (
        <div
          className="w-12 h-12 rounded-full bg-[#3863ff] flex items-center justify-center mx-auto"
          style={{ boxShadow: '0 0 0 5px rgba(56,99,255,0.15)' }}
        >
          {icon}
        </div>
      )}

      {/* Value */}
      <span
        className="text-[36px] md:text-[40px] font-black text-[#0a0a0a] leading-none"
        style={{ fontFamily: 'var(--font-darker-grotesque)' }}
      >
        {started ? `${count}${suffix}` : '0'}
      </span>
      <span className="text-[13px] md:text-[14px] text-[#666] font-body">{stat.label}</span>
    </div>
  )
}

// ── Stats row with horizontal line ────────────────────────────
function StatsRow({
  stats,
  avatarImage,
}: {
  stats: typeof waveGoodbye.stats
  avatarImage: string
}) {
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true)
          obs.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const StatItem = (stat: (typeof stats)[0], i: number) => {
    const numeric = parseInt(stat.value.replace(/\D/g, ''), 10)
    const suffix = stat.value.replace(/[\d]/g, '')
    return (
      <div key={stat.label} className="flex flex-col items-center text-center">
        <div className="relative z-10 mb-3">
          {stat.useAvatars ? (
            <div className="flex items-center -space-x-2">
              <div className=" rounded-full border-2 border-[#ceebff] overflow-hidden relative">
                <Image
                  src={avatarImage}
                  alt="avatar"
                  width={92}
                  height={52}
                  className="object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="relative w-[64px] h-[64px] flex items-center justify-center">
              <Image
                src="/icon-bg.svg"
                alt=""
                width={54}
                height={54}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              />
              <div className="absolute w-12 h-12 left-2 top-2 rounded-full bg-[linear-gradient(180deg,#CEEBFF_0%,#3863FF_47.38%,#CEEBFF_88.94%)]" />
              <div className="relative z-[2] w-11 h-11 rounded-full bg-[#3863ff] flex items-center justify-center">
                <Image src={STAT_ICONS[i]} alt="" width={24} height={24} />
              </div>
            </div>
          )}
        </div>
        <CountUpStat numeric={numeric} suffix={suffix} label={stat.label} started={started} />
      </div>
    )
  }

  return (
    <div ref={ref} className="mt-10 md:mt-14">
      {/* Mobile: vertical stack with connector lines */}
      <div className="flex flex-col items-center md:hidden">
        {stats.map((stat, i) => {
          const numeric = parseInt(stat.value.replace(/\D/g, ''), 10)
          const suffix = stat.value.replace(/[\d]/g, '')
          return (
            <div key={stat.label} className="flex flex-col items-center text-center w-full">
              <div className="relative z-10 mb-3">
                {stat.useAvatars ? (
                  <div className="flex items-center -space-x-2">
                    <div className=" rounded-full border-2 border-[#ceebff] overflow-hidden relative">
                      <Image
                        src={avatarImage}
                        alt="avatar"
                        width={92}
                        height={52}
                        className="object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="relative w-[64px] h-[64px] flex items-center justify-center">
                    <Image
                      src="/icon-bg.svg"
                      alt=""
                      width={54}
                      height={54}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    />
                    <div className="absolute w-12 h-12 left-2 top-2 rounded-full bg-[linear-gradient(180deg,#CEEBFF_0%,#3863FF_47.38%,#CEEBFF_88.94%)]" />
                    <div className="relative z-[2] w-11 h-11 rounded-full bg-[#3863ff] flex items-center justify-center">
                      <Image src={STAT_ICONS[i]} alt="" width={24} height={24} />
                    </div>
                  </div>
                )}
              </div>
              <CountUpStat numeric={numeric} suffix={suffix} label={stat.label} started={started} />
              {i < stats.length - 1 && (
                <div className="w-px bg-[#3863ff] my-4" style={{ height: 32 }} />
              )}
            </div>
          )
        })}
      </div>

      {/* md+: single row of 4 with horizontal connector line */}
      <div className="relative hidden md:grid md:grid-cols-4 gap-6">
        <div
          className="absolute h-px bg-[#3863ff]"
          style={{ top: 32, left: '12.5%', right: '12.5%' }}
        />
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="absolute w-[8px] h-[8px] rounded-full bg-white border border-[rgba(211,203,197,1)] z-10"
            style={{
              top: 28,
              left: `calc(${25 * (i + 1)}% - 4px)`,
            }}
          />
        ))}

        {stats.map((stat, i) => StatItem(stat, i))}
      </div>
    </div>
  )
}

function CountUpStat({
  numeric,
  suffix,
  label,
  started,
}: {
  numeric: number
  suffix: string
  label: string
  started: boolean
}) {
  const count = useCountUp(numeric, 1600, started)
  return (
    <div className="flex flex-col gap-1 items-center">
      <span
        className="text-[32px] md:text-[40px] font-black text-[#0a0a0a] leading-none text-center"
        style={{ fontFamily: 'var(--font-darker-grotesque)' }}
      >
        {started ? `${count}${suffix}` : `0${suffix}`}
      </span>
      <span className="text-[13px] md:text-[14px] text-[#666] font-body text-center">{label}</span>
    </div>
  )
}

function styleForDist(dist: number): { color: string; opacity: number; fontSize: string } {
  if (dist === 0) return { color: '#3863ff', opacity: 1, fontSize: 'clamp(54px, 6vw, 48px)' }
  if (dist === 1) return { color: '#555', opacity: 0.55, fontSize: 'clamp(30px, 4vw, 38px)' }
  if (dist === 2) return { color: '#aaa', opacity: 0.25, fontSize: 'clamp(22px, 2.5vw, 28px)' }
  return { color: '#ccc', opacity: 0.1, fontSize: 'clamp(14px, 1.8vw, 22px)' }
}

export default function StatsSection() {
  const [activeIdx, setActiveIdx] = useState(2)

  useEffect(() => {
    const t = setInterval(() => setActiveIdx((i) => (i + 1) % items.length), 2000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="bg-[#ceebff] py-14 md:py-20 px-4 lg:px-6 overflow-hidden">
      <div className="max-w-[1328px] mx-auto">
        {/* ── Mobile: stacked centered layout (below lg) ── */}
        <div className="block lg:hidden text-center mb-10">
          <div className="relative inline-block">
            <h2
              className="font-semibold text-[#0a0a0a] text-[36px] md:text-[48px] leading-none"
              style={{ fontFamily: 'var(--font-darker-grotesque)' }}
            >
              {waveGoodbye.headline}
            </h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="28"
              viewBox="0 0 123.687 41.280"
              className="absolute pointer-events-none"
              style={{ right: -70, top: -18 }}
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="arrowGradMobile" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3863FF" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#3863FF" stopOpacity="1" />
                </linearGradient>
              </defs>
              <path
                d="M 119.555 36.986 L 119.402 36.884 C 117.759 35.796 116.12 34.71 114.382 33.76 C 108.409 30.492 101.509 28.36 94.673 28.268 C 94.387 28.264 94.111 28.374 93.905 28.574 C 93.7 28.774 93.582 29.046 93.577 29.333 C 93.574 29.619 93.684 29.895 93.884 30.101 C 94.084 30.306 94.357 30.424 94.643 30.428 C 101.13 30.512 107.676 32.553 113.343 35.654 C 115.06 36.594 116.68 37.669 118.304 38.746 C 119.107 39.279 119.911 39.812 120.728 40.33 L 120.897 40.44 C 121.237 40.664 121.955 41.136 122.166 41.208 C 122.777 41.419 123.166 41.117 123.328 40.954 C 123.464 40.819 123.596 40.625 123.659 40.344 C 123.709 40.112 123.701 39.65 123.558 39.035 C 123.262 37.735 122.416 35.355 121.817 33.669 C 121.508 32.799 121.264 32.113 121.195 31.855 C 119.139 24.178 118.347 16.668 117.525 8.883 C 117.415 7.835 117.304 6.783 117.189 5.723 C 117.157 5.438 117.014 5.178 116.791 4.998 C 116.567 4.819 116.282 4.735 115.997 4.765 C 115.856 4.78 115.72 4.823 115.595 4.891 C 115.471 4.959 115.361 5.051 115.272 5.162 C 115.184 5.272 115.117 5.399 115.078 5.535 C 115.038 5.671 115.026 5.814 115.041 5.955 C 115.151 6.976 115.259 7.993 115.366 9.005 C 116.092 15.878 116.796 22.537 118.333 29.276 C 108.588 12.307 90.308 7.209 71.719 8.726 C 53.469 10.213 34.962 18.112 24.129 27.229 C 24.661 26.239 25.115 25.383 25.352 24.929 C 25.717 24.227 26.275 23.287 26.928 22.185 C 28.844 18.955 31.583 14.335 32.728 10.229 C 33.901 6.029 33.413 2.352 29.662 0.627 C 26.252 -0.94 22.22 0.541 18.264 3.843 C 9.749 10.953 1.362 26.358 0.032 31.665 C -0.002 31.802 -0.009 31.945 0.012 32.086 C 0.033 32.226 0.081 32.361 0.154 32.482 C 0.227 32.604 0.323 32.71 0.437 32.794 C 0.551 32.879 0.68 32.94 0.818 32.974 C 0.955 33.009 1.098 33.016 1.239 32.995 C 1.379 32.974 1.514 32.926 1.635 32.853 C 1.757 32.78 1.863 32.684 1.947 32.57 C 2.032 32.456 2.093 32.326 2.127 32.189 C 3.405 27.096 11.475 12.324 19.649 5.499 C 22.844 2.832 26.005 1.323 28.759 2.589 C 31.478 3.838 31.497 6.604 30.647 9.649 C 29.539 13.627 26.873 18.089 25 21.224 C 24.35 22.313 23.795 23.241 23.434 23.934 C 23.144 24.492 22.564 25.559 21.911 26.759 C 20.591 29.188 18.971 32.164 18.857 32.576 C 18.642 33.347 19.151 33.716 19.327 33.826 C 19.463 33.91 20.171 34.286 20.802 33.535 C 29.802 22.811 51.04 12.578 71.892 10.877 C 91.858 9.249 111.52 15.491 119.555 36.986 Z"
                fill="url(#arrowGradMobile)"
                fillRule="evenodd"
              />
            </svg>
          </div>

          <div className="h-2 md:h-2" />

          {/* Slot: absolute-positioned items, no fixed heights */}
          <div className="relative overflow-hidden mx-auto" style={{ height: 130 }}>
            {items.map((item, i) => {
              const steps = (i - activeIdx + items.length) % items.length
              const isPast = steps > items.length / 2
              let color = '#ccc',
                opacity = 0,
                fontSize = '14px',
                top = isPast ? -44 : 140
              if (steps === 0) {
                color = '#3863ff'
                opacity = 1
                fontSize = 'clamp(36px, 6.5vw, 48px)'
                top = 0
              } else if (steps === 1) {
                color = '#555'
                opacity = 0.5
                fontSize = 'clamp(26px, 5vw, 38px)'
                top = 60
              } else if (steps === 2) {
                color = '#aaa'
                opacity = 0.22
                fontSize = 'clamp(20px, 3.5vw, 28px)'
                top = 60
              }
              return (
                <div
                  key={item}
                  className="absolute left-0 right-0 text-center"
                  style={{
                    top,
                    color,
                    opacity,
                    fontSize,
                    fontWeight: 600,
                    fontFamily: 'var(--font-darker-grotesque)',
                    lineHeight: 1,
                    whiteSpace: 'nowrap',
                    transition:
                      'top 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.5s ease, color 0.5s ease, font-size 0.5s ease',
                  }}
                >
                  {item}
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Desktop: side-by-side grid (lg+) ── */}
        <div className="hidden lg:grid lg:grid-cols-[auto_auto] justify-center items-center gap-10 mb-16">
          {/* Left: headline with decorative marks + absolutely positioned arrow */}
          <div className="relative">
            {/* Tick marks on the W */}
            <svg
              className="absolute pointer-events-none"
              style={{ left: -14, top: -8 }}
              width="18"
              height="22"
              viewBox="0 0 18 22"
              fill="none"
              aria-hidden="true"
            >
              <line
                x1="10"
                y1="2"
                x2="4"
                y2="10"
                stroke="#0a0a0a"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="14"
                y1="6"
                x2="10"
                y2="12"
                stroke="#0a0a0a"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            <h2
              className="font-semibold text-[#0a0a0a] leading-tight whitespace-nowrap"
              style={{
                fontSize: 'clamp(54px, 4vw, 54px)',
                fontFamily: 'var(--font-darker-grotesque)',
              }}
            >
              {waveGoodbye.headline}
            </h2>

            {/* Arrow */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="110"
              height="38"
              viewBox="0 0 123.687 41.280"
              className="absolute pointer-events-none"
              style={{ left: '70%', top: -30 }}
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3863FF" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#3863FF" stopOpacity="1" />
                </linearGradient>
              </defs>
              <path
                d="M 119.555 36.986 L 119.402 36.884 C 117.759 35.796 116.12 34.71 114.382 33.76 C 108.409 30.492 101.509 28.36 94.673 28.268 C 94.387 28.264 94.111 28.374 93.905 28.574 C 93.7 28.774 93.582 29.046 93.577 29.333 C 93.574 29.619 93.684 29.895 93.884 30.101 C 94.084 30.306 94.357 30.424 94.643 30.428 C 101.13 30.512 107.676 32.553 113.343 35.654 C 115.06 36.594 116.68 37.669 118.304 38.746 C 119.107 39.279 119.911 39.812 120.728 40.33 L 120.897 40.44 C 121.237 40.664 121.955 41.136 122.166 41.208 C 122.777 41.419 123.166 41.117 123.328 40.954 C 123.464 40.819 123.596 40.625 123.659 40.344 C 123.709 40.112 123.701 39.65 123.558 39.035 C 123.262 37.735 122.416 35.355 121.817 33.669 C 121.508 32.799 121.264 32.113 121.195 31.855 C 119.139 24.178 118.347 16.668 117.525 8.883 C 117.415 7.835 117.304 6.783 117.189 5.723 C 117.157 5.438 117.014 5.178 116.791 4.998 C 116.567 4.819 116.282 4.735 115.997 4.765 C 115.856 4.78 115.72 4.823 115.595 4.891 C 115.471 4.959 115.361 5.051 115.272 5.162 C 115.184 5.272 115.117 5.399 115.078 5.535 C 115.038 5.671 115.026 5.814 115.041 5.955 C 115.151 6.976 115.259 7.993 115.366 9.005 C 116.092 15.878 116.796 22.537 118.333 29.276 C 108.588 12.307 90.308 7.209 71.719 8.726 C 53.469 10.213 34.962 18.112 24.129 27.229 C 24.661 26.239 25.115 25.383 25.352 24.929 C 25.717 24.227 26.275 23.287 26.928 22.185 C 28.844 18.955 31.583 14.335 32.728 10.229 C 33.901 6.029 33.413 2.352 29.662 0.627 C 26.252 -0.94 22.22 0.541 18.264 3.843 C 9.749 10.953 1.362 26.358 0.032 31.665 C -0.002 31.802 -0.009 31.945 0.012 32.086 C 0.033 32.226 0.081 32.361 0.154 32.482 C 0.227 32.604 0.323 32.71 0.437 32.794 C 0.551 32.879 0.68 32.94 0.818 32.974 C 0.955 33.009 1.098 33.016 1.239 32.995 C 1.379 32.974 1.514 32.926 1.635 32.853 C 1.757 32.78 1.863 32.684 1.947 32.57 C 2.032 32.456 2.093 32.326 2.127 32.189 C 3.405 27.096 11.475 12.324 19.649 5.499 C 22.844 2.832 26.005 1.323 28.759 2.589 C 31.478 3.838 31.497 6.604 30.647 9.649 C 29.539 13.627 26.873 18.089 25 21.224 C 24.35 22.313 23.795 23.241 23.434 23.934 C 23.144 24.492 22.564 25.559 21.911 26.759 C 20.591 29.188 18.971 32.164 18.857 32.576 C 18.642 33.347 19.151 33.716 19.327 33.826 C 19.463 33.91 20.171 34.286 20.802 33.535 C 29.802 22.811 51.04 12.578 71.892 10.877 C 91.858 9.249 111.52 15.491 119.555 36.986 Z"
                fill="url(#arrowGrad)"
                fillRule="evenodd"
              />
            </svg>
          </div>

          {/* Right: slot machine */}
          <div className="overflow-hidden" style={{ height: 280, width: 580, maxWidth: '100%' }}>
            <div
              style={{
                transform: `translateY(${112 - activeIdx * 56}px)`,
                transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {items.map((item, i) => {
                const dist = Math.abs(i - activeIdx)
                const s = styleForDist(Math.min(dist, items.length - dist))
                return (
                  <div
                    key={item}
                    className="flex items-center"
                    style={{
                      height: 56,
                      color: s.color,
                      opacity: s.opacity,
                      fontSize: s.fontSize,
                      fontWeight: 600,
                      fontFamily: 'var(--font-darker-grotesque)',
                      whiteSpace: 'nowrap',
                      transition: 'color 0.5s ease, opacity 0.5s ease, font-size 0.5s ease',
                      lineHeight: '56px',
                    }}
                  >
                    {item}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <StatsRow stats={waveGoodbye.stats} avatarImage={waveGoodbye.avatarImage} />
      </div>
    </section>
  )
}
