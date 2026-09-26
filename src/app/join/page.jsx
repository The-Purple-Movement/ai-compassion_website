'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Send,
  Sparkles,
  Globe,
  User,
  Mail,
  Building,
  MapPin,
  CheckSquare,
  Square,
} from 'lucide-react';

const GOOGLE_FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLSeIDIvHm6LIU_19tYpmOqtAk034QK6u0LHdFyqn8dqssEz4yw/formResponse';

const FIELD_IDS = {
  email: 'entry.371099452',
  firstName: 'entry.937928410',
  lastName: 'entry.1326941354',
  country: 'entry.2089979659',
  city: 'entry.440325706',
  regionalHub: 'entry.1965342502',
  roleDescription: 'entry.256287034',
  affiliation: 'entry.1067502460',
  newsletter: 'entry.11884566',
};

const HUB_MAPPING = {
  'Australia, New Zealand & South Pacific': 'Australia, New Zealand & South Pacific',
  'Japan, Korea, Taiwan & Northeast Asia (Kyoto)': 'Japan, Korea, Taiwan & Northeast Asia',
  'Japan, Korea, Taiwan & Northeast Asia': 'Japan, Korea, Taiwan & Northeast Asia',
  'Southeast Asia (Youth Hub / Singapore)': 'Southeast Asia',
  'Southeast Asia': 'Southeast Asia',
  'South Asia': 'South Asia',
  'Middle East, Caucasus & Central Asia': 'Middle East, Caucasus & Central Asia',
  'East Africa, Southern Africa & Central Europe': 'East Africa, Southern Africa & Central Europe',
  'UK, Ireland, Iberia & West Africa': 'UK, Ireland, Iberia & West Africa',
  'Eastern & Southern South America & Caribbean': 'Eastern & Southern South America & Caribbean',
  'Eastern United States and Southern United States': 'Eastern United States and Southern United States',
  'Eastern North America & Northern South America': 'Eastern United States and Southern United States',
  'Midwestern United States & Mexico': 'Midwestern United States & Mexico',
  'Central North America & Mexico': 'Midwestern United States & Mexico',
  'Western North America': 'Western North America',
  'Hawaii, Alaska & Pacific Islands': 'Hawaii, Alaska & Pacific Islands',
};

const REGIONAL_HUBS = [
  'Australia, New Zealand & South Pacific',
  'Japan, Korea, Taiwan & Northeast Asia (Kyoto)',
  'Southeast Asia (Youth Hub / Singapore)',
  'South Asia',
  'Middle East, Caucasus & Central Asia',
  'East Africa, Southern Africa & Central Europe',
  'UK, Ireland, Iberia & West Africa',
  'Eastern & Southern South America & Caribbean',
  'Eastern United States and Southern United States',
  'Midwestern United States & Mexico',
  'Western North America',
  'Hawaii, Alaska & Pacific Islands',
];

const ROLE_OPTIONS = [
  'Student',
  'Working professional',
  'Researcher / Academic',
  'Educator / Teacher',
  'Entrepreneur / Founder',
  'Nonprofit / Community / Civil Society',
  'Government / Public Sector',
  'Technology / AI Professional',
  'Creative / Arts / Media',
  'Independent / Self-employed',
  'Retired',
  'Other',
];

