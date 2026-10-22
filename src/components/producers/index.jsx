'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { PRODUCERS_AND_COPRODUCERS } from '@/data/peopleData';

export default function ProducersSection() {
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
          { opacity: 0, y: 35, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.08,
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
      id="producers"
      ref={sectionRef}
      className="relative z-10 w-full bg-[#FFFFFF] py-16 lg:py-24 px-4 sm:px-6 lg:px-12 border-t border-[#EAECE8] overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-10 sm:gap-14">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3 max-w-3xl mx-auto scroll-fade-down">
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#163B32] leading-tight">
            Producers &amp; Co-Producers
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed max-w-2xl">
            Meet the regional conveners, visionaries, and ecosystem architects orchestrating the unbroken 24-hour planetary relay across world segments.
          </p>
        </div>

        {/* Unified Producers & Co-Producers Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 w-full"
        >
          {PRODUCERS_AND_COPRODUCERS.map((person) => (
            <Link
              key={person.slug}
              href={`/${person.slug}`}
              className="w-full bg-[#FAFCFA] hover:bg-white rounded-3xl border border-emerald-100/90 hover:border-[#163B32]/40 shadow-2xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between group cursor-pointer text-left relative overflow-hidden will-change-transform"
            >
              <div className="flex flex-col gap-4">
                {/* Headshot Portrait */}
                <div className="relative w-full aspect-square max-w-[150px] mx-auto rounded-2xl overflow-hidden bg-slate-100 shadow-xs border border-emerald-100 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={person.img}
                    alt={person.name}
                    fill
                    className="object-cover"
                    style={{ objectPosition: person.imgPosition || 'center' }}
                    sizes="(max-width: 640px) 150px, 160px"
                  />
                </div>

                {/* Name & Role Label */}
                <div className="flex flex-col gap-1 text-center">
                  <h3 className="font-editorial text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#163B32] transition-colors leading-snug">
                    {person.name}
                  </h3>
                  
                  <span
                    className={`inline-block mx-auto text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-2xs ${
                      person.type === 'co-producer' || person.role.toLowerCase().includes('co-producer') || person.role.toLowerCase().includes('mc')
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-[#163B32] text-white border border-[#163B32]'
                    }`}
                  >
                    {person.role}
                  </span>
                </div>
              </div>

              {/* Segment & Regional Coverage */}
              <div className="mt-4 pt-3 border-t border-emerald-100/80 flex flex-col gap-2 bg-emerald-50/40 -mx-2 -mb-2 p-3 rounded-2xl">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-mono font-bold text-[#163B32] uppercase tracking-wider">
                    {person.segment}
                  </span>
                  <p className="text-xs text-slate-600 font-medium leading-snug line-clamp-2">
                    {person.region}
                  </p>
                </div>

                {/* View Profile Action Link */}
                <div className="pt-2 border-t border-emerald-100/60 flex items-center justify-between text-xs font-mono font-bold text-[#163B32] group-hover:text-[#C96F4A] transition-colors">
                  <span>View Profile</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

