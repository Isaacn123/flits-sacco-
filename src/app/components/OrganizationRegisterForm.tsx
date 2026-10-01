'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import createUgLocale from 'ug-locale';

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

const copy = {
  sacco: {
    title: 'Register your Sacco',
    description: 'Submit your SACCO details. Our team will follow up to onboard you.',
    nameLabel: 'SACCO name *',
    namePlaceholder: 'e.g. Hope SACCO',
    nameError: 'Please fill in SACCO name, contact person, phone, and email.',
  },
  group: {
    title: 'Register your group',
    description: 'For savings groups and investment clubs. Our team will follow up to onboard you.',
    nameLabel: 'Group or club name *',
    namePlaceholder: 'e.g. Hope Savings Group',
    nameError: 'Please fill in the group or club name, type, contact person, phone, and email.',
  },
} as const;

export function OrganizationRegisterForm({ variant }: { variant: 'sacco' | 'group' }) {
  const text = copy[variant];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [groupType, setGroupType] = useState('');

  const ug = useMemo(() => createUgLocale(), []);
  const districtsSorted = useMemo(
    () => [...ug.districts()].sort((a, b) => a.name.localeCompare(b.name)),
    [ug],
  );

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
    if (variant === 'group') payload.organization_type = groupType;

    if (
      !payload.sacco_name ||
      !payload.contact_person ||
      !payload.phone ||
      !payload.email ||
      (variant === 'group' && !groupType)
    ) {
      setError(text.nameError);
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

  const fieldClass = 'mb-[18px]';
    const labelClass = 'mb-2 block text-sm font-semibold text-white';
    const controlClass =
      'h-10 w-full rounded-lg border border-white bg-white/10 px-3.5 text-sm text-white outline-none placeholder:text-white/55 focus:shadow-[0_0_0_3px_rgba(252,200,0,0.55)] disabled:opacity-55 [&_option]:text-neutral-900';

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
              <p className="text-center text-lg font-semibold">Thank you — your registration was received.</p>
              <p className="mt-2 text-center text-sm text-white/85">
                We will contact you using the phone or email you provided.
              </p>
              <Link
                href="/"
                className="mt-6 flex h-10 items-center justify-center rounded-lg bg-[#fcc800] text-sm font-semibold text-[#1e1b4b] no-underline hover:brightness-105"
              >
                Return home
              </Link>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="relative rounded-[22px] border-2 border-white bg-gradient-to-br from-[#1d4ed8] to-[#4338ca] px-8 pb-8 pt-9 text-white shadow-[0_20px_40px_rgba(67,56,202,0.3)]"
            >
              <h1 className="m-0 text-center text-2xl font-semibold">{text.title}</h1>
              <p className="mb-6 mt-1.5 text-center text-sm text-white/85">{text.description}</p>

              {error ? (
                <p className="mb-[18px] rounded-lg border border-white/40 bg-white/15 px-3 py-2 text-sm" role="alert">
                  {error}
                </p>
              ) : null}

              <div className={fieldClass}>
                <label className={labelClass} htmlFor="sacco_name">{text.nameLabel}</label>
                <input id="sacco_name" name="sacco_name" required autoComplete="organization" placeholder={text.namePlaceholder} className={controlClass} />
              </div>

              {variant === 'group' ? (
              <div className={fieldClass}>
                <label className={labelClass} htmlFor="group_type">Group or club *</label>
                <select
                  id="group_type"
                  name="group_type"
                  required
                  value={groupType}
                  onChange={(e) => setGroupType(e.target.value)}
                  className={controlClass}
                >
                  <option value="">Select group or club</option>
                  <option value="savings_group">Savings group</option>
                  <option value="investment_club">Investment club</option>
                </select>
              </div>
              ) : null}

              <div className={fieldClass}>
                <label className={labelClass} htmlFor="contact_person">Contact person *</label>
                <input id="contact_person" name="contact_person" required autoComplete="name" placeholder="Full name" className={controlClass} />
              </div>

              <div className={fieldClass}>
                <label className={labelClass} htmlFor="phone">Phone *</label>
                <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="+256 700 000000" className={controlClass} />
              </div>

              <div className={fieldClass}>
                <label className={labelClass} htmlFor="email">Email *</label>
                <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={controlClass} />
              </div>

              <div className={fieldClass}>
                <label className={labelClass} htmlFor="estimated_member_count">Estimated member count</label>
                <input id="estimated_member_count" name="estimated_member_count" type="number" min={0} placeholder="e.g. 150" className={controlClass} />
              </div>

              <div className={fieldClass}>
                <label className={labelClass} htmlFor="country_mode">Country</label>
                <select
                  id="country_mode"
                  name="country"
                  value={countryMode}
                  onChange={(e) => {
                    const next = e.target.value as 'uganda' | 'other';
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
                  className={controlClass}
                >
                  <option value="uganda">Uganda</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {countryMode === 'uganda' ? (
                <>
                  <div className={fieldClass}>
                    <label className={labelClass} htmlFor="district_select">District</label>
                    <select
                      id="district_select"
                      name="district"
                      value={districtId}
                      onChange={(e) => {
                        setDistrictId(e.target.value);
                        setCountyId('');
                      }}
                      className={controlClass}
                    >
                      <option value="">Select district</option>
                      {districtsSorted.map((d) => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className={fieldClass}>
                    <label className={labelClass} htmlFor="county_select">City / municipality</label>
                    <select
                      id="county_select"
                      name="county"
                      value={countyId}
                      disabled={!districtId}
                      onChange={(e) => setCountyId(e.target.value)}
                      className={controlClass}
                    >
                      <option value="">{districtId ? 'Select city or municipality' : 'Select district first'}</option>
                      {countiesSorted.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                    <p className="mt-1.5 text-xs text-white/75">Areas from official Uganda locality data.</p>
                  </div>
                </>
              ) : (
                <>
                  <div className={fieldClass}>
                    <label className={labelClass} htmlFor="country_other">Country name *</label>
                    <input
                      id="country_other"
                      value={otherCountryName}
                      onChange={(e) => setOtherCountryName(e.target.value)}
                      autoComplete="country-name"
                      placeholder="e.g. Kenya"
                      required
                      className={controlClass}
                    />
                  </div>
                  <div className={fieldClass}>
                    <label className={labelClass} htmlFor="district_other">District / region</label>
                    <input
                      id="district_other"
                      value={districtOther}
                      onChange={(e) => setDistrictOther(e.target.value)}
                      autoComplete="address-level2"
                      className={controlClass}
                    />
                  </div>
                  <div className={fieldClass}>
                    <label className={labelClass} htmlFor="city_other">City / town</label>
                    <input
                      id="city_other"
                      value={cityOther}
                      onChange={(e) => setCityOther(e.target.value)}
                      autoComplete="address-level1"
                      className={controlClass}
                    />
                  </div>
                </>
              )}

              <div className={fieldClass}>
                <label className={labelClass} htmlFor="registration_number">Registration number (optional)</label>
                <input id="registration_number" name="registration_number" className={controlClass} />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-1.5 h-10 w-full cursor-pointer rounded-lg border-0 bg-[#fcc800] text-sm font-semibold text-[#1e1b4b] hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? 'Submitting…' : 'Submit registration'}
              </button>
            </form>
          )}
        </div>
      </div>
    );
}
