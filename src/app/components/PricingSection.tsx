'use client';

import { motion } from 'motion/react';
import * as React from 'react';
import { Check, Mail, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

export function PricingSection() {
  const [submitted, setSubmitted] = React.useState(false);
  const [form, setForm] = React.useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    members: '',
    message: '',
  });

  function updateField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setSubmitted(false);
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const to = 'info@sacco.ug';
    const subject = `Demo request${form.organization ? ` - ${form.organization}` : ''}`;
    const body = [
      `Full name: ${form.fullName}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || '-'}`,
      `SACCO/Organization: ${form.organization || '-'}`,
      `Approx. members: ${form.members || '-'}`,
      '',
      'Message:',
      form.message || '-',
    ].join('\n');

    window.location.href = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contact Us for a Demo
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how Flits Sacco helps you manage members, savings, loans, and reporting—tailored to your SACCO’s workflow.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-sm"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              What you’ll get in the demo
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We’ll walk you through the platform using realistic SACCO scenarios and answer your questions on setup, security, and onboarding.
            </p>

            <div className="space-y-4 mb-8">
              {[
                'Member onboarding, savings & loan workflows',
                'Loan approvals, repayments, penalties & statements',
                'Reports, analytics, and admin controls',
                'Member portal experience (mobile-friendly)',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="w-5 h-5 flex-shrink-0 text-blue-600 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="text-sm font-semibold text-gray-900 mb-4">Prefer direct contact?</div>
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="rounded-2xl shadow-lg border-2 border-blue-100">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Request a demo
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Fill in your details and we’ll reach out to schedule a time.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitted && (
                  <div className="mb-6">
                    <Alert>
                      <AlertTitle>Draft email created</AlertTitle>
                      <AlertDescription>
                        Your email app should open with the details pre-filled. If it didn’t, use the email/phone links on the left.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}

                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="demo-fullName">Full name</Label>
                      <Input
                        id="demo-fullName"
                        value={form.fullName}
                        onChange={(e) => updateField('fullName', e.target.value)}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="demo-email">Email</Label>
                      <Input
                        id="demo-email"
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
                      <Label htmlFor="demo-phone">Phone (optional)</Label>
                      <Input
                        id="demo-phone"
                        value={form.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        placeholder="+256 ..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="demo-members">Members (optional)</Label>
                      <Input
                        id="demo-members"
                        inputMode="numeric"
                        value={form.members}
                        onChange={(e) => updateField('members', e.target.value)}
                        placeholder="e.g. 350"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="demo-organization">SACCO/Organization (optional)</Label>
                    <Input
                      id="demo-organization"
                      value={form.organization}
                      onChange={(e) => updateField('organization', e.target.value)}
                      placeholder="Your SACCO name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="demo-message">Message (optional)</Label>
                    <Textarea
                      id="demo-message"
                      value={form.message}
                      onChange={(e) => updateField('message', e.target.value)}
                      placeholder="What would you like to see in the demo?"
                      className="min-h-28"
                    />
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="lg" type="submit">
                    Contact us for a demo
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="border-t">
                <p className="text-sm text-gray-500">
                  We typically reply within 1 business day.
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            Want a tailored walkthrough? Share your current process and we’ll demo the exact workflow you need.
          </p>
          <p className="text-sm text-gray-500">
            Or email us directly at{' '}
            <a href="mailto:info@sacco.ug" className="text-blue-600 font-semibold hover:underline">
              info@sacco.ug
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
