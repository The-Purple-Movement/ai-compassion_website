import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Globe, MapPin, Sparkles, UserCheck, ShieldCheck } from 'lucide-react';
import { REGIONAL_COORDINATORS, getPersonBySlug } from '@/data/peopleData';

export async function generateStaticParams() {
  return REGIONAL_COORDINATORS.map((coordinator) => ({
    slug: coordinator.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const coordinator = getPersonBySlug(slug);

  if (!coordinator) {
    return {
      title: 'Coordinator Not Found | AI + Compassion Global Forum 2026',
    };
  }

  return {
    title: `${coordinator.name} — ${coordinator.role} | AI + Compassion Global Forum 2026`,
    description: coordinator.bio ? coordinator.bio.slice(0, 160) + '...' : `Profile of ${coordinator.name}, ${coordinator.role}.`,
    openGraph: {
      title: `${coordinator.name} — ${coordinator.role} | AI + Compassion Global Forum 2026`,
      description: coordinator.title || `${coordinator.role} • ${coordinator.region}`,
      images: coordinator.img ? [{ url: coordinator.img }] : [],
    },
  };
}

export default async function CoordinatorDetailPage({ params }) {
  const { slug } = await params;
  const coordinator = getPersonBySlug(slug);

  if (!coordinator) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F8F6F0] pt-28 pb-20 px-4 sm:px-6 lg:px-12 text-[#171918]">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        
        {/* Top Navigation Bar with Back Arrow Button on Top Left Corner */}
        <div className="flex items-center justify-between">
          <Link
            href="/coordinators"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#D9DDD6] text-[#163B32] hover:bg-[#163B32] hover:text-white transition-all shadow-xs group font-mono text-xs font-bold uppercase tracking-wider cursor-pointer"
            aria-label="Back to team"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Meet The Team</span>
          </Link>

          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest hidden sm:inline">
            Global Coordination Team
          </span>
        </div>

        {/* Main Bio Card */}
        <div className="bg-white rounded-3xl border border-[#D9DDD6] shadow-xl p-6 sm:p-10 flex flex-col gap-8">
          
          {/* Header Strip with High-Res Image & Meta */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 pb-8 border-b border-slate-100">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden bg-slate-100 shadow-md border-2 border-emerald-200 shrink-0">
              <Image
                src={coordinator.img}
                alt={coordinator.name}
                fill
                priority
                className="object-cover"
                style={{ objectPosition: coordinator.imgPosition || 'center' }}
                sizes="(max-width: 640px) 144px, 176px"
              />
            </div>

            <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-2.5 flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-[#163B32] border border-emerald-300">
                  {coordinator.role}
                </span>

                {coordinator.segment && (
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-50 text-[#163B32] border border-emerald-200">
                    Segment: {coordinator.segment}
                  </span>
                )}
              </div>

              <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#163B32] leading-tight">
                {coordinator.name}
              </h1>

              {coordinator.title && (
                <p className="text-sm sm:text-base text-slate-700 font-semibold leading-relaxed">
                  {coordinator.title}
                </p>
              )}

              {/* Full Region */}
              {coordinator.region && (
                <div className="flex items-center gap-2 text-xs sm:text-sm text-[#C96F4A] font-medium pt-1">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>Coverage: <strong>{coordinator.region}</strong></span>
                </div>
              )}
            </div>
          </div>

          {/* Bio Body */}
          <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
            <h2 className="font-mono text-xs uppercase font-bold text-[#163B32] tracking-wider border-b border-emerald-100 pb-2 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#22C55E]" />
              <span>Full Biography &amp; Regional Coordination Role</span>
            </h2>

            {coordinator.bio ? (
              coordinator.bio.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-slate-500 italic">Biography details to be announced.</p>
            )}
          </div>

          {/* Tags */}
          {coordinator.tags && (
            <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-slate-100">
              {coordinator.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono text-[#163B32]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Footer Back Button */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <Link
              href="/coordinators"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#163B32] hover:text-[#C96F4A] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to full team directory</span>
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
