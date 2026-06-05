'use client'

import { useState } from 'react'
import Image from 'next/image'
import data from '../../website-data.json'
import ArrowButton from '@/components/ui/ArrowButton'

const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

export default function Header() {
  const { brand, header } = data
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const scrollToSection = (href: string) => {
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 px-3 sm:px-5 md:px-8 py-3 md:py-4 pointer-events-none">
      <div className="max-w-[1328px] mx-auto bg-white shadow-sm pointer-events-auto rounded-[28px] lg:rounded-full">
        {/* ── Main bar ─────────────────────────────────────── */}
        <div className="flex items-center justify-between p-3 md:p-4">
          {/* Logo */}
          <Image
            src={brand.logoHeader}
            alt={brand.name}
            width={160}
            height={44}
            className="h-8 sm:h-9 md:h-11 w-auto object-contain"
            priority
          />

          {/* Desktop controls */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-1">
              {header.navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="px-3 py-2 text-[16px] font-medium text-[#333] rounded-full hover:bg-[#f0f0f0] transition-colors duration-150 font-body cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="w-px h-6 bg-[rgba(5,8,12,0.1)]" />

            {/* WhatsApp button */}
            <a
              href={brand.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full no-underline transition-all duration-200 hover:scale-[1.08] hover:brightness-95"
              style={{ background: 'linear-gradient(135deg, #25d366 0%, #128c4e 100%)' }}
              aria-label="Chat on WhatsApp"
            >
              <span className="text-white">
                <WhatsAppIcon />
              </span>
            </a>

            <div className="w-px h-6 bg-[rgba(5,8,12,0.1)]" />

            <ArrowButton label={header.cta.label} onClick={scrollToContact} size="sm" />
          </div>

          {/* Mobile right — WhatsApp icon + hamburger */}
          <div className="flex lg:hidden items-center gap-2.5">
            <a
              href={brand.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-9 h-9 rounded-full no-underline"
              style={{
                background: 'linear-gradient(135deg, #25d366 0%, #128c4e 100%)',
              }}
              aria-label="Chat on WhatsApp"
            >
              <span className="text-white">
                <WhatsAppIcon />
              </span>
            </a>

            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="flex flex-col justify-center items-center w-9 h-9 gap-[5px] cursor-pointer"
              aria-label="Toggle menu"
            >
              <span
                className="block w-5 h-0.5 bg-[#05080c] rounded-full transition-all duration-300 origin-center"
                style={{ transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none' }}
              />
              <span
                className="block w-5 h-0.5 bg-[#05080c] rounded-full transition-all duration-300"
                style={{ opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block w-5 h-0.5 bg-[#05080c] rounded-full transition-all duration-300 origin-center"
                style={{ transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }}
              />
            </button>
          </div>
        </div>

        {/* ── Mobile drawer ─────────────────────────────────── */}
        <div
          className="lg:hidden overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: menuOpen ? 360 : 0, opacity: menuOpen ? 1 : 0 }}
        >
          <div className="flex flex-col gap-3 px-4 pb-4">
            <div className="h-px w-full bg-[rgba(5,8,12,0.08)]" />

            {/* Mobile nav links */}
            <div className="flex flex-col gap-1">
              {header.navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left px-4 py-2.5 text-[14px] font-medium text-[#333] rounded-xl hover:bg-[#f0f0f0] transition-colors duration-150 font-body cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="h-px w-full bg-[rgba(5,8,12,0.08)]" />

            <button
              onClick={() => {
                setMenuOpen(false)
                window.dispatchEvent(new Event('open-booking-modal'))
              }}
              className="w-full flex items-center gap-2 rounded-full pl-5 pr-1.5 py-1.5 border-none cursor-pointer bg-[#05080c] btn-press"
            >
              <span className="flex-1 text-left text-[16px] font-medium text-[#e1e1e1] font-body">
                Book a Free Consultation
              </span>
              <span className="w-9 h-9 rounded-full bg-[#e1e1e1] flex items-center justify-center shrink-0">
                <svg width="14" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
                  <path
                    d="M1 6H15M15 6L10 1M15 6L10 11"
                    stroke="#05080c"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
