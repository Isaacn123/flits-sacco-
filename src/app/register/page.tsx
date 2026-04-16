'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import createUgLocale from 'ug-locale';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

function errorMessage(data: unknown): string {
  if (!data || typeof data !== 'object') return 'Registration failed. Please try again.';
  const o = data as Record<string, unknown>;
  if (typeof o.message === 'string') return o.message;
  if (o.errors && typeof o.errors === 'object') {
    const first = Object.values(o.errors as Record<string, string[]>)[0];
    if (Array.isArray(first) && first[0]) return String(first[0]);
  }
  return 'Registration failed. Please try again.';
}

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const ug = useMemo(() => createUgLocale(), []);
  const districtsSorted = useMemo(
    () => [...ug.districts()].sort((a, b) => a.name.localeCompare(b.name)),
    [ug],
  );

  /** Uganda: district + county (municipality) from ug-locale; other countries: free text */
  const [countryMode, setCountryMode] = useState<'uganda' | 'other'>('uganda');
  const [otherCountryName, setOtherCountryName] = useState('');
  const [districtId, setDistrictId] = useState('');
  const [countyId, setCountyId] = useState('');
  const [districtOther, setDistrictOther] = useState('');
  const [cityOther, setCityOther] = useState('');

  const countiesSorted = useMemo(() => {
    if (!districtId) return [];
    return [...ug.counties(districtId)].sort((a, b) => a.name.localeCompare(b.name));
  }, [ug, districtId]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);

    const estimated = fd.get('estimated_member_count');
    const estimatedNum = estimated ? parseInt(String(estimated), 10) : 0;

    let district = '';
    let city = '';
    let country = 'Uganda';

    if (countryMode === 'uganda') {
      country = 'Uganda';
      district = districtsSorted.find((d) => d.id === districtId)?.name ?? '';
      city = countiesSorted.find((c) => c.id === countyId)?.name ?? '';
    } else {
      country = otherCountryName.trim() || 'Other';
      district = districtOther.trim();
      city = cityOther.trim();
    }

    const payload: Record<string, string | number | undefined> = {
      sacco_name: String(fd.get('sacco_name') ?? '').trim(),
      contact_person: String(fd.get('contact_person') ?? '').trim(),
      phone: String(fd.get('phone') ?? '').trim(),
      email: String(fd.get('email') ?? '').trim(),
      estimated_member_count: Number.isFinite(estimatedNum) ? estimatedNum : 0,
      district,
      city,
      country,
    };
    const reg = String(fd.get('registration_number') ?? '').trim();
    if (reg) payload.registration_number = reg;

    if (!payload.sacco_name || !payload.contact_person || !payload.phone || !payload.email) {
      setError('Please fill in SACCO name, contact person, phone, and email.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/marketing/sacco-register', {
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
      toast.success('Registration received', {
        description: 'We will contact you using the phone or email you provided.',
        duration: 6000,
      });
      setSuccess(true);
    } catch {
      setError('Network error. Check your connection and try again.');
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

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Register your organization</h1>
        <p className="text-gray-600 mb-8">
          Built for SACCOs, investment clubs, savings groups, and cooperatives. Submit your
          details and our team will follow up to onboard your organization.
        </p>

        {success ? (
          <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-6 text-green-900">
            <p className="font-medium">Thank you — your registration was received.</p>
            <p className="text-sm mt-2 text-green-800">
              We will contact you using the phone or email you provided.
            </p>
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
              <Label htmlFor="sacco_name">SACCO name *</Label>
              <Input id="sacco_name" name="sacco_name" required autoComplete="organization" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact_person">Contact person *</Label>
              <Input id="contact_person" name="contact_person" required autoComplete="name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input id="phone" name="phone" type="tel" required autoComplete="tel" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" name="email" type="email" required autoComplete="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estimated_member_count">Estimated member count</Label>
              <Input
                id="estimated_member_count"
                name="estimated_member_count"
                type="number"
                min={0}
                placeholder="e.g. 150"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country_mode">Country</Label>
              <Select
                value={countryMode}
                onValueChange={(v) => {
                  const next = v as 'uganda' | 'other';
                  setCountryMode(next);
                  if (next === 'uganda') {
                    setDistrictOther('');
                    setCityOther('');
                    setOtherCountryName('');
                  } else {
                    setDistrictId('');
                    setCountyId('');
                  }
                }}
              >
                <SelectTrigger id="country_mode" className="w-full">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent position="popper" className="max-h-[min(24rem,var(--radix-select-content-available-height))]">
                  <SelectItem value="uganda">Uganda</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {countryMode === 'uganda' ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="district_select">District</Label>
                  <Select
                    value={districtId || undefined}
                    onValueChange={(id) => {
                      setDistrictId(id);
                      setCountyId('');
                    }}
                  >
                    <SelectTrigger id="district_select" className="w-full">
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      className="max-h-[min(24rem,var(--radix-select-content-available-height))]"
                    >
                      {districtsSorted.map((d) => (
                        <SelectItem key={d.id} value={d.id}>
                          {d.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="county_select">City / municipality</Label>
                  <Select
                    value={countyId || undefined}
                    onValueChange={setCountyId}
                    disabled={!districtId}
                  >
                    <SelectTrigger id="county_select" className="w-full">
                      <SelectValue
                        placeholder={districtId ? 'Select city or municipality' : 'Select district first'}
                      />
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      className="max-h-[min(24rem,var(--radix-select-content-available-height))]"
                    >
                      {countiesSorted.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">
                    Areas from official Uganda locality data (districts and counties / municipalities).
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="country_other">Country name *</Label>
                  <Input
                    id="country_other"
                    value={otherCountryName}
                    onChange={(e) => setOtherCountryName(e.target.value)}
                    autoComplete="country-name"
                    placeholder="e.g. Kenya"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="district_other">District / region</Label>
                    <Input
                      id="district_other"
                      value={districtOther}
                      onChange={(e) => setDistrictOther(e.target.value)}
                      autoComplete="address-level2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city_other">City / town</Label>
                    <Input
                      id="city_other"
                      value={cityOther}
                      onChange={(e) => setCityOther(e.target.value)}
                      autoComplete="address-level1"
                    />
                  </div>
                </div>
              </>
            )}
            <div className="space-y-2">
              <Label htmlFor="registration_number">Registration number (optional)</Label>
              <Input id="registration_number" name="registration_number" />
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
              {loading ? 'Submitting…' : 'Submit registration'}
            </Button>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
}
