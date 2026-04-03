import { NextRequest, NextResponse } from 'next/server';

const upstreamBase =
  process.env.SACCO_API_ORIGIN?.replace(/\/$/, '') ||
  process.env.NEXT_PUBLIC_SACCO_API_URL?.replace(/\/$/, '') ||
  'https://main.sacco.ug';

export async function POST(req: NextRequest) {
  let body: string;
  try {
    body = await req.text();
  } catch {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }

  const upstreamUrl = `${upstreamBase}/api/sacco/login`;

  let upstreamRes: Response;
  try {
    upstreamRes = await fetch(upstreamUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body,
      cache: 'no-store',
    });
  } catch (err) {
    console.error('SACCO login proxy:', upstreamUrl, err);
    return NextResponse.json(
      {
        message:
          'Unable to reach the authentication server. Check SACCO_API_ORIGIN / network.',
      },
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

  const res = NextResponse.json(data as object, { status: upstreamRes.status });

  // Forward Set-Cookie from Laravel so the browser can store session cookies (e.g. Domain=.sacco.ug).
  const hdrs = upstreamRes.headers as Headers & { getSetCookie?: () => string[] };
  const cookies = typeof hdrs.getSetCookie === 'function' ? hdrs.getSetCookie() : [];
  for (const c of cookies) {
    res.headers.append('Set-Cookie', c);
  }

  return res;
}
