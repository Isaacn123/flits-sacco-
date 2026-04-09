import { NextRequest, NextResponse } from 'next/server';

const upstreamBase =
  process.env.SACCO_API_ORIGIN?.replace(/\/$/, '') ||
  process.env.NEXT_PUBLIC_SACCO_API_URL?.replace(/\/$/, '') ||
  'https://main.sacco.ug';

export async function POST(req: NextRequest) {
  const apiKey = process.env.MARKETING_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { message: 'Marketing contact is not configured (MARKETING_API_KEY).' },
      { status: 503 }
    );
  }

  let body: string;
  try {
    body = await req.text();
  } catch {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }

  const upstreamUrl = `${upstreamBase}/api/marketing/contact`;

  let upstreamRes: Response;
  try {
    upstreamRes = await fetch(upstreamUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Marketing-Api-Key': apiKey,
      },
      body,
      cache: 'no-store',
    });
  } catch (err) {
    console.error('Marketing contact:', upstreamUrl, err);
    return NextResponse.json(
      { message: 'Unable to reach contact service. Try again later.' },
      { status: 502 }
    );
  }

  const text = await upstreamRes.text();
  let data: unknown;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    return new NextResponse(text, {
      status: upstreamRes.status,
      headers: {
        'Content-Type':
          upstreamRes.headers.get('content-type') || 'text/plain; charset=utf-8',
      },
    });
  }

  return NextResponse.json(data as object, { status: upstreamRes.status });
}
