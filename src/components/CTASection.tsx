'use client'

import { useState, useEffect, Fragment } from 'react'
import { useRouter } from 'next/navigation'
import data from '../../website-data.json'
import { isValidEmail, formatUSPhone, isValidUSPhone } from '@/lib/forms'
import ArrowButton from '@/components/ui/ArrowButton'

const { contact, brand } = data

// ── Constants ────────────────────────────────────────────────────────
const MONTHS_CAL = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
const DAYS_CAL = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function getDaysInMonth(y: number, m: number) {
  return new Date(y, m + 1, 0).getDate()
}
function getFirstDay(y: number, m: number) {
  return new Date(y, m + 1, 1).getDay()
}

// ── Cal.com API helpers ──────────────────────────────────────────────
async function fetchAvailableDays(year: number, month: number): Promise<Set<number>> {
  const days = new Set<number>()
  const mm = String(month + 1).padStart(2, '0')
  const start = `${year}-${mm}-01`
  const lastDay = new Date(year, month + 1, 0).getDate()
  const end = `${year}-${mm}-${String(lastDay).padStart(2, '0')}`

  const res = await fetch(
    `/api/calcom/slots?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`,
  )
  if (!res.ok) throw new Error('Failed to fetch availability')
  const data = await res.json()
  // Cal.com v2 returns: { data: { "2026-06-03": [{ start: "2026-06-03T16:00:00.000Z" }, ...] } }
  const slots = data.data ?? data.slots ?? data
  for (const key of Object.keys(slots)) {
    const arr = slots[key]
    if (Array.isArray(arr) && arr.length > 0) {
      // key is "YYYY-MM-DD" — extract day
      const parts = key.split('-')
      if (parts.length === 3) {
        const d = parseInt(parts[2], 10)
        const y = parseInt(parts[0], 10)
        const m = parseInt(parts[1], 10) - 1
        if (y === year && m === month) {
          days.add(d)
        }
      }
    }
  }
  return days
}

async function fetchTimeSlots(
  year: number,
  month: number,
  day: number,
): Promise<{ time: string; iso: string }[]> {
  const mm = String(month + 1).padStart(2, '0')
  const dd = String(day).padStart(2, '0')
  const start = `${year}-${mm}-${dd}`
  const end = `${year}-${mm}-${dd}`

  const res = await fetch(
    `/api/calcom/slots?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`,
  )
  if (!res.ok) throw new Error('Failed to fetch time slots')
  const data = await res.json()
  // Cal.com v2 returns: { data: { "2026-06-03": [{ start: "2026-06-03T16:00:00.000Z" }, ...] } }
  const slots = data.data ?? data.slots ?? data
  const entries: { time: string; iso: string }[] = []

  for (const [dateKey, slotArr] of Object.entries(slots)) {
    if (Array.isArray(slotArr)) {
      for (const slot of slotArr) {
        if (slot?.start) {
          const date = new Date(slot.start)
          const time = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          })
          entries.push({ time, iso: slot.start })
        }
      }
    }
  }

  return entries
}

async function submitBooking({
  slotIso,
  name,
  email,
  phone,
  notes,
}: {
  slotIso: string
  name: string
  email: string
  phone: string
  notes: string
}): Promise<{ uid: string }> {
  const res = await fetch('/api/calcom/book', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ start: slotIso, name, email, phone, notes }),
  })

  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.error ?? 'Booking failed. Please try another time.')
  }

  const uid = data.data?.uid ?? data.data?.booking?.uid ?? data.data?.id?.toString() ?? 'CONFIRMED'
  return { uid }
}

// ── Calendar picker ──────────────────────────────────────────────────
interface SelectedDate {
  year: number
  month: number
  day: number
}

