'use client';

import { useEffect, useRef, useState } from 'react';

const MARQUEE_ITEMS = [
  'ONE WORLD',
  '12 REGIONS',
  '24 HOURS',
  'ONE GLOBAL CONVERSATION',
  'AI + COMPASSION',
  'KYOTO & GLOBAL RELAY',
  'OCTOBER 2–3, 2026',
  'PLANET-CENTERED INTELLIGENCE',
];

export default function ContinuousMarquee({ reverse = false, variant = 'light' }) {
  const isDark = variant === 'dark';
  const marqueeRef = useRef(null);
  const animationClass = reverse ? 'animate-marquee-right' : 'animate-marquee-left';
  const sequence = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  const currentDuration = reverse ? 62 : 58;

  return (
    <div
      className={`relative w-full overflow-hidden py-3.5 border-y select-none pointer-events-none transition-colors duration-500 z-10 ${
        isDark
          ? 'bg-[#163B32] border-white/10 text-white/90 shadow-inner'
          : 'bg-[#F2F3EF] border-[#E6E9E4] text-[#163B32]'
      }`}
    >
      <div 
        ref={marqueeRef}
        className={animationClass}
        style={{ 
          animationDuration: `${currentDuration}s`,
          transition: 'animation-duration 0.25s ease-out'
        }}
      >
        {/* Two identical groups create an endless, flawless -50% loop */}
        {[0, 1].map((groupKey) => (
          <div key={groupKey} className="flex items-center shrink-0">
            {sequence.map((item, idx) => (
              <div key={`${groupKey}-${idx}`} className="flex items-center gap-8 pl-8">
                <span className="font-mono text-xs md:text-sm font-semibold tracking-[0.25em] uppercase whitespace-nowrap">
                  {item}
                </span>
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    isDark ? 'bg-[#C9A96A]' : 'bg-[#C96F4A]'
                  }`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
