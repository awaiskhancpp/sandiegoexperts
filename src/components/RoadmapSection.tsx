'use client'

import { useEffect, useRef, useState } from 'react'
import data from '../../website-data.json'

const { roadmap } = data

// ── count-up hook ─────────────────────────────────────────────
function useCountUp(target: number, duration = 1400, started = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!started) return
    let start: number | null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.floor(eased * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target, duration])
  return val
}

// ── shared up-arrow ───────────────────────────────────────────
const UpArrow = ({ size = 12 }: { size?: number }) => (
  <svg
    width={size}
    height={size + 2}
    viewBox="0 0 12 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 9L9 3M9 3H4M9 3V8" />
  </svg>
)

// ── LEFT line chart ───────────────────────────────────────────
const chartW = 434
const chartH = 150
const maxV = 20
const solid = [
  0.4, 0.5, 0.9, 0.5, 0.5, 0.5, 0.6, 6, 6.2, 5, 1, 1, 0.9, 1, 5.2, 5.6, 4, 1, 1, 1.3, 6, 6.2, 5, 7,
  3.5, 12, 18, 11, 14.5, 13, 3,
]
const dash = [
  10, 9, 4, 1.6, 1, 1.5, 1, 1.2, 1, 3, 2, 1, 1, 1, 1, 1, 2, 3.2, 2, 1.6, 2, 3, 4, 3, 2, 1.5, 2, 2.6,
  2, 1.6, 1.4,
]

