import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, MapPin, Sparkles, UserCheck, Radio } from 'lucide-react';
import { PEOPLE, getPersonBySlug } from '@/data/peopleData';
import SpeakerAvatar from '@/components/speakerAvatar';

export async function generateStaticParams() {
  return PEOPLE.map((person) => ({
    slug: person.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const person = getPersonBySlug(slug);

  if (!person) {
    return {
      title: 'Profile Not Found | AI + Compassion Global Forum 2026',
    };
  }

  return {
    title: `${person.name} — ${person.role} | AI + Compassion Global Forum 2026`,
    description: person.bio ? person.bio.slice(0, 160) + '...' : `Profile of ${person.name}, ${person.role} for the AI + Compassion Global Forum 2026.`,
    openGraph: {
      title: `${person.name} — ${person.role} | AI + Compassion Global Forum 2026`,
      description: person.title || `${person.role} • ${person.segment}`,
      images: person.img ? [{ url: person.img }] : [],
    },
  };
}

export default async function PersonProfilePage({ params }) {
  const { slug } = await params;
  const person = getPersonBySlug(slug);

  if (!person) {
    notFound();
  }

  const isProducerGroup = person.type === 'producer' || person.type === 'co-producer';
  const isCoordinator = person.type === 'coordinator' || person.type === 'regional-coordinator';
  const returnHash = isCoordinator ? '/coordinators' : isProducerGroup ? '/#producers' : '/#speakers';
  const returnLabel = isCoordinator ? 'Back to Meet The Team' : isProducerGroup ? 'Back to Producers & Co-Producers' : 'Back to Confirmed Speakers';

  return (
    <div className="min-h-screen bg-[#F8F6F0] pt-28 pb-20 px-4 sm:px-6 lg:px-12 text-[#171918]">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        
        {/* Top Navigation Bar with Back Arrow */}
        <div className="flex items-center justify-between">
          <Link
            href={returnHash}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#D9DDD6] text-[#163B32] hover:bg-[#163B32] hover:text-white transition-all shadow-xs group font-mono text-xs font-bold uppercase tracking-wider cursor-pointer"
            aria-label="Back to forum"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{returnLabel}</span>
          </Link>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#D9DDD6] text-[10px] sm:text-xs font-mono text-slate-500 uppercase tracking-widest hidden sm:inline-flex">
            <Radio className="w-3 h-3 text-[#22C55E] animate-pulse" />
            <span>Global Forum 2026</span>
          </div>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-3xl border border-[#D9DDD6] shadow-xl p-6 sm:p-10 flex flex-col gap-8">
          
          {/* Header Strip with High-Res Image & Details */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 pb-8 border-b border-slate-100">
            
            {/* Portrait Image */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden bg-slate-100 shadow-md border-2 border-emerald-200 shrink-0">
              <SpeakerAvatar
                src={person.img}
                name={person.name}
                imgPosition={person.imgPosition || 'center'}
                sizes="(max-width: 640px) 144px, 176px"
                priority
              />
            </div>

            {/* Meta Information */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-2.5 flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span
                  className={`text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                    person.type === 'co-producer'
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : isCoordinator
                      ? 'bg-emerald-100 text-[#163B32] border border-emerald-300'
                      : person.type === 'producer'
                      ? 'bg-emerald-100 text-[#163B32] border border-emerald-300'
                      : 'bg-emerald-50 text-[#163B32] border border-emerald-200'
                  }`}
                >
                  {person.role}
                </span>

                {person.segment && (
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-100 text-[#163B32] border border-emerald-200">
                    Segment: {person.segment}
                  </span>
                )}
              </div>

              <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#163B32] leading-tight">
                {person.name}
              </h1>

              {person.title && (
                <p className="text-sm sm:text-base text-slate-700 font-semibold leading-relaxed">
                  {person.title}
                </p>
              )}

              {/* Regional Coverage */}
              {person.region && (
                <div className="flex items-center gap-2 text-xs sm:text-sm text-[#C96F4A] font-medium pt-1">
                  <MapPin className="w-4 h-4 shrink-0 text-[#C96F4A]" />
                  <span>Coverage: <strong>{person.region}</strong></span>
                </div>
              )}
            </div>
          </div>

          {/* Talk / Keynote Presentation (if available) */}
          {person.talkTitle && (
            <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#C96F4A] uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Featured Talk / Keynote</span>
              </div>
              <h3 className="font-editorial text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                {person.talkTitle}
              </h3>
              {person.talkDescription && (
                <div className="text-xs sm:text-sm text-slate-700 space-y-2 leading-relaxed pt-1">
                  {person.talkDescription.split('\n\n').map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Bio Content */}
          {person.bio && person.bio.trim() && (
            <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
              <h2 className="font-mono text-xs uppercase font-bold text-[#163B32] tracking-wider border-b border-emerald-100 pb-2 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#22C55E]" />
                <span>Biography &amp; Leadership Impact</span>
              </h2>

              {person.bio.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {/* Tags */}
          {person.tags && person.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-slate-100">
              {person.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono text-[#163B32]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Footer Back Navigation & Forum Stamp */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <Link
              href={returnHash}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#163B32] hover:text-[#C96F4A] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to full forum directory</span>
            </Link>

            <span className="font-mono text-[11px] text-slate-500 tracking-wider uppercase">
              AI + Compassion Global Forum 2026
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
