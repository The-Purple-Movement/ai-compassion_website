'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ab1 from '@/../public/ab1.webp';

export default function AboutSection() {
  const sectionRef = useRef(null);
  const imgWrapperRef = useRef(null);
  const textContentRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // 1. Right Image Parallax Scroll
      if (imgWrapperRef.current) {
        gsap.fromTo(
          imgWrapperRef.current,
          { y: 35 },
          {
            y: -35,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }

      // 2. Left Narrative Scroll Reveal
      if (textContentRef.current) {
        gsap.fromTo(
          textContentRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textContentRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 3. Cards Stagger Reveal
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 88%',
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
      id="about"
      ref={sectionRef}
      className="relative z-10 w-full bg-[#F8F6F0] py-20 lg:py-28 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-14">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 border-b border-[#E6E9E4] pb-4 scroll-fade-down">
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#171918]">
            About Us
          </h2>
        </div>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Narrative Column */}
          <div ref={textContentRef} className="lg:col-span-7 flex flex-col gap-6">
            <h3 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-[#163B32] tracking-tight">
              Our Vision
            </h3>

            <p className="text-base sm:text-lg text-[#171918] leading-relaxed font-normal">
              Artificial intelligence is advancing faster than ever, yet global
              trust in these systems remains uncertain. We imagine a future where
              nature, humanity, and technology thrive together. This forum
              explores how AI can move beyond fear and competition to nurture
              ecosystems, preserve cultural heritage, and strengthen communities.
            </p>

            <div className="pt-2">
              <p className="text-sm sm:text-base text-[#163B32] font-semibold">
                Our approach is guided by two essential Japanese concepts:
              </p>
            </div>

            {/* Wa and Ma Concept Cards Grid */}
            <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Wa (和) Card */}
              <div className="relative p-6 rounded-3xl bg-white border border-[#E6E9E4] shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-2 overflow-hidden group will-change-transform">
                <div
                  aria-hidden="true"
                  className="absolute -right-2 -bottom-4 text-7xl font-serif text-[#163B32]/10 select-none pointer-events-none group-hover:text-[#C96F4A]/20 transition-colors"
                >
                  和
                </div>

                <div className="flex items-center gap-2 relative z-10">
                  <span className="font-editorial text-xl font-bold text-[#163B32]">
                    Wa (和)
                  </span>
                  <span className="h-[1px] w-6 bg-[#C96F4A]" />
                </div>

                <p className="text-xs sm:text-sm text-[#5E625D] leading-relaxed relative z-10">
                  The principle of harmony and peaceful unity, where diverse elements come together in balance.
                </p>
              </div>

              {/* Ma (間) Card */}
              <div className="relative p-6 rounded-3xl bg-white border border-[#E6E9E4] shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-2 overflow-hidden group will-change-transform">
                <div
                  aria-hidden="true"
                  className="absolute -right-2 -bottom-4 text-7xl font-serif text-[#163B32]/10 select-none pointer-events-none group-hover:text-[#C96F4A]/20 transition-colors"
                >
                  間
                </div>

                <div className="flex items-center gap-2 relative z-10">
                  <span className="font-editorial text-xl font-bold text-[#163B32]">
                    Ma (間)
                  </span>
                  <span className="h-[1px] w-6 bg-[#C96F4A]" />
                </div>

                <p className="text-xs sm:text-sm text-[#5E625D] leading-relaxed relative z-10">
                  The concept of vital space between elements—the pause that gives meaning and allows for reflection.
                </p>
              </div>
            </div>

            {/* Futokoro 2026 Theme Box */}
            <div className="relative p-6 sm:p-7 rounded-3xl bg-white border border-[#E6E9E4] shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-2.5 overflow-hidden group scroll-fade-up will-change-transform">
              <div
                aria-hidden="true"
                className="absolute -right-3 -bottom-5 text-8xl font-serif text-[#163B32]/10 select-none pointer-events-none group-hover:text-[#C96F4A]/20 transition-colors"
              >
                懐
              </div>

              <div className="flex items-center gap-2.5 relative z-10">
                <span className="px-2.5 py-0.5 rounded-full bg-[#C96F4A]/10 text-[#C96F4A] font-mono text-[10px] uppercase font-bold tracking-wider">
                  2026 Special Theme
                </span>
                <span className="font-editorial text-xl font-bold text-[#163B32]">
                  Futokoro (懐)
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#5E625D] leading-relaxed relative z-10">
                Translates to the intimate space near the body or the deep embrace of nature. Exploring how
                we responsibly receive AI into physical bodies, homes, care systems, and ecosystems.
              </p>
            </div>
          </div>

          {/* Right Editorial Image with Parallax Drift */}
          <div ref={imgWrapperRef} className="lg:col-span-5 relative mt-4 lg:mt-0 will-change-transform">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E6E9E4] bg-white aspect-[4/3] group">
              <div className="relative w-full h-full">
                <Image
                  src={ab1}
                  alt="AI + Compassion vision and community"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Floating Kyoto Relay Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-white/90 backdrop-blur-md border border-white/60 shadow-lg flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-mono text-[9px] uppercase font-bold text-[#163B32] tracking-wider">
                    Planetary Dialogue
                  </span>
                  <span className="font-editorial text-xs font-bold text-slate-800">
                    Kyoto, Japan • Oct 2026
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#163B32] text-white font-mono text-[10px] font-bold">
                  24 Hours
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}