'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ExternalLink, X, UserCheck, Sparkles } from 'lucide-react';
import { CONFIRMED_SPEAKERS } from '@/data/peopleData';
import SpeakerAvatar from '@/components/speakerAvatar';

export default function SpeakerSection() {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 30, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="speakers"
      ref={sectionRef}
      className="relative z-10 w-full bg-[#F8F6F0] py-16 lg:py-24 px-4 sm:px-6 lg:px-12 border-t border-[#EAECE8] overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-10 sm:gap-14">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3 max-w-3xl mx-auto scroll-fade-down">
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#163B32] leading-tight">
            Speakers
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed max-w-2xl">
            Pioneers, researchers, artists, and leaders bridging artificial intelligence, ethics, neuroscience, indigenous wisdom, and compassionate systems.
          </p>
        </div>

        {/* Speakers Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 w-full"
        >
          {CONFIRMED_SPEAKERS.map((speaker) => (
            <Link
              key={speaker.slug}
              href={`/${speaker.slug}`}
              className="w-full bg-white hover:bg-[#FAFCFA] rounded-2xl sm:rounded-3xl border border-[#E2E6DF] hover:border-[#163B32]/40 shadow-2xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 p-3.5 sm:p-4 flex flex-col justify-between group cursor-pointer text-center relative overflow-hidden will-change-transform"
            >
              {/* Speaker Portrait */}
              <div className="flex flex-col items-center gap-3">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden bg-slate-100 shadow-xs border border-emerald-100 group-hover:scale-105 transition-transform duration-300 shrink-0">
                  <SpeakerAvatar
                    src={speaker.img}
                    name={speaker.name}
                    imgPosition={speaker.imgPosition}
                    sizes="(max-width: 640px) 80px, (max-width: 1024px) 112px, 120px"
                  />
                </div>

                {/* Name & Title */}
                <div className="flex flex-col gap-1 w-full pt-1">

                  <h3 className="font-editorial text-xs sm:text-sm md:text-base font-bold text-slate-900 group-hover:text-[#163B32] transition-colors leading-snug line-clamp-2">
                    {speaker.name}
                  </h3>

                  {speaker.title && (
                    <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-tight line-clamp-2 mt-0.5">
                      {speaker.title}
                    </p>
                  )}
                </div>
              </div>

              {/* View Bio prompt */}
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-center">
                <span className="text-[10px] font-mono text-emerald-800 font-semibold group-hover:text-[#C96F4A] transition-colors">
                  View Full Bio &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* FULL SPEAKER BIO MODAL WITH DEDICATED BACK ARROW ON TOP LEFT CORNER */}
      {/* ========================================================================= */}
      {selectedSpeaker && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto"
          onClick={() => setSelectedSpeaker(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden text-slate-900 animate-in zoom-in-95 duration-300 max-h-[92vh] flex flex-col my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Navigation Bar with Prominent Back Arrow Button on Top Left Corner */}
            <div className="flex items-center justify-between px-5 sm:px-7 py-4 bg-[#163B32] text-white border-b border-emerald-800">
              
              {/* Back Arrow Button on Top Left Corner */}
              <button
                type="button"
                onClick={() => setSelectedSpeaker(null)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white text-white hover:text-[#163B32] font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
                aria-label="Back to speakers list"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <span className="font-mono text-xs text-emerald-200 tracking-widest uppercase hidden sm:inline">
                Speaker Profile
              </span>

              {/* Close Button on Right */}
              <button
                type="button"
                onClick={() => setSelectedSpeaker(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-emerald-100 hover:text-white transition-colors cursor-pointer"
                aria-label="Close bio"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body with Scrollable Bio Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              
              {/* Profile Card Header */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-100">
                
                {/* High-Res Portrait */}
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 shrink-0 rounded-2xl overflow-hidden bg-slate-100 shadow-md border-2 border-emerald-200">
                  <SpeakerAvatar
                    src={selectedSpeaker.img}
                    name={selectedSpeaker.name}
                    imgPosition={selectedSpeaker.imgPosition}
                    sizes="(max-width: 640px) 112px, 144px"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-2 flex-1">
                  <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#163B32]">
                    {selectedSpeaker.name}
                  </h3>

                  {selectedSpeaker.title && (
                    <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                      {selectedSpeaker.title}
                    </p>
                  )}
                </div>
              </div>

              {/* Talk / Keynote Presentation (if available) */}
              {selectedSpeaker.talkTitle && (
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#C96F4A] uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Featured Keynote Talk</span>
                  </div>
                  <h4 className="font-editorial text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {selectedSpeaker.talkTitle}
                  </h4>
                  {selectedSpeaker.talkDescription && (
                    <div className="text-xs text-slate-700 space-y-1.5 leading-relaxed pt-1">
                      {selectedSpeaker.talkDescription.split('\n\n').map((para, pIdx) => (
                        <p key={pIdx}>{para}</p>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Full Bio Paragraphs */}
              {selectedSpeaker.bio && selectedSpeaker.bio.trim() && (
                <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <h4 className="font-mono text-xs uppercase font-bold text-[#163B32] tracking-wider border-b border-emerald-100 pb-1 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-[#22C55E]" />
                    <span>Biography &amp; Insights</span>
                  </h4>
                  
                  {selectedSpeaker.bio.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {/* Tags */}
              {selectedSpeaker.tags && (
                <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100">
                  {selectedSpeaker.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono text-[#163B32]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Dedicated Standalone Page Link */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <Link
                  href={`/${selectedSpeaker.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#163B32] hover:text-[#C96F4A] transition-colors"
                >
                  <span>Open standalone bio link</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>

                <button
                  type="button"
                  onClick={() => setSelectedSpeaker(null)}
                  className="px-5 py-2 rounded-full bg-[#163B32] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#0F2620] transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
}