function CalPicker({
  onSelect,
  selectedDate,
}: {
  onSelect: (d: SelectedDate) => void
  selectedDate: SelectedDate | null
}) {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [avail, setAvail] = useState<Set<number>>(new Set())
  const [busy, setBusy] = useState(true)

  const [apiError, setApiError] = useState('')

  useEffect(() => {
    setBusy(true)
    setApiError('')
    fetchAvailableDays(year, month)
      .then((d) => {
        setAvail(d)
        setBusy(false)
      })
      .catch(() => {
        setApiError('Unable to load availability. Please try again.')
        setBusy(false)
      })
  }, [year, month])

  const prev = () => (month === 0 ? (setYear((y) => y - 1), setMonth(11)) : setMonth((m) => m - 1))
  const next = () => (month === 11 ? (setYear((y) => y + 1), setMonth(0)) : setMonth((m) => m + 1))

  const cells: (number | null)[] = []
  for (let i = 0; i < getFirstDay(year, month); i++) cells.push(null)
  for (let d = 1; d <= getDaysInMonth(year, month); d++) cells.push(d)
  const todayKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`

  return (
    <div>
      {apiError && <p className="text-[12px] text-red-500 mb-3 font-geist-body">{apiError}</p>}
      {/* Month nav */}
      <div className="flex items-center justify-between mb-3.5">
        <button
          onClick={prev}
          className="w-7 h-7 rounded-full border border-[#e5e5e5] bg-white cursor-pointer flex items-center justify-center hover:bg-[#f5f5f5] transition-colors"
          aria-label="Previous month"
        >
          <svg width="12" height="12" viewBox="0 0 17 14" fill="none">
            <path
              d="M15.1875 6.75H1.125M6.75 1.125L1.125 6.75L6.75 12.375"
              stroke="#05080c"
              strokeWidth="1.6875"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <span className="font-semibold text-[14px] text-[#111] font-geist-body">
          {MONTHS_CAL[month]} {year}
        </span>
        <button
          onClick={next}
          className="w-7 h-7 rounded-full border border-[#e5e5e5] bg-white cursor-pointer flex items-center justify-center hover:bg-[#f5f5f5] transition-colors"
          aria-label="Next month"
        >
          <svg width="12" height="12" viewBox="0 0 17 14" fill="none">
            <path
              d="M1.125 6.75H15.1875M9.5625 12.375L15.1875 6.75L9.5625 1.125"
              stroke="#05080c"
              strokeWidth="1.6875"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-[3px] mb-1.5">
        {DAYS_CAL.map((d) => (
          <div
            key={d}
            className="text-center text-[10px] font-semibold text-[#aaa] py-0.5 font-geist-body"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Cells */}
      {busy ? (
        <p className="text-center text-[12px] text-[#aaa] py-3 font-geist-body">Loading…</p>
      ) : (
        <div key={`${year}-${month}`} className="grid grid-cols-7 gap-[3px] booking-stagger">
          {cells.map((d, i) => {
            if (!d) return <div key={i} />
            const cellDate = new Date(year, month, d)
            const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
            const maxDate = new Date(todayStart.getTime() + 30 * 24 * 60 * 60 * 1000)
            const isPast = cellDate < todayStart
            const isTooFar = cellDate > maxDate
            const isAvail = avail.has(d) && !isPast && !isTooFar
            const isSel =
              selectedDate &&
              selectedDate.year === year &&
              selectedDate.month === month &&
              selectedDate.day === d
            const isToday = `${year}-${month}-${d}` === todayKey
            return (
              <button
                key={i}
                disabled={!isAvail}
                onClick={() => isAvail && onSelect({ year, month, day: d })}
                className="h-[34px] rounded-[7px] border-none text-[12px] transition-all duration-150 font-geist-body"
                style={
                  {
                    '--i': i,
                    fontWeight: isSel ? 700 : 400,
                    cursor: isAvail ? 'pointer' : 'default',
                    background: isSel
                      ? '#05080c'
                      : isToday
                        ? 'rgba(5,8,12,0.08)'
                        : isAvail
                          ? 'rgba(5,8,12,0.04)'
                          : 'transparent',
                    color: isSel ? '#fff' : !isAvail ? '#ccc' : isToday ? '#05080c' : '#111',
                    boxShadow: isSel ? '0 4px 12px rgba(5,8,12,0.2)' : 'none',
                    transform: isSel ? 'scale(1.08)' : 'scale(1)',
                    outline: isToday && !isSel ? '1px solid rgba(5,8,12,0.2)' : 'none',
                  } as React.CSSProperties
                }
              >
                {d}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ── Time slot grid ───────────────────────────────────────────────────
function TimeSlots({
  date,
  onSelect,
  selected,
}: {
  date: SelectedDate
  onSelect: (t: string, iso: string) => void
  selected: string | null
}) {
  const [slots, setSlots] = useState<{ time: string; iso: string }[]>([])
  const [busy, setBusy] = useState(true)

  useEffect(() => {
    if (!date) return
    setBusy(true)
    fetchTimeSlots(date.year, date.month, date.day).then((s) => {
      setSlots(s)
      setBusy(false)
    })
  }, [date])

  if (busy)
    return (
      <p className="text-center text-[12px] text-[#aaa] py-4 font-geist-body">
        Loading available slots…
      </p>
    )

  if (slots.length === 0)
    return (
      <p className="text-center text-[12px] text-[#aaa] py-4 font-geist-body">
        No times available on this day. Please pick another date.
      </p>
    )

  return (
    <div>
      <p className="text-[12px] text-[#888] mb-2.5 font-geist-body">
        {MONTHS_CAL[date.month]} {date.day}, {date.year}
      </p>
      <div className="grid grid-cols-2 gap-[7px] booking-stagger">
        {slots.map((slot, i) => {
          const isSel = selected === slot.time
          return (
            <button
              key={slot.time}
              onClick={() => onSelect(slot.time, slot.iso)}
              className="py-[9px] rounded-lg text-[12px] cursor-pointer transition-all duration-150 font-geist-body"
              style={
                {
                  '--i': i,
                  fontWeight: isSel ? 600 : 400,
                  border: isSel ? '1.5px solid #05080c' : '1.5px solid #e5e5e5',
                  background: isSel ? '#05080c' : '#fff',
                  color: isSel ? '#fff' : '#333',
                  boxShadow: isSel ? '0 4px 12px rgba(5,8,12,0.2)' : 'none',
                  transform: isSel ? 'scale(1.03)' : 'scale(1)',
                } as React.CSSProperties
              }
            >
              {slot.time}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Step indicator ───────────────────────────────────────────────────
type BookingStep = 'date' | 'time' | 'details' | 'submitting' | 'success' | 'error'

const STEP_INDEX: Record<string, number> = { date: 0, time: 1, details: 2, submitting: 2 }

function StepBar({ step }: { step: BookingStep }) {
  const steps = ['Date', 'Time', 'Details']
  const idx = STEP_INDEX[step] ?? -1
  if (idx < 0) return null

  return (
    <div className="flex items-center mb-6 shrink-0 pr-10">
      {steps.map((lbl, i) => {
        const done = i < idx
        const active = i === idx
        return (
          <Fragment key={i}>
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 font-geist-body"
                style={{
                  background: done ? '#05080c' : active ? '#05080c' : '#eef0f4',
                  boxShadow: active ? '0 4px 12px rgba(5,8,12,0.25)' : 'none',
                  transform: active ? 'scale(1.12)' : 'scale(1)',
                }}
              >
                {done ? (
                  <svg width="12" height="9" viewBox="0 0 12 9" aria-hidden="true">
                    <path
                      d="M1 4.5L4.5 8L11 1"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <span
                    className="text-[12px] font-bold"
                    style={{ color: active ? '#fff' : '#b5bdcc' }}
                  >
                    {i + 1}
                  </span>
                )}
              </div>
              <span
                className="text-[10.5px] tracking-[0.2px] transition-colors font-geist-body"
                style={{
                  color: active ? '#05080c' : done ? '#05080c' : '#b5bdcc',
                  fontWeight: active ? 700 : 500,
                }}
              >
                {lbl}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-[2.5px] mx-1.5 mb-[18px] rounded-full overflow-hidden bg-[#eef0f4]">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: done ? '100%' : '0%', background: '#05080c' }}
                />
              </div>
            )}
          </Fragment>
        )
      })}
    </div>
  )
}

// ── Animated Thank You ───────────────────────────────────────────────
function ThankYou({
  type,
  bookingUid,
  onReset,
}: {
  type: 'contact' | 'appointment'
  bookingUid?: string
  onReset: () => void
}) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    requestAnimationFrame(() => setShow(true))
  }, [])

  return (
    <div className="flex flex-col items-center gap-5 py-6 text-center">
      {/* Animated circle */}
      <div
        className="relative w-20 h-20 flex items-center justify-center"
        style={{
          transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: show ? 'scale(1)' : 'scale(0)',
          opacity: show ? 1 : 0,
        }}
      >
        <div
          className="absolute inset-0 rounded-full bg-[rgba(34,197,94,0.12)]"
          style={{ animation: 'thankyou-pulse 2s ease-in-out infinite' }}
        />
        <div className="absolute inset-1.5 rounded-full bg-[rgba(34,197,94,0.2)]" />
        <div className="relative w-12 h-12 rounded-full bg-[#05080c] flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M5 13L9 17L19 7"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 20,
                strokeDashoffset: show ? 0 : 20,
                transition: 'stroke-dashoffset 0.5s 0.3s ease',
              }}
            />
          </svg>
        </div>
      </div>

      {/* Text */}
      <div
        style={{
          transition: 'all 0.5s 0.3s ease',
          transform: show ? 'translateY(0)' : 'translateY(12px)',
          opacity: show ? 1 : 0,
        }}
      >
        <h4 className="font-bold text-[20px] text-[#111] mb-1.5 font-heading">
          {type === 'appointment' ? "You're booked! 🎉" : 'Message sent! ✉️'}
        </h4>
        <p className="text-[13px] text-[#888] leading-[1.6] max-w-[280px] font-geist-body">
          {type === 'appointment'
            ? 'A confirmation has been sent to your email. We look forward to speaking with you.'
            : "We'll get back to you within 24 hours."}
        </p>
      </div>

      {/* Booking reference */}
      {type === 'appointment' && bookingUid && (
        <div
          className="bg-[#f8f9fa] rounded-[10px] px-5 py-3 w-full border border-[#eee]"
          style={{
            transition: 'all 0.4s 0.5s ease',
            opacity: show ? 1 : 0,
            transform: show ? 'translateY(0)' : 'translateY(8px)',
          }}
        >
          <p className="text-[11px] text-[#aaa] mb-0.5 font-geist-body">Booking Reference</p>
          <p className="font-bold text-[16px] text-[#05080c] tracking-[2px] font-geist-body">
            {bookingUid}
          </p>
        </div>
      )}

      {/* Confetti dots */}
      <div className="relative h-3 w-full">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${15 + i * 14}%`,
              top: 0,
              background: ['#05080c', '#333', '#555', '#777', '#999', '#bbb'][i],
              animation: `thankyou-confetti 1.5s ${0.4 + i * 0.1}s ease both`,
            }}
          />
        ))}
      </div>

      <button
        onClick={onReset}
        className="px-6 py-[9px] rounded-full border border-[#e5e5e5] bg-white text-[#555] text-[12px] cursor-pointer hover:bg-[#f5f5f5] transition-colors font-geist-body"
        style={{
          transition: 'all 0.4s 0.6s ease',
          opacity: show ? 1 : 0,
          transform: show ? 'translateY(0)' : 'translateY(8px)',
        }}
      >
        {type === 'appointment' ? 'Book Another' : 'Send Another'}
      </button>
    </div>
  )
}

