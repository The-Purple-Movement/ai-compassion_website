'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Globe2 } from 'lucide-react';

export default function HeroSection() {
  const heroRef = useRef(null);
  const bgWrapperRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // 1. Initial Entrance Animation
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 30, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.05,
          }
        );
      }

      // 2. Hero Background Parallax & Zoom-out on scroll
      if (bgWrapperRef.current && heroRef.current) {
        gsap.to(bgWrapperRef.current, {
          scale: 0.92,
          y: 70,
          opacity: 0.45,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // 3. Content subtle fade out on scroll away
      if (contentRef.current && heroRef.current) {
        gsap.to(contentRef.current, {
          y: -40,
          opacity: 0.2,
          scale: 0.96,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom 20%',
            scrub: 1,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative z-10 w-full min-h-[90vh] lg:min-h-[94vh] flex flex-col justify-between pt-24 sm:pt-28 lg:pt-30 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-12 bg-[#F8F6F0] overflow-hidden select-none will-change-transform"
    >
      {/* ========================================================================= */}
      {/* 1. FULL-BLEED IMMERSIVE 8K HERO BACKDROP PROPERLY FILLING SECTION */}
      {/* ========================================================================= */}
      <div
        ref={bgWrapperRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      >
        <Image
          src="/hero_kinder_intelligence_8k.webp"
          alt="AI + Compassion Global Forum 2026 Artwork"
          fill
          priority
          decoding="async"
          className="object-cover object-right sm:object-[75%_center] lg:object-[80%_center] opacity-100"
          sizes="100vw"
        />

        {/* Soft Atmospheric Blend for 100% Editorial Readability */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-[56%] bg-gradient-to-r from-[#F8F6F0]/95 via-[#F8F6F0]/75 to-transparent pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN 2-COLUMN RESPONSIVE HERO LAYOUT */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center my-auto">
        
        {/* LEFT COLUMN: Editorial Narrative & Statistics */}
        <div
          ref={contentRef}
          className="lg:col-span-6 flex flex-col justify-center gap-4 sm:gap-5 z-20 will-change-transform"
        >
          {/* Forum Identity Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#D9DDD6] backdrop-blur-md shadow-xs w-max hover:border-[#163B32] transition-colors">
            <Globe2 className="w-3.5 h-3.5 text-[#163B32]" />
            <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#163B32]">
              Kyoto &amp; 12-Region Planetary Relay
            </span>
          </div>

          {/* Main Editorial Headline */}
          <div className="flex flex-col gap-1">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#171918] leading-[1.04]">
              AI + Compassion
              <br />
              <span className="text-[#3D443E] font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                Global Forum 2026
              </span>
            </h1>
          </div>

          {/* Date with Terracotta Orange Accent Line */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <span className="h-[2.5px] w-8 bg-[#C96F4A] rounded-full" />
            <p className="font-editorial text-lg sm:text-xl md:text-2xl font-bold text-[#163B32]">
              October 2–3, 2026
            </p>
          </div>

          {/* Core Story Vision */}
          <p className="text-xs sm:text-sm md:text-base text-[#5E625D] leading-relaxed max-w-lg font-normal text-balance">
            A 24-hour planetary dialogue uniting AI scientists, philosophers, artists, and community stewards for a planet-centered future.
          </p>

          {/* Action Buttons: WATCH THE RELAY & REGISTER NOW */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-3.5 pt-1">
            {/* Watch the Relay Button */}
            <a
              href="https://www.youtube.com/@AICompassionGlobalForum"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#F8F6F0] bg-[#163B32] hover:bg-[#0F2620] rounded-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>WATCH THE RELAY</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {/* Register Now Button */}
            <a
              href="https://makemypass.com/event/ai-compassion-participants"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#163B32] bg-white hover:bg-slate-50 border-2 border-[#163B32] rounded-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>REGISTER NOW</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* 4-Metric Statistics Strip */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 pt-4 border-t border-[#D9DDD6]/80 text-[#171918] mt-1"
          >
            <div className="flex flex-col">
              <span className="font-editorial text-xl sm:text-2xl font-bold tracking-tight text-[#163B32]">24h</span>
              <span className="text-[10px] font-mono text-[#5E625D] uppercase tracking-wider font-semibold">Continuous Relay</span>
            </div>
            <div className="flex flex-col sm:border-l sm:border-[#D9DDD6] sm:pl-3">
              <span className="font-editorial text-xl sm:text-2xl font-bold tracking-tight text-[#163B32]">12</span>
              <span className="text-[10px] font-mono text-[#5E625D] uppercase tracking-wider font-semibold">World Segments</span>
            </div>
            <div className="flex flex-col sm:border-l sm:border-[#D9DDD6] sm:pl-3">
              <span className="font-editorial text-xl sm:text-2xl font-bold tracking-tight text-[#163B32]">70+</span>
              <span className="text-[10px] font-mono text-[#5E625D] uppercase tracking-wider font-semibold">Global Leaders</span>
            </div>
            <div className="flex flex-col sm:border-l sm:border-[#D9DDD6] sm:pl-3">
              <span className="font-editorial text-xl sm:text-2xl font-bold tracking-tight text-[#163B32]">1</span>
              <span className="text-[10px] font-mono text-[#5E625D] uppercase tracking-wider font-semibold">Shared Future</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Clean, Unobstructed Scenic Artwork Viewport */}
        <div className="lg:col-span-6 relative w-full h-[280px] sm:h-[360px] lg:h-[460px] pointer-events-none" />

      </div>
    </section>
  );
}


