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
  Radio,
  User,
  ExternalLink,
  Layers,
} from 'lucide-react';
import ThreeEarthGlobe from './ThreeEarthGlobe';
import { RELAY_REGIONS } from './relayData';
import { getLiveRelayStatus } from '@/components/scheduleSection/scheduleData';

export default function GlobalRelayGlobeSection() {
  const [activeIndex, setActiveIndex] = useState(() => {
    try {
      const live = getLiveRelayStatus();
      const idx = RELAY_REGIONS.findIndex((r) => r.id === live.globeRegionId);
      return idx >= 0 ? idx : 2; // Southeast Asia default
    } catch {
      return 2;
    }
  });
  const [liveRegionId, setLiveRegionId] = useState(() => {
    try {
      return getLiveRelayStatus().globeRegionId;
    } catch {
      return 3;
    }
  });
  const [localTime, setLocalTime] = useState('');

  // Periodically check live region
  useEffect(() => {
    const checkLive = () => {
      try {
        const live = getLiveRelayStatus();
        setLiveRegionId(live.globeRegionId);
      } catch (e) {
        // ignore
      }
    };
    checkLive();
    const interval = setInterval(checkLive, 5000);
    return () => clearInterval(interval);
  }, []);

  // Live Local Time ticker for the active region
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
                  {activeRegion.id === liveRegionId && (
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] font-black uppercase tracking-wider text-white bg-rose-600 px-2.5 py-0.5 rounded-full shadow-xs animate-pulse">
                      <Radio className="w-3 h-3" />
                      LIVE NOW
                    </span>
                  )}
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
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 flex flex-col gap-0.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C96F4A]">
                  Theme
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                  {activeRegion.theme}
                </p>
              </div>
            )}

            {/* Operational Coverage (Multi-Block Overview if applicable) */}
            {activeRegion.coverage && (
              <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100/90 flex flex-col gap-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#163B32] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>Coverage &amp; Relay Blocks</span>
                </span>
                <ul className="space-y-1 text-xs text-slate-700 font-medium">
                  {activeRegion.coverage.map((cov, cIdx) => (
                    <li key={cIdx} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C96F4A] mt-1.5 shrink-0" />
                      <span>{cov}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Producer / Convener Profile Card */}
            <div className="p-4 rounded-2xl bg-[#F8F6F0] border border-[#E6E9E4] flex flex-row items-start gap-4">
              
              {/* Portrait Image or Monogram */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 shrink-0 rounded-2xl overflow-hidden border border-[#D9DDD6] bg-white shadow-xs group">
                {producer.img ? (
                  <Image
                    src={producer.img}
                    alt={producer.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 56px, 72px"
                  />
                ) : producer.available || producer.name.toLowerCase().includes('available') ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-amber-50 border border-dashed border-amber-300 text-amber-800">
                    <User className="w-6 h-6 text-amber-700 opacity-80" />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#163B32]/10 via-[#F8F6F0] to-[#C9A96A]/20 text-[#163B32]">
                    <span className="font-editorial text-sm sm:text-base font-bold tracking-wider text-[#163B32]">
                      {producer.name
                        .split(' ')
                        .map((n) => n[0])
                        .filter(Boolean)
                        .slice(0, 2)
                        .join('')}
                    </span>
                  </div>
                )}
              </div>

              {/* Producer Details */}
              <div className="flex flex-col gap-1 text-left flex-1 min-w-0">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      producer.available || producer.name.toLowerCase().includes('available')
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : producer.role.toLowerCase().includes('lead')
                        ? 'bg-blue-50 text-blue-900 border border-blue-200'
                        : 'bg-emerald-100 text-[#163B32] border border-emerald-200'
                    }`}>
                      {producer.role}
                    </span>
                  </div>
                  
                  {producer.slug ? (
                    <Link
                      href={`/${producer.slug}`}
                      className="font-editorial text-sm sm:text-base font-bold text-[#163B32] hover:text-[#C96F4A] transition-colors leading-tight inline-flex items-center gap-1"
                    >
                      <span>{producer.name}</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </Link>
                  ) : (
                    <h4 className="font-editorial text-sm sm:text-base font-bold text-[#163B32] leading-tight">
                      {producer.name}
                    </h4>
                  )}
                  
                  <p className="text-[10px] sm:text-xs font-mono text-[#C96F4A] font-semibold uppercase tracking-wider">
                    {producer.role}
                  </p>
                </div>

                <p className="text-xs text-[#5E625D] leading-relaxed">
                  {producer.bio}
                </p>

                {/* Thematic Tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {producer.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full bg-white border border-[#D9DDD6] text-[10px] font-mono text-[#171918]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Segment & Operational Details & Next Segment Action */}
            <div className="flex items-center justify-between pt-1 border-t border-[#E6E9E4]">
              <span className="text-xs font-mono text-[#5E625D]">
                Segment: <strong className="text-[#163B32]">{activeRegion.segment}</strong>
              </span>

              <button
                type="button"
                onClick={nextRegion}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#163B32] hover:bg-[#0F2620] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs hover:shadow-md cursor-pointer group"
              >
                <span>Next Segment</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* 10 Planetary Segment Selector Pills */}
        <div className="w-full flex items-center justify-between gap-1.5 overflow-x-auto py-2 scrollbar-none select-none">
          {RELAY_REGIONS.map((r, idx) => {
            const isCurrent = activeIndex === idx;
            return (
              <button
                key={r.id}
                onClick={() => handleSelectRegion(idx)}
                className={`shrink-0 flex items-center justify-center px-3 sm:px-4 py-1.5 rounded-full border text-xs font-mono transition-all duration-200 cursor-pointer ${
                  isCurrent
                    ? 'bg-[#163B32] text-[#F8F6F0] border-[#163B32] shadow-sm font-bold scale-105'
                    : 'bg-white text-[#5E625D] border-[#D9DDD6] hover:text-[#171918] hover:border-[#163B32]/40'
                }`}
                title={`Segment ${r.id} — ${r.segment} (${r.region})`}
              >
                <span>{String(r.id).padStart(2, '0')}</span>
                <span className="hidden md:inline ml-1.5 opacity-90">{r.segment}</span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
