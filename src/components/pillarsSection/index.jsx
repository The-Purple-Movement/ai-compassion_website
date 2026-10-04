'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Globe,
  BookOpen,
  Shield,
  Brain,
  Handshake,
  Sprout,
} from 'lucide-react';

const PILLARS_DATA = [
  {
    id: 0,
    side: 'left',
    title: 'Harmony Across Systems',
    description:
      'Designing AI to coexist with natural ecosystems, social systems, and technological networks.',
    icon: Globe,
    startAngle: 90,
    endAngle: 150,
    iconAngle: 120,
  },
  {
    id: 1,
    side: 'left',
    title: 'Education for Co-Flourishing',
    description:
      'Cultivating AI literacy and eco-social awareness in the next generation.',
    icon: BookOpen,
    startAngle: 150,
    endAngle: 210,
    iconAngle: 180,
  },
  {
    id: 2,
    side: 'left',
    title: 'Trust, Transparency and Accountability',
    description:
      'Closing the global trust gap through openness and ethical governance.',
    icon: Shield,
    startAngle: 210,
    endAngle: 270,
    iconAngle: 240,
  },
  {
    id: 3,
    side: 'right',
    title: 'Ma in Innovation',
    description:
      'Embedding intentional pauses for reflection and co-creation in the AI development process.',
    icon: Brain,
    startAngle: 30,
    endAngle: 90,
    iconAngle: 60,
  },
  {
    id: 4,
    side: 'right',
    title: 'Cultural Wisdom & Global Equity',
    description:
      'Ensuring AI honors diverse traditions, languages, and perspectives.',
    icon: Handshake,
    startAngle: 330,
    endAngle: 390,
    iconAngle: 360,
  },
  {
    id: 5,
    side: 'right',
    title: 'Regenerative AI Economics',
    description:
      'Building AI-driven business models that restore environmental and community well-being.',
    icon: Sprout,
    startAngle: 270,
    endAngle: 330,
    iconAngle: 300,
  },
];

// Helper to calculate SVG donut arc path with fixed precision to avoid SSR float mismatches
function describeArc(cx, cy, rInner, rOuter, startAngleDeg, endAngleDeg) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  
  const pad = 1.2;
  const startRad = toRad(startAngleDeg + pad);
  const endRad = toRad(endAngleDeg - pad);

  const fmt = (n) => Number(n.toFixed(2));

  const x1Outer = fmt(cx + rOuter * Math.cos(startRad));
  const y1Outer = fmt(cy - rOuter * Math.sin(startRad));
  const x2Outer = fmt(cx + rOuter * Math.cos(endRad));
  const y2Outer = fmt(cy - rOuter * Math.sin(endRad));

  const x1Inner = fmt(cx + rInner * Math.cos(endRad));
  const y1Inner = fmt(cy - rInner * Math.sin(endRad));
  const x2Inner = fmt(cx + rInner * Math.cos(startRad));
  const y2Inner = fmt(cy - rInner * Math.sin(startRad));

  return [
    `M ${x1Outer} ${y1Outer}`,
    `A ${rOuter} ${rOuter} 0 0 0 ${x2Outer} ${y2Outer}`,
    `L ${x1Inner} ${y1Inner}`,
    `A ${rInner} ${rInner} 0 0 1 ${x2Inner} ${y2Inner}`,
    'Z',
  ].join(' ');
}

