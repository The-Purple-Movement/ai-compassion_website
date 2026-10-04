'use client';

import Link from 'next/link';
import { Users, ArrowRight } from 'lucide-react';

export default function MeetTheTeamCTA() {
  return (
    <section className="relative z-10 w-full bg-gradient-to-b from-[#FFFFFF] via-[#F4F8F5] to-[#FFFFFF] py-14 sm:py-20 px-4 sm:px-6 lg:px-12 border-t border-[#EAECE8] overflow-hidden">
      
      {/* Decorative Background Ambient Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] sm:w-[680px] h-64 bg-gradient-to-r from-emerald-200/40 via-[#C9A96A]/20 to-emerald-300/30 blur-3xl pointer-events-none rounded-full" />
      
      <div className="relative max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
        
        {/* Section Headline */}
        <div className="flex flex-col gap-2 max-w-2xl scroll-fade-down">
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#163B32] leading-tight">
            The People Behind The 24-Hour Planetary Relay
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed scroll-fade-up">
            Discover the operational leads, regional coordinators, video editors, designers, and tech directors powering the unbroken global conversation for a planet-centered future.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* EYE-CATCHING "MEET THE TEAM" BUTTON WITH ANIMATED GLOW & SHINE SWEEP */}
        {/* ========================================================================= */}
        <div className="pt-2 relative group scroll-pop">
          {/* Animated Pulsing Backlight Halo */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500 via-[#C9A96A] to-emerald-600 rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-500 group-hover:scale-105 animate-pulse" />

          {/* Shimmer Border Wrap */}
          <div className="relative p-[2px] rounded-full bg-gradient-to-r from-emerald-600 via-[#C9A96A] via-emerald-400 to-emerald-700 bg-[length:200%_auto] hover:bg-[position:right_center] transition-all duration-700 shadow-xl group-hover:shadow-2xl group-hover:shadow-emerald-900/30">
            
            <Link
              href="/coordinators"
              className="relative flex items-center gap-3.5 px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-[#163B32] group-hover:bg-[#0E2822] text-white font-mono text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-300 transform group-hover:scale-[1.02] overflow-hidden cursor-pointer"
            >
              {/* Dynamic Light Sweep Beam */}
              <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />

              {/* Leading Icon with subtle pulse */}
              <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-emerald-700/80 text-emerald-200 border border-emerald-500/50 shadow-inner group-hover:scale-110 transition-transform">
                <Users className="w-4 h-4 text-emerald-100" />
              </span>

              {/* Button Label */}
              <span className="relative text-white group-hover:text-emerald-100 transition-colors drop-shadow-xs">
                MEET THE TEAM
              </span>

              {/* Animated Arrow Icon */}
              <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-white/10 group-hover:bg-[#C9A96A] text-white group-hover:text-[#163B32] transition-all duration-300 group-hover:translate-x-1">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
