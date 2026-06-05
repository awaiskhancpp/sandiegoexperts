import { NextRequest, NextResponse } from 'next/server';

const CAL_API_KEY = process.env.CAL_API_KEY ?? '';
const CAL_API = 'https://api.cal.com/v2';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const start = searchParams.get('start');
  const end = searchParams.get('end');

  if (!start || !end) {
    return NextResponse.json({ error: 'start and end are required' }, { status: 400 });
  }

  const eventTypeId = process.env.CAL_EVENT_TYPE_ID;
  if (!eventTypeId) {
    return NextResponse.json({ error: 'CAL_EVENT_TYPE_ID not configured' }, { status: 500 });
  }

  try {
    const res = await fetch(
      `${CAL_API}/slots?eventTypeId=${eventTypeId}&start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}&timeZone=America%2FLos_Angeles`,
      {
        headers: {
          'Authorization': `Bearer ${CAL_API_KEY}`,
          'cal-api-version': '2024-09-04',
        },
      },
    );
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('Cal.com slots error:', err);
    return NextResponse.json({ error: 'Failed to fetch slots' }, { status: 500 });
  }
}
