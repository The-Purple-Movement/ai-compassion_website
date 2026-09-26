'use client';

import { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Send,
  Sparkles,
  User,
  Mail,
  Globe,
  MapPin,
  Building,
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

export default function JoinModal({ isOpen, onClose }) {
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

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-zoom-out');
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.classList.remove('modal-zoom-out');
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.classList.remove('modal-zoom-out');
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleHub = (hub) => {
    setFormData((prev) => {
      const exists = prev.regionalHubs.includes(hub);
      if (exists) {
        if (prev.regionalHubs.length === 1) return prev;
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
        if (prev.roles.length === 1) return prev;
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
      // Primary Submission: Server-side API endpoint with verified status
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
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

      // Append each hub individually with mapped name
      formData.regionalHubs.forEach((h) => {
        formBody.append(FIELD_IDS.regionalHub, HUB_MAPPING[h] || h);
      });

      // Append each role individually
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
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody.toString(),
      });

      setStatus('success');
    } catch (err) {
      console.error('Registration submission error:', err);
      // Try fallback direct submission
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
      } catch (fallbackErr) {
        console.error('Fallback error:', fallbackErr);
        setStatus('error');
        setErrorMessage('Unable to complete registration. Please check your internet connection and try again.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-y-auto border border-[#D9DDD6] text-[#171918] animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-black shadow-xs transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {status === 'success' ? (
          <div className="p-6 sm:p-10 text-center flex flex-col items-center gap-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50 text-[#163B32] border border-emerald-200 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-[#22C55E]" />
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#22C55E]">
                Confirmation
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#171918]">
                You&apos;re registered! 🌍
              </h2>
            </div>

            <div className="text-slate-600 text-xs sm:text-sm leading-relaxed space-y-2 font-normal max-w-md">
              <p className="font-medium text-[#163B32]">
                Welcome to the AI + Compassion Global Forum 2026.
              </p>
              <p>
                Your registration has been successfully recorded. We look forward to having you join the 24-hour global experience.
              </p>
            </div>

            <button
              onClick={onClose}
              className="bg-[#163B32] hover:bg-[#0F2620] text-white px-8 py-3 rounded-full font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-xl transition-all cursor-pointer mt-2"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            {/* Header Banner */}
            <div className="bg-[#163B32] p-5 sm:p-7 text-[#F8F6F0] relative overflow-hidden">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/10 text-[10px] font-mono tracking-widest text-[#D8B56A] uppercase mb-2 border border-white/15">
                <Sparkles className="w-3 h-3 text-[#D8B56A]" />
                <span>Join The Conversation</span>
              </div>
              <h2 className="font-editorial text-xl sm:text-2xl md:text-3xl font-bold mb-1 leading-tight">
                AI + Compassion Global Forum 2026
              </h2>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-light">
                Registration is free and open to everyone around the world.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-4 sm:p-7 space-y-4 sm:space-y-5">
              {status === 'error' && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{errorMessage || 'Failed to submit registration. Please try again.'}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#163B32] flex items-center gap-1.5">
                    <User className="w-3 h-3 text-[#22C55E]" />
                    <span>First Name *</span>
                  </label>
                  <input
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#F8F6F0] border border-[#D9DDD6] focus:border-[#163B32] focus:bg-white outline-none text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#163B32] flex items-center gap-1.5">
                    <User className="w-3 h-3 text-[#22C55E]" />
                    <span>Last Name *</span>
                  </label>
                  <input
                    required
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#F8F6F0] border border-[#D9DDD6] focus:border-[#163B32] focus:bg-white outline-none text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#163B32] flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-[#22C55E]" />
                  <span>Email Address *</span>
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@domain.org"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F8F6F0] border border-[#D9DDD6] focus:border-[#163B32] focus:bg-white outline-none text-xs sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#163B32] flex items-center gap-1.5">
                    <Globe className="w-3 h-3 text-[#22C55E]" />
                    <span>Country *</span>
                  </label>
                  <input
                    required
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Country"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#F8F6F0] border border-[#D9DDD6] focus:border-[#163B32] focus:bg-white outline-none text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#163B32] flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#22C55E]" />
                    <span>City *</span>
                  </label>
                  <input
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#F8F6F0] border border-[#D9DDD6] focus:border-[#163B32] focus:bg-white outline-none text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* Regional Hub Checkboxes */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#163B32]">
                    Which regional hub(s) would you like to join? *
                  </label>
                  <span className="text-[10px] text-slate-500">Select one or more</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-44 overflow-y-auto p-2 bg-[#F8F6F0] rounded-xl border border-[#D9DDD6]">
                  {REGIONAL_HUBS.map((hub) => {
                    const isChecked = formData.regionalHubs.includes(hub);
                    return (
                      <button
                        key={hub}
                        type="button"
                        onClick={() => toggleHub(hub)}
                        className={`flex items-start gap-2 p-2 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-emerald-50 border-[#163B32] text-[#163B32] font-semibold'
                            : 'bg-white border-[#E2E6DF] text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="shrink-0 mt-0.5">
                          {isChecked ? (
                            <CheckSquare className="w-3.5 h-3.5 text-[#163B32]" />
                          ) : (
                            <Square className="w-3.5 h-3.5 text-slate-400" />
                          )}
                        </div>
                        <span className="leading-snug text-[11px]">{hub}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Role / Background Checkboxes */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#163B32]">
                    Which best describes you? *
                  </label>
                  <span className="text-[10px] text-slate-500">Select one or more</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto p-2 bg-[#F8F6F0] rounded-xl border border-[#D9DDD6]">
                  {ROLE_OPTIONS.map((opt) => {
                    const isChecked = formData.roles.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleRole(opt)}
                        className={`flex items-center gap-1.5 p-2 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-emerald-50 border-[#163B32] text-[#163B32] font-semibold'
                            : 'bg-white border-[#E2E6DF] text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="shrink-0">
                          {isChecked ? (
                            <CheckSquare className="w-3.5 h-3.5 text-[#163B32]" />
                          ) : (
                            <Square className="w-3.5 h-3.5 text-slate-400" />
                          )}
                        </div>
                        <span className="leading-tight truncate text-[11px]">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#163B32] flex items-center gap-1.5">
                  <Building className="w-3 h-3 text-[#22C55E]" />
                  <span>University, Organization, or Affiliation *</span>
                </label>
                <input
                  required
                  name="affiliation"
                  value={formData.affiliation}
                  onChange={handleInputChange}
                  placeholder="Organization or Affiliation"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F8F6F0] border border-[#D9DDD6] focus:border-[#163B32] focus:bg-white outline-none text-xs sm:text-sm"
                />
              </div>

              {/* Newsletter Opt-in */}
              <div className="space-y-1.5 pt-1 border-t border-[#D9DDD6]/70">
                <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#163B32]">
                  Subscribe to our newsletter? *
                </label>
                <div className="flex items-center gap-4">
                  {['Yes', 'No'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, newsletter: opt }))}
                      className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                        formData.newsletter === opt
                          ? 'bg-[#163B32] text-white border-[#163B32]'
                          : 'bg-[#F8F6F0] text-slate-700 border-[#D9DDD6] hover:bg-slate-100'
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${formData.newsletter === opt ? 'border-white' : 'border-slate-400'}`}>
                        {formData.newsletter === opt && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                      <span>{opt}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                disabled={status === 'loading'}
                type="submit"
                className="w-full bg-[#163B32] hover:bg-[#0F2620] text-white py-3.5 rounded-2xl font-bold text-xs sm:text-sm tracking-widest uppercase shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-3"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Complete Registration</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
