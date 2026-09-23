import Link from "next/link";

export default function VideoSection() {
  return (
    <section className="px-4 md:px-8 lg:px-16 py-12 flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-5xl flex flex-col items-center gap-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Experience the Vision
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Watch our overview video to see how the Global Forum on AI + Compassion is shaping the future.
          </p>
        </div>

        <div className="w-50px aspect-video rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/8x6DHCnxOvk?rel=0"
            title="Overview Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="flex flex-col items-center gap-4 mt-4">
          <p className="text-gray-600 font-medium">Want to see more moments from our community?</p>
          <Link
            href="/gallery"
            className="w-fit rounded-full bg-purple-100 px-8 py-3 text-sm font-semibold text-purple-700 shadow-sm hover:bg-purple-200 transition-colors duration-200 flex items-center gap-2"
          >
            Explore the Gallery
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
