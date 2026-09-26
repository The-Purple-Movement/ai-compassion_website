import React from "react";
import Image from "next/image";

const producers = [
  { name: "Jun Suto", subtitle: "Regional Producer — Kyoto", img: "/jun.png", type: "Producer" },
  { name: "Aditi Singh", subtitle: "Regional Producer — Southeast Asia (Youth Hub)", img: "/aditi.jpg", type: "Producer" },
  { name: "Deepu S Nath", subtitle: "Regional Producer — South Asia", img: "/deepu.png", type: "Producer" },
  { name: "Walied Albasheer", subtitle: "Regional Producer — Middle East, Caucasus & Central Asia", img: "/walied.jpg", type: "Producer" },
  { name: "Dr. Lee Kironget", subtitle: "Regional Producer — Africa & Central Europe", img: "/lee.jpg", type: "Producer" },
  { name: "Fabrizio Gramuglio", subtitle: "Regional Producer — UK, Ireland, Iberia & West Africa", img: "/fabrizio.jpg", type: "Producer" },
  { name: "Edith Öller", subtitle: "Co-Producer — UK, Ireland, Iberia & West Africa", img: "/edith-oller.jpg", type: "Co-Producer" },
  { name: "Julieta Reyes", subtitle: "Regional Producer — Eastern & Southern South America, Caribbean", img: "/julieta.jpg", type: "Producer" },
  { name: "Ani Chahal Honan", subtitle: "Regional Producer — Western North America", img: "/ani.jpg", type: "Producer" },
];

export default function ProducersPage() {
  const validProducers = producers.filter((p) => p.img && p.img.trim() !== "");

  return (
    <div className="w-full max-w-7xl mx-auto py-16 px-4 mt-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold font-editorial text-[#163B32] mb-3">Our Producers &amp; Co-Producers</h1>
        <p className="text-sm text-slate-600">
          Meet the regional conveners and visionaries orchestrating the 24-hour continuous global relay.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
        {validProducers.map((producer, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-emerald-100/80 shadow-2xs hover:shadow-xl hover:-translate-y-1.5 p-4 sm:p-5 flex flex-col items-center text-center transition-all group">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-emerald-50 mb-3 flex items-center justify-center overflow-hidden border border-emerald-100 shrink-0">
              <Image
                src={producer.img}
                alt={producer.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 80px, 96px"
              />
            </div>
            <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1.5 ${
              producer.type === 'Co-Producer' || producer.type === 'Regional Lead'
                ? 'bg-amber-100 text-amber-900 border border-amber-200'
                : 'bg-emerald-100 text-[#163B32] border border-emerald-200'
            }`}>
              {producer.type}
            </span>
            <div className="font-editorial font-bold text-xs sm:text-sm md:text-base text-slate-900 mb-0.5">{producer.name}</div>
            <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-tight line-clamp-2">{producer.subtitle}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