// ── Booking Error ────────────────────────────────────────────────────
function BookingError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3.5 py-5 text-center">
      <div className="w-14 h-14 rounded-full border-2 border-[rgba(239,68,68,0.25)] bg-[rgba(239,68,68,0.08)] flex items-center justify-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 7v6M12 16h.01" stroke="#05080c" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="12" r="10" stroke="#05080c" strokeWidth="1.5" />
        </svg>
      </div>
      <div>
        <h4 className="font-bold text-[16px] text-[#111] mb-1 font-heading">Booking failed</h4>
        <p className="text-[12px] text-[#888] leading-[1.6] max-w-[260px] font-geist-body">
          {message}
        </p>
      </div>
      <button
        onClick={onRetry}
        className="px-6 py-2.5 rounded-full border-none text-white text-[13px] font-semibold cursor-pointer btn-press transition-all hover:-translate-y-[1px] font-geist-body"
        style={{ background: '#05080c', boxShadow: '0 4px 14px rgba(5,8,12,0.2)' }}
      >
        Try Again
      </button>
    </div>
  )
}

// ── Full appointment flow ────────────────────────────────────────────
function AppointmentFlow({ fill = false }: { fill?: boolean }) {
  const router = useRouter()
  const [step, setStep] = useState<BookingStep>('date')
  const [selDate, setDate] = useState<SelectedDate | null>(null)
  const [selTime, setTime] = useState<string | null>(null)
  const [selIso, setSelIso] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' })
  const [errMsg, setErr] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const inputCls =
    'w-full rounded-xl border border-[#e5e5e5] bg-white text-[#111] px-3.5 py-3 text-[13px] outline-none focus:border-[#05080c] focus:ring-2 focus:ring-[#05080c]/15 transition-all font-geist-body'

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!isValidEmail(form.email)) e.email = 'Enter a valid email'
    if (!form.phone.trim()) e.phone = 'Phone number is required'
    else if (!isValidUSPhone(form.phone)) e.phone = 'Enter a valid 10-digit US number'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    if (!selDate || !selTime) return
    setStep('submitting')
    try {
      const res = await submitBooking({ slotIso: selIso, ...form })
      router.push(`/thank-you?type=appointment&uid=${encodeURIComponent(res.uid)}`)
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Something went wrong.')
      setStep('error')
    }
  }

  const prettyDate = selDate
    ? new Date(selDate.year, selDate.month, selDate.day).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      })
    : ''

  const stepWrapCls = fill ? 'booking-step flex flex-col flex-1 min-h-0' : 'booking-step'
  const scrollCls = fill ? 'flex-1 min-h-0 overflow-y-auto pr-0.5' : ''

  return (
    <div className={fill ? 'flex flex-col flex-1 min-h-0' : ''}>
      <StepBar step={step} />

      {/* STEP 1 — pick a date */}
      {step === 'date' && (
        <div key="date" className={stepWrapCls}>
          <div className={scrollCls}>
            <p className="text-[12px] text-[#888] mb-3.5 font-geist-body">
              Choose a day for your free 30-minute consultation.
            </p>
            <CalPicker
              onSelect={(d) => {
                setDate(d)
                setTime(null)
                setSelIso('')
                setStep('time')
              }}
              selectedDate={selDate}
            />
          </div>
        </div>
      )}

      {/* STEP 2 — pick a time */}
      {step === 'time' && selDate && (
        <div key="time" className={stepWrapCls}>
          <div className={scrollCls}>
            <div className="flex items-center gap-2 mb-3.5">
              <span className="w-8 h-8 rounded-lg bg-[#f5f5f5] border border-[#e5e5e5] flex items-center justify-center shrink-0">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect
                    x="1.5"
                    y="2.5"
                    width="13"
                    height="12"
                    rx="2"
                    stroke="#05080c"
                    strokeWidth="1.4"
                  />
                  <line
                    x1="5"
                    y1="1"
                    x2="5"
                    y2="4"
                    stroke="#05080c"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                  <line
                    x1="11"
                    y1="1"
                    x2="11"
                    y2="4"
                    stroke="#05080c"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                  <line x1="1.5" y1="6.5" x2="14.5" y2="6.5" stroke="#05080c" strokeWidth="1.4" />
                </svg>
              </span>
              <div>
                <p className="text-[13px] font-semibold text-[#05080c] leading-tight font-geist-body">
                  {prettyDate}
                </p>
                <p className="text-[11px] text-[#aaa] font-geist-body">Select an available time</p>
              </div>
            </div>
            <TimeSlots
              date={selDate}
              onSelect={(t, iso) => {
                setTime(t)
                setSelIso(iso)
                setStep('details')
              }}
              selected={selTime}
            />
          </div>

          <button
            onClick={() => {
              setStep('date')
            }}
            className="mt-4 shrink-0 self-start inline-flex items-center gap-1.5 text-[12px] text-[#555] hover:text-[#05080c] hover:bg-[#f0f0f0] transition-colors bg-[#f5f5f5] border border-[#e5e5e5] rounded-full px-4 py-2 cursor-pointer font-geist-body"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 17 14"
              fill="none"
              className="inline"
              aria-hidden="true"
            >
              <path
                d="M15.1875 6.75H1.125M6.75 1.125L1.125 6.75L6.75 12.375"
                stroke="#888"
                strokeWidth="1.6875"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>{' '}
            Change date
          </button>
        </div>
      )}

      {/* STEP 2 — details */}
      {(step === 'details' || step === 'submitting') && selDate && selTime && (
        <div key="details" className={stepWrapCls}>
          <div className={`${scrollCls} flex flex-col gap-3`}>
            {/* Selected slot summary */}
            <div
              className="booking-field flex items-center justify-between gap-2 rounded-xl px-3.5 py-3 border border-[#e5e5e5] bg-[#f5f5f5]"
              style={{ '--i': 0 } as React.CSSProperties}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-8 h-8 rounded-lg bg-[#05080c] flex items-center justify-center shrink-0">
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <rect
                      x="1.5"
                      y="2.5"
                      width="13"
                      height="12"
                      rx="2"
                      stroke="#fff"
                      strokeWidth="1.4"
                    />
                    <line
                      x1="5"
                      y1="1"
                      x2="5"
                      y2="4"
                      stroke="#fff"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                    <line
                      x1="11"
                      y1="1"
                      x2="11"
                      y2="4"
                      stroke="#fff"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                    <line x1="1.5" y1="6.5" x2="14.5" y2="6.5" stroke="#fff" strokeWidth="1.4" />
                  </svg>
                </span>
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold text-[#05080c] truncate font-geist-body">
                    {prettyDate}
                  </p>
                  <p className="text-[11px] text-[#05080c] font-medium font-geist-body">
                    {selTime} · 30 min
                  </p>
                </div>
              </div>
              <button
                onClick={() => setStep('time')}
                disabled={step === 'submitting'}
                className="text-[11px] text-[#05080c] font-medium hover:underline shrink-0 cursor-pointer bg-transparent border-none font-geist-body disabled:opacity-50"
              >
                Edit
              </button>
            </div>

            <div className="booking-field" style={{ '--i': 1 } as React.CSSProperties}>
              <label className="block text-[11px] text-[#888] mb-[5px] font-geist-body">
                Full Name *
              </label>
              <input
                value={form.name}
                onChange={(e) => {
                  setForm((f) => ({ ...f, name: e.target.value }))
                  setErrors((er) => ({ ...er, name: '' }))
                }}
                placeholder="Riley Brooks"
                className={`${inputCls} ${errors.name ? '!border-red-400 focus:!ring-red-400/15' : ''}`}
              />
              {errors.name && (
                <p className="text-[10px] text-red-500 mt-1 font-geist-body">{errors.name}</p>
              )}
            </div>
            <div className="booking-field" style={{ '--i': 2 } as React.CSSProperties}>
              <label className="block text-[11px] text-[#888] mb-[5px] font-geist-body">
                Email *
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => {
                  setForm((f) => ({ ...f, email: e.target.value }))
                  setErrors((er) => ({ ...er, email: '' }))
                }}
                placeholder="you@company.com"
                className={`${inputCls} ${errors.email ? '!border-red-400 focus:!ring-red-400/15' : ''}`}
              />
              {errors.email && (
                <p className="text-[10px] text-red-500 mt-1 font-geist-body">{errors.email}</p>
              )}
            </div>
            <div className="booking-field" style={{ '--i': 3 } as React.CSSProperties}>
              <label className="block text-[11px] text-[#888] mb-[5px] font-geist-body">
                Phone Number *
              </label>
              <input
                type="tel"
                inputMode="tel"
                value={form.phone}
                onChange={(e) => {
                  setForm((f) => ({ ...f, phone: formatUSPhone(e.target.value) }))
                  setErrors((er) => ({ ...er, phone: '' }))
                }}
                placeholder="(555) 123-4567"
                maxLength={14}
                className={`${inputCls} ${errors.phone ? '!border-red-400 focus:!ring-red-400/15' : ''}`}
              />
              {errors.phone && (
                <p className="text-[10px] text-red-500 mt-1 font-geist-body">{errors.phone}</p>
              )}
            </div>
            <div className="booking-field" style={{ '--i': 4 } as React.CSSProperties}>
              <label className="block text-[11px] text-[#888] mb-[5px] font-geist-body">
                Notes (optional)
              </label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                placeholder="Tell us what you'd like to discuss…"
                rows={2}
                className={`${inputCls} resize-none`}
              />
            </div>
          </div>

          <div
            className="booking-field flex gap-2 mt-4 shrink-0"
            style={{ '--i': 5 } as React.CSSProperties}
          >
            <button
              onClick={() => setStep('time')}
              disabled={step === 'submitting'}
              className="flex-1 py-3 rounded-full border border-[#e5e5e5] bg-white text-[#555] text-[13px] cursor-pointer hover:bg-[#f5f5f5] transition-colors disabled:opacity-50 font-geist-body"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 17 14"
                fill="none"
                className="inline"
                aria-hidden="true"
              >
                <path
                  d="M15.1875 6.75H1.125M6.75 1.125L1.125 6.75L6.75 12.375"
                  stroke="#555"
                  strokeWidth="1.6875"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>{' '}
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={step === 'submitting'}
              className="flex-[2] py-3 rounded-full border-none text-white text-[14px] font-semibold flex items-center justify-center gap-2 transition-all enabled:hover:-translate-y-[1px] btn-press font-geist-body"
              style={{
                background: step === 'submitting' ? '#9bb0ff' : '#05080c',
                boxShadow: step === 'submitting' ? 'none' : '0 6px 18px rgba(5,8,12,0.2)',
              }}
            >
              {step === 'submitting' ? (
                <>
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin-fast" />
                  Booking…
                </>
              ) : (
                'Confirm Booking'
              )}
            </button>
          </div>
        </div>
      )}

      {step === 'error' && <BookingError message={errMsg} onRetry={() => setStep('details')} />}
    </div>
  )
}