export default function JoinPage() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    country: '',
    city: '',
    regionalHubs: ['Japan, Korea, Taiwan & Northeast Asia (Kyoto)'],
    roles: ['Working professional'],
    affiliation: '',
    newsletter: 'Yes',
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleHub = (hub) => {
    setFormData((prev) => {
      const exists = prev.regionalHubs.includes(hub);
      if (exists) {
        if (prev.regionalHubs.length === 1) return prev; // Keep at least one
        return { ...prev, regionalHubs: prev.regionalHubs.filter((h) => h !== hub) };
      } else {
        return { ...prev, regionalHubs: [...prev.regionalHubs, hub] };
      }
    });
  };

  const toggleRole = (role) => {
    setFormData((prev) => {
      const exists = prev.roles.includes(role);
      if (exists) {
        if (prev.roles.length === 1) return prev; // Keep at least one
        return { ...prev, roles: prev.roles.filter((r) => r !== role) };
      } else {
        return { ...prev, roles: [...prev.roles, role] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    setErrorMessage('');

    try {
      // Primary Submission: Server-side API endpoint
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Fallback: Direct Form Post with exact parameters
      const formBody = new URLSearchParams();
      formBody.append('emailAddress', formData.email.trim());
      formBody.append(FIELD_IDS.email, formData.email.trim());
      formBody.append(FIELD_IDS.firstName, formData.firstName.trim());
      formBody.append(FIELD_IDS.lastName, formData.lastName.trim());
      formBody.append(FIELD_IDS.country, formData.country.trim());
      formBody.append(FIELD_IDS.city, formData.city.trim());
      formBody.append(FIELD_IDS.affiliation, formData.affiliation.trim());
      formBody.append(FIELD_IDS.newsletter, formData.newsletter);

      formData.regionalHubs.forEach((h) => {
        formBody.append(FIELD_IDS.regionalHub, HUB_MAPPING[h] || h);
      });

      formData.roles.forEach((r) => {
        if (r === 'Other') {
          formBody.append(FIELD_IDS.roleDescription, '__other_option__');
          formBody.append(`${FIELD_IDS.roleDescription}.other_option_response`, 'Other');
        } else {
          formBody.append(FIELD_IDS.roleDescription, r);
        }
      });

      formBody.append('fvv', '1');
      formBody.append('pageHistory', '0');

      await fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString(),
      });

      setStatus('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Registration submission error:', err);
      try {
        const formBody = new URLSearchParams();
        formBody.append('emailAddress', formData.email.trim());
        formBody.append(FIELD_IDS.email, formData.email.trim());
        formBody.append(FIELD_IDS.firstName, formData.firstName.trim());
        formBody.append(FIELD_IDS.lastName, formData.lastName.trim());
        formBody.append(FIELD_IDS.country, formData.country.trim());
        formBody.append(FIELD_IDS.city, formData.city.trim());
        formBody.append(FIELD_IDS.affiliation, formData.affiliation.trim());
        formBody.append(FIELD_IDS.newsletter, formData.newsletter);

        formData.regionalHubs.forEach((h) => {
          formBody.append(FIELD_IDS.regionalHub, HUB_MAPPING[h] || h);
        });

        formData.roles.forEach((r) => {
          if (r === 'Other') {
            formBody.append(FIELD_IDS.roleDescription, '__other_option__');
            formBody.append(`${FIELD_IDS.roleDescription}.other_option_response`, 'Other');
          } else {
            formBody.append(FIELD_IDS.roleDescription, r);
          }
        });

        await fetch(GOOGLE_FORM_ACTION, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formBody.toString(),
        });

        setStatus('success');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (fallbackErr) {
        console.error('Fallback error:', fallbackErr);
        setStatus('error');
        setErrorMessage('Unable to complete registration. Please check your internet connection and try again.');
      }
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-[#F8F6F0] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-6 sm:p-10 md:p-12 text-center border border-[#D9DDD6] flex flex-col items-center gap-6 animate-in fade-in zoom-in-95 duration-300">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50 text-[#163B32] border border-emerald-200 rounded-full flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-[#22C55E]" />
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#22C55E]">
              Confirmation
            </span>
            <h1 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-[#171918]">
              You&apos;re registered! 🌍
            </h1>
          </div>

          <div className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed space-y-3 font-normal">
            <p className="font-medium text-[#163B32]">
              Welcome to the AI + Compassion Global Forum 2026.
            </p>
            <p>
              Your registration has been successfully recorded. We look forward to having you join the 24-hour global experience.
            </p>
            <p className="text-xs text-slate-500 pt-1">
              We look forward to welcoming you to the conversation.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[#163B32] text-[#F8F6F0] px-6 sm:px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-[#0F2620] shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 mt-2 w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Global Forum</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F6F0] pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 px-3 sm:px-6 flex flex-col items-center">
      <div className="max-w-3xl w-full flex flex-col items-center gap-6 sm:gap-8">
        
        {/* Main Card */}
        <div className="w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-[#D9DDD6]">
          
          {/* Header Banner */}
          <div className="bg-[#163B32] p-6 sm:p-8 md:p-12 text-[#F8F6F0] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#22C55E]/15 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[10px] sm:text-[11px] font-mono tracking-widest text-[#D8B56A] uppercase mb-3 border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-[#D8B56A]" />
              <span>Official Forum Registration</span>
            </div>
            <h1 className="font-editorial text-2xl sm:text-3xl md:text-5xl font-bold mb-3 relative z-10 leading-tight">
              AI + Compassion Global Forum 2026
            </h1>
            <p className="text-white/80 text-xs sm:text-sm md:text-base max-w-2xl relative z-10 leading-relaxed font-light">
              Join the 24-hour global conversation bringing together voices from 12 regions to explore how artificial intelligence can elevate human wellbeing, nature, and compassion. Free & open to all.
            </p>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-8 md:p-10 space-y-6 sm:space-y-7 text-[#171918]">
            
            {status === 'error' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs sm:text-sm text-red-700 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <span>{errorMessage || 'Failed to submit registration. Please try again.'}</span>
              </div>
            )}

            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#163B32] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>First Name *</span>
                </label>
                <input
                  required
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="e.g. Maya"
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F6F0] border border-[#D9DDD6] focus:border-[#163B32] focus:bg-white outline-none transition-all text-sm placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#163B32] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>Last Name *</span>
                </label>
                <input
                  required
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="e.g. Tanaka"
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F6F0] border border-[#D9DDD6] focus:border-[#163B32] focus:bg-white outline-none transition-all text-sm placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#163B32] flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>Email Address *</span>
              </label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@domain.org"
                className="w-full px-4 py-3 rounded-xl bg-[#F8F6F0] border border-[#D9DDD6] focus:border-[#163B32] focus:bg-white outline-none transition-all text-sm placeholder:text-slate-400"
              />
            </div>

            {/* Location (Country & City) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#163B32] flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>Country *</span>
                </label>
                <input
                  required
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="e.g. Japan"
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F6F0] border border-[#D9DDD6] focus:border-[#163B32] focus:bg-white outline-none transition-all text-sm placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#163B32] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>City *</span>
                </label>
                <input
                  required
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="e.g. Kyoto"
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F6F0] border border-[#D9DDD6] focus:border-[#163B32] focus:bg-white outline-none transition-all text-sm placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Regional Hub Selection (Checkboxes / Multi-select) */}
            <div className="space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#163B32]">
                  Which regional hub(s) would you like to join? *
                </label>
                <span className="text-[11px] text-slate-500 font-medium">Select one or more</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-60 overflow-y-auto p-2 bg-[#F8F6F0]/80 rounded-2xl border border-[#D9DDD6]">
                {REGIONAL_HUBS.map((hub) => {
                  const isChecked = formData.regionalHubs.includes(hub);
                  return (
                    <button
                      key={hub}
                      type="button"
                      onClick={() => toggleHub(hub)}
                      className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-emerald-50 border-[#163B32] text-[#163B32] font-semibold shadow-xs'
                          : 'bg-white border-[#E2E6DF] text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="shrink-0 mt-0.5">
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-[#163B32]" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                      <span className="leading-snug">{hub}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Role / Background Selection (Checkboxes / Multi-select) */}
            <div className="space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#163B32]">
                  Which best describes you? *
                </label>
                <span className="text-[11px] text-slate-500 font-medium">Select one or more</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-2 bg-[#F8F6F0]/80 rounded-2xl border border-[#D9DDD6]">
                {ROLE_OPTIONS.map((opt) => {
                  const isChecked = formData.roles.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleRole(opt)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-emerald-50 border-[#163B32] text-[#163B32] font-semibold shadow-xs'
                          : 'bg-white border-[#E2E6DF] text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="shrink-0">
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-[#163B32]" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                      <span className="leading-tight truncate">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* University, Organization, or Affiliation */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#163B32] flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>University, Organization, or Affiliation *</span>
              </label>
              <input
                required
                type="text"
                name="affiliation"
                value={formData.affiliation}
                onChange={handleInputChange}
                placeholder="e.g. Stanford University / Goi Peace Foundation / Independent"
                className="w-full px-4 py-3 rounded-xl bg-[#F8F6F0] border border-[#D9DDD6] focus:border-[#163B32] focus:bg-white outline-none transition-all text-sm placeholder:text-slate-400"
              />
            </div>

            {/* Newsletter Opt-in */}
            <div className="space-y-2 pt-2 border-t border-[#D9DDD6]/70">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#163B32]">
                Subscribe to our newsletter? *
              </label>
              <div className="flex items-center gap-4">
                {['Yes', 'No'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, newsletter: opt }))}
                    className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full border text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      formData.newsletter === opt
                        ? 'bg-[#163B32] text-white border-[#163B32] shadow-xs'
                        : 'bg-[#F8F6F0] text-slate-700 border-[#D9DDD6] hover:bg-slate-100'
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${formData.newsletter === opt ? 'border-white' : 'border-slate-400'}`}>
                      {formData.newsletter === opt && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                disabled={status === 'loading'}
                type="submit"
                className="w-full bg-[#163B32] hover:bg-[#0F2620] text-[#F8F6F0] py-4 rounded-2xl font-bold text-sm tracking-widest uppercase shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 cursor-pointer min-h-[48px]"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Registering...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Complete Registration</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-[11px] text-[#5E625D]">
              Responses are securely submitted and recorded directly for the AI+Compassion Global Forum 2026.
            </p>
          </form>

        </div>

        {/* Back link */}
        <Link
          href="/"
          className="flex items-center gap-2 text-[#5E625D] hover:text-[#163B32] transition-colors text-sm font-semibold group px-4 py-2"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

      </div>
    </div>
  );
}
