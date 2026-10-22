'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Compass,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  ExternalLink,
  Layers,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { RELAY_REGIONS } from './relayData';

const ThreeEarthGlobe = dynamic(() => import('./ThreeEarthGlobe'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center rounded-full bg-[#102A24]/10 border border-[#163B32]/10 animate-pulse aspect-square">
      <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-dashed border-[#163B32]/30 animate-spin" style={{ animationDuration: '10s' }} />
      <span className="font-mono text-xs text-[#163B32]/70 mt-3 font-semibold tracking-wider uppercase">Loading 3D Globe...</span>
    </div>
  ),
});

export default function GlobalRelayGlobeSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [localTime, setLocalTime] = useState('');

  // Local Time ticker for the selected region
  useEffect(() => {
    const updateTime = () => {
      const region = RELAY_REGIONS[activeIndex] || RELAY_REGIONS[0];
      try {
        const timeStr = new Intl.DateTimeFormat('en-US', {
          timeZone: region.timezone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date());
        setLocalTime(timeStr);
      } catch (e) {
        setLocalTime('--:--:--');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleSelectRegion = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  const nextRegion = () => {
    setActiveIndex((prev) => (prev + 1) % RELAY_REGIONS.length);
  };

  const prevRegion = () => {
    setActiveIndex((prev) => (prev - 1 + RELAY_REGIONS.length) % RELAY_REGIONS.length);
  };

  const activeRegion = RELAY_REGIONS[activeIndex] || RELAY_REGIONS[0];
  const { producer } = activeRegion;

  return (
    <section
      id="relay"
      className="relative w-full bg-[#F8F6F0] py-12 sm:py-16 lg:py-20 px-3 sm:px-6 lg:px-12 border-t border-b border-[#D9DDD6]/80 transition-colors duration-700 overflow-hidden"
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-[#163B32]/8 via-[#C96F4A]/5 to-transparent rounded-full blur-3xl opacity-70" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-6 sm:gap-8">
        
        {/* Top Header & Stepper Navigation Bar */}
        <div className="w-full flex items-center justify-end gap-2 border-b border-[#D9DDD6]/80 pb-3">
          {/* Stepper Controls & Stage Indicator */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={prevRegion}
              className="p-2 sm:p-2.5 rounded-full bg-white border border-[#D9DDD6] text-[#171918] hover:bg-[#163B32] hover:text-[#F8F6F0] hover:border-[#163B32] transition-all shadow-xs active:scale-95 cursor-pointer"
              title="Previous Region"
              aria-label="Previous Region"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="font-mono text-xs sm:text-sm font-bold text-[#163B32] bg-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-[#D9DDD6] shadow-xs select-none flex items-center gap-1">
              <span>{String(activeRegion.id).padStart(2, '0')}</span>
              <span className="text-[#5E625D]/50">/</span>
              <span className="text-[#5E625D]">{String(RELAY_REGIONS.length).padStart(2, '0')}</span>
            </div>

            <button
              type="button"
              onClick={nextRegion}
              className="p-2 sm:p-2.5 rounded-full bg-white border border-[#D9DDD6] text-[#171918] hover:bg-[#163B32] hover:text-[#F8F6F0] hover:border-[#163B32] transition-all shadow-xs active:scale-95 cursor-pointer"
              title="Next Region"
              aria-label="Next Region"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Centerpiece 2-Column Interactive Showcase */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          
          {/* Left: 3D Photorealistic Interactive Earth Globe (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative w-full scroll-pop">
            <div className="relative w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[460px] aspect-square flex items-center justify-center">
              <ThreeEarthGlobe
                activeIndex={activeIndex}
                onSelectRegion={handleSelectRegion}
              />
            </div>
          </div>

          {/* Right: Dynamic Producer & Inquiry Information Card (6 Cols) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-5 sm:p-7 border border-[#D9DDD6] shadow-xl flex flex-col gap-4 backdrop-blur-md transition-all duration-300 scroll-slide-right">
            {/* Region Title, City & UTC Timing */}
            <div className="flex flex-col gap-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#5E625D]">
                  <MapPin className="w-3.5 h-3.5 text-[#C96F4A]" />
                  <span>{activeRegion.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  {activeRegion.utcTiming && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#163B32]/10 border border-[#163B32]/20 text-[#163B32] text-xs font-mono font-bold tracking-tight">
                      <Clock className="w-3.5 h-3.5 text-[#163B32]" />
                      <span>{activeRegion.utcTiming}</span>
                    </div>
                  )}
                </div>
              </div>
              <h3 className="font-editorial text-lg sm:text-xl md:text-2xl font-bold text-[#171918] leading-snug tracking-tight">
                {activeRegion.region}
              </h3>
            </div>

            {/* Theme */}
            {activeRegion.theme && (
              <div className="text-xs sm:text-sm text-slate-700 italic border-l-2 border-[#C96F4A] pl-3 py-0.5">
                &ldquo;{activeRegion.theme}&rdquo;
              </div>
            )}

            {/* Core Inquiries List */}
            {activeRegion.inquiries && activeRegion.inquiries.length > 0 && (
              <div className="space-y-1.5 py-1">
                <span className="font-mono text-[11px] font-bold text-[#163B32] uppercase tracking-wider block">
                  Core Inquiries:
                </span>
                <ul className="space-y-1">
                  {activeRegion.inquiries.map((inq, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-[#5E625D] flex items-start gap-2">
                      <span className="text-[#C96F4A] font-bold mt-0.5">•</span>
                      <span>{inq}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Producer / Lead Box */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                  {producer.img ? (
                    <Image
                      src={producer.img}
                      alt={producer.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-emerald-50 text-[#163B32]">
                      <User className="w-5 h-5" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-[#5E625D] uppercase tracking-wider">
                    Regional Producer
                  </span>
                  <span className="font-editorial text-sm font-bold text-[#171918]">
                    {producer.name}
                  </span>
                  {producer.role && (
                    <span className="text-xs text-[#5E625D] font-light truncate max-w-[200px] sm:max-w-xs">
                      {producer.role}
                    </span>
                  )}
                </div>
              </div>

              {producer.slug && (
                <Link
                  href={`/${producer.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#163B32] text-white text-xs font-mono font-bold hover:bg-[#0F2620] transition-colors shrink-0 cursor-pointer"
                >
                  <span>Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              )}
            </div>

            {/* Regional Local Time Bar */}
            <div className="flex items-center justify-between text-xs text-[#5E625D] font-mono bg-slate-50 px-3.5 py-2 rounded-2xl border border-slate-200/80 mt-1">
              <span>Local Time in {activeRegion.city}:</span>
              <span className="font-bold text-[#163B32]">{localTime}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
