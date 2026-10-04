import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import CoordinatorsSection from '@/components/coordinatorsSection';

export const metadata = {
  title: 'Meet The Team & Regional Coordinators | AI + Compassion Global Forum 2026',
  description: 'Verified roster of regional coordinators and global operations team for the AI + Compassion Global Forum 2026 24-hour relay.',
};

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-[#F8F6F0] pt-28 pb-20 px-4 sm:px-6 lg:px-12 text-[#171918]">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* Top Navigation Bar with Back Arrow */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#D9DDD6] text-[#163B32] hover:bg-[#163B32] hover:text-white transition-all shadow-xs group font-mono text-xs font-bold uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>

          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest hidden sm:inline">
            Official Team Roster
          </span>
        </div>

        <CoordinatorsSection />
      </div>
    </main>
  );
}
