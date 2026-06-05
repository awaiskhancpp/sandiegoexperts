import { NextRequest, NextResponse } from 'next/server';
import { isValidEmail, isValidUSPhone, toE164US } from '@/lib/forms';

const CAL_API_KEY = process.env.CAL_API_KEY ?? '';
const CAL_API = 'https://api.cal.com/v2';

async function logBookingToSheet(row: {
  date: string; name: string; email: string; phone: string;
  slot: string; notes: string; uid: string;
}) {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK;
  const token      = process.env.GOOGLE_SHEET_TOKEN;
  if (!webhookUrl || !token) return;
  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...row, token, sheet: 'Appointments' }),
  }).catch(() => {}); // never block the booking response
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { start, name, email, phone, notes } = body;

  if (!start || !name || !email) {
    return NextResponse.json({ error: 'start, name, and email are required' }, { status: 400 });
  }
  if (!isValidEmail(String(email))) {
    return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
  }
  if (!phone || !isValidUSPhone(String(phone))) {
    return NextResponse.json({ error: 'Please provide a valid 10-digit US phone number.' }, { status: 400 });
  }
  const phoneE164 = toE164US(String(phone));

  const eventTypeId = process.env.CAL_EVENT_TYPE_ID;
  if (!eventTypeId) {
    return NextResponse.json({ error: 'CAL_EVENT_TYPE_ID not configured' }, { status: 500 });
  }

  try {
    const res = await fetch(`${CAL_API}/bookings`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CAL_API_KEY}`,
        'cal-api-version': '2024-08-13',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventTypeId: Number(eventTypeId),
        start,
        attendee: {
          name,
          email,
          phoneNumber: phoneE164,
          timeZone: 'America/Los_Angeles',
        },
        bookingFieldsResponses: {
          name,
          email,
          notes: notes ?? '',
        },
        metadata: {},
      }),
    });
    const data = await res.json();

    if (!res.ok) {
      const msg = data?.error?.message ?? data?.message ?? 'Booking failed';
      return NextResponse.json({ error: msg }, { status: res.status });
    }

    const uid = data.data?.uid ?? data.data?.booking?.uid ?? data.data?.id?.toString() ?? 'CONFIRMED';
    const submittedAt = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
    const slotDate = new Date(start);
    const slotSD  = slotDate.toLocaleString('en-US', { timeZone: 'America/Los_Angeles', dateStyle: 'medium', timeStyle: 'short' });
    const slotPKT = slotDate.toLocaleString('en-US', { timeZone: 'Asia/Karachi',         dateStyle: 'medium', timeStyle: 'short' });
    await logBookingToSheet({
      date: submittedAt,
      name,
      email,
      phone,
      slot: `${slotSD} (SD) / ${slotPKT} (PKT)`,
      notes: notes ?? '—',
      uid,
    });

    return NextResponse.json(data);
  } catch (err) {
    console.error('Cal.com booking error:', err);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
