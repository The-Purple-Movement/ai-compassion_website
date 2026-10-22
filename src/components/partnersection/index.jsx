'use client';

import Image from 'next/image';
import p1 from '@/../public/pdie.webp';
import p2 from '@/../public/mulearn logo.webp';
import p3 from '@/../public/purple.webp';
import p4 from '@/../public/logo-globalai.webp';
import p5 from '@/../public/650.webp';
import p6 from '@/../public/intuitio.webp';
import p7 from '@/../public/ism.webp';

const PARTNERS = [
  { img: '/compassion-economy-logo.webp', name: 'Compassion Economy' },
  { img: '/ideaz-logo.svg', name: 'IDEAZ Business Innovation' },
  { img: p1, name: 'PDIE Group' },
  { img: p2, name: 'μLearn' },
  { img: p3, name: 'The Purple Movement' },
  { img: p4, name: 'Global AI Alliance' },
  { img: p5, name: '650ai LAB' },
  { img: p6, name: 'INTUITIO VENTURES' },
  { img: p7, name: 'ism.' },
];

export function PartnerSection() {
  // Duplicate array 3 times for seamless infinite continuous marquee loop
  const marqueeList = [...PARTNERS, ...PARTNERS, ...PARTNERS];

  return (
    <section
      id="partners"
      className="relative z-10 w-full bg-[#FFFFFF] pt-12 pb-20 px-4 sm:px-6 lg:px-12 border-b border-[#EAECE8] overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-10">
        
        {/* Centered Heading */}
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#163B32] font-semibold">
            Global Ecosystem
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#172554] text-center">
            Our Partners
          </h2>
        </div>

        {/* Continuous Horizontal Moving Marquee with Full Color Logos */}
        <div className="relative w-full overflow-hidden py-4 mask-gradient group">
          {/* Subtle Left & Right Edge Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Marquee Track (Moving Right to Left) */}
          <div className="flex items-center gap-12 sm:gap-16 w-max animate-marquee-left group-hover:[animation-play-state:paused]">
            {marqueeList.map((partner, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center p-3 transition-transform duration-300 hover:scale-110 shrink-0"
              >
                <div className="relative h-12 sm:h-14 w-32 sm:w-40 flex items-center justify-center">
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

      </div>
    </section>
  );
}

export default PartnerSection;