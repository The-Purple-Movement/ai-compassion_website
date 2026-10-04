'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative z-10 w-full min-h-[92vh] lg:min-h-[98vh] flex flex-col justify-between pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-12 bg-[#F8F6F0] overflow-hidden select-none"
    >
      {/* ========================================================================= */}
      {/* 1. FULL-BLEED IMMERSIVE 8K HERO BACKDROP (FILLS ENTIRE HERO - NO PARTITIONS) */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <Image
          src="/hero_kinder_intelligence_8k.webp"
          alt="AI + Compassion Global Forum 2026 Artwork"
          fill
          priority
          unoptimized
          className="object-cover object-right sm:object-[center_right] opacity-100"
          sizes="100vw"
        />

        {/* Seamless Soft Atmospheric Blend for 100% Editorial Readability - Zero Seams */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-[52%] bg-gradient-to-r from-[#F8F6F0]/92 via-[#F8F6F0]/65 to-transparent pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN 2-COLUMN RESPONSIVE LAYOUT (MINIMALISM + MAXIMALISM + GLASSMORPHISM) */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center my-auto">
        
        {/* LEFT COLUMN: Editorial Narrative, CTAs & Live 4-Metric Statistics */}
        <div className="lg:col-span-6 flex flex-col justify-center gap-5 sm:gap-6 z-20">
          
          {/* Main Editorial Headline */}
          <div className="flex flex-col gap-1 scroll-fade-up is-revealed">
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#171918] leading-[1.02]">
              AI + Compassion
              <br />
              <span className="text-[#3D443E] font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                Global Forum 2026
              </span>
            </h1>
          </div>

          {/* Date & Starting Time with Terracotta Orange Accent Line */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 scroll-slide-left is-revealed">
            <span className="h-[2.5px] w-8 bg-[#C96F4A] rounded-full" />
            <p className="font-editorial text-xl sm:text-2xl md:text-3xl font-bold text-[#163B32]">
              October 2–3, 2026
            </p>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-[#163B32] font-mono text-xs sm:text-sm font-bold tracking-tight shadow-2xs">
              Starts 06:00 UTC
            </span>
          </div>

          {/* Core Story Vision */}
          <p className="text-sm sm:text-base md:text-lg text-[#5E625D] leading-relaxed max-w-xl font-normal text-balance scroll-fade-up is-revealed">
            A 24-hour global conversation for a planet-centered future (nature, humanity, &amp; AI/technology).
          </p>

          {/* Action Buttons: WATCH THE RELAY & REGISTER NOW */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-3.5 pt-2 scroll-pop is-revealed">
            {/* Watch the Relay Button */}
            <a
              href="https://www.youtube.com/@AICompassionGlobalForum"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#F8F6F0] bg-[#163B32] hover:bg-[#0F2620] rounded-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>WATCH THE RELAY</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {/* Register Now Button */}
            <a
              href="https://makemypass.com/event/ai-compassion-participants"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#163B32] bg-white hover:bg-slate-50 border-2 border-[#163B32] rounded-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>REGISTER NOW</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* 4-Metric Statistics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-[#D9DDD6]/80 text-[#171918] mt-2 scroll-fade-up scroll-stagger is-revealed">
            <div className="flex flex-col">
              <span className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#163B32]">24h</span>
              <span className="text-[10px] sm:text-[11px] font-mono text-[#5E625D] uppercase tracking-wider font-semibold">Continuous Relay</span>
            </div>
            <div className="flex flex-col sm:border-l sm:border-[#D9DDD6] sm:pl-4">
              <span className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#163B32]">12</span>
              <span className="text-[10px] sm:text-[11px] font-mono text-[#5E625D] uppercase tracking-wider font-semibold">World Segments</span>
            </div>
            <div className="flex flex-col sm:border-l sm:border-[#D9DDD6] sm:pl-4">
              <span className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#163B32]">28+</span>
              <span className="text-[10px] sm:text-[11px] font-mono text-[#5E625D] uppercase tracking-wider font-semibold">Global Leaders</span>
            </div>
            <div className="flex flex-col sm:border-l sm:border-[#D9DDD6] sm:pl-4">
              <span className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#163B32]">1</span>
              <span className="text-[10px] sm:text-[11px] font-mono text-[#5E625D] uppercase tracking-wider font-semibold">Shared Tomorrow</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Scenic Visual Showcase */}
        <div className="lg:col-span-6 relative w-full h-[320px] sm:h-[440px] lg:h-[560px]" />

      </div>
    </section>
  );
}
