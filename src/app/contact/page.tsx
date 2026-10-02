'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

function errorMessage(data: unknown): string {
  if (!data || typeof data !== 'object') return 'Could not send your message. Please try again.';
  const o = data as Record<string, unknown>;
  if (typeof o.message === 'string') return o.message;
  if (o.errors && typeof o.errors === 'object') {
    const first = Object.values(o.errors as Record<string, string[]>)[0];
    if (Array.isArray(first) && first[0]) return String(first[0]);
  }
  return 'Could not send your message. Please try again.';
}

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);

    const payload = {
      name: String(fd.get('name') ?? '').trim(),
      email: String(fd.get('email') ?? '').trim(),
      phone: String(fd.get('phone') ?? '').trim(),
      subject: String(fd.get('subject') ?? '').trim(),
      message: String(fd.get('message') ?? '').trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setError('Please fill in your name, email, and message.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/marketing/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = errorMessage(data);
        setError(msg);
        toast.error(msg);
        return;
      }
      toast.success('Message sent', {
        description: 'Thank you — we will get back to you soon.',
        duration: 6000,
      });
      setSuccess(true);
      e.currentTarget.reset();
    } catch {
      setError('Network error. Check your connection and try again.');
      toast.error('Network error. Try again.');
    } finally {
      setLoading(false);
    }
  }

  const fieldClass = 'mb-[18px]';
  const labelClass = 'mb-2 block text-sm font-semibold text-white';
  const controlClass =
    'h-10 w-full rounded-lg border border-white bg-white/10 px-3.5 text-sm text-white outline-none placeholder:text-white/55 focus:shadow-[0_0_0_3px_rgba(252,200,0,0.55)]';

  return (
    <div
      className="flex min-h-screen justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 bg-fixed px-4 py-12"
      style={{ fontFamily: '"Plus Jakarta Sans", "Segoe UI", system-ui, sans-serif' }}
    >
      <div className="w-full max-w-[440px]">
        <Link href="/" className="mb-5 inline-flex items-center gap-1 text-sm text-white/90 no-underline hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        {success ? (
          <div className="relative rounded-[22px] border-2 border-white bg-gradient-to-br from-blue-700 to-indigo-700 px-8 py-9 text-white shadow-[0_20px_40px_rgba(67,56,202,0.3)]">
            <p className="text-center text-lg font-semibold">Thank you — your message was sent.</p>
            <p className="mt-2 text-center text-sm text-white/85">We will reply using your email or phone.</p>
            <button
              type="button"
              onClick={() => setSuccess(false)}
              className="mt-6 h-10 w-full cursor-pointer rounded-lg border border-white bg-transparent text-sm font-semibold text-white hover:bg-white/10"
            >
              Send another message
            </button>
            <Link
              href="/"
              className="mt-3 flex h-10 items-center justify-center rounded-lg bg-[#fcc800] text-sm font-semibold text-[#1e1b4b] no-underline hover:brightness-105"
            >
              Return home
            </Link>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="relative rounded-[22px] border-2 border-white bg-gradient-to-br from-[#1d4ed8] to-[#4338ca] px-8 pb-8 pt-9 text-white shadow-[0_20px_40px_rgba(67,56,202,0.3)]"
          >
            <h1 className="m-0 text-center text-2xl font-semibold">Contact us</h1>
            <p className="mb-6 mt-1.5 text-center text-sm text-white/85">
              Send us a message and we will respond as soon as we can.
            </p>

            {error ? (
              <p className="mb-[18px] rounded-lg border border-white/40 bg-white/15 px-3 py-2 text-sm" role="alert">
                {error}
              </p>
            ) : null}

            <div className={fieldClass}>
              <label className={labelClass} htmlFor="name">Name *</label>
              <input id="name" name="name" required autoComplete="name" placeholder="Full name" className={controlClass} />
            </div>
            <div className={fieldClass}>
              <label className={labelClass} htmlFor="email">Email *</label>
              <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={controlClass} />
            </div>
            <div className={fieldClass}>
              <label className={labelClass} htmlFor="phone">Phone</label>
              <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+256 700 000000" className={controlClass} />
            </div>
            <div className={fieldClass}>
              <label className={labelClass} htmlFor="subject">Subject</label>
              <input id="subject" name="subject" autoComplete="off" placeholder="e.g. Question about pricing" className={controlClass} />
            </div>
            <div className={fieldClass}>
              <label className={labelClass} htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="How can we help?"
                className="min-h-28 w-full resize-y rounded-lg border border-white bg-white/10 px-3.5 py-2 text-sm text-white outline-none placeholder:text-white/55 focus:shadow-[0_0_0_3px_rgba(252,200,0,0.55)]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-1.5 h-10 w-full cursor-pointer rounded-lg border-0 bg-[#fcc800] text-sm font-semibold text-[#1e1b4b] hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Sending…' : 'Send message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
