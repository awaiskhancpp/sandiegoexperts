'use client'

import data from '../../website-data.json'
import ArrowButton from '@/components/ui/ArrowButton'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Keyboard } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const { testimonials } = data

export default function VideoTestimonials() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="bg-[#DDF1FF] py-12 md:py-20 px-4 lg:px-6">
      <div className="max-w-[1322px] mx-auto">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6 mb-8 md:mb-10">
          <div>
            <span
              className="text-[#3863ff] text-xl font-bold"
              style={{ fontFamily: 'var(--font-dancing-script)' }}
            >
              {testimonials.label}
            </span>
            <svg
              width="74"
              height="3"
              viewBox="0 0 74 3"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mt-1"
            >
              <path
                d="M0.5 2.5C2.21765 1.68752 57.4686 -1.56242 73.5 2.5"
                stroke="#3863FF"
                strokeLinecap="round"
              />
            </svg>
            <h2
              className="text-[32px] sm:text-[42px] md:text-[52px] font-bold leading-[1.1] tracking-[-1.5px] text-[rgb(49,39,48)] mt-3"
              style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
            >
              {testimonials.headline}
            </h2>
          </div>

          <div className="self-start md:self-auto shrink-0">
            <ArrowButton label={testimonials.ctaButton} onClick={scrollToContact} size="sm" />
          </div>
        </div>

        {/* Carousel below xl */}
        <div className="xl:hidden">
          <Swiper
            modules={[Navigation, Pagination, Keyboard]}
            spaceBetween={16}
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 16,
              },
            }}
            pagination={{ clickable: true }}
            keyboard={true}
            className="testimonial-swiper"
          >
            {testimonials.people.map((person, i) => (
              <SwiperSlide key={`${person.name}-${i}`}>
                <div
                  className="relative rounded-2xl overflow-hidden border border-[rgb(76,76,76)] cursor-pointer group h-[600px] md:h-[540px]"
                  style={{
                    backgroundImage: `url(${testimonials.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Play button — top right */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-white/35 transition-colors">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 20 20"
                      fill="white"
                      className="ml-0.5"
                      aria-hidden="true"
                    >
                      <path d="M4 3.5L17 10L4 16.5V3.5Z" />
                    </svg>
                  </div>

                  {/* Name / role — bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-white font-bold text-[17px] leading-tight font-heading">
                      {person.name}
                    </p>
                    <p className="text-white/70 text-[14px] mt-0.5 font-body">{person.role}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Grid on xl+ */}
        <div className="hidden xl:grid grid-cols-4 gap-4 md:gap-5">
          {testimonials.people.map((person, i) => (
            <div
              key={`${person.name}-${i}`}
              className="relative rounded-2xl overflow-hidden border border-[rgb(76,76,76)] cursor-pointer group h-[600px] md:h-[540px]"
              style={{
                backgroundImage: `url(${testimonials.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Play button — top right */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-white/35 transition-colors">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 20 20"
                  fill="white"
                  className="ml-0.5"
                  aria-hidden="true"
                >
                  <path d="M4 3.5L17 10L4 16.5V3.5Z" />
                </svg>
              </div>

              {/* Name / role — bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white font-bold text-[17px] leading-tight font-heading">
                  {person.name}
                </p>
                <p className="text-white/70 text-[14px] mt-0.5 font-body">{person.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
