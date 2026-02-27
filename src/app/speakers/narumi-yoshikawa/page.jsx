import Image from "next/image";
import narumi from "@/../public/narumi2.webp";

export default function GaryABolles() {
  return (
    <div className="p-8 max-w-3xl mx-auto text-center mt-20">
      <Image
        src={narumi}
        alt="Hiroshi Ishiguro"
        width={300}
        height={300}
        className="mx-auto rounded-2xl shadow-md"
      />
      <h1 className="text-3xl font-bold mt-6">Dr. Narumi Yoshikawa
</h1>
      <p className="mt-4 text-lg text-gray-700">
        Dr. Narumi Yoshikawa holds a Ph.D. in agricultural economics specializing in agri-anthropology. She heads the Uehiro Research Center for Japan Environment Studies and serves as a specially appointed professor at RIHN, Professor at Prefectural University of Hiroshima, and Visiting Professor at Waseda University. Her research focuses on environmental studies from a cultural perspective, emphasizing social implementation through Community Supported Agriculture projects that became the foundation of Japan's organic farming movement. She designed environmental education programs connecting universities across 10 Asian countries.
      </p>
    </div>
  );
}
