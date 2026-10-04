'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  Globe,
  Search,
  CheckCircle2,
  Table as TableIcon,
  GitCommit,
  Sparkles,
  ChevronRight,
  User,
  Users,
} from 'lucide-react';
import {
  TIMEZONES,
  SCHEDULE_MATRIX,
} from './scheduleData';

export default function ScheduleSection() {
  const [selectedTz, setSelectedTz] = useState('UTC');
  const [activeView, setActiveView] = useState('timeline'); // 'timeline' | 'matrix'
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeNodeIdx, setActiveNodeIdx] = useState(0);
  const [northAmericaExpanded, setNorthAmericaExpanded] = useState(true);

  const timelineContainerRef = useRef(null);
  const itemsContainerRef = useRef(null);
  const firstNodeRef = useRef(null);
  const lastNodeRef = useRef(null);
  const [lineBounds, setLineBounds] = useState({ top: 24, height: 0 });

  // Find active timezone object
  const activeTzObj = TIMEZONES.find((t) => t.key === selectedTz) || TIMEZONES[0];

  // Group Blocks 9, 10, and 11 into a single North America node for the storytelling timeline
  const groupedTimelineItems = useMemo(() => {
    const items = [];
    const naBlocks = [];

    SCHEDULE_MATRIX.forEach((block) => {
      if (block.id === 'block-9' || block.id === 'block-10' || block.id === 'block-11') {
        naBlocks.push(block);
      } else {
        if (naBlocks.length > 0) {
          items.push({
            id: 'group-north-america',
            isGroup: true,
            segment: 'North America',
            lead: 'Ani Chahal Honan',
            blocks: [...naBlocks],
          });
          naBlocks.length = 0;
        }
        items.push({
          id: block.id,
          isGroup: false,
          block,
        });
      }
    });

    if (naBlocks.length > 0) {
      items.push({
        id: 'group-north-america',
        isGroup: true,
        segment: 'North America',
        lead: 'Ani Chahal Honan',
        blocks: [...naBlocks],
      });
    }

    return items;
  }, []);

  // Dynamically calculate the precise center-to-center distance from Node 0 to Homecoming Node
  useEffect(() => {
    const updateLineBounds = () => {
      if (!itemsContainerRef.current || !firstNodeRef.current || !lastNodeRef.current) return;
      const containerRect = itemsContainerRef.current.getBoundingClientRect();
      const firstRect = firstNodeRef.current.getBoundingClientRect();
      const lastRect = lastNodeRef.current.getBoundingClientRect();

      const firstCenterY = firstRect.top + firstRect.height / 2 - containerRect.top;
      const lastCenterY = lastRect.top + lastRect.height / 2 - containerRect.top;
      const totalHeight = Math.max(0, lastCenterY - firstCenterY);

      setLineBounds({
        top: Math.round(firstCenterY),
        height: Math.round(totalHeight),
      });
    };

    updateLineBounds();
    const frameId = requestAnimationFrame(updateLineBounds);
    const timeoutId = setTimeout(updateLineBounds, 300);

    let resizeObserver;
    if (typeof ResizeObserver !== 'undefined' && itemsContainerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updateLineBounds();
      });
      resizeObserver.observe(itemsContainerRef.current);
    }
    window.addEventListener('resize', updateLineBounds);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timeoutId);
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener('resize', updateLineBounds);
    };
  }, [groupedTimelineItems.length, northAmericaExpanded, selectedTz, activeView]);

  // Scroll Progress Tracker for the Storytelling Timeline
  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      const container = timelineContainerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const startOffset = windowHeight * 0.75;
      const totalScrollable = rect.height - windowHeight * 0.5;

      const currentScroll = startOffset - rect.top;
      const progress = totalScrollable > 0 ? Math.min(1, Math.max(0, currentScroll / totalScrollable)) : 0;
      
      setScrollProgress(progress);

      if (groupedTimelineItems.length > 0) {
        const rawIdx = Math.floor(progress * groupedTimelineItems.length);
        const clampedIdx = Math.min(groupedTimelineItems.length - 1, Math.max(0, rawIdx));
        setActiveNodeIdx(clampedIdx);
      }
    };

    const throttledScroll = () => {
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(() => {
          handleScroll();
          animationFrameId = null;
        });
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    window.addEventListener('resize', throttledScroll, { passive: true });
    handleScroll();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', throttledScroll);
    };
  }, [groupedTimelineItems.length, northAmericaExpanded]);

  return (
    <section
      id="schedule"
      className="relative z-10 w-full bg-[#FFFFFF] py-20 lg:py-28 px-4 sm:px-6 lg:px-12 border-t border-[#EAECE8] overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Top Header in Dark Green Palette */}
        <div className="flex flex-col items-center text-center gap-3 max-w-4xl mx-auto scroll-fade-down">
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#163B32] leading-tight">
            Complete 24-Hour Schedule
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl font-light">
            AI + Compassion Global Forum (24-Hour Relay, Oct 2–3, 2026). Continuous journey across 14 relay stages (Opening, 12 regional blocks, and Kyoto Homecoming). Times update automatically with your chosen timezone.
          </p>
        </div>

        {/* Timezone Selector Buttons Row in Brand Dark Green */}
        <div className="w-full flex flex-col items-center gap-4 scroll-fade-up">
          <div className="w-full overflow-x-auto pb-2 scrollbar-none">
            <div className="flex items-center justify-center min-w-max gap-2 sm:gap-3 px-2 mx-auto">
              {TIMEZONES.map((tz) => {
                const isActive = selectedTz === tz.key;
                return (
                  <button
                    key={tz.key}
                    type="button"
                    onClick={() => setSelectedTz(tz.key)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-[#163B32] text-white border-2 border-[#163B32] shadow-md shadow-[#163B32]/20'
                        : 'bg-white text-[#163B32] border-2 border-[#163B32]/40 hover:border-[#163B32] hover:bg-emerald-50/50'
                    }`}
                  >
                    {tz.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Control Bar: View Mode Switcher */}
          <div className="w-full max-w-5xl flex items-center justify-center pt-2 border-b border-emerald-100 pb-4 scroll-pop">
            <div className="flex items-center gap-2 bg-emerald-50/70 p-1 rounded-xl border border-emerald-200/70">
              <button
                type="button"
                onClick={() => setActiveView('timeline')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeView === 'timeline'
                    ? 'bg-[#163B32] text-white shadow-xs'
                    : 'text-[#163B32] hover:text-[#0F2620]'
                }`}
              >
                <GitCommit className="w-3.5 h-3.5 rotate-90" />
                <span>Storytelling Timeline</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveView('matrix')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeView === 'matrix'
                    ? 'bg-[#163B32] text-white shadow-xs'
                    : 'text-[#163B32] hover:text-[#0F2620]'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>Master Matrix</span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: STORYTELLING TIMELINE VIEW */}
        {/* ========================================================================= */}
        {activeView === 'timeline' && (
          <div
            ref={timelineContainerRef}
            className="w-full max-w-5xl mx-auto flex flex-col gap-12 py-6 relative"
          >
            {/* Vertical Timeline Structure */}
            <div className="relative w-full max-w-4xl mx-auto pt-2 pb-2">
              
              {/* Timeline Items Container */}
              <div ref={itemsContainerRef} className="relative flex flex-col gap-10 sm:gap-14">
                
                {/* Central Bounded Track (Terminates precisely at Homecoming Node) */}
                <div
                  className="absolute left-5 md:left-1/2 w-1 -translate-x-1/2 z-0 pointer-events-none overflow-hidden rounded-full"
                  style={{
                    top: `${lineBounds.top}px`,
                    height: `${lineBounds.height}px`,
                  }}
                >
                  <div className="w-full h-full bg-emerald-100 rounded-full" />
                  <div
                    className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#163B32] via-[#22C55E] to-[#C9A96A] rounded-full transition-all duration-75 shadow-sm shadow-emerald-700/20"
                    style={{ height: `${Math.min(1, Math.max(0, scrollProgress)) * 100}%` }}
                  />
                </div>

                {groupedTimelineItems.map((item, idx) => {
                  const isEven = idx % 2 === 0;
                  const isPassed = idx <= activeNodeIdx;
                  const isCurrent = idx === activeNodeIdx;
                  const isFirst = idx === 0;
                  const isLast = idx === groupedTimelineItems.length - 1;
                  const isGroup = item.isGroup;

                  if (isGroup) {
                    // Unified North America Node containing Blocks 9, 10, and 11
                    return (
                      <div
                        key={item.id}
                        className={`relative flex items-start gap-6 md:gap-0 transition-all duration-500 ${
                          isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                        } ${isPassed ? 'opacity-100' : 'opacity-70'}`}
                      >
                        {/* Content Box */}
                        <div
                          className={`w-full md:w-1/2 pl-14 md:pl-0 ${
                            isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                          }`}
                        >
                          <div
                            className={`flex flex-col gap-4 rounded-3xl p-5 sm:p-7 transition-all duration-300 border ${
                              isCurrent
                                ? 'bg-white border-[#163B32] shadow-xl shadow-emerald-950/10 scale-[1.02] ring-2 ring-emerald-200'
                                : 'bg-[#FAFCFA] hover:bg-white border-emerald-200 shadow-sm hover:shadow-lg'
                            }`}
                          >
                            {/* Group Header */}
                            <div className={`flex flex-wrap items-center gap-2 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                              <span className="font-mono text-xs font-bold uppercase tracking-wider text-white bg-[#163B32] px-3.5 py-1 rounded-full shadow-xs">
                                BLOCKS 09, 10 &amp; 11 • NORTH AMERICA
                              </span>
                              
                              <button
                                type="button"
                                onClick={() => setNorthAmericaExpanded(!northAmericaExpanded)}
                                className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#163B32] bg-emerald-100/90 hover:bg-emerald-200 px-3 py-1 rounded-full transition-colors cursor-pointer"
                              >
                                <span>{northAmericaExpanded ? '− Collapse Blocks' : '＋ Expand 3 Blocks'}</span>
                              </button>
                            </div>

                            {/* Lead Information */}
                            <div className={`flex flex-col gap-1 ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                              <h4 className="font-editorial text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                                North America Segment
                              </h4>
                              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                                <span className="font-bold text-[#163B32]">Lead:</span>
                                <Link
                                  href="/ani-chahal-honan"
                                  className="text-[#163B32] font-semibold hover:text-[#C96F4A] transition-colors underline underline-offset-2"
                                >
                                  Ani Chahal Honan (North America Lead / Producer)
                                </Link>
                              </div>
                            </div>

                            {/* Sub-Blocks List (Blocks 9, 10, 11) */}
                            {northAmericaExpanded && (
                              <div className="flex flex-col gap-3 pt-2 text-left">
                                {item.blocks.map((subBlock) => {
                                  const subTime = subBlock.times[selectedTz] || subBlock.times.UTC;

                                  return (
                                    <div
                                      key={subBlock.id}
                                      className="p-4 rounded-2xl bg-white border border-emerald-100/90 shadow-2xs hover:border-emerald-300 transition-all flex flex-col gap-2"
                                    >
                                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                                        <div className="flex items-center gap-2">
                                          <span className="font-mono text-xs font-bold text-[#163B32] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                                            {subBlock.blockLabel}
                                          </span>
                                        </div>
                                        <span className="font-mono text-xs font-bold text-[#C96F4A]">
                                          {subTime} {selectedTz}
                                        </span>
                                      </div>

                                      <div className="flex flex-col gap-1">
                                        <h5 className="font-editorial text-sm font-bold text-slate-900">
                                          {subBlock.region}
                                        </h5>
                                        {subBlock.speakers?.length > 0 && (
                                          <div className="flex flex-wrap items-center gap-1 text-xs pt-1">
                                            <span className="font-bold text-[#163B32]">Speakers:</span>
                                            <span className="text-slate-800 font-medium">
                                              {subBlock.speakers.join(', ')}
                                            </span>
                                          </div>
                                        )}
                                        {subBlock.theme && (
                                          <p className="text-xs text-slate-600 italic">
                                            &ldquo;{subBlock.theme}&rdquo;
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Center Milestone Node */}
                        <div
                          className="absolute left-5 md:left-1/2 top-6 -translate-x-1/2 z-10 flex items-center justify-center"
                        >
                          <div
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-[10px] sm:text-xs font-bold transition-all duration-300 shadow-sm ${
                              isCurrent
                                ? 'bg-[#163B32] text-white ring-4 ring-emerald-200 scale-125 shadow-lg shadow-emerald-900/30'
                                : isPassed
                                ? 'bg-[#2D6A4F] text-white ring-4 ring-emerald-100 scale-105'
                                : 'bg-white text-emerald-900 border-2 border-emerald-200 scale-95'
                            }`}
                          >
                            <span>09</span>
                          </div>
                        </div>

                        {/* Spacing column on opposite side */}
                        <div className="hidden md:block w-1/2" />
                      </div>
                    );
                  }

                  // Single Standard Block Node
                  const block = item.block;
                  const timeVal = block.times[selectedTz] || block.times.UTC;
                  const isSpecial = block.isSpecial;

                  return (
                    <div
                      key={block.id}
                      className={`relative flex items-start gap-6 md:gap-0 transition-all duration-500 ${
                        isEven
                          ? 'md:flex-row'
                          : 'md:flex-row-reverse'
                      } ${isPassed ? 'opacity-100' : 'opacity-70'}`}
                    >
                      {/* Content Box */}
                      <div
                        className={`w-full md:w-1/2 pl-14 md:pl-0 ${
                          isEven
                            ? 'md:pr-12 md:text-right'
                            : 'md:pl-12 md:text-left'
                        }`}
                      >
                        <div
                          className={`flex flex-col gap-2.5 rounded-2xl p-5 sm:p-6 transition-all duration-300 border ${
                            isCurrent
                              ? 'bg-white border-[#163B32] shadow-xl shadow-emerald-950/10 scale-[1.02] ring-2 ring-emerald-200'
                              : isSpecial
                              ? 'bg-amber-50/80 border-amber-200 shadow-xs'
                              : 'bg-[#F9FAF8] hover:bg-white border-emerald-100/90 shadow-2xs hover:shadow-md'
                          }`}
                        >
                          {/* Segment Label & Time Header */}
                          <div
                            className={`flex flex-wrap items-center gap-2 ${
                              isEven ? 'md:justify-end' : 'md:justify-start'
                            }`}
                          >
                            <span className="font-mono text-xs font-bold uppercase tracking-wider text-white bg-[#163B32] px-3 py-1 rounded-full shadow-xs">
                              {block.blockLabel || block.blockNumber} • {block.segment}
                            </span>

                            <span className="font-mono text-xs font-bold text-[#163B32] bg-emerald-100/80 px-2.5 py-1 rounded-full">
                              {timeVal} {selectedTz}
                            </span>

                            {isSpecial && (
                              <span className="font-mono text-[10px] font-bold text-amber-900 bg-amber-200/80 px-2.5 py-1 rounded-full uppercase tracking-wider">
                                Ceremony
                              </span>
                            )}
                          </div>

                          {/* Regional Geography / Coverage (Secondary Text) */}
                          <h4 className="font-editorial text-base sm:text-lg md:text-xl font-bold text-slate-900 leading-snug">
                            {block.region}
                          </h4>

                          {/* Producers, Speakers & Theme Section */}
                          {(block.producers?.length > 0 || block.speakers?.length > 0 || block.theme) && (
                            <div className="pt-3 border-t border-emerald-100/80 flex flex-col gap-2 mt-1 text-xs text-slate-600">
                              {block.producers?.length > 0 && (
                                <div className={`flex flex-wrap items-center gap-1 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                                  <span className="font-bold text-[#163B32]">
                                    {block.producers.some(p => p.toLowerCase().includes('lead'))
                                      ? 'Lead / Producer:'
                                      : block.producers.length > 1
                                      ? 'Producers & Co-Producers:'
                                      : 'Producer:'}
                                  </span>
                                  <span className="font-medium text-slate-800 font-sans">
                                    {block.producers.join(', ')}
                                  </span>
                                </div>
                              )}
                              {block.speakers?.length > 0 && (
                                <div className={`flex flex-wrap items-center gap-1 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                                  <span className="font-bold text-[#163B32]">
                                    Speakers:
                                  </span>
                                  <span className="font-medium text-slate-800 font-sans">
                                    {block.speakers.join(', ')}
                                  </span>
                                </div>
                              )}
                              {block.theme && (
                                <div className={`flex flex-col gap-0.5 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                                  <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-[#C96F4A]">
                                    Theme
                                  </span>
                                  <p className="text-slate-700 italic font-medium leading-relaxed">
                                    &ldquo;{block.theme}&rdquo;
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Center Milestone Node */}
                      <div
                        ref={isFirst ? firstNodeRef : isLast ? lastNodeRef : null}
                        className="absolute left-5 md:left-1/2 top-6 -translate-x-1/2 z-10 flex items-center justify-center"
                      >
                        <div
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-[10px] sm:text-xs font-bold transition-all duration-300 shadow-sm ${
                            isCurrent
                              ? 'bg-[#163B32] text-white ring-4 ring-emerald-200 scale-125 shadow-lg shadow-emerald-900/30'
                              : isPassed
                              ? 'bg-[#2D6A4F] text-white ring-4 ring-emerald-100 scale-105'
                              : 'bg-white text-emerald-900 border-2 border-emerald-200 scale-95'
                          }`}
                        >
                          {isSpecial ? (
                            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                          ) : (
                            <span>{block.blockLabel?.replace('BLOCK ', '') || String(idx).padStart(2, '0')}</span>
                          )}
                        </div>
                      </div>

                      {/* Spacing column on opposite side */}
                      <div className="hidden md:block w-1/2" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: MASTER MATRIX TABLE */}
        {/* ========================================================================= */}
        {activeView === 'matrix' && (
          <div className="w-full flex flex-col gap-4">
            <div className="w-full overflow-x-auto rounded-2xl border border-emerald-200 shadow-md bg-white">
              <table className="w-full text-left text-xs border-collapse min-w-[1100px]">
                <thead>
                  <tr className="bg-[#163B32] text-white font-bold tracking-wide">
                    <th className="py-3.5 px-4 sticky left-0 bg-[#163B32] z-10 min-w-[260px] border-r border-emerald-800">
                      Segment &amp; Region
                    </th>
                    {TIMEZONES.map((tz) => (
                      <th
                        key={tz.key}
                        onClick={() => setSelectedTz(tz.key)}
                        className={`py-3.5 px-3 text-center cursor-pointer transition-colors ${
                          selectedTz === tz.key
                            ? 'bg-[#0F2620] text-emerald-300 font-black ring-1 ring-emerald-300/40'
                            : 'hover:bg-[#1D4A3F]'
                        }`}
                        title={tz.city}
                      >
                        {tz.key}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-emerald-100">
                  {SCHEDULE_MATRIX.map((row, idx) => {
                    const isSpecial = row.isSpecial;

                    return (
                      <tr
                        key={idx}
                        className={`transition-colors duration-150 ${
                          isSpecial
                            ? 'bg-amber-50/70 hover:bg-amber-100/70 font-semibold'
                            : idx % 2 === 0
                            ? 'bg-[#F9FAF8] hover:bg-emerald-50/40'
                            : 'bg-white hover:bg-[#F9FAF8]'
                        }`}
                      >
                        <td
                          className={`py-3 px-4 font-semibold text-slate-900 border-r border-slate-200 sticky left-0 z-10 ${
                            isSpecial
                              ? 'bg-amber-50 text-[#78350F]'
                              : idx % 2 === 0
                              ? 'bg-[#F9FAF8]'
                              : 'bg-white'
                          }`}
                        >
                          <div className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#163B32]">
                                {row.blockLabel || row.blockNumber} • {row.segment}
                              </span>
                            </div>
                            <span className="text-xs font-medium text-slate-800">{row.region}</span>
                          </div>
                        </td>

                        {TIMEZONES.map((tz) => {
                          const timeVal = row.times[tz.key] || '—';
                          const isHighlightedCol = selectedTz === tz.key;

                          return (
                            <td
                              key={tz.key}
                              className={`py-3 px-3 text-center text-[11px] whitespace-nowrap ${
                                isHighlightedCol
                                  ? 'bg-emerald-100 font-bold text-[#163B32]'
                                  : 'text-slate-700'
                              }`}
                            >
                              {timeVal}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 px-1">
              <span>* Click any timezone column to focus.</span>
              <span className="font-mono text-[#163B32] font-bold">
                Selected: {activeTzObj.label} ({activeTzObj.city})
              </span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
