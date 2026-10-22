'use client';

import Image from 'next/image';

export default function SpeakerAvatar({
  src,
  name = 'Speaker',
  imgPosition = 'center 20%',
  sizes = '(max-width: 640px) 112px, 144px',
  priority = false,
  className = '',
}) {
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .filter((_, i, a) => i === 0 || i === a.length - 1)
        .join('')
        .toUpperCase()
    : 'AI';

  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        fill
        priority={priority}
        className={`object-cover ${className}`}
        style={{ objectPosition: imgPosition || 'center 20%' }}
        sizes={sizes}
      />
    );
  }

  // Template Portrait Placeholder for speakers who have bio but no headshot yet
  return (
    <div className={`w-full h-full relative overflow-hidden bg-gradient-to-br from-[#163B32] via-[#1E4B40] to-[#0E2822] flex flex-col items-center justify-between p-2 select-none ${className}`}>
      {/* Decorative background geometry */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[120%] h-[120%] border border-dashed border-[#C9A96A] rounded-full" />
        <div className="absolute w-[80%] h-[80%] border border-[#EAECE8]/40 rounded-full" />
        <div className="absolute w-[50%] h-[50%] border border-[#C9A96A]/60 rounded-full" />
      </div>

      {/* Top micro badge */}
      <div className="relative z-10 pt-1">
        <span className="text-[7.5px] sm:text-[8.5px] font-mono font-bold tracking-[0.15em] uppercase text-[#C9A96A] bg-black/30 px-2 py-0.5 rounded-full border border-[#C9A96A]/30">
          AI + C
        </span>
      </div>

      {/* Center Initials & Subtle Silhouette Ring */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center shadow-inner">
          <span className="font-editorial text-base sm:text-xl md:text-2xl font-bold tracking-wider text-white">
            {initials}
          </span>
        </div>
      </div>


    </div>
  );
}
