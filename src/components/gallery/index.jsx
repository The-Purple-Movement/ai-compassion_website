'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { galleryVideos, galleryCategories, regionColors } from '@/data/galleryData';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [filteredVideos, setFilteredVideos] = useState(galleryVideos);

  const heroVideo = galleryVideos.find(v => v.id === 1);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredVideos(galleryVideos);
    } else {
      setFilteredVideos(galleryVideos.filter(v => v.segment === selectedCategory));
    }
  }, [selectedCategory]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') setSelectedVideo(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);


  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 px-4 max-w-6xl mx-auto">
        <div className="relative aspect-video w-full rounded-[16px] overflow-hidden shadow-xl border-b-4 border-gold-custom">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${heroVideo.youtubeId}`}
            title={heroVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="mt-6 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-[#0A2144]">
            {heroVideo.title}
          </h1>
          <p className="mt-2 text-lg italic text-[#0A2144BF]">
            Relay Overview with Goi Peace Foundation
          </p>
        </div>
      </section>

      {/* Section Header */}
      <section className="mt-16 text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0A2144] font-libre">
          Highlights from the Global Relay
        </h2>
        <p className="mt-2 text-[#0A2144BF] max-w-2xl mx-auto">
          Explore speaker clips and session reels from every region.
        </p>
      </section>

      {/* Filter Tabs - Sticky */}
      <div className="sticky top-[4.5rem] z-30 bg-white/80 backdrop-blur-md py-4 mt-8 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-3 no-scrollbar pb-2">
            {galleryCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex-shrink-0 px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                  selectedCategory === category
                    ? 'bg-[#7C3AED] text-white border-[#7C3AED]'
                    : 'bg-white text-[#7C3AED] border-[#7C3AED] hover:bg-[#7C3AED10]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <section className="mt-12 max-w-6xl mx-auto px-4">
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="group cursor-pointer bg-white rounded-[16px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform duration-300">
                      <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                    </div>
                  </div>
                  {/* Region Tag */}
                  <div 
                    className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider"
                    style={{ backgroundColor: regionColors[video.segment] || '#6B7280' }}
                  >
                    {video.segment}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-[#0A2144] line-clamp-1 group-hover:text-[#7C3AED] transition-colors duration-300">
                    {video.title}
                  </h3>
                  <p className="text-sm text-[#0A2144BF] mt-1">
                    {video.speaker}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">🎬</div>
            <h3 className="text-xl font-bold text-[#0A2144]">No videos found</h3>
            <p className="text-[#0A2144BF]">Try selecting a different category.</p>
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 text-[#0A2144] transition-colors duration-200"
            >
              <span className="text-2xl">✕</span>
            </button>

            {/* Video Player */}
            <div className="relative aspect-video w-full">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Modal Info */}
            <div className="p-6">
              <h2 className="text-xl md:text-2xl font-bold text-[#0A2144]">
                {selectedVideo.title}
              </h2>
              <p className="text-[#0A2144BF] mt-1">
                {selectedVideo.speaker} • {selectedVideo.segment}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Global styles for hidden scrollbar */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .border-gold-custom {
          border-image: linear-gradient(to right, #F59E0B, #7C3AED) 1;
        }
      `}</style>
    </div>
  );
}
