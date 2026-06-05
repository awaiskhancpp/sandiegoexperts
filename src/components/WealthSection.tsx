'use client'

import { useRef } from 'react'
import data from '../../website-data.json'

const { statistics } = data
const [stat98, stat10k, stat50] = statistics.stats

const ArrowUp = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 33.752 40.501" fill="currentColor" className={className} aria-hidden="true">
    <path
      d="M 33.257 18.07 C 33.101 18.227 32.915 18.352 32.71 18.437 C 32.505 18.521 32.285 18.565 32.063 18.565 C 31.842 18.565 31.622 18.521 31.417 18.437 C 31.212 18.352 31.026 18.227 30.87 18.07 L 18.563 5.762 L 18.563 38.814 C 18.563 39.261 18.386 39.691 18.069 40.007 C 17.753 40.324 17.323 40.501 16.876 40.501 C 16.428 40.501 15.999 40.324 15.683 40.007 C 15.366 39.691 15.188 39.261 15.188 38.814 L 15.188 5.762 L 2.882 18.07 C 2.566 18.387 2.136 18.565 1.688 18.565 C 1.241 18.565 0.811 18.387 0.495 18.07 C 0.178 17.754 0 17.324 0 16.876 C 0 16.429 0.178 15.999 0.495 15.682 L 15.682 0.495 C 15.839 0.338 16.025 0.214 16.23 0.129 C 16.435 0.044 16.654 0 16.876 0 C 17.098 0 17.317 0.044 17.522 0.129 C 17.727 0.214 17.913 0.338 18.07 0.495 L 33.257 15.682 C 33.414 15.839 33.539 16.025 33.624 16.23 C 33.709 16.435 33.752 16.655 33.752 16.876 C 33.752 17.098 33.709 17.318 33.624 17.523 C 33.539 17.727 33.414 17.914 33.257 18.07 Z"
      fillRule="nonzero"
    />
  </svg>
)

const CrossPattern = () => (
  <svg
    viewBox="0 0 253.858 62.225"
    fill="currentColor"
    className="w-[60%] max-w-[256px] opacity-90"
    aria-hidden="true"
  >
    <path
      d="M 63.286 0 L 62.932 -0.354 L 37.476 25.102 L 37.83 25.456 L 38.184 25.81 L 63.64 0.354 L 63.286 0 Z M 26.517 36.77 L 26.163 36.416 L 0.706 61.871 L 1.06 62.225 L 1.414 62.579 L 26.871 37.124 L 26.517 36.77 Z M 62.224 62.225 L 62.578 61.871 L 37.124 36.416 L 36.77 36.77 L 36.416 37.124 L 61.87 62.579 L 62.224 62.225 Z M 25.456 25.456 L 25.81 25.102 L 0.354 -0.354 L 0 0 L -0.354 0.354 L 25.102 25.81 L 25.456 25.456 Z M 158.572 0 L 158.218 -0.354 L 132.762 25.102 L 133.116 25.456 L 133.47 25.81 L 158.926 0.354 L 158.572 0 Z M 121.803 36.77 L 121.449 36.416 L 95.993 61.871 L 96.347 62.225 L 96.701 62.579 L 122.157 37.124 L 121.803 36.77 Z M 157.511 62.225 L 157.865 61.871 L 132.41 36.416 L 132.056 36.77 L 131.702 37.124 L 157.157 62.579 L 157.511 62.225 Z M 120.742 25.456 L 121.096 25.102 L 95.64 -0.354 L 95.286 0 L 94.932 0.354 L 120.388 25.81 L 120.742 25.456 Z M 253.858 0 L 253.504 -0.354 L 228.048 25.102 L 228.402 25.456 L 228.756 25.81 L 254.212 0.354 L 253.858 0 Z M 217.089 36.77 L 216.735 36.416 L 191.279 61.871 L 191.633 62.225 L 191.987 62.579 L 217.443 37.124 L 217.089 36.77 Z M 252.798 62.225 L 253.152 61.871 L 227.696 36.416 L 227.342 36.77 L 226.988 37.124 L 252.444 62.579 L 252.798 62.225 Z M 216.028 25.456 L 216.382 25.102 L 190.926 -0.354 L 190.572 0 L 190.218 0.354 L 215.674 25.81 L 216.028 25.456 Z"
      fillRule="nonzero"
    />
  </svg>
)