export default function PillarsSection() {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const sectionRef = useRef(null);
  const mandalaRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  const leftPillars = PILLARS_DATA.filter((p) => p.side === 'left');
  const rightPillars = PILLARS_DATA.filter((p) => p.side === 'right');

  const cx = 200;
  const cy = 200;
  const rOuter = 165;
  const rInner = 82;
  const rIcon = (rOuter + rInner) / 2;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // 1. Center Mandala Continuous Parallax Rotation on Scroll
      if (mandalaRef.current) {
        gsap.fromTo(
          mandalaRef.current,
          { rotate: -25, scale: 0.9 },
          {
            rotate: 25,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        );
      }

      // 2. Left Column Pillars Staggered Entrance Reveal
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current.children,
          { opacity: 0, x: -30, y: 20 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: leftColRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 3. Right Column Pillars Staggered Entrance Reveal
      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current.children,
          { opacity: 0, x: 30, y: 20 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: rightColRef.current,
              start: 'top 85%',
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
      id="pillars"
      ref={sectionRef}
      className="relative z-10 w-full bg-[#FFFFFF] py-16 lg:py-24 px-4 sm:px-6 lg:px-8 border-t border-[#EAECE8] overflow-hidden"
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-8 lg:gap-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-2.5 max-w-2xl mx-auto scroll-fade-down">
          <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#172554]">
            Thematic Pillars
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed max-w-xl">
            Six interconnected themes will guide our discussions, workshops, and commitments.
            Each pillar features dedicated sessions led by global experts.
          </p>
        </div>

        {/* Circular Donut Mandala & Flanking Pillars Layout */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center">
          
          {/* Left Column: 3 Pillars */}
          <div
            ref={leftColRef}
            className="lg:col-span-4 flex flex-col justify-between gap-4 sm:gap-5 lg:text-right order-2 lg:order-1 scroll-slide-left"
          >
            {leftPillars.map((pillar) => {
              const isHovered = hoveredIdx === pillar.id;
              return (
                <div
                  key={pillar.id}
                  onMouseEnter={() => setHoveredIdx(pillar.id)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`cursor-pointer transition-all duration-300 p-3 sm:p-3.5 rounded-2xl border ${
                    isHovered
                      ? 'bg-[#F8FAFC] border-slate-200 lg:translate-x-1 shadow-md'
                      : 'border-transparent hover:bg-[#FAFAFA]'
                  }`}
                >
                  <h3
                    className={`font-editorial text-sm sm:text-base font-bold transition-colors ${
                      isHovered ? 'text-[#0F172A]' : 'text-[#1E293B]'
                    }`}
                  >
                    {pillar.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-[12.5px] text-[#64748B] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Center Column: 6-Segment Circular Donut SVG with Parallax Rotation */}
          <div className="lg:col-span-4 flex items-center justify-center order-1 lg:order-2 py-1 scroll-pop">
            <div
              ref={mandalaRef}
              className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] select-none will-change-transform"
            >
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full filter drop-shadow-md"
              >
                <defs>
                  <linearGradient id="segmentGradDefault" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FDEAF2" />
                    <stop offset="50%" stopColor="#F5DCF5" />
                    <stop offset="100%" stopColor="#E9D9F8" />
                  </linearGradient>

                  <linearGradient id="segmentGradHover" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F9A8D4" />
                    <stop offset="50%" stopColor="#E879F9" />
                    <stop offset="100%" stopColor="#C084FC" />
                  </linearGradient>

                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Render the 6 Arc Segments */}
                {PILLARS_DATA.map((pillar) => {
                  const pathData = describeArc(
                    cx,
                    cy,
                    rInner,
                    rOuter,
                    pillar.startAngle,
                    pillar.endAngle
                  );
                  const isHovered = hoveredIdx === pillar.id;

                  const rad = (pillar.iconAngle * Math.PI) / 180;
                  const iconX = Math.round(cx + rIcon * Math.cos(rad));
                  const iconY = Math.round(cy - rIcon * Math.sin(rad));

                  const IconComp = pillar.icon;

                  return (
                    <g
                      key={pillar.id}
                      className="cursor-pointer transition-all duration-300"
                      onMouseEnter={() => setHoveredIdx(pillar.id)}
                      onMouseLeave={() => setHoveredIdx(null)}
                    >
                      <path
                        d={pathData}
                        fill={isHovered ? 'url(#segmentGradHover)' : 'url(#segmentGradDefault)'}
                        stroke="#FFFFFF"
                        strokeWidth="3.5"
                        className="transition-all duration-300 hover:opacity-95"
                        filter={isHovered ? 'url(#glow)' : undefined}
                      />

                      <foreignObject
                        x={iconX - 16}
                        y={iconY - 16}
                        width="32"
                        height="32"
                        className="pointer-events-none"
                      >
                        <div className="w-full h-full flex items-center justify-center">
                          <IconComp
                            className={`w-4 h-4 transition-transform duration-300 ${
                              isHovered
                                ? 'text-white scale-115 drop-shadow-sm'
                                : 'text-[#70587C]'
                            }`}
                          />
                        </div>
                      </foreignObject>
                    </g>
                  );
                })}

                <circle
                  cx={cx}
                  cy={cy}
                  r={rInner - 4}
                  fill="#FFFFFF"
                  className="filter drop-shadow-xs"
                />
              </svg>
            </div>
          </div>

          {/* Right Column: 3 Pillars */}
          <div
            ref={rightColRef}
            className="lg:col-span-4 flex flex-col justify-between gap-4 sm:gap-5 lg:text-left order-3 scroll-slide-right"
          >
            {rightPillars.map((pillar) => {
              const isHovered = hoveredIdx === pillar.id;
              return (
                <div
                  key={pillar.id}
                  onMouseEnter={() => setHoveredIdx(pillar.id)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`cursor-pointer transition-all duration-300 p-3 sm:p-3.5 rounded-2xl border ${
                    isHovered
                      ? 'bg-[#F8FAFC] border-slate-200 lg:-translate-x-1 shadow-md'
                      : 'border-transparent hover:bg-[#FAFAFA]'
                  }`}
                >
                  <h3
                    className={`font-editorial text-sm sm:text-base font-bold transition-colors ${
                      isHovered ? 'text-[#0F172A]' : 'text-[#1E293B]'
                    }`}
                  >
                    {pillar.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-[12.5px] text-[#64748B] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
