import Image from 'next/image'
import data from '../../website-data.json'

const { whySection } = data

const WarningIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
      fill="#FF4E4D"
    />
    <line x1="12" y1="9" x2="12" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="17" r="1" fill="white" />
  </svg>
)

function ProblemCard({ title, description }: { title: string; description: string }) {
  return (
    <div
      className="flex items-start gap-4 px-5 py-5 bg-white/60 md:backdrop-blur-sm border border-white/60"
      style={{ borderRadius: '12.25px' }}
    >
      <div className="shrink-0 mt-0.5">
        <img
          src="/danger.svg"
          alt=""
          aria-hidden="true"
          style={{ width: '30px', height: '30px' }}
        />
      </div>
      <div>
        <p className="text-[16px] font-bold text-[#111] leading-tight font-heading mb-1">{title}</p>
        <p className="text-[14px] text-[#555] leading-snug font-body">{description}</p>
      </div>
    </div>
  )
}

export default function WhySection() {
  const [first, ...rest] = whySection.problems
  const pairs = []
  for (let i = 0; i < rest.length; i += 2) pairs.push(rest.slice(i, i + 2))

  return (
    <section id="services" className="bg-[#ceebff] px-4 lg:px-6 py-16 md:py-20 relative">
      <div className="max-w-[1328px] mx-auto relative overflow-visible">
        {/* Glow — top right, contained within max-width */}
        <div className="absolute right-0 top-0 w-[520px] h-[520px] rounded-full bg-[rgba(35,112,255,0.5)] opacity-60 blur-3xl pointer-events-none" />

        {/* Woman image — contained within max-width, centered on glow */}
        <div
          className="hidden lg:block absolute w-[660px] z-20 pointer-events-none"
          style={{ right: '0px', top: '40px' }}
        >
          <Image
            src={whySection.image}
            alt="Why most websites don't convert"
            width={760}
            height={760}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        {/* Left content — restricted to ~55% so image doesn't overlap */}
        <div className="lg:w-[55%]">
          {/* Label */}
          <div className="flex flex-col gap-1 mb-5">
            <span className="text-[#ff4e4d] font-bold font-display" style={{ fontSize: '22px' }}>
              {whySection.label}
            </span>
            <svg
              width="74"
              height="3"
              viewBox="0 0 74 3"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mt-[-4px]"
            >
              <path
                d="M0.5 2.5C2.21765 1.68752 57.4686 -1.56242 73.5 2.5"
                stroke="#ff4e4d"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <h2
            className="font-bold text-[#111] tracking-[-0.02em] mb-5 font-darker"
            style={{ fontSize: '42px', lineHeight: '0.9' }}
          >
            Why Most Websites
            <br />
            Don&apos;t Convert Visitors into Clients
          </h2>

          <p
            className="text-[#444] mb-8 font-medium font-darker lg:max-w-[550px]"
            style={{ fontSize: '18px', lineHeight: '1.3' }}
          >
            {whySection.subheadline}
          </p>

          {/* Mobile image — above first card */}
          <div className="lg:hidden lg:my-6 mb-0 md:mb-0 -mx-4 h-[520px] overflow-hidden">
            <Image
              src={whySection.image}
              alt="Why most websites don't convert"
              width={900}
              height={900}
              className="w-full h-full object-cover object-[80%_top]"
              sizes="120vw"
            />
          </div>
        </div>

        {/* Bottom cards — full width 2×2 grid */}
        <div className="flex flex-col gap-4 relative z-30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ProblemCard title={first.title} description={first.description} />
          </div>
          {pairs.map((pair, pi) => (
            <div key={pi} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pair.map((p) => (
                <ProblemCard key={p.title} title={p.title} description={p.description} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