function buildPath(series: number[]): string {
  return series
    .map((v, i) => {
      const x = (i / (series.length - 1)) * chartW
      const y = chartH - (v / maxV) * chartH
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join(' ')
}

function LineChart({ started }: { started: boolean }) {
  const { traditional } = roadmap
  const extra = traditional.metrics.slice(1)
  const sessions = useCountUp(132, 1200, started)
  const pct = useCountUp(172, 1400, started)

  return (
    <div className="mt-6 rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-start gap-x-4 gap-y-3">
          <div className="relative -mt-2.5 rounded-[10px] border border-[#ededed] bg-white px-3.5 py-2.5 shadow-[0_2px_8px_rgba(16,24,40,0.07)]">
            <span className="absolute right-2.5 top-3 text-[#9aa0a6]">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
            </span>
            <span className="inline-block border-b-[1.5px] font-medium border-dotted border-[#c5c5c5] text-[13px] text-[#000]">
              Sessions
            </span>
            <div className="mt-1.5 flex items-center gap-1.5">
              <b className="text-[19px] font-bold text-[#000]">{started ? sessions : 0}</b>
              <span className="inline-flex items-center gap-0.5 text-[13px] font-semibold text-[#16b821]">
                <UpArrow size={11} />
                {started ? pct : 0}%
              </span>
            </div>
          </div>
          {extra.map((m) => (
            <div key={m.label}>
              <span className="inline-block border-b-[1.5px] border-dotted font-medium border-[#c5c5c5] text-[13px] text-[#000]">
                {m.label}
              </span>
              <div className="mt-1.5 flex items-center gap-1.5">
                <b className="text-[19px] font-bold text-[#0a0a0a]">{m.value}</b>
                <span className="text-[16px] text-[#bdbdbd]">—</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-none flex-col items-center gap-3.5 text-[#9aa0a6]">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 15l-6-6-6 6" />
          </svg>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <circle cx="11" cy="11" r="3" />
            <path d="M14 14l3 3" />
          </svg>
        </div>
      </div>

      <div className="mb-1.5 mt-[18px] text-[10px] text-[#1e1e1e]">
        {traditional.chartDateLabel}
      </div>

      <div className="flex gap-2">
        <div className="flex h-[150px] flex-col justify-between pb-0.5 text-[12px] leading-none text-[#9aa0a6]">
          <span>20</span>
          <span>10</span>
          <span>0</span>
        </div>
        <div className="relative h-[150px] flex-1">
          <svg
            viewBox={`0 0 ${chartW} ${chartH}`}
            width="100%"
            height={chartH}
            preserveAspectRatio="none"
            className="block"
          >
            <line x1="0" y1="1" x2={chartW} y2="1" stroke="#ececec" />
            <line x1="0" y1={chartH / 2} x2={chartW} y2={chartH / 2} stroke="#ececec" />
            <line x1="0" y1={chartH - 1} x2={chartW} y2={chartH - 1} stroke="#ececec" />
            <path
              d={buildPath(dash)}
              fill="none"
              stroke="#9fd4ef"
              strokeWidth="2"
              strokeDasharray="5 4"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="1"
              strokeDashoffset={started ? 0 : 1}
              style={{ transition: started ? 'stroke-dashoffset 1.6s ease-out' : 'none' }}
            />
            <path
              d={buildPath(solid)}
              fill="none"
              stroke="#13acf0"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={started ? 0 : 1}
              style={{ transition: started ? 'stroke-dashoffset 1.4s ease-out 0.1s' : 'none' }}
            />
          </svg>
        </div>
      </div>
      <div className="ml-7 mt-1.5 flex justify-between text-[12px] text-[#8a8a8a]">
        {traditional.chartXLabels.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
      <div className="mt-3.5 flex flex-wrap justify-center gap-5">
        {traditional.chartLegend.map((leg, i) => (
          <div key={leg} className="flex items-center gap-[7px]">
            <span
              className="inline-block h-[9px] w-[9px] rounded-full"
              style={{ background: i === 0 ? '#13acf0' : '#9fd4ef' }}
            />
            <span className="text-[13px] text-[#1e1e1e]">{leg}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── animated percentage ───────────────────────────────────────
function AnimPct({
  value,
  started,
  delay = 0,
}: {
  value: string
  started: boolean
  delay?: number
}) {
  const numeric = parseFloat(value.replace(/[^0-9.]/g, ''))
  const suffix = value.replace(/[0-9.]/g, '')
  const [go, setGo] = useState(false)
  useEffect(() => {
    if (!started) return
    const t = setTimeout(() => setGo(true), delay)
    return () => clearTimeout(t)
  }, [started, delay])
  const count = useCountUp(Math.round(numeric * 100), 1200, go)
  const display = (count / 100).toFixed(2)
  return <>{started ? `${display}${suffix}` : `0${suffix}`}</>
}

function AnimInt({
  value,
  started,
  delay = 0,
}: {
  value: string
  started: boolean
  delay?: number
}) {
  const numeric = parseInt(value.replace(/[^0-9]/g, ''), 10)
  const suffix = value.replace(/[0-9]/g, '')
  const [go, setGo] = useState(false)
  useEffect(() => {
    if (!started) return
    const t = setTimeout(() => setGo(true), delay)
    return () => clearTimeout(t)
  }, [started, delay])
  const count = useCountUp(numeric, 1200, go)
  return <>{started ? `${count}${suffix}` : `0${suffix}`}</>
}

// ── RIGHT conversion list ─────────────────────────────────────
function ConversionList({ started }: { started: boolean }) {
  const { sandiego } = roadmap
  return (
    <div className="mt-6 rounded-2xl bg-white px-4 pb-4 pt-4 sm:px-7 sm:py-7">
      <span className="inline-block border-b-2 border-dashed border-[#cfcfcf] font-heading text-[clamp(18px,2vw,22px)] font-bold text-[#1e1e1e]">
        {sandiego.conversionTitle}
      </span>
      <div className="mt-[18px] flex items-baseline gap-3">
        <b className="text-[clamp(30px,3.6vw,40px)] font-bold leading-none tracking-[-0.02em] text-[#1e1e1e]">
          <AnimPct value={sandiego.conversionRate} started={started} delay={100} />
        </b>
        <span className="inline-flex items-center gap-[3px] text-[15px] font-bold text-[#16b821]">
          <UpArrow />
          <AnimInt
            value={sandiego.conversionBadge.replace(/[↑%]/g, '')}
            started={started}
            delay={200}
          />
          %
        </span>
      </div>

      <div className="mt-[22px] flex flex-col gap-[26px]">
        {sandiego.conversionRows.map((row, i) => (
          <div key={row.label} className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="text-[14px] font-medium leading-tight text-[#1e1e1e]">
                {row.label}
              </div>
              <div className="mt-1 text-[14px] font-medium text-[#4C4C4C]">{row.sessions}</div>
            </div>
            <div className="flex flex-none items-center gap-3">
              <span className="text-base font-semibold tracking-[-0.01em] text-[#1e1e1e]">
                <AnimPct value={row.pct} started={started} delay={200 + i * 100} />
              </span>
              <span className="inline-flex text-base font-semibold items-center gap-[3px] text-[15px] font-bold text-[#16b821]">
                <UpArrow />
                <AnimInt
                  value={row.arrow.replace(/[↑%]/g, '')}
                  started={started}
                  delay={300 + i * 100}
                />
                %
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function RoadmapSection() {
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
      { threshold: 0.2 },
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="bg-[#ceebff] px-4 py-20 lg:px-6">
      <div className="mx-auto max-w-[1328px]">
        <div className="mb-12 grid grid-cols-1 items-center gap-6 md:grid-cols-12 md:gap-12">
          <h2 className="font-darker text-[52px] md:col-span-6 lg:max-w-[400px] lg:col-span-7 capitalize font-bold leading-[0.85] tracking-[-0.03em] text-[#312730]">
            {roadmap.headline}
          </h2>
          <p className="rounded-[16px] md:col-span-6 lg:col-span-5 bg-white p-4 md:p-5 lg:p-8 text-[16px] leading-relaxed text-[#555]">
            {roadmap.result.split(/(30–50%)/).map((part, i) =>
              part === '30–50%' ? (
                <span key={i} className="font-semibold text-[#3863FF]">
                  {part}
                </span>
              ) : (
                part
              ),
            )}
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* LEFT — Traditional */}
          <div className="rounded-3xl bg-white/55 p-4 sm:p-8 lg:p-6 xl:p-8">
            <h3 className="mb-6 font-heading text-[clamp(22px,2.4vw,28px)] font-bold text-[#4c4c4c]">
              {roadmap.traditional.title}
            </h3>
            <ul className="flex flex-col gap-3.5">
              {roadmap.traditional.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-[15px] leading-snug text-[#555]"
                >
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-red-500">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M1.5 1.5l7 7M8.5 1.5l-7 7"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <LineChart started={started} />
          </div>

          {/* RIGHT — Sandiego */}
          <div className="rounded-3xl bg-[linear-gradient(180deg,#3863ff_0%,#adc8ff_100%)] p-4 sm:p-8 lg:p-6 xl:p-8">
            <h3 className="mb-6 font-heading text-[clamp(22px,2.4vw,28px)] font-bold text-white">
              {roadmap.sandiego.title}
            </h3>
            <ul className="flex flex-col gap-3.5">
              {roadmap.sandiego.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-[15px] leading-snug text-white"
                >
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-white">
                    <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M1.5 5l2.5 2.5 4.5-4.5"
                        stroke="#3863ff"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <ConversionList started={started} />
          </div>
        </div>
      </div>
    </section>
  )
}
