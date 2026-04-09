'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Shield, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';

function saccoSlug(value: string) {
  return value.toLowerCase().trim().replace(/\s+/g, '-');
}

function loginErrorMessage(data: unknown): string {
  if (!data || typeof data !== 'object') return 'Sign in failed. Please try again.';
  const o = data as Record<string, unknown>;
  if (typeof o.message === 'string') return o.message;
  if (o.errors && typeof o.errors === 'object') {
    const first = Object.values(o.errors as Record<string, string[]>)[0];
    if (Array.isArray(first) && first[0]) return String(first[0]);
  }
  return 'Sign in failed. Please try again.';
}

/** Laravel / Sanctum may return token at top level or under `data`. */
function extractAuthToken(data: Record<string, unknown>): string | null {
  const candidates = [data.token, data.access_token, data.plainTextToken];
  for (const c of candidates) {
    if (typeof c === 'string' && c.length > 0) return c;
  }
  const inner = data.data;
  if (inner && typeof inner === 'object') {
    const d = inner as Record<string, unknown>;
    for (const c of [d.token, d.access_token, d.plainTextToken]) {
      if (typeof c === 'string' && c.length > 0) return c;
    }
  }
  return null;
}

const DASHBOARD_PATH =
  process.env.NEXT_PUBLIC_SACCO_DASHBOARD_PATH?.startsWith('/')
    ? process.env.NEXT_PUBLIC_SACCO_DASHBOARD_PATH
    : '/sacco/dashboard';

function buildPostLoginUrl(
  data: Record<string, unknown>,
  subdomain: string,
  token: string | null
): string {
  const direct = data.redirect ?? data.redirect_url ?? data.url;
  if (typeof direct === 'string' && direct.startsWith('http')) {
    return direct;
  }

  const base = `https://${subdomain}.sacco.ug${DASHBOARD_PATH}`;
  if (!token) return base;

  try {
    const u = new URL(base);
    u.searchParams.set('token', token);
    const tt = data.token_type;
    if (typeof tt === 'string' && tt.length > 0) {
      u.searchParams.set('token_type', tt);
    }
    return u.toString();
  } catch {
    const q = new URLSearchParams({ token });
    const tt = data.token_type;
    if (typeof tt === 'string' && tt.length > 0) q.set('token_type', tt);
    return `${base}?${q.toString()}`;
  }
}

