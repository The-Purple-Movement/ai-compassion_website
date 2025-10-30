import Image from "next/image";
import dafa from "@/../public/patrick.png";

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
      <h1 className="text-3xl font-bold mt-6"> Patrick McCullough
</h1>
      <p className="mt-4 text-lg text-gray-700">
        Patrick McCullough is an Exponential Tech Pitch Coach and Presentation Strategist, helping startups raise funding globally. As Founding Producer of Seán Óg Productions for 24+ years, he produced four award-winning indie films and served as actor coach on "Atomic Blonde" and "Houdini." An angel investor, startup mentor at Founder Institute, and founding advisor to GENIA Latinoamérica, McCullough specializes in pitch strategy, messaging, and sprint facilitation for entrepreneurs addressing global challenges, helping exponential entrepreneurs define their strategic trajectory globally.
      </p>
    </div>
  );
}