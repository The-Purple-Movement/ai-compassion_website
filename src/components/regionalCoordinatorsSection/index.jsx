'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Globe, ShieldCheck, MapPin } from 'lucide-react';
import { REGIONAL_COORDINATORS } from '@/data/peopleData';

export default function RegionalCoordinatorsSection() {
  const sectionRef = useRef(null);

  return (
    <section
      id="regional-coordinators"
      ref={sectionRef}
      className="relative z-10 w-full bg-[#FFFFFF] py-16 lg:py-24 px-4 sm:px-6 lg:px-12 border-t border-[#EAECE8] overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-10 sm:gap-14">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono font-bold text-[#163B32] uppercase tracking-wider shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
            <span>Global Operational Leadership</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#163B32] leading-tight">
            Meet The Regional Coordinators
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed max-w-2xl">
            Meet the regional coordinators orchestrating producer synchronization, youth engagement, and cross-continental dialogues across all 12 operational relay zones.
          </p>
        </div>

        {/* Coordinators Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 w-full"
        >
          {REGIONAL_COORDINATORS.map((coordinator) => (
            <Link
              key={coordinator.slug}
              href={`/${coordinator.slug}`}
              className="w-full bg-[#FAFCFA] hover:bg-white rounded-3xl border border-emerald-100/90 hover:border-[#163B32]/40 shadow-2xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between group cursor-pointer text-left relative overflow-hidden"
            >
              <div className="flex flex-col gap-4">
                {/* Headshot Portrait */}
                <div className="relative w-full aspect-square max-w-[170px] mx-auto rounded-2xl overflow-hidden bg-slate-100 shadow-xs border border-emerald-100 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={coordinator.img}
                    alt={coordinator.name}
                    fill
                    className="object-cover"
                    style={{ objectPosition: coordinator.imgPosition || 'center 20%' }}
                    sizes="(max-width: 640px) 170px, 200px"
                  />
                </div>

                {/* Name & Role Label */}
                <div className="flex flex-col gap-1.5 text-center">
                  <h3 className="font-editorial text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#163B32] transition-colors leading-snug">
                    {coordinator.name}
                  </h3>
                  
                  <span className="inline-block mx-auto text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#163B32] border border-emerald-200">
                    {coordinator.role}
                  </span>
                </div>
              </div>

              {/* Regions Covered */}
              <div className="mt-4 pt-3 border-t border-emerald-100/80 flex flex-col gap-2 bg-emerald-50/40 -mx-2 -mb-2 p-3 rounded-2xl">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono font-bold text-[#163B32] uppercase tracking-wider flex items-center gap-1">
                    <Globe className="w-3 h-3 text-[#163B32]" />
                    <span>Assigned Regions:</span>
                  </span>
                  <p className="text-xs text-slate-700 font-medium leading-snug line-clamp-3">
                    {coordinator.region}
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