export function Hero() {
  const [saccoName, setSaccoName] = useState('');
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const sacco = saccoSlug(saccoName);
    const ident = usernameOrEmail.trim();
    if (!sacco || !ident || !password) {
      setError('Please enter SACCO name, username or email, and password.');
      return;
    }

    const body: Record<string, string> = {
      sacco,
      password,
      device_name: 'web',
    };
    if (ident.includes('@')) {
      body.email = ident;
    } else {
      body.username = ident;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/sacco/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body),
      });

      const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;

      if (!res.ok) {
        setError(loginErrorMessage(data));
        return;
      }

      const token = extractAuthToken(data);
      if (token && typeof window !== 'undefined') {
        try {
          window.localStorage.setItem('auth_token', token);
          const tt = data.token_type;
          if (typeof tt === 'string' && tt.length > 0) {
            window.localStorage.setItem('auth_token_type', tt);
          } else {
            window.localStorage.removeItem('auth_token_type');
          }
        } catch {
          /* ignore */
        }
      }

      const saccoPayload = data.sacco as { subdomain?: string } | undefined;
      const sub =
        typeof saccoPayload?.subdomain === 'string' && saccoPayload.subdomain.length > 0
          ? saccoPayload.subdomain
          : sacco;

      window.location.assign(buildPostLoginUrl(data, sub, token));
    } catch {
      setError('Network error. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            >
              <Shield className="w-4 h-4" />
              <span className="text-sm">Trusted by SACCOs across the region</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Modern SACCO Management{' '}
              <span className="text-yellow-300">Made Simple</span>
            </h1>

            <p className="text-lg md:text-xl mb-8 text-blue-100 leading-relaxed">
              Empower your SACCO with a complete digital platform. Manage members, 
              track savings, process loans, and provide members with 24/7 access to 
              their accounts—all in one secure system.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                asChild
                size="lg"
                className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 text-lg px-8 py-6"
              >
                <Link href="/register">
                  Register Your SACCO
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              {/*   <Button 
                size="lg" 
                variant="outline" 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900 text-lg px-8 py-6"
              >
                Watch Demo
              </Button> */}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                 {/* <div className="text-3xl font-bold text-yellow-300">500+</div> */}
                <div className="text-3xl font-bold text-yellow-300">0+</div>
                <div className="text-sm text-blue-100">Active SACCOs</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {/* <div className="text-3xl font-bold text-yellow-300">50K+</div> */}
                <div className="text-3xl font-bold text-yellow-300">0+</div>
                <div className="text-sm text-blue-100">Members</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="text-3xl font-bold text-yellow-300">0.0%</div>
                <div className="text-sm text-blue-100">Uptime</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right content - Sign in */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center md:justify-end"
          >
            <div className="w-full max-w-sm rounded-2xl border-2 border-white bg-transparent p-8 text-white">
              <div className="mb-6 text-center space-y-1">
                <h2 className="text-2xl font-semibold text-white">Welcome back</h2>
                <p className="text-lg font-medium text-white/90">Sign In Account</p>
              </div>
              <form className="space-y-5" onSubmit={handleLogin}>
                {error ? (
                  <p
                    className="text-sm text-red-200 bg-red-500/20 border border-red-300/40 rounded-md px-3 py-2"
                    role="alert"
                  >
                    {error}
                  </p>
                ) : null}
                <div className="space-y-2">
                  <Label htmlFor="hero-sacco-name" className="text-white">
                    SACCO name
                  </Label>
                  <Input
                    id="hero-sacco-name"
                    name="saccoName"
                    type="text"
                    autoComplete="organization"
                    placeholder="e.g. hope"
                    value={saccoName}
                    onChange={(e) => setSaccoName(e.target.value)}
                    disabled={loading}
                    className="bg-transparent border-white text-white placeholder:text-white/50 selection:bg-white/20 focus-visible:border-white focus-visible:ring-white/30 dark:bg-transparent dark:border-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-username" className="text-white">
                    Username or email
                  </Label>
                  <Input
                    id="hero-username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    placeholder="you@example.com"
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                    disabled={loading}
                    className="bg-transparent border-white text-white placeholder:text-white/50 selection:bg-white/20 focus-visible:border-white focus-visible:ring-white/30 dark:bg-transparent dark:border-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-password" className="text-white">
                    Password
                  </Label>
                  <Input
                    id="hero-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="bg-transparent border-white text-white placeholder:text-white/50 selection:bg-white/20 focus-visible:border-white focus-visible:ring-white/30 dark:bg-transparent dark:border-white"
                  />
                </div>
                <div className="flex flex-col gap-3 pt-1">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="hero-remember"
                      name="remember"
                      checked={remember}
                      onCheckedChange={(v) => setRemember(v === true)}
                      disabled={loading}
                      className="border-white bg-transparent data-[state=checked]:bg-white data-[state=checked]:text-blue-800 data-[state=checked]:border-white dark:border-white dark:bg-transparent dark:data-[state=checked]:bg-white"
                    />
                    <Label
                      htmlFor="hero-remember"
                      className="text-sm font-normal text-white cursor-pointer"
                    >
                      Remember me
                    </Label>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-white hover:text-white/80 underline-offset-4 hover:underline bg-transparent border-0 p-0 cursor-pointer text-left w-fit"
                  >
                    Forgot your password?
                  </button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-yellow-400 text-blue-900 hover:bg-yellow-300 font-semibold"
                  >
                    {loading ? 'Signing in…' : 'Sign in'}
                  </Button>
                </div>
              </form>
            </div>

            {/* Decorative floating elements */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 -right-6 bg-yellow-400 rounded-full p-4 shadow-xl"
            >
              <Users className="w-8 h-8 text-blue-900" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
