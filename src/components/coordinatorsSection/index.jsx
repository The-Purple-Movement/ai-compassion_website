'use client';

import Image from 'next/image';
import Link from 'next/link';
import { 
  Globe, 
  Users, 
  Briefcase, 
  Video, 
  Palette, 
  PenTool, 
  Cpu, 
  Share2, 
  Sparkles
} from 'lucide-react';
import { TEAM_GROUPS } from '@/data/teamData';

const TEAM_ICONS = {
  'regional-coordinators': Globe,
  'project-management': Briefcase,
  'video-editors': Video,
  'design-team': Palette,
  'content-team': PenTool,
  'tech-operations': Cpu,
  'social-media': Share2,
};

function MemberAvatar({ img, name, imgPosition }) {
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .filter((_, i, a) => i === 0 || i === a.length - 1)
        .join('')
        .toUpperCase()
    : 'AI';

  if (img) {
    return (
      <div className="relative w-full aspect-square max-w-[140px] sm:max-w-[150px] mx-auto rounded-2xl overflow-hidden bg-slate-100 shadow-xs border border-emerald-100 group-hover:scale-105 transition-transform duration-300">
        <Image
          src={img}
          alt={name}
          fill
          className="object-cover"
          style={{ objectPosition: imgPosition || 'center 20%' }}
          sizes="(max-width: 640px) 140px, 150px"
        />
      </div>
    );
  }

  // Stylish Placeholder Avatar for team members
  return (
    <div className="relative w-full aspect-square max-w-[140px] sm:max-w-[150px] mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-[#163B32] via-[#1F4D42] to-[#0E2822] shadow-xs border border-emerald-200/40 group-hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center p-3 select-none">
      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center shadow-inner">
        <span className="font-editorial text-lg sm:text-xl font-bold tracking-wider text-white">
          {initials}
        </span>
      </div>
    </div>
  );
}

export default function CoordinatorsSection() {
  return (
    <section
      id="coordinators"
      className="relative z-10 w-full bg-[#FFFFFF] py-12 lg:py-20 px-4 sm:px-6 lg:px-12 border-t border-[#EAECE8] overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-10 sm:gap-14">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3.5 max-w-3xl mx-auto scroll-fade-down">
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#163B32] leading-tight">
            Meet The Team
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed max-w-2xl">
            Meet the operational leads, coordinators, creative architects, and technical directors driving the unbroken 24-hour planetary relay for the AI + Compassion Global Forum 2026.
          </p>
        </div>

        {/* Team Groups Stack */}
        <div className="w-full flex flex-col gap-12 sm:gap-16">
          {TEAM_GROUPS.map((group) => {
            const Icon = TEAM_ICONS[group.id] || Users;

            return (
              <div
                key={group.id}
                id={group.id}
                className="w-full flex flex-col gap-6 p-6 sm:p-8 rounded-3xl bg-[#FAFCFA] border border-emerald-100/90 shadow-2xs scroll-fade-up"
              >
                {/* Team Group Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-emerald-100/80">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-100/80 border border-emerald-200 flex items-center justify-center text-[#163B32] shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex flex-col">
                      <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#163B32]">
                        {group.title}
                      </h3>
                      <p className="text-xs text-slate-600 font-normal leading-relaxed mt-0.5">
                        {group.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Team Members Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 w-full scroll-fade-up scroll-stagger">
                  {group.members.map((member, idx) => {
                    const isLinkable = Boolean(member.img && group.id === 'regional-coordinators');

                    const CardContent = (
                      <div className="w-full bg-white hover:bg-[#F4F8F5] rounded-2xl sm:rounded-3xl border border-emerald-100 hover:border-[#163B32]/40 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col items-center justify-center gap-4 group text-center relative overflow-hidden h-full scroll-card">
                        {/* Member Avatar / Photo */}
                        <MemberAvatar img={member.img} name={member.name} imgPosition={member.imgPosition} />

                        {/* Name */}
                        <div className="flex flex-col items-center text-center">
                          <h4 className="font-editorial text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#163B32] transition-colors leading-snug">
                            {member.name}
                          </h4>
                        </div>
                      </div>
                    );

                    return isLinkable ? (
                      <Link key={member.slug || idx} href={`/${member.slug}`} className="block h-full cursor-pointer">
                        {CardContent}
                      </Link>
                    ) : (
                      <div key={member.slug || idx} className="block h-full">
                        {CardContent}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
