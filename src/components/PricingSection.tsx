'use client'

import data from '../../website-data.json'
import ArrowButton from '@/components/ui/ArrowButton'

const { pricing } = data

interface PricingCardProps {
  label: string
  desc: string
  price: string
  suffix: string
  features: string[]
}

function PricingCard({
  label,
  desc,
  price,
  suffix,
  features,
  compact,
  gradient,
}: PricingCardProps & { compact?: boolean; gradient: string }) {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="card-hover relative w-full max-w-[610px] mx-auto rounded-[20px] flex flex-col overflow-hidden">
      {/* Top: blue gradient section */}
      <div
        className={`${gradient} rounded-[24px] z-10 flex flex-col bg-white ${compact ? 'p-5 sm:p-6' : 'p-6 sm:p-8'}`}
      >
        {/* Label + desc */}
        <div className="mb-5">
          <p className="font-semibold text-[24px] leading-[1.2] text-white mb-2.5 font-body">
            {label}
          </p>
          <p className="font-medium text-[16px] leading-[22px] text-white font-body">{desc}</p>
        </div>

        {/* Price row */}
        <div className="flex items-end gap-0.5 mb-6">
          <span className="font-bold text-[36px] leading-[100%] text-white font-body">{price}</span>
          {suffix && (
            <span className="font-medium text-[14px] leading-[20px] text-white font-body">
              {suffix}
            </span>
          )}
        </div>

        {/* CTA Button */}
        <ArrowButton
          label="Claim Your Plan"
          onClick={scrollToContact}
          variant="dark"
          size="md"
          fullWidth
          className="!bg-[#05080c]"
        />
      </div>

      {/* Bottom: features list */}
      <div
        className={`bg-white rounded-b-[20px] mx-auto -mt-[10px] w-[96%] flex flex-col gap-3 sm:gap-4 ${compact ? 'p-4 sm:p-5 pb-6 sm:pb-8' : 'p-5 sm:p-7 pb-8 sm:pb-10'}`}
      >
        {features.map((f) => (
          <div key={f} className="flex items-center gap-2">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className="shrink-0"
              aria-hidden="true"
            >
              <path
                d="M3.5 9.5L7 13L14.5 5"
                stroke="rgb(100,100,100)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-medium text-[16px] leading-[22px] text-black font-body">{f}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-[#ceebff] py-12 md:py-16 px-4 lg:px-6">
      <div className="max-w-[1320px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex flex-col items-center mb-1">
            <span className="text-[#3863ff] text-[22px] sm:text-[24px] font-bold font-display">
              {pricing.label}
            </span>
            <svg
              width="74"
              height="3"
              viewBox="0 0 74 3"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mt-[-2px]"
            >
              <path
                d="M0.5 2.5C2.21765 1.68752 57.4686 -1.56242 73.5 2.5"
                stroke="#3863FF"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h2 className="font-semibold text-[52px] leading-[0.95] tracking-[-1.56px] text-[rgb(26,22,21)] text-center font-darker">
            {pricing.headline}
          </h2>
        </div>

        {/* Cards — single col on mobile, row on lg+ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6 items-start md:">
          {pricing.plans.map((p, i) => (
            <PricingCard
              key={p.label}
              label={p.label}
              desc={p.desc}
              price={p.price}
              suffix={p.suffix}
              features={p.features}
              compact={i === 1}
              gradient={`pricing-gradient-${i + 1}`}
            />
          ))}
        </div>

        <p className="text-center text-[14px] sm:text-[16px] text-[#555] mt-8 md:mt-10 font-body">
          {pricing.trust}
        </p>
      </div>
    </section>
  )
}