// ── Branded sidebar (modal left panel) ───────────────────────────────
function BookingSidebar() {
  const perks = [
    { t: '30-minute strategy call', d: 'A focused look at your site & goals' },
    { t: 'Hosted on Google Meet', d: 'Link arrives in your inbox instantly' },
    { t: '100% free, no commitment', d: 'No pressure, no sales pitch' },
  ]
  return (
    <aside
      className="hidden md:flex flex-col justify-between p-7 text-white relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg,#06123d 0%,#10277a 55%,#1c3fb0 100%)' }}
    >
      {/* decorative glow */}
      <div
        className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(56,99,255,0.55),transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-12 w-44 h-44 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(123,159,255,0.3),transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/12 border border-white/15 px-3 py-1.5 mb-6">
          <svg width="13" height="13" viewBox="0 0 20 20" fill="white" aria-hidden="true">
            <path d="M0 10L8 12L10 20L12 12L20 10L12 8L10 0L8 8Z" />
          </svg>
          <span className="text-[11px] font-medium tracking-[0.3px] font-geist-body">
            Free Consultation
          </span>
        </div>
        <h3 className="font-bold text-[26px] leading-[1.15] tracking-[-0.5px] mb-3 font-heading">
          Book your free 30-min website audit.
        </h3>
        <p className="text-[13px] text-white/65 leading-[1.6] font-geist-body">
          We&apos;ve launched 50+ websites across San Diego. In 30 minutes, we&apos;ll pinpoint
          exactly what&apos;s holding your site back.
        </p>
      </div>

      <div className="relative flex flex-col gap-3.5 my-7">
        {perks.map((p) => (
          <div key={p.t} className="flex items-start gap-2.5">
            <span className="w-[18px] h-[18px] rounded-full bg-white/15 flex items-center justify-center shrink-0 mt-[1px]">
              <svg width="10" height="8" viewBox="0 0 10 8" aria-hidden="true">
                <path
                  d="M1 4L3.5 6.5L9 1"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div>
              <p className="text-[13px] font-medium leading-tight font-geist-body">{p.t}</p>
              <p className="text-[11px] text-white/50 font-geist-body">{p.d}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative">
        <div className="flex items-center gap-0.5 mb-1.5">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              width="13"
              height="13"
              viewBox="0 0 20 20"
              fill="#ffd34e"
              aria-hidden="true"
            >
              <path d="M10 1l2.6 5.3 5.9.9-4.3 4.2 1 5.9L10 14.6 4.8 17.3l1-5.9L1.5 7.2l5.9-.9z" />
            </svg>
          ))}
        </div>
        <p className="text-[12px] text-white/75 font-geist-body">
          Rated 4.9/5 · 50+ websites launched
        </p>
      </div>
    </aside>
  )
}