function Deco({ basis, small = false }: { basis: string; small?: boolean }) {
  return (
    <div
      className="hidden h-[190px] items-center justify-center overflow-hidden rounded-full border border-[#d1e0ff] text-[#84a9f3] lg:flex"
      style={{ flex: `0 0 ${basis}` }}
    >
      {small ? <CrossPattern /> : <CrossPattern />}
    </div>
  )
}

function StatPill({
  stat,
  basis,
  dark = false,
}: {
  stat: { value: string; description: string; icon: boolean }
  basis: string
  dark?: boolean
}) {
  return (
    <div
      className={`flex min-h-[200px] h-auto w-full max-w-[560px] flex-col items-center justify-center gap-2 overflow-hidden rounded-full px-7 sm:gap-3 xl:min-h-0 xl:h-[190px] xl:w-auto xl:max-w-none xl:flex-row xl:items-center xl:gap-3 xl:px-[clamp(28px,4vw,60px)] sm:xl:gap-6 ${
        dark
          ? 'bg-[linear-gradient(180deg,#3863ff_45%,#bfd7ff_100%)]'
          : 'bg-[linear-gradient(180deg,#f4f8ff_0%,#f9fafc_100%)]'
      }`}
      style={{ flex: `0 0 ${basis}` }}
    >
      <div className="flex items-center gap-3 sm:gap-6 xl:gap-3">
        {stat.icon && (
          <span
            className={`flex h-12 w-12 flex-none items-center justify-center ${dark ? 'text-white' : 'text-[#0a0a0a]'}`}
          >
            <ArrowUp className="h-auto w-[34px]" />
          </span>
        )}
        <span
          className={`font-darker font-bold leading-[0.9] tracking-[-0.024em] text-[80px] ${dark ? 'text-white' : 'text-[#0a0a0a]'}`}
        >
          {stat.value}
        </span>
      </div>
      <span
        className={`whitespace-pre-line text-center text-[16px] font-medium leading-[1.3] lg:text-[18px] xl:text-left ${dark ? 'text-white/80' : 'text-[#6b7280]'}`}
      >
        {stat.description}
      </span>
    </div>
  )
}

export default function WealthSection() {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <section className="relative overflow-hidden bg-[#ceebff] px-4 py-[74px] lg:px-6">
      {/* soft blue glows */}
      <div className="pointer-events-none absolute right-[1%] top-10 z-0 h-[383px] w-[383px] rounded-full bg-[rgba(35,82,255,0.36)] opacity-60 blur-[60px]" />
      <div className="pointer-events-none absolute left-[-52px] top-[300px] z-0 h-[383px] w-[383px] rounded-full bg-[rgba(35,82,255,0.36)] opacity-60 blur-[60px]" />

      <div ref={ref} className="relative z-10 mx-auto max-w-[1296px]">
        {/* centered header */}
        <div className="mb-16 text-center">
          <span className="font-display text-[20px] font-bold tracking-[-0.02em] text-[#3863ff]">
            {statistics.label}
          </span>
          <svg
            width="74"
            height="3"
            viewBox="0 0 74 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto mt-[-4px]"
          >
            <path
              d="M0.5 2.5C2.21765 1.68752 57.4686 -1.56242 73.5 2.5"
              stroke="#3863FF"
              strokeLinecap="round"
            />
          </svg>
          <h2 className="mt-4 whitespace-pre-line font-darker text-[77px] font-semibold leading-[0.90] tracking-[-0.025em] text-[#171717]">
            {statistics.headline}
          </h2>
        </div>

        {/* Row 1: deco | 98% | deco */}
        <div className="flex flex-col items-center gap-4 lg:flex-row lg:flex-nowrap lg:items-stretch lg:gap-0">
          <Deco basis="30%" />
          <StatPill stat={stat98} basis="40%" />
          <Deco basis="30%" />
        </div>

        {/* Row 2: $10K+ | deco-sm | 50% dark */}
        <div className="mt-4 flex flex-col items-center gap-4 lg:mt-0 lg:flex-row lg:flex-nowrap lg:items-stretch lg:gap-0">
          <StatPill stat={stat10k} basis="39%" />
          <div className="hidden items-center justify-center lg:flex" style={{ flex: '0 0 21.3%' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/middle-plus.svg" alt="" style={{ width: '88px', height: '88px' }} />
          </div>
          <StatPill stat={stat50} basis="39.7%" dark />
        </div>
      </div>
    </section>
  )
}
