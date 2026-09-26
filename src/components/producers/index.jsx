'use client';

import Image from 'next/image';

const PRODUCERS = [
  // Producers & Co-Producers (side-by-side)
  {
    name: 'Jun Suto',
    role: 'Regional Producer — Kyoto',
    img: '/jun.png',
    category: 'producer',
  },
  {
    name: 'Aditi Singh',
    role: 'Regional Producer — Southeast Asia (Youth Hub)',
    img: '/aditi.jpg',
    category: 'producer',
  },
  {
    name: 'Deepu S Nath',
    role: 'Regional Producer — South Asia',
    img: '/deepu.png',
    category: 'producer',
  },
  {
    name: 'Walied Albasheer',
    role: 'Regional Producer — Middle East, Caucasus & Central Asia',
    img: '/walied.jpg',
    category: 'producer',
  },
  {
    name: 'Dr. Lee Kironget',
    role: 'Regional Producer — Africa & Central Europe',
    img: '/lee.jpg',
    category: 'producer',
  },
  {
    name: 'Fabrizio Gramuglio',
    role: 'Regional Producer — UK, Ireland, Iberia & West Africa',
    img: '/fabrizio.jpg',
    category: 'producer',
  },
  {
    name: 'Edith Öller',
    role: 'Co-Producer — UK, Ireland, Iberia & West Africa',
    img: '/edith-oller.jpg',
    category: 'co-producer',
  },
  {
    name: 'Julieta Reyes',
    role: 'Regional Producer — Eastern & Southern South America, Caribbean',
    img: '/julieta.jpg',
    category: 'producer',
  },
  {
    name: 'Ani Chahal Honan',
    role: 'Regional Producer — Western North America',
    img: '/ani.jpg',
    category: 'producer',
  },
];

export default function ProducersPage() {
  // Only display people with uploaded pictures
  const validMembers = PRODUCERS.filter((p) => p.img && p.img.trim() !== '');

  return (
    <section
      id="producers"
      className="relative z-10 w-full bg-[#FFFFFF] py-14 lg:py-20 px-4 sm:px-6 lg:px-8 border-t border-[#EAECE8] overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-8 sm:gap-12">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono font-bold text-[#163B32] uppercase tracking-wider mb-1">
            <span>Global Conveners</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#163B32]">
            Our Producers &amp; Co-Producers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
            Meet the regional conveners, producers, and co-producers orchestrating the 24-hour continuous global relay.
          </p>
        </div>

        {/* Producers & Co-Producers Grid Side-by-Side */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 w-full mx-auto">
          {validMembers.map((producer, idx) => (
            <div
              key={idx}
              className="w-full bg-white rounded-2xl border border-emerald-100/90 shadow-2xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 p-4 sm:p-5 flex flex-col items-center text-center gap-3 group overflow-hidden"
            >
              {/* Portrait Image */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-26 lg:h-26 rounded-2xl overflow-hidden bg-slate-100 shadow-xs group-hover:scale-105 transition-transform duration-300 border border-emerald-100 shrink-0">
                <Image
                  src={producer.img}
                  alt={producer.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 80px, (max-width: 1024px) 96px, 112px"
                />
              </div>

              {/* Producer Name & Role */}
              <div className="flex flex-col items-center gap-1.5 w-full flex-1 justify-between">
                <span className={`text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  producer.category === 'co-producer'
                    ? 'bg-amber-100 text-amber-900 border border-amber-200'
                    : 'bg-emerald-100 text-[#163B32] border border-emerald-200'
                }`}>
                  {producer.category === 'co-producer' ? (producer.role.includes('Regional Lead') ? 'Regional Lead' : 'Co-Producer') : 'Producer'}
                </span>

                <div className="flex flex-col items-center gap-0.5">
                  <h3 className="font-editorial text-xs sm:text-sm md:text-base font-bold text-slate-900 group-hover:text-[#163B32] transition-colors leading-tight break-words">
                    {producer.name}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-tight line-clamp-2 mt-0.5">
                    {producer.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
