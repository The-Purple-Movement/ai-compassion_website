import Image from "next/image";
import dafa from "@/../public/gali.png";

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
      <h1 className="text-3xl font-bold mt-6">Dr. Gali Einav
</h1>
      <p className="mt-4 text-lg text-gray-700">
        Dr. Gali Einav is an educator, researcher, and global connector in entrepreneurship and digital platforms. She directs Alpha-Bet, an entrepreneurship program for combat veterans, and previously led the International Entrepreneurship Degree at Reichman University. A Columbia Ph.D., her work explores digital transformation, media innovation, and entrepreneurial education. She has served on the boards of Nielsen Innovate and Yeshiva University's Innovation Lab, led digital research at NBC Universal, and co-authored four books on innovation and transformation.
      </p>
    </div>
  );
}