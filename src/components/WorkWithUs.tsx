'use client'

import data from '../../website-data.json'
import ArrowButton from '@/components/ui/ArrowButton'

const { workWithUs } = data

export default function WorkWithUs() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="bg-[#ceebff] py-20 px-4 lg:px-6">
      <div className="max-w-[1328px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <div className="flex flex-col gap-6">
          <div>
            <span className="text-[#3863ff] text-xl font-bold font-display">
              Work with <strong className="font-bold">San Diego Website Experts</strong>
            </span>
            <svg
              width="260"
              height="3"
              viewBox="0 0 260 3"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mt-[-4px]"
            >
              <path d="M0.5 2.5C8 1 200 -1 259.5 2.5" stroke="#3863FF" strokeLinecap="round" />
            </svg>
          </div>
          <h2 className="text-[42px] font-bold text-black leading-[0.97] tracking-[-1px] mb-6 font-darker">
            {workWithUs.headline}
          </h2>
          <div className="w-fit">
            <ArrowButton
              label={workWithUs.ctaButton}
              onClick={scrollToContact}
              variant="dark"
              size="md"
            />
          </div>
        </div>

        {/* Right */}
        <div>
          {workWithUs.body.split('\n\n').map((para, i) => (
            <p
              key={i}
              className={`text-[20px] text-[#111] font-darker font-medium leading-[28px] ${i > 0 ? 'mt-5' : ''}`}
            >
              {para.split('San Diego Website Experts').map((part, j, arr) => (
                <span key={j}>
                  {part}
                  {j < arr.length - 1 && (
                    <strong className="font-bold text-[#0a0a0a]">San Diego Website Experts</strong>
                  )}
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
