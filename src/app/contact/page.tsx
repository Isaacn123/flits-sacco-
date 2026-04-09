'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-lg">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact us</h1>
        <p className="text-gray-600 mb-8">
          Send us a message and we will respond as soon as we can.
        </p>

        {success ? (
          <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-6 text-green-900">
            <p className="font-medium">Thank you — your message was sent.</p>
            <p className="text-sm mt-2 text-green-800">We will reply using your email or phone.</p>
            <Button
              type="button"
              variant="outline"
              className="mt-6 mr-3"
              onClick={() => setSuccess(false)}
            >
              Send another message
            </Button>
            <Button asChild className="mt-6">
              <Link href="/">Return home</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-5 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            {error ? (
              <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2" role="alert">
                {error}
              </p>
            ) : null}

            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input id="name" name="name" required autoComplete="name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" name="email" type="email" required autoComplete="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+256 …" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" name="subject" autoComplete="off" placeholder="e.g. Question about pricing" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                placeholder="How can we help?"
              />
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
              {loading ? 'Sending…' : 'Send message'}
            </Button>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
}