// ── Booking Modal ────────────────────────────────────────────────────
function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  if (!open) return null
  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-[6px] flex items-center justify-center p-4 sm:p-5 animate-fade-in-bg"
      role="dialog"
      aria-modal="true"
      aria-label="Book a free consultation"
    >
      <div
        className="bg-white rounded-[22px] w-full max-w-[820px] h-[660px] max-h-[92vh] overflow-hidden relative animate-slide-up-modal grid grid-cols-1 md:grid-cols-[280px_1fr]"
        style={{ boxShadow: '0 32px 90px rgba(0,0,0,0.28)' }}
      >
        <BookingSidebar />

        {/* Right panel */}
        <div className="flex flex-col min-h-0 p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-[32px] h-[32px] rounded-full border border-[#e5e5e5] bg-white cursor-pointer flex items-center justify-center text-[#888] hover:text-[#111] hover:rotate-90 transition-all duration-200"
            aria-label="Close modal"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M1 1L11 11M11 1L1 11"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
          {/* mobile-only title (sidebar hidden) */}
          <div className="md:hidden mb-4 shrink-0">
            <h3 className="font-bold text-[22px] text-[#111] leading-tight font-heading">
              Book a Free Consultation
            </h3>
            <p className="text-[12px] text-[#aaa] font-geist-body">30 min · Google Meet · Free</p>
          </div>
          <AppointmentFlow fill />
        </div>
      </div>
    </div>
  )
}

