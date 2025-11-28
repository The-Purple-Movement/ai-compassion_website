import Image from "next/image";
import edi from "@/../public/edith.png";

export default function GaryABolles() {
  return (
    <div className="p-8 max-w-3xl mx-auto text-center mt-20">
      <Image
        src={edi}
        alt="Hiroshi Ishiguro"
        width={300}
        height={300}
        className="mx-auto rounded-2xl shadow-md"
      />
      <h1 className="text-3xl font-bold mt-6">Edith Öller </h1>
      <p className="mt-4 text-lg text-gray-700">
        Edith Öller is an innovation expert, strategy consultant, and founder of IDEAZ Business Innovation. Since 2020, she has supported organizations in developing future-ready business models focused on purpose, creativity, and sustainability. With an interdisciplinary background in International Business and Arts, she applies Design Thinking, Systems Thinking, and agile methods to empower companies navigating AI, neo-ecology, and transformation. She is deeply engaged in community building as a TEDx organizer and mentor for social innovation initiatives.
      </p>
    </div>
  );
}
