'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Building2,
  Check,
  Clock,
  KeyRound,
  Mail,
  Phone,
  Shield,
  Sparkles,
  Users,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

const exploreAreas = [
  'Members and accounts',
  'Savings and shares',
  'Loans and repayments',
  'Reports and statements',
  'Member self-service portal',
];

const demoOptions = [
  {
    value: 'guided',
    title: 'Guided demo',
    description: 'A walkthrough with our team, using a sample SACCO.',
  },
  {
    value: 'self-serve',
    title: 'Self-serve demo SACCO',
    description: 'Login access so your team can click through on your own.',
  },
  {
    value: 'both',
    title: 'Both',
    description: 'A short walkthrough, then login so you can keep testing.',
  },
] as const;

export function DemoPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [areas, setAreas] = React.useState<string[]>([]);
  const [form, setForm] = React.useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    role: '',
    members: '',
    demoType: 'both',
    preferredTime: '',
    message: '',
  });

  function updateField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setSubmitted(false);
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleArea(area: string) {
    setSubmitted(false);
    setAreas((prev) =>
      prev.includes(area) ? prev.filter((item) => item !== area) : [...prev, area],
    );
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const chosen = demoOptions.find((option) => option.value === form.demoType);
    const to = 'info@sacco.ug';
    const subject = `Demo SACCO request${form.organization ? ` - ${form.organization}` : ''}`;
    const body = [
      'Request: Try Flits Sacco before creating a SACCO tenant',
      `Demo type: ${chosen?.title ?? form.demoType}`,
      '',
      `Full name: ${form.fullName}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || '-'}`,
      `Role: ${form.role || '-'}`,
      `SACCO/Organization: ${form.organization || '-'}`,
      `Approx. members: ${form.members || '-'}`,
      `Preferred time: ${form.preferredTime || '-'}`,
      `Areas to explore: ${areas.length ? areas.join(', ') : '-'}`,
      '',
      'Message:',
      form.message || '-',
    ].join('\n');

    window.location.href = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  }

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-16 left-8 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-8 w-96 h-96 bg-purple-300 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">For SACCOs that want to test first</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              Try Flits before you{' '}
              <span className="text-yellow-300">create your SACCO</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl mb-8 text-blue-100 leading-relaxed max-w-2xl"
            >
              Request a demo workspace and explore members, savings, loans, and
              reports the way other SACCO teams do. No tenant setup and no
              registration required before you decide to choose us.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 text-lg px-8 py-6"
              >
                <a href="#request-demo">
                  Request a demo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900 text-lg px-8 py-6"
              >
                <a href="tel:+256775186921">Talk to us</a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Mail,
                title: '1. Tell us about your SACCO',
                text: 'Share who you are and what you want to see. You do not create an account first.',
              },
              {
                icon: KeyRound,
                title: '2. We open a demo workspace',
                text: 'A ready-made demo SACCO, with sample members, savings, and loans you can click through.',
              },
              {
                icon: Building2,
                title: '3. Test, then choose Flits',
                text: 'When the workflow fits, you register your own SACCO. Until then, nothing is set up in your name.',
              },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-4">
                  <step.icon className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h2>
                <p className="text-gray-600 leading-relaxed">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 pb-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  What you can test
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  The demo uses a sample SACCO so your board, treasurer, or
                  manager can see the real screens before anyone creates a tenant.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  'Member records, savings balances, and share accounts',
                  'Loan applications, approvals, repayments, and statements',
                  'Reports your committee can review in a meeting',
                  'The member portal members would use on their phones',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Check className="w-5 h-5 flex-shrink-0 text-blue-600 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { icon: Clock, label: 'Usually within 1 business day' },
                  { icon: Shield, label: 'Sample data only, not your members' },
                  { icon: Users, label: 'Share access with your team' },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-gray-200 p-4">
                    <item.icon className="w-5 h-5 text-blue-600 mb-2" />
                    <p className="text-sm text-gray-700">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                <div className="text-sm font-semibold text-gray-900 mb-4">Prefer to call?</div>
                <div className="space-y-3">
                  <a href="mailto:info@sacco.ug" className="flex items-center gap-3 text-gray-700 hover:text-gray-900">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">info@sacco.ug</span>
                  </a>
                  <a href="tel:+256775186921" className="flex items-center gap-3 text-gray-700 hover:text-gray-900">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">+256 775 186 921</span>
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              id="request-demo"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="scroll-mt-24"
            >
              <Card className="rounded-2xl shadow-lg border-2 border-blue-100">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Request a demo
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Choose how you want to try Flits. We will set up the demo SACCO for you.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {submitted && (
                    <div className="mb-6">
                      <Alert>
                        <AlertTitle>Draft email created</AlertTitle>
                        <AlertDescription>
                          Your email app should open with the request pre-filled. If it did not, write to info@sacco.ug.
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}

                  <form onSubmit={onSubmit} className="space-y-5">
                    <fieldset className="space-y-3">
                      <legend className="text-sm font-medium text-gray-900 mb-1">
                        How do you want to try Flits?
                      </legend>
                      {demoOptions.map((option) => (
                        <label
                          key={option.value}
                          className={`flex gap-3 rounded-xl border p-3 cursor-pointer transition-colors ${
                            form.demoType === option.value
                              ? 'border-blue-600 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-200'
                          }`}
                        >
                          <input
                            type="radio"
                            name="demoType"
                            value={option.value}
                            checked={form.demoType === option.value}
                            onChange={() => updateField('demoType', option.value)}
                            className="mt-1"
                          />
                          <span>
                            <span className="block text-sm font-semibold text-gray-900">{option.title}</span>
                            <span className="block text-sm text-gray-600">{option.description}</span>
                          </span>
                        </label>
                      ))}
                    </fieldset>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="request-fullName">Full name</Label>
                        <Input
                          id="request-fullName"
                          value={form.fullName}
                          onChange={(e) => updateField('fullName', e.target.value)}
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="request-email">Work email</Label>
                        <Input
                          id="request-email"
                          type="email"
                          value={form.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          placeholder="you@sacco.ug"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="request-phone">Phone</Label>
                        <Input
                          id="request-phone"
                          value={form.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                          placeholder="+256 ..."
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="request-role">Your role</Label>
                        <select
                          id="request-role"
                          value={form.role}
                          onChange={(e) => updateField('role', e.target.value)}
                          className="border-input flex h-9 w-full rounded-md border bg-input-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                          required
                        >
                          <option value="">Select a role</option>
                          <option>Chairperson</option>
                          <option>Treasurer</option>
                          <option>Manager</option>
                          <option>Loan officer</option>
                          <option>Board member</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="request-organization">SACCO name (optional)</Label>
                        <Input
                          id="request-organization"
                          value={form.organization}
                          onChange={(e) => updateField('organization', e.target.value)}
                          placeholder="If you already have one"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="request-members">Approx. members (optional)</Label>
                        <Input
                          id="request-members"
                          inputMode="numeric"
                          value={form.members}
                          onChange={(e) => updateField('members', e.target.value)}
                          placeholder="e.g. 350"
                        />
                      </div>
                    </div>

                    <fieldset className="space-y-2">
                      <legend className="text-sm font-medium">What should we include?</legend>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {exploreAreas.map((area) => (
                          <label key={area} className="flex items-center gap-2 text-sm text-gray-700">
                            <input
                              type="checkbox"
                              checked={areas.includes(area)}
                              onChange={() => toggleArea(area)}
                            />
                            {area}
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <div className="space-y-2">
                      <Label htmlFor="request-time">Preferred day or time (optional)</Label>
                      <Input
                        id="request-time"
                        value={form.preferredTime}
                        onChange={(e) => updateField('preferredTime', e.target.value)}
                        placeholder="e.g. Tuesday afternoon"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="request-message">Anything else (optional)</Label>
                      <Textarea
                        id="request-message"
                        value={form.message}
                        onChange={(e) => updateField('message', e.target.value)}
                        placeholder="Current process, questions, or who else should join"
                        className="min-h-28"
                      />
                    </div>

                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="lg" type="submit">
                      Request a demo of Flits
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className="border-t">
                  <p className="text-sm text-gray-500">
                    We typically reply within 1 business day. Choosing Flits only happens after you have tried the demo.
                  </p>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
