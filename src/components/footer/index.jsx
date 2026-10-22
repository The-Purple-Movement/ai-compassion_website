'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Check, Copy, ArrowUpRight } from 'lucide-react';
import { FaDiscord, FaLinkedinIn, FaInstagram, FaYoutube, FaFacebookF } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const email = 'connect@compassionai.io';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/ai-plus-compassion/posts/?feedView=all',
      icon: FaLinkedinIn,
      label: 'Visit AI + Compassion on LinkedIn',
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/aicompassion?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==',
      icon: FaInstagram,
      label: 'Follow AI + Compassion on Instagram',
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@AICompassionGlobalForum',
      icon: FaYoutube,
      label: 'Subscribe to AI + Compassion on YouTube',
    },
    {
      name: 'X',
      href: 'https://x.com/ai_compassion?s=20',
      icon: FaXTwitter,
      label: 'Follow AI + Compassion on X',
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/profile.php?id=61581155761799',
      icon: FaFacebookF,
      label: 'Connect with AI + Compassion on Facebook',
    },
    {
      name: 'Discord',
      href: 'https://discord.gg/qBbCNtca8N',
      icon: FaDiscord,
      label: 'Join AI + Compassion Discord Community',
    },
  ];

  return (
    <footer
      id="contact"
      className="relative z-20 w-full bg-[#FFFFFF] text-[#171918] border-t border-[#EAECE8] py-10 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8">
        
        {/* Compact Contact Layout */}
        <div className="flex flex-col items-center gap-4 max-w-xl">
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#172554]">
            Join the Global Dialogue
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md">
            For all inquiries, partnerships, and collaborations regarding the AI+Compassion Global Forum 2026:
          </p>

          {/* Clean Compact Email Pill with Direct Mailto & Copy Button */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 p-1.5 pl-4 bg-slate-50 border border-slate-200/80 rounded-xl shadow-2xs hover:border-[#163B32]/40 transition-all duration-300">
            <a
              href={`mailto:${email}`}
              className="text-sm sm:text-base font-semibold text-[#163B32] hover:text-[#C96F4A] transition-colors tracking-tight underline decoration-slate-300 hover:decoration-[#C96F4A] underline-offset-4"
            >
              {email}
            </a>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-[11px] font-semibold text-slate-700 hover:bg-[#163B32] hover:text-white hover:border-[#163B32] shadow-2xs transition-all duration-200 cursor-pointer active:scale-95"
              aria-label="Copy email address"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-500" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* All Social Channels */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-[#163B32] hover:text-white hover:border-[#163B32] shadow-2xs hover:shadow-sm transition-all duration-300 transform hover:scale-110 cursor-pointer"
                  aria-label={social.label}
                  title={social.name}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Archive & Powered By Row */}
        <div className="w-full pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] sm:text-xs text-slate-500 font-medium">
          <p>© 2026 AI+ Compassion Global Forum • All Rights Reserved</p>

          <div className="flex items-center gap-4">
            <a
              href="https://2025.compassionai.io"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 transition-colors flex items-center gap-1 font-semibold text-[#163B32]"
            >
              <span>2025 Edition Archive</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          {/* Interactive 'Powered by The Purple Movement' Badge */}
          <a
            href="https://purple-movement.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="Visit The Purple Movement"
            className="group relative flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white border border-purple-200/90 shadow-xs hover:shadow-md hover:border-purple-400 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer no-underline"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-purple-700 font-bold leading-none">
              Powered by
            </span>
            <div className="relative h-6 w-28 shrink-0 flex items-center justify-center">
              <Image
                src="/purple-logo-darktext.webp"
                alt="The Purple Movement"
                fill
                className="object-contain"
                sizes="112px"
              />
            </div>
          </a>
        </div>

      </div>
    </footer>
  );
}
