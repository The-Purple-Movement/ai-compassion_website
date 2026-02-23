'use client'
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { speakers } from "./speakerData";

export default function SpeakerSection() {
  return (
    <div id="speakers" className="py-12 text-center">
      <h1 className="text-3xl md:text-4xl font-libre font-semibold text-[#0A2144]">
        Speakers
      </h1>
      <p className="px-4 md:px-8 w-full lg:w-1/2 mx-auto font-libre my-6 text-sm md:text-lg text-[#0A2144BF]">
        Our speakers are global voices at the intersection of technology,
        culture, policy, and the environment.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4 md:px-8 max-w-6xl mx-auto">
        {speakers.map((speaker, index) => (
  <Link key={index} href={`/speakers/${speaker.slug}`}>
    <div
      className="relative w-full aspect-[3/4] group"
      style={{
        perspective: "1200px",
        minWidth: "160px",
        maxWidth: "240px",
        margin: "0 auto",
      }}
    >
      <div
        className="w-full h-full rounded-2xl overflow-hidden shadow-md 
                   transition duration-300 transform 
                   group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-[#0A214455]"
      >
        <Image
          src={speaker.img}
          alt={speaker.name}
          fill
          className="object-cover rounded-2xl"
        />
      </div>
    </div>
  </Link>
))}

      </div>
      <div className="mt-8">
        <a
          href="/producers"
          className="inline-block px-6 py-3 bg-[#89478D] text-white font-semibold rounded-lg shadow hover:bg-[#6d346e] transition"
        >
          Click to View Producers
        </a>
      </div>
    </div>
  );
}