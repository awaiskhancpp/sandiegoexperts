'use client'

import { useState } from 'react'
import Image from 'next/image'
import data from '../../website-data.json'

const { caseStudies } = data

// optional list of {before, after} screenshots; falls back to 7 empty slots
const cases: { before?: string; after?: string }[] =
  (caseStudies as { cases?: { before?: string; after?: string }[] }).cases ??
  Array.from({ length: 7 }, () => ({}))

function ArrowBadge() {
  return (
    <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#bff04f]">
      <svg width="9" height="10" viewBox="0 0 9 10" fill="none" aria-hidden="true">
        <path
          d="M4.5 9.5V1M4.5 1L1 4.5M4.5 1L8 4.5"
          stroke="#1a1a1a"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

function Panel({ label, src }: { label: string; src?: string }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      {/* per-panel label shows only when the shared header is hidden (mobile) */}
      <span className="mb-2 text-center text-[12px] font-semibold uppercase tracking-[1px] text-[#8a8a8a] sm:hidden">
        {label}
      </span>
      <div className="relative h-[420px] w-full overflow-hidden rounded-[14px] bg-white p-[2.5px] [background:linear-gradient(150deg,#ff5b8a_0%,#ff4d6d_35%,#c84bff_100%)] md:h-[clamp(420px,50vw,600px)]">
        <div className="h-full w-full overflow-hidden rounded-[12px] bg-white">
          {src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={`${label} screenshot`}
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center px-4 text-center text-[12px] text-[#bbb]">
              {label} screenshot
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CaseStudies() {
  const [active, setActive] = useState(0)
  const current = cases[active] ?? {}

  return (
    <section id="case-studies" className="bg-[#ceebff] px-4 py-12 md:py-[70px] lg:px-6">
      {/* header */}
      <div className="mx-auto mb-8 max-w-[863px] text-center md:mb-12">
        <span className="font-display text-[22px] font-bold tracking-[-0.02em] text-[#3863ff]">
          {caseStudies.label}
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/curvedline.svg"
          alt=""
          className="mx-auto mt-1.5 h-auto"
          style={{ width: '127px' }}
        />
        <h2 className="mt-[18px] text-balance font-darker text-[52px] font-bold leading-[0.95] tracking-[-0.03em] text-[#312730]">
          {caseStudies.headline}
        </h2>
      </div>

      {/* card — translucent container; before/after card floats taller on top of it */}
      <div className="relative mx-auto flex max-w-[1330px] flex-col rounded-2xl bg-white/[0.32] p-4 lg:mt-[130px] lg:flex-row md:min-h-[480px] lg:min-h-[520px] xl:min-h-[560px] md:p-6">
        {/* LEFT brand */}
        <div className="flex min-w-0 flex-col p-2 lg:w-1/2 md:my-auto md:p-4">
          <Image
            src={caseStudies.clientLogo}
            alt="ALUNIA"
            width={160}
            height={52}
            className="h-[52px] w-auto self-start object-contain"
          />
          <p className="mt-2 lg:mt-6 max-w-[470px] font-body  text-[16px] leading-[1.2] text-[#0c1509] md:mt-10">
            {caseStudies.clientDesc}
          </p>
          <div className="mt-auto flex flex-row gap-3 pt-6 lg:pt-10 md:flex-row md:gap-5 md:pt-20">
            {caseStudies.metrics.map((m) => (
              <div
                key={m.label}
                className="min-w-0 flex-1 rounded-xl bg-white p-2.5 shadow-[0_1px_3px_rgba(16,24,40,0.05)] md:p-[22px_24px_18px]"
              >
                <div className="flex items-center gap-[9px]">
                  <span className="font-body text-[24px] font-bold leading-[1.05] tracking-[-0.02em] text-[#111]">
                    {m.value}
                  </span>
                  <ArrowBadge />
                </div>
                <div className="mt-2 text-[14px] font-medium leading-[1.3] text-[#858585]">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT before/after — taller, floats on top of the translucent container */}
        <div className="mt-4 flex min-w-0 flex-col rounded-3xl bg-white p-3.5 shadow-[0_30px_70px_-28px_rgba(40,90,200,0.30)] lg:absolute lg:right-6 lg:top-1/2 lg:mt-0 lg:w-[47%] lg:-translate-y-1/2 md:p-6">
          <div className="mb-3 hidden gap-3 sm:flex md:gap-[18px]">
            <span className="flex-1 text-center text-[13px] font-semibold uppercase tracking-[1px] text-[#8a8a8a]">
              Before
            </span>
            <span className="flex-1 text-center text-[13px] font-semibold uppercase tracking-[1px] text-[#8a8a8a]">
              After
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-3 sm:flex-row md:gap-[18px]">
            <Panel label="Before" src={current.before} />
            <Panel label="After" src={current.after} />
          </div>

          {/* nav */}
          <div className="mt-3.5 flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setActive((s) => Math.max(0, s - 1))}
                aria-label="Previous"
                className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-[#ddd] bg-white text-[15px] text-[#333] transition-colors hover:bg-[#f4f4f4]"
              >
                ←
              </button>
              <button
                onClick={() => setActive((s) => Math.min(cases.length - 1, s + 1))}
                aria-label="Next"
                className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-[#111] bg-[#111] text-[15px] text-white transition-colors hover:bg-[#333]"
              >
                →
              </button>
            </div>
            <div className="flex gap-1.5">
              {cases.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to case study ${i + 1}`}
                  className={`h-2 rounded-[5px] transition-all duration-200 ${
                    active === i ? 'w-[22px] bg-[#111]' : 'w-2 bg-[#ccc]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
