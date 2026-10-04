'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { faqColumns } from './faqData';
import { ChevronDown } from 'lucide-react';

export default function FaqSection() {
  const [openIds, setOpenIds] = useState({});
  const sectionRef = useRef(null);
  const cardContainerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      if (cardContainerRef.current) {
        gsap.fromTo(
          cardContainerRef.current,
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardContainerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleItem = (id) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative z-10 w-full bg-white py-20 sm:py-28 px-4 sm:px-6 lg:px-12 border-t border-[#EAECE8] overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Large Rounded Off-White Card Container */}
        <div
          ref={cardContainerRef}
          className="w-full bg-[#FAF9F5] rounded-3xl sm:rounded-[40px] border border-[#ECE9E0] py-16 sm:py-20 px-6 sm:px-10 lg:px-14 shadow-xs"
        >
          {/* Centered Heading */}
          <div className="text-center flex flex-col items-center gap-3 mb-14 sm:mb-16 scroll-fade-down">
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#163B32]">
              Frequently Asked Questions
            </h2>
          </div>

          {/* 3-Column FAQ Accordion Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 lg:gap-x-14 gap-y-2 items-start scroll-fade-up scroll-stagger">
            {faqColumns.map((col) => (
              <div key={col.colIndex} className="flex flex-col">
                {col.items.map((item) => {
                  const isOpen = Boolean(openIds[item.id]);

                  return (
                    <div
                      key={item.id}
                      className="border-b border-[#E2DFD6] transition-colors py-4 sm:py-5"
                    >
                      <button
                        type="button"
                        onClick={() => toggleItem(item.id)}
                        aria-expanded={isOpen}
                        className="w-full text-left flex items-center justify-between gap-3 focus:outline-none cursor-pointer group"
                      >
                        <span className="text-sm sm:text-base font-medium text-slate-800 group-hover:text-[#163B32] transition-colors leading-snug">
                          {item.question}
                        </span>

                        <div className="shrink-0 text-slate-500 group-hover:text-[#163B32] transition-transform duration-300">
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-300 ${
                              isOpen ? 'rotate-180 text-[#163B32]' : ''
                            }`}
                          />
                        </div>
                      </button>

                      {/* Smooth Expanding Answer */}
                      <div
                        className={`grid transition-all duration-300 ease-in-out ${
                          isOpen ? 'grid-rows-[1fr] opacity-100 pt-3' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden min-h-0">
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}