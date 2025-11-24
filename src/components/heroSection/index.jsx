"use client";
import Image from "next/image";
import plant from '@/../public/road.png';
import pot from '@/../public/paper.png';
import dance from '@/../public/light.png';
import temple from '@/../public/temple.webp';
export default function Hero() {
  return (
    <section className="mt-24 lg:mt-8 p-4 md:px-8 lg:px-16 flex flex-col lg:flex-row items-center justify-center gap-8">
      {/* Left Content */}
      <div className="flex flex-col gap-4 md:gap-6 justify-center h-full w-full lg:w-1/2">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          AI+Compassion <br />
          Global Forum 2025
        </h1>
        <p className="leading-tight font-bold text-black-700 text-2xl md:text-3xl">
          October 2, 2025 | USA Pavilion, Expo 2025 Osaka
        </p>
        <p className="text-base text-gray-600">
          The Global Forum on AI + Compassion unites innovators, policymakers,
          and cultural leaders to explore how artificial intelligence can
          serve humanity and the planet. Together, we’ll launch a global
          alliance, spark a new narrative, and activate projects that place
          compassion at the heart of technology.
        </p>
        <a
          href="https://forms.gle/7FJH6pNbKxgi11wt5"
          className="w-fit rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-purple-700 transition"
        >
          Join Us
        </a>
      </div>

      {/* Right Content - Images Grid */}
      <div className="md:py-4 lg:py-8 grid grid-cols-2 gap-6 w-full lg:w-1/2">
        <div className="overflow-hidden rounded-2xl ">
          <Image
            src={plant}
            alt="Plant in hands"
            width={500}
            height={500}
            className="h-full w-full"
          />
        </div>
        <div className="overflow-hidden rounded-2xl mt-10">
          <Image
            src={pot}
            alt="Clay pots"
            width={500}
            height={500}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="overflow-hidden">
          <Image
            src={temple}
            alt="Temple"
            width={500}
            height={500}
            className="h-full w-full object-fit"
          />
        </div>
        <div className="overflow-hidden rounded-2xlx mt-10">
          <Image
            src={dance}
            alt="Traditional dancer"
            width={500}
            height={500}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}