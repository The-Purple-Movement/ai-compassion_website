'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  Compass,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Clock,
  Radio,
  User,
  Users,
} from 'lucide-react';
import ThreeEarthGlobe from './ThreeEarthGlobe';
import { RELAY_REGIONS } from './relayData';

export default function GlobalRelayGlobeSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [localTime, setLocalTime] = useState('');

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
        
        {/* Top Header & Navigation Bar */}
        <div className="w-full flex items-center justify-between gap-2 border-b border-[#D9DDD6]/80 pb-3">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#D9DDD6] text-[10px] sm:text-xs font-mono tracking-widest text-[#163B32] uppercase font-bold shadow-xs">
              <Compass className="w-3.5 h-3.5 text-[#C96F4A] animate-spin" style={{ animationDuration: '20s' }} />
              <span>04 / Global Relay</span>
            </div>

            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#163B32]/5 border border-[#163B32]/15 text-xs font-mono text-[#163B32]">
              <Radio className="w-3 h-3 text-[#22C55E] animate-pulse" />
              <span>12 Regions • 24-Hour Continuous Relay</span>
            </div>
          </div>

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
              <span className="text-[#5E625D]">12</span>
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
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative w-full">
            <div className="relative w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[460px] aspect-square flex items-center justify-center">
              <ThreeEarthGlobe
                activeIndex={activeIndex}
                onSelectRegion={handleSelectRegion}
              />
            </div>
          </div>

          {/* Right: Dynamic Producer & Inquiry Information Card (6 Cols) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-5 sm:p-7 border border-[#D9DDD6] shadow-xl flex flex-col gap-4 backdrop-blur-md transition-all duration-300">
            {/* Region Title & City */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#5E625D]">
                <MapPin className="w-3.5 h-3.5 text-[#C96F4A]" />
                <span>{activeRegion.city}</span>
              </div>
              <h3 className="font-editorial text-lg sm:text-xl md:text-2xl font-bold text-[#171918] leading-snug tracking-tight">
                {activeRegion.region}
              </h3>
            </div>

            {/* Tentative Theme */}
            {activeRegion.theme && (
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 flex flex-col gap-0.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C96F4A]">
                  Tentative Theme
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                  {activeRegion.theme}
                </p>
              </div>
            )}

            {/* Producer / Featured Speakers Profile */}
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
                        : producer.role.toLowerCase().includes('featured speaker') || producer.role.toLowerCase().includes('speakers')
                        ? 'bg-amber-100 text-amber-900 border border-amber-200'
                        : producer.role.toLowerCase().includes('regional lead')
                        ? 'bg-blue-50 text-blue-900 border border-blue-200'
                        : 'bg-emerald-100 text-[#163B32] border border-emerald-200'
                    }`}>
                      {producer.available || producer.name.toLowerCase().includes('available')
                        ? 'Producer Spot Available'
                        : producer.role.toLowerCase().includes('featured speaker') || producer.role.toLowerCase().includes('speakers')
                        ? 'Featured Regional Speakers'
                        : producer.role.toLowerCase().includes('regional lead')
                        ? 'Regional Lead'
                        : 'Regional Producer'}
                    </span>
                  </div>
                  <h4 className="font-editorial text-sm sm:text-base font-bold text-[#163B32] leading-tight">
                    {producer.name}
                  </h4>
                  <p className="text-[10px] sm:text-xs font-mono text-[#C96F4A] font-semibold uppercase tracking-wider">
                    {producer.role}
                  </p>
                </div>

                <p className="text-xs text-[#5E625D] leading-relaxed">
                  {producer.bio}
                </p>

                {/* Regional Coordinator */}
                {activeRegion.coordinator && (
                  <div className="flex items-center gap-1.5 pt-1 text-[11px] text-slate-600 font-mono">
                    <Users className="w-3 h-3 text-[#163B32]" />
                    <span>Regional Coordinator: <strong>{activeRegion.coordinator}</strong></span>
                  </div>
                )}

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

            {/* Hub Details & Next Hub Action */}
            <div className="flex items-center justify-between pt-1 border-t border-[#E6E9E4]">
              <span className="text-xs font-mono text-[#5E625D]">
                Global Hub: <strong className="text-[#163B32]">{activeRegion.hubs}</strong>
              </span>

              <button
                type="button"
                onClick={nextRegion}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#163B32] hover:bg-[#0F2620] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs hover:shadow-md cursor-pointer group"
              >
                <span>Next Hub</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* 12 Region Selector Pills */}
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
                title={`${r.code} — ${r.hubs}`}
              >
                <span>{String(r.id).padStart(2, '0')}</span>
                <span className="hidden md:inline ml-1.5 opacity-90">{r.shortName || r.hubs.replace(/\s+Hubs?/i, '')}</span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
