'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import s1 from '@/../public/usa.webp';
import s2 from '@/../public/ai.webp';
import s3 from '@/../public/lm.webp';
import s4 from '@/../public/goi-peace.svg';
import s5 from '@/../public/health.webp';
import s6 from '@/../public/be.webp';

import p1 from '@/../public/pdie.webp';
import p2 from '@/../public/mulearn logo.webp';
import p4 from '@/../public/logo-globalai.webp';
import p5 from '@/../public/650.webp';
import p6 from '@/../public/intuitio.webp';
import p7 from '@/../public/ism.webp';

const SPONSORS = [
  { img: s1, name: 'USA Pavilion Expo 2025 Osaka' },
  { img: s2, name: 'AI+Compassion' },
  { img: s3, name: 'Link and Motivation Group' },
  { img: s4, name: 'Goi Peace Foundation' },
  { img: s5, name: 'HEALTHSPAN X' },
  { img: s6, name: 'Be. ~scubed~' },
  { img: '/makemypass-logo.webp', name: 'MakeMyPass', isCustom: true },
];

const PARTNERS = [
  { img: '/imagine-logo.webp', name: 'IMAGINE', isCustom: true },
  { img: '/compassion-economy-logo.webp', name: 'Compassion Economy', isCustom: true },
  { img: '/ideaz-logo.svg', name: 'IDEAZ Business Innovation', isCustom: true },
  { img: p1, name: 'PDIE Group' },
  { img: p2, name: 'μLearn' },
  { img: '/purple-logo-darktext.webp', name: 'The Purple Movement', isCustom: true },
  { img: p4, name: 'Global AI Alliance' },
  { img: p5, name: '650ai LAB' },
  { img: p6, name: 'INTUITIO VENTURES' },
  { img: p7, name: 'ism.' },
];

export default function PartnersAndSponsors() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const marqueeContainerRef = useRef(null);

  const sponsorsMarquee = [...SPONSORS, ...SPONSORS, ...SPONSORS];
  const partnersMarquee = [...PARTNERS, ...PARTNERS, ...PARTNERS];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (marqueeContainerRef.current) {
        gsap.fromTo(
          marqueeContainerRef.current,
          { opacity: 0, scale: 0.98, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: marqueeContainerRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="partners-sponsors"
      ref={sectionRef}
      className="relative z-10 w-full bg-[#FFFFFF] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 border-t border-[#EAECE8] overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-12 sm:gap-16">
        
        {/* Centered Main Header */}
        <div ref={headerRef} className="flex flex-col items-center text-center gap-3 max-w-3xl mx-auto">
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#163B32] leading-tight">
            Partners &amp; Sponsors
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-600 font-light max-w-xl leading-relaxed">
            Co-creating the 24-hour continuous global dialogue with visionary foundations, academic institutions, and transformative ecosystem partners.
          </p>
        </div>

        {/* Dual Marquee Showcase with Transparent Background */}
        <div ref={marqueeContainerRef} className="w-full flex flex-col gap-6 sm:gap-8">
          
          {/* Row 1: Partners (Moving Left) */}
          <div className="relative w-full overflow-hidden py-4 bg-transparent group">
            {/* Left & Right Subtle Edge Fades */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            {/* Infinite Marquee Track (Left) */}
            <div className="flex items-center gap-10 sm:gap-16 w-max animate-marquee-left group-hover:[animation-play-state:paused]">
              {partnersMarquee.map((partner, idx) => (
                <div
                  key={`partner-${idx}`}
                  className="flex items-center justify-center p-2 transition-transform duration-300 hover:scale-110 shrink-0"
                >
                  <div className="relative h-12 sm:h-16 w-32 sm:w-40 flex items-center justify-center">
                    <Image
                      src={partner.img}
                      alt={partner.name}
                      fill
                      className="object-contain transition-opacity duration-300"
                      sizes="(max-width: 640px) 128px, 160px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Sponsors (Moving Right) */}
          <div className="relative w-full overflow-hidden py-4 bg-transparent group">
            {/* Left & Right Subtle Edge Fades */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            {/* Infinite Marquee Track (Right) */}
            <div className="flex items-center gap-12 sm:gap-18 w-max animate-marquee-right group-hover:[animation-play-state:paused]">
              {sponsorsMarquee.map((sponsor, idx) => (
                <div
                  key={`sponsor-${idx}`}
                  className="flex items-center justify-center p-2 transition-transform duration-300 hover:scale-110 shrink-0"
                >
                  <div className="relative h-12 sm:h-16 w-32 sm:w-44 flex items-center justify-center">
                    <Image
                      src={sponsor.img}
                      alt={sponsor.name}
                      fill
                      className="object-contain transition-opacity duration-300"
                      sizes="(max-width: 640px) 128px, 176px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
