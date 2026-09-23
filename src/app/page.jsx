import Herosection from "@/components/heroSection";
import VideoSection from "@/components/videoSection";
import Joinsection from "@/components/joinSection";
import SponsorSection from "@/components/sponsorSection";
import FaqSection from "@/components/faqSection";
import TimelineSection from "@/components/timelineSection";
import AboutSection from "@/components/aboutSection";
import SpeakerSection from "@/components/speakerSection";
import { PartnerSection } from "@/components/partnersection";
import MeetMyTeam from "@/components/meetmyteam";
import ProducersPage from "@/components/producers"

export default function Home() {
  return (
    <>
      <Herosection />
      <VideoSection />
      <AboutSection />
      <ProducersPage />
      {/* <SpeakerSection /> */}
      {/* <TimelineSection /> */}
      <SponsorSection />
      <PartnerSection />
      {/* <MeetMyTeam /> */}
      <FaqSection />
      <Joinsection />
    </>
  );
}