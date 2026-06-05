'use client'

import { useEffect, useRef, useState } from 'react'
import data from '../../website-data.json'

const { revenueGap } = data

function useCountUp(target: number, duration = 1400, started = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!started) return
    let startTs: number | null = null
    const step = (ts: number) => {
      if (!startTs) startTs = ts
      const p = Math.min((ts - startTs) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.floor(eased * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target, duration])
  return val
}

function AnimatedStat({ raw, started }: { raw: string; started: boolean }) {
  // range like "8–12%"
  const rangeMatch = raw.match(/^(\d+)–(\d+)(.*)$/)
  if (rangeMatch) {
    const lo = useCountUp(parseInt(rangeMatch[1]), 1200, started)
    const hi = useCountUp(parseInt(rangeMatch[2]), 1400, started)
    return <>{started ? `${lo}–${hi}${rangeMatch[3]}` : `0–0${rangeMatch[3]}`}</>
  }
  // simple like "310+", "+170%", "30d"
  const m = raw.match(/^([^\d]*)([\d]+)(.*)$/)
  if (!m) return <>{raw}</>
  const prefix = m[1]
  const target = parseInt(m[2], 10)
  const suffix = m[3]
  const count = useCountUp(target, 1300, started)
  return <>{started ? `${prefix}${count}${suffix}` : `${prefix}0${suffix}`}</>
}

const AvatarChip = ({ src, delay = 0 }: { src: string; delay?: number }) => (
  <div
    className="rev-float relative h-9 w-9 rounded-full border-2 border-white bg-[#eee] shadow-[0_2px_6px_rgba(0,0,0,0.12)]"
    style={{ animation: `revFloat 3s ${delay}s ease-in-out infinite` }}
  >
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={src} alt="" className="h-full w-full rounded-full object-cover" />
    <span className="absolute -bottom-[3px] -right-[5px] flex h-[15px] w-[15px] items-center justify-center rounded-full border-[1.5px] border-white bg-[#4378ff]">
      <span className="font-[Plus_Jakarta_Sans] text-[6px] font-bold tracking-[-0.02em] text-white">
        SW
      </span>
    </span>
  </div>
)

const Pill = ({
  children,
  purple = false,
  delay = 0,
}: {
  children: React.ReactNode
  purple?: boolean
  delay?: number
}) => (
  <div
    className={`rev-float whitespace-nowrap rounded-full px-[14px] py-[6px] font-[Plus_Jakarta_Sans] text-[18px] font-bold tracking-[-0.01em] text-[#0c1509] shadow-[0_4px_12px_rgba(0,0,0,0.10)] ${
      purple ? 'bg-[#f4e7fd]' : 'bg-white'
    }`}
    style={{ animation: `revFloat 3.5s ${delay}s ease-in-out infinite` }}
  >
    {children}
  </div>
)

const LogoCircle = ({ src, delay = 0 }: { src: string; delay?: number }) => (
  <div
    className="rev-float flex h-10 w-10 items-center justify-center rounded-full bg-[#e8edff] shadow-[0_2px_8px_rgba(56,99,255,0.20)] overflow-hidden"
    style={{ animation: `revFloat 4s ${delay}s ease-in-out infinite` }}
  >
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={src} alt="" className="h-full w-full object-contain p-1.5" />
  </div>
)

interface Stat {
  value: string
  label: string
  badges: React.ReactNode
}

const stats: Stat[] = [
  {
    value: revenueGap.stats[0].value,
    label: revenueGap.stats[0].label,
    badges: (
      <>
        <div className="absolute z-[2] -left-[22px] -top-4 rotate-[-8deg]">
          <AvatarChip src={revenueGap.avatar1} delay={0} />
        </div>
        <div className="absolute z-[2] -right-5 -top-2 rotate-[8deg]">
          <AvatarChip src={revenueGap.avatar2} delay={1.5} />
        </div>
      </>
    ),
  },
  {
    value: revenueGap.stats[1].value,
    label: revenueGap.stats[1].label,
    badges: (
      <>
        <div className="absolute z-[2] -left-[46px] -top-[18px] rotate-[-13deg]">
          <Pill delay={0.3}>$1.5 M</Pill>
        </div>
        <div className="absolute z-[2] -right-[30px] -top-[22px]">
          <LogoCircle src="/our-logos/CASLR.com_.logo_-2 (3) 1 1.png" delay={1} />
        </div>
      </>
    ),
  },
  {
    value: revenueGap.stats[2].value,
    label: revenueGap.stats[2].label,
    badges: (
      <>
        <div className="absolute z-[2] -left-[38px] -top-[26px] rotate-[-9deg]">
          <Pill purple delay={0.5}>
            $2.4 M
          </Pill>
        </div>
        <div className="absolute z-[2] -right-[26px] -top-3 rotate-[8deg]">
          <AvatarChip src={revenueGap.avatar1} delay={2} />
        </div>
      </>
    ),
  },
  {
    value: revenueGap.stats[3].value,
    label: revenueGap.stats[3].label,
    badges: (
      <>
        <div className="absolute z-[2] -left-[30px] -top-[26px]">
          <LogoCircle src="/our-logos/anchor-garage-door-logo 1.png" delay={0.8} />
        </div>
        <div className="absolute z-[2] -right-[44px] -top-[26px] rotate-[11deg]">
          <Pill delay={1.8}>$1.5 M</Pill>
        </div>
      </>
    ),
  },
]

export default function RevenueGap() {
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

  return (
    <section className="px-4 py-[70px] lg:px-6">
      <style>{`
        @keyframes revFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @media (max-width: 767px) {
          .rev-float { animation: none !important; }
        }
      `}</style>
      <div
        ref={ref}
        className="mx-auto grid max-w-[1280px] grid-cols-1 gap-x-6 gap-y-14 overflow-hidden px-8 pb-12 pt-16 md:grid-cols-2 md:px-10 lg:grid-cols-4"
        style={{
          background:
            'linear-gradient(98.43deg, #3863FF 0.01%, #6CA3FE 42.67%, #3863FF 104.34%), linear-gradient(0deg, #F8F9FA, #F8F9FA), #CCE4FF',
          borderRadius: 16,
        }}
      >
        {stats.map((s, i) => (
          <div key={i} className="flex flex-col items-center gap-2 px-4 py-3">
            <div className="relative inline-flex">
              <span className="whitespace-nowrap font-[Plus_Jakarta_Sans] text-[clamp(54px,4.4vw,60px)] font-extrabold leading-[1.2] tracking-[-0.04em] text-white">
                <AnimatedStat raw={s.value} started={started} />
              </span>
              {s.badges}
            </div>
            <p className="max-w-[226px] text-center text-[14px] font-medium leading-[1.4] text-white">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