// ── Floating icon button ─────────────────────────────────────────────
function FloatingBookBtn({ onOpen }: { onOpen: () => void }) {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return

    const observer = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), {
      threshold: 0.1,
    })
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  return (
    <button
      onClick={onOpen}
      aria-label="Book a meeting"
      className="fixed bottom-7 right-7 z-[1000] w-[52px] h-[52px] rounded-full border-none bg-[#05080c] text-white cursor-pointer flex items-center justify-center transition-all duration-300 hover:bg-[#1a1a2e] hover:-translate-y-[3px]"
      style={{
        boxShadow: '0 4px 16px rgba(5,8,12,0.2)',
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? 'none' : 'auto',
        transform: hidden ? 'translateY(12px)' : undefined,
      }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="4" width="18" height="17" rx="3" stroke="white" strokeWidth="1.8" />
        <line x1="8" y1="2" x2="8" y2="6" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <line
          x1="16"
          y1="2"
          x2="16"
          y2="6"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <line x1="3" y1="9" x2="21" y2="9" stroke="white" strokeWidth="1.8" />
        <circle cx="12" cy="15" r="1.5" fill="white" />
      </svg>
    </button>
  )
}

// ── Main CTASection ──────────────────────────────────────────────────
export default function CTASection() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'contact' | 'appointment'>('contact')
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const handler = () => setModalOpen(true)
    window.addEventListener('open-booking-modal', handler)
    return () => window.removeEventListener('open-booking-modal', handler)
  }, [])
  const [errors, setErrors] = useState<Record<string, string>>({})

  const inputCls =
    'w-full rounded-lg border border-[#e5e5e5] bg-[#f5f5f5] text-[#05080c] px-3.5 py-[11px] text-[14px] outline-none focus:border-[#05080c] transition-colors font-geist-body'

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(brand.email)
    } catch {
      const el = document.createElement('textarea')
      el.value = brand.email
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const validateContact = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!isValidEmail(form.email)) e.email = 'Enter a valid email'
    if (!form.phone.trim()) e.phone = 'Phone number is required'
    else if (!isValidUSPhone(form.phone)) e.phone = 'Enter a valid 10-digit US number'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleContactSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    if (!validateContact()) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      router.push('/thank-you?type=contact')
    } catch {
      setErrors({ message: 'Something went wrong. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <section id="contact" className="bg-[#ceebff] px-4 lg:px-6 pb-4 md:pb-6">
        <div
          className="w-full max-w-[1278px] rounded-[21px] overflow-hidden mx-auto px-4 py-6 md:px-10 md:py-10"
          style={{
            background:
              'linear-gradient(rgba(0,9,40,0.87),rgba(0,9,40,0.87)), url(/cta-bg.png) center / cover no-repeat',
          }}
        >
          <div className="w-full">
            {/* Section title */}
            <div className="text-center mb-10 md:mb-[60px] flex flex-col items-center justify-center gap-4 md:gap-5">
              <div className="flex items-center gap-1">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="white" aria-hidden="true">
                  <path d="M0 10L8 12L10 20L12 12L20 10L12 8L10 0L8 8Z" />
                </svg>
                <span className="font-medium text-[16px] tracking-[-0.32px] text-white font-geist-body">
                  {contact.badge}
                </span>
              </div>
              <h2
                className="font-semibold text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px] xl:text-[96px] leading-[0.95] tracking-[-1px] text-white text-center max-w-[600px] mx-auto"
                style={{ fontFamily: 'var(--font-darker-grotesque)' }}
              >
                {contact.headline}
              </h2>
            </div>

            {/* Content row */}
            <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
              {/* LEFT: form card */}
              <div
                className="w-full lg:w-[480px] xl:w-[540px] shrink-0 rounded-2xl p-4 md:p-10"
                style={{ backgroundColor: 'rgb(245,245,245)' }}
              >
                {/* Tab bar */}
                <div className="flex gap-0 bg-[#ebebeb] rounded-full p-1 mb-7">
                  {[
                    { id: 'contact' as const, label: 'Contact' },
                    { id: 'appointment' as const, label: 'Appointment' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id)
                        setSent(false)
                        setErrors({})
                      }}
                      className="flex-1 py-[10px] rounded-full border-none cursor-pointer text-[15px] transition-all duration-200 font-geist-body"
                      style={{
                        fontWeight: activeTab === tab.id ? 700 : 600,
                        background: activeTab === tab.id ? '#05080c' : 'transparent',
                        color: activeTab === tab.id ? '#fff' : '#888',
                        boxShadow: activeTab === tab.id ? '0 1px 6px rgba(0,0,0,0.2)' : 'none',
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab content - grid overlay keeps height consistent */}
                <div className="grid" style={{ minHeight: 560 }}>
                  {/* Contact tab */}
                  <div
                    className={`col-start-1 row-start-1 ${activeTab !== 'contact' ? 'h-0 overflow-hidden pointer-events-none' : ''}`}
                  >
                    <div className="flex flex-col">
                      <h3 className="font-medium text-[28px] tracking-[-1.12px] text-[#05080c] mb-8 font-heading">
                        {contact.contactTitle}
                      </h3>

                      {sent ? (
                        <ThankYou
                          type="contact"
                          onReset={() => {
                            setSent(false)
                            setForm({ name: '', email: '', phone: '', message: '' })
                            setErrors({})
                          }}
                        />
                      ) : (
                        <form
                          onSubmit={handleContactSubmit}
                          noValidate
                          className="flex flex-col gap-5 flex-1"
                        >
                          <div>
                            <label className="block text-[14px] text-[#333] mb-1.5 font-geist-body">
                              Full Name*
                            </label>
                            <input
                              value={form.name}
                              onChange={(e) => {
                                setForm((f) => ({ ...f, name: e.target.value }))
                                setErrors((er) => ({ ...er, name: '' }))
                              }}
                              placeholder="Riley Brooks"
                              className={`${inputCls} ${errors.name ? '!border-red-400' : ''}`}
                            />
                            {errors.name && (
                              <p className="text-[11px] text-red-500 mt-1 font-geist-body">
                                {errors.name}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="block text-[14px] text-[#333] mb-1.5 font-geist-body">
                              Email address*
                            </label>
                            <input
                              type="email"
                              value={form.email}
                              onChange={(e) => {
                                setForm((f) => ({ ...f, email: e.target.value }))
                                setErrors((er) => ({ ...er, email: '' }))
                              }}
                              placeholder="example@gmail.com"
                              className={`${inputCls} ${errors.email ? '!border-red-400' : ''}`}
                            />
                            {errors.email && (
                              <p className="text-[11px] text-red-500 mt-1 font-geist-body">
                                {errors.email}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="block text-[14px] text-[#333] mb-1.5 font-geist-body">
                              Phone Number*
                            </label>
                            <input
                              type="tel"
                              inputMode="tel"
                              value={form.phone}
                              onChange={(e) => {
                                setForm((f) => ({ ...f, phone: formatUSPhone(e.target.value) }))
                                setErrors((er) => ({ ...er, phone: '' }))
                              }}
                              placeholder="(555) 123-4567"
                              maxLength={14}
                              className={`${inputCls} ${errors.phone ? '!border-red-400' : ''}`}
                            />
                            {errors.phone && (
                              <p className="text-[11px] text-red-500 mt-1 font-geist-body">
                                {errors.phone}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="block text-[14px] text-[#333] mb-1.5 font-geist-body">
                              Message
                            </label>
                            <textarea
                              value={form.message}
                              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                              placeholder="Tell us the purpose"
                              rows={4}
                              className={`${inputCls} resize-none`}
                            />
                          </div>

                          {/* Bottom row: Submit left, email section right */}
                          <div className="mt-auto flex items-end justify-between gap-6">
                            <button
                              type="submit"
                              disabled={submitting}
                              className="w-full bg-[#05080c] text-white rounded-full py-[13px] border-none font-medium text-[16px] cursor-pointer flex items-center justify-center gap-2 hover:bg-[#1a1a1a] transition-colors disabled:opacity-60 font-geist-body"
                            >
                              {submitting ? (
                                <>
                                  <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin-fast" />
                                  Sending…
                                </>
                              ) : (
                                'Submit'
                              )}
                            </button>
                            <div className="flex flex-col items-start">
                              <p className="font-medium text-[14px] tracking-[-0.28px] text-[#5b5b5b] font-geist-body">
                                {contact.emailLabel}
                              </p>
                              <div className="flex flex-row flex-nowrap items-center gap-2">
                                <a
                                  href={`mailto:${brand.email}`}
                                  className="font-semibold text-[16px] tracking-[-0.36px] text-[#05080c] font-geist-body hover:underline cursor-pointer"
                                >
                                  {brand.email}
                                </a>
                                <button
                                  onClick={handleCopyEmail}
                                  type="button"
                                  className="shrink-0 flex items-center justify-center cursor-pointer bg-transparent border-none"
                                  aria-label="Copy email"
                                >
                                  {copied ? (
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                      <path
                                        d="M3 8.5L6.5 12L13 5"
                                        stroke="#05080c"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  ) : (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                      <path
                                        d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z"
                                        fill="#05080C"
                                      />
                                      <path
                                        d="M17.1 2H12.9C9.82 2 8.37 3.09 8.07 5.74C8.01 6.29 8.46 6.75 9.02 6.75H11.1C15.3 6.75 17.25 8.7 17.25 12.9V14.98C17.25 15.54 17.71 15.99 18.26 15.93C20.91 15.63 22 14.18 22 11.1V6.9C22 3.4 20.6 2 17.1 2Z"
                                        fill="#05080C"
                                      />
                                    </svg>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>

                  {/* Appointment tab */}
                  <div
                    className={`col-start-1 row-start-1 ${activeTab !== 'appointment' ? 'h-0 overflow-hidden pointer-events-none' : ''}`}
                  >
                    <div className="flex flex-col">
                      <h3 className="font-medium text-[28px] tracking-[-1.12px] text-[#05080c] mb-1 font-heading">
                        Book a Consultation
                      </h3>
                      <p className="text-[13px] text-[#aaa] mb-6 font-geist-body">
                        30 min · Google Meet · Free
                      </p>
                      <AppointmentFlow />
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: info */}
              <div className="flex-1 flex flex-col justify-between gap-8 lg:gap-0 min-h-0 lg:min-h-[548px]">
                <div>
                  <p className="font-medium text-[16px] tracking-[-0.32px] text-[rgb(245,245,245)] mb-5 font-geist-body">
                    How do we connect?
                  </p>
                  <div className="flex flex-col gap-1">
                    {contact.howWeConnect.map((t, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <span
                          className="w-[7px] h-[7px] rounded-full bg-white shrink-0 mt-[9px]"
                          aria-hidden="true"
                        />
                        <span className="text-[18px] text-white leading-[1.5] font-geist-body">
                          {t}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <ArrowButton
                    label="Book a discovery call"
                    onClick={() => setModalOpen(true)}
                    size="sm"
                    variant="light"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FloatingBookBtn onOpen={() => setModalOpen(true)} />
      <BookingModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
