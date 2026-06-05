'use client'

import data from '../../website-data.json'
import Image from 'next/image'

const { brand } = data

const CONTACTS = [
  { href: brand.emailHref, label: brand.email, icon: '/footer-email.svg' },
  { href: brand.phoneHref, label: brand.phone, icon: '/footer-call.svg' },
  { href: '#', label: brand.website, icon: '/footer-location.svg' },
]

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-white px-5 lg:px-6 pb-8 pt-8 lg:pt-10">
      <div className="relative mx-auto max-w-[1280px]">
        {/* ── Mobile layout (below md) ──────────────────────────── */}
        <div className="flex flex-col items-center md:hidden">
          {/* Logo */}
          <div className="w-[min(440px,75%)] mb-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/sdwe-blue.png" alt={brand.name} className="block h-auto w-full mx-auto" />
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-[#e8e8e8] w-full mb-6" />

          {/* Two-column grid + website centered */}
          <div className="flex flex-col items-center gap-4">
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 justify-items-center">
              {CONTACTS.slice(0, 2).map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="flex items-center gap-2 no-underline text-[#333] transition-colors hover:text-[#3863ff]"
                >
                  <Image src={c.icon} alt="" width={18} height={18} className="shrink-0" />
                  <span className="whitespace-nowrap text-[16px] font-medium font-urbanist">
                    {c.label}
                  </span>
                </a>
              ))}
            </div>
            <a
              href={CONTACTS[2].href}
              className="flex items-center gap-2 no-underline text-[#333] transition-colors hover:text-[#3863ff]"
            >
              <Image src={CONTACTS[2].icon} alt="" width={18} height={18} className="shrink-0" />
              <span className="whitespace-nowrap text-[16px] font-medium font-urbanist">
                {CONTACTS[2].label}
              </span>
            </a>

            {/* Copyright */}
            <span className="whitespace-nowrap text-[14px] font-normal text-[#999] font-urbanist mt-1">
              © 2026 {brand.name}. All rights reserved.
            </span>
          </div>
        </div>

        {/* ── Desktop layout (md+) — original frosted glass style ── */}
        <div className="hidden md:flex md:flex-col relative">
          {/* Go To Top — absolute, overlays on logo */}
          <div
            className="absolute top-0 right-0 z-[3] hidden lg:flex group items-center gap-[14px] cursor-pointer"
            role="button"
            tabIndex={0}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ')
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <span className="whitespace-nowrap text-[16px] font-semibold text-black/60 font-urbanist">
              Go To Top
            </span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Go to top"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3863ff] transition-all duration-200  group-hover:shadow-[0_10px_24px_rgba(56,99,255,0.42)]"
            >
              <svg width="14" height="17" viewBox="0 0 9.6 12" fill="#fff" aria-hidden="true">
                <path
                  d="M 4.8 12 C 4.303 12 3.9 11.597 3.9 11.1 L 3.9 3.134 L 1.549 5.724 C 1.204 6.082 0.634 6.093 0.276 5.749 C -0.082 5.404 -0.093 4.834 0.251 4.476 L 4.151 0.276 C 4.321 0.1 4.555 0 4.8 0 C 5.045 0 5.279 0.1 5.449 0.276 L 9.349 4.476 C 9.693 4.834 9.682 5.404 9.324 5.749 C 8.966 6.093 8.396 6.082 8.051 5.724 L 5.7 3.134 L 5.7 11.1 C 5.7 11.597 5.297 12 4.8 12 Z"
                  fillRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Wordmark */}
          <div className="relative z-[1] mx-auto -mt-[26px] w-[min(1054px,92%)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/sdwe-blue.png" alt={brand.name} className="block h-auto w-full" />
          </div>

          {/* Frosted glass contact bar */}
          <div className="relative z-[2] -mt-[44px] flex flex-col items-stretch justify-between gap-4 rounded-lg border border-[rgba(56,99,255,0.19)] px-4 py-[14px] backdrop-blur-[24.7px] lg:flex-row lg:items-center lg:px-[26px]">
            <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              {CONTACTS.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="flex h-11 items-center gap-2 rounded bg-white no-underline shadow-[0_1px_2px_rgba(16,24,40,0.06)] transition-all duration-150 hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(56,99,255,0.16)]"
                >
                  <span className="shrink-0 ml-3">
                    <Image src={c.icon} alt="" width={18} height={18} />
                  </span>
                  <span className="whitespace-nowrap text-[14px] font-medium text-black font-urbanist pr-3">
                    {c.label}
                  </span>
                </a>
              ))}
            </div>
            <span className="whitespace-nowrap text-center text-[13px] text-[#1b1b1b] font-urbanist">
              © 2026 {brand.name}. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
