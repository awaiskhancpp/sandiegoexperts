'use client'

import { useState } from 'react'
import data from '../../website-data.json'

const { faq } = data

interface FAQItemProps {
  q: string
  a: string
  isOpen: boolean
  onToggle: () => void
}

function FAQItem({ q, a, isOpen, onToggle }: FAQItemProps) {
  return (
    <div
      onClick={onToggle}
      className={`w-full rounded-lg border overflow-hidden cursor-pointer p-[10px_12px] transition-colors duration-200 ${
        isOpen ? 'border-[#3863ff]/20 bg-white' : 'border-[rgb(233,233,233)]'
      }`}
      style={{ backgroundColor: isOpen ? '#fff' : 'rgb(248,249,250)' }}
      role="button"
      aria-expanded={isOpen}
    >
      {/* Question row */}
      <div className="flex flex-row justify-between items-center px-[15px] py-[15px] gap-4">
        <span
          className={`font-bold text-[17px] sm:text-[18px] md:text-[18px] leading-[1.3] flex-1 transition-colors duration-200 ${
            isOpen ? 'text-[#05080c]' : 'text-[rgb(30,30,30)]'
          }`}
        >
          {q}
        </span>
        {/* + / — icon with rotation */}
        <div
          className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-0'}`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
            className="transition-all duration-300"
          >
            {/* Vertical bar — fades out when open */}
            <rect
              x="5.5"
              y="0"
              width="3"
              height="14"
              rx="1.5"
              fill="rgb(30,30,30)"
              className="origin-center transition-all duration-300"
              style={{
                transform: isOpen ? 'rotate(90deg) scale(0)' : 'rotate(0deg) scale(1)',
                opacity: isOpen ? 0 : 1,
              }}
            />
            {/* Horizontal bar — always visible */}
            <rect x="0" y="5.5" width="14" height="3" rx="1.5" fill="rgb(30,30,30)" />
          </svg>
        </div>
      </div>

      {/* Answer with smooth height animation */}
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{
          gridTemplateRows: isOpen ? '1fr' : '0fr',
        }}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 pt-0">
            <p className="font-medium text-[16px] sm:text-[16px] leading-[1.6] text-[rgb(76,76,76)]">
              {a}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number>(0)

  // Flatten items into a single list with indices for accordion tracking
  const allItems = [
    ...faq.left.map((item, i) => ({ ...item, globalIndex: i })),
    ...faq.right.map((item, i) => ({ ...item, globalIndex: faq.left.length + i })),
  ]

  const handleToggle = (index: number) => {
    setOpenIndex(index)
  }

  return (
    <section id="faq" className="bg-[rgb(206,235,255)] py-12 md:py-16 lg:py-[70px] px-4 lg:px-6">
      <div className="max-w-[1280px] mx-auto">
        <h2
          className="font-bold text-[52px] leading-[1.1] tracking-[-1.5px] text-center mb-8 md:mb-12 font-darker"
          style={{ color: 'rgb(49,39,48)' }}
        >
          {faq.headline}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {/* Left column */}
          <div className="flex flex-col gap-4 md:gap-5">
            {faq.left.map((item, i) => (
              <FAQItem
                key={i}
                q={item.q}
                a={item.a}
                isOpen={openIndex === i}
                onToggle={() => handleToggle(i)}
              />
            ))}
          </div>
          {/* Right column */}
          <div className="flex flex-col gap-4 md:gap-5">
            {faq.right.map((item, i) => {
              const globalIndex = faq.left.length + i
              return (
                <FAQItem
                  key={i}
                  q={item.q}
                  a={item.a}
                  isOpen={openIndex === globalIndex}
                  onToggle={() => handleToggle(globalIndex)}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
