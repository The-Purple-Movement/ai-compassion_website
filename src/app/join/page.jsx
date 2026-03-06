"use client"

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Loader2, Send } from 'lucide-react';

// Metadata needs to be in a server component or layout.js for "use client" pages.
// We will create a layout.js in the same folder.

const GOOGLE_FORM_ACTION = process.env.NEXT_PUBLIC_GOOGLE_FORM_ACTION;

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const FIELD_IDS = {
    email: "entry.371099452",
    firstName: "entry.937928410",
    lastName: "entry.1326941354",
    country: "entry.2089979659",
    city: "entry.440325706",
    organization: "entry.1965342502",
    role: "entry.256287034",
    interests: "entry.1067502460",
    otherInterestText: "entry.1067502460.other_option_response",
    newsletter: "entry.11884566",
};

const INTERESTS_OPTIONS = [
    "AI Ethics", "AI Design", "AI Research", "AI Education",
    "AI Public Policy", "AI Innovation", "AI Startups", "AI Investment"
];

export default function JoinPage() {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        country: '',
        city: '',
        organization: '',
        role: '',
        interests: [],
        otherInterest: '',
        hasOther: false,
        newsletter: 'Yes',
    });

    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (interest) => {
        setFormData(prev => {
            const newInterests = prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest];
            return { ...prev, interests: newInterests };
        });
    };

    // call the backend api to write to db instead of google form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch(`${API_URL}/aic/join/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Success:', data);
            setStatus('success');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="min-h-screen bg-[#FDFCFD] flex items-center justify-center pt-32 pb-12 px-6 bg-gradient-to-br from-[#89478D]/5 to-[#0A2144]/5">
                <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center border border-[#89478D]/10 backdrop-blur-sm animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-[#0A2144] mb-4">Registration Complete!</h1>
                    <p className="text-[#0A2144BF] mb-8 leading-relaxed">
                        Be part of the global movement building AI that elevates humanity and honors all life. Your voice matters in creating the AI we need.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-[#89478D] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#723b75] transition-all transform hover:scale-105"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFCFD] pt-32 pb-12 px-6 bg-gradient-to-br from-[#89478D]/5 to-[#0A2144]/5 flex flex-col items-center">
            <div className="max-w-3xl w-full flex flex-col items-center">
                <div className="w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-[#89478D]/10">
                <div className="bg-gradient-to-br from-[#8265AB] via-[#6B4E94] to-[#5A3D7C] p-8 md:p-12 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#89478D] opacity-10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#89478D] opacity-10 rounded-full -ml-24 -mb-24 blur-3xl"></div>

                    <h1 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">AI+Compassion Global Forum</h1>
                    <p className="text-white/80 text-lg max-w-2xl relative z-10">
                        Join the global movement building AI that elevates humanity and honors all life.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-[#0A2144] ml-1">First Name *</label>
                            <input
                                required
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder="Your first name"
                                className="w-full px-5 py-3 rounded-2xl bg-[#F8F9FA] border border-transparent focus:border-[#89478D] focus:bg-white outline-none transition-all placeholder:text-gray-400"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-[#0A2144] ml-1">Last Name *</label>
                            <input
                                required
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="Your last name"
                                className="w-full px-5 py-3 rounded-2xl bg-[#F8F9FA] border border-transparent focus:border-[#89478D] focus:bg-white outline-none transition-all placeholder:text-gray-400"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#0A2144] ml-1">Email Address *</label>
                        <input
                            required
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="you@example.com"
                            className="w-full px-5 py-3 rounded-2xl bg-[#F8F9FA] border border-transparent focus:border-[#89478D] focus:bg-white outline-none transition-all placeholder:text-gray-400"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-[#0A2144] ml-1">Country *</label>
                            <input
                                required
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                placeholder="Where are you located?"
                                className="w-full px-5 py-3 rounded-2xl bg-[#F8F9FA] border border-transparent focus:border-[#89478D] focus:bg-white outline-none transition-all placeholder:text-gray-400"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-[#0A2144] ml-1">City *</label>
                            <input
                                required
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                placeholder="Your city"
                                className="w-full px-5 py-3 rounded-2xl bg-[#F8F9FA] border border-transparent focus:border-[#89478D] focus:bg-white outline-none transition-all placeholder:text-gray-400"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-[#0A2144] ml-1">Organization</label>
                            <input
                                name="organization"
                                value={formData.organization}
                                onChange={handleInputChange}
                                placeholder="Company or Institution"
                                className="w-full px-5 py-3 rounded-2xl bg-[#F8F9FA] border border-transparent focus:border-[#89478D] focus:bg-white outline-none transition-all placeholder:text-gray-400"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-[#0A2144] ml-1">Role / Expertise</label>
                            <input
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                                placeholder="e.g. Researcher, Designer, Founder"
                                className="w-full px-5 py-3 rounded-2xl bg-[#F8F9FA] border border-transparent focus:border-[#89478D] focus:bg-white outline-none transition-all placeholder:text-gray-400"
                            />
                        </div>
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-4">
                        <label className="text-sm font-semibold text-[#0A2144] ml-1">Areas of Interest * (Select all that apply)</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {INTERESTS_OPTIONS.map((interest) => (
                                <button
                                    key={interest}
                                    type="button"
                                    onClick={() => handleCheckboxChange(interest)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all text-sm ${formData.interests.includes(interest)
                                        ? 'bg-[#89478D] border-[#89478D] text-white'
                                        : 'bg-[#F8F9FA] border-transparent text-[#0A2144] hover:bg-gray-100'
                                        }`}
                                >
                                    <div className={`w-4 h-4 rounded flex items-center justify-center border ${formData.interests.includes(interest) ? 'border-white bg-white/20' : 'border-gray-300'}`}>
                                        {formData.interests.includes(interest) && <div className="w-2 h-2 bg-white rounded-sm" />}
                                    </div>
                                    {interest}
                                </button>
                            ))}
                            <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, hasOther: !prev.hasOther }))}
                                className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all text-sm ${formData.hasOther
                                    ? 'bg-[#89478D] border-[#89478D] text-white'
                                    : 'bg-[#F8F9FA] border-transparent text-[#0A2144] hover:bg-gray-100'
                                    }`}
                            >
                                <div className={`w-4 h-4 rounded flex items-center justify-center border ${formData.hasOther ? 'border-white bg-white/20' : 'border-gray-300'}`}>
                                    {formData.hasOther && <div className="w-2 h-2 bg-white rounded-sm" />}
                                </div>
                                Other
                            </button>
                        </div>

                        {formData.hasOther && (
                            <div className="animate-in slide-in-from-top-2 fade-in duration-300">
                                <input
                                    name="otherInterest"
                                    value={formData.otherInterest}
                                    onChange={handleInputChange}
                                    placeholder="Please specify other interest"
                                    className="w-full mt-2 px-5 py-3 rounded-2xl bg-[#F8F9FA] border border-transparent focus:border-[#89478D] focus:bg-white outline-none transition-all"
                                />
                            </div>
                        )}
                    </div>

                    {/* Radio */}
                    <div className="space-y-4">
                        <label className="text-sm font-semibold text-[#0A2144] ml-1">Subscribe to our newsletter? *</label>
                        <div className="flex gap-4">
                            {['Yes', 'No'].map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, newsletter: option }))}
                                    className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all ${formData.newsletter === option
                                        ? 'bg-[#0A2144] border-[#0A2144] text-white shadow-lg'
                                        : 'bg-[#F8F9FA] border-transparent text-[#0A2144] hover:bg-gray-100'
                                        }`}
                                >
                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.newsletter === option ? 'border-white' : 'border-gray-300'}`}>
                                        {formData.newsletter === option && <div className="w-2 h-2 bg-white rounded-full" />}
                                    </div>
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Error message */}
                    {status === 'error' && (
                        <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm">
                            Oops! Something went wrong while submitting the form. Please try again or contact us directly.
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        disabled={status === 'loading'}
                        type="submit"
                        className="w-full bg-[#89478D] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#723b75] transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl shadow-[#89478D]/20 mt-4"
                    >
                        {status === 'loading' ? (
                            <>
                                <Loader2 className="w-6 h-6 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5" />
                                Submit Registration
                            </>
                        )}
                    </button>

                    <p className="text-center text-xs text-gray-400 mt-6">
                        By submitting this form, you agree to our Terms and Conditions regarding data privacy.
                    </p>
                </form>
                </div>

                <Link
                    href="/"
                    className="mt-12 flex items-center gap-2 text-[#0A2144BF] hover:text-[#89478D] transition-all group px-6 py-3 rounded-2xl hover:bg-[#89478D]/5 border border-transparent hover:border-[#89478D]/10"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-semibold text-lg">Back to Home</span>
                </Link>
            </div>
        </div>
    );
}
