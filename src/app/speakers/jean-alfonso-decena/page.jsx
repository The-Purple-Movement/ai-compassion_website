import Image from "next/image";
import dafa from "@/../public/jean.png";

export default function GaryABolles() {
  return (
    <div className="p-8 max-w-3xl mx-auto text-center mt-20">
      <Image
        src={dafa}
        alt="Hiroshi Ishiguro"
        width={300}
        height={300}
        className="mx-auto rounded-2xl shadow-md"
      />
      <h1 className="text-3xl font-bold mt-6">Jean Alfonso-Decena 
</h1>
      <p className="mt-4 text-lg text-gray-700">
        Jean Alfonso-Decena is founder of In Silence AI, an ecosystem bringing together mentors, learners, and AI technology to re-skill humans for a hybrid world co-existing with machines. A pioneering leader at the convergence of spirituality, technology, and science, she serves as AI Advisor at Singularity Earth, Ambassador for the 2025 Artificial Life Conference, and Executive Assistant to Dr. Olaf Witkowski at Cross Labs. She consults with universities globally, integrating consciousness science with artificial intelligence.
      </p>
    </div>
  );
}