'use client';

import dynamic from "next/dynamic";
import HeroSection from "@/components/heroSection";
import ContinuousMarquee from "@/components/continuousMarquee";
import AboutSection from "@/components/aboutSection";
import PillarsSection from "@/components/pillarsSection";
import ProducersSection from "@/components/producers";
import SpeakerSection from "@/components/speakerSection";
import MeetTheTeamCTA from "@/components/meetTheTeamCTA";
import JourneyIndicator from "@/components/journeyIndicator";

const GlobalRelayGlobeSection = dynamic(() => import("@/components/globalRelayGlobe"), {
  ssr: false,
});
const ScheduleSection = dynamic(() => import("@/components/scheduleSection"), {
  ssr: false,
});
const MediaSection = dynamic(() => import("@/components/mediaSection"), {
  ssr: false,
});
const PartnersAndSponsors = dynamic(() => import("@/components/partnersAndSponsors"), {
  ssr: false,
});
const FaqSection = dynamic(() => import("@/components/faqSection"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <JourneyIndicator />
      <HeroSection />
      {/* Moving Bar 1: After Hero */}
      <ContinuousMarquee variant="dark" />
      <AboutSection />
      <PillarsSection />
      {/* Moving Bar 2: Between Pillars & Global Relay */}
      <ContinuousMarquee reverse={true} variant="dark" />
      <GlobalRelayGlobeSection />
      <ProducersSection />
      <SpeakerSection />
      {/* Meet The Team: Prominent CTA after Speakers Session */}
      <MeetTheTeamCTA />
      <ScheduleSection />
      <MediaSection />
      <PartnersAndSponsors />
      <FaqSection />
    </>
  );
}