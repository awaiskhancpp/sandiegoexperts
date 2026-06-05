import data from '../../website-data.json'

const { process } = data

export default function ProcessSection() {
  return (
    <section className="bg-[#ceebff] py-20 px-4 lg:px-6">
      <div className="max-w-[1328px] mx-auto">
        {/* Headline */}
        <h2 className="text-center text-[42px] font-bold text-[#312730] mb-16 leading-[0.95] tracking-[-0.03em] font-darker">
          {process.headline}
        </h2>

        {/* Cards row */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  xl:gap-[30px] max-w-[1328px] mx-auto">
          {/* Dashed connector line — only when 4 cols are fully visible */}
          <div className="hidden lg:block absolute border-t-2 border-dashed border-[rgb(182,182,182)] opacity-50 top-1/2 -translate-y-1/2 left-[5%] right-[5%] z-0" />

          {process.steps.map((step, i) => (
            <div
              key={step.num}
              className="card-hover relative z-10 h-full lg:min-h-[330px] rounded-xl flex flex-col items-center p-6 lg:p-4 xl:p-8 text-center border border-white/50 md:backdrop-blur-[12px]"
              style={{ background: 'rgba(255,255,255,0.55)' }}
            >
              {/* Blue number badge with gradient border */}
              <div
                className="rounded-[16px] mb-6 flex-shrink-0 p-[3px]"
                style={{
                  background: 'linear-gradient(180deg, #CEEBFF 0%, #3863FF 47.38%, #CEEBFF 88.94%)',
                }}
              >
                <div
                  className="flex items-center justify-center rounded-[13px] bg-[#3863ff]"
                  style={{ width: 80, height: 80 }}
                >
                  <span className="text-[34px] font-body font-medium text-white leading-none">
                    {step.num}
                  </span>
                </div>
              </div>

              <h3 className="font-darker text-[24px] font-bold leading-[22px] tracking-[-0.02em] text-[#0a0a0a] mb-3">
                {step.title}
              </h3>
              <p className="font-darker text-[18px] font-normal leading-snug text-[#555]">
                {step.description}
              </p>

              {/* Caret — absolute, half inside card half outside, not on last card */}
              {i < process.steps.length - 1 && (
                <span className="hidden lg:flex absolute -right-[20px] top-1/2 -translate-y-1/2 z-10 h-[40px] w-[40px] items-center justify-center rounded-full bg-white shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/CaretDoubleRight.svg" alt="" className="h-[24px] w-[24px]" />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
