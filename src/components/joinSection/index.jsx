import Link from "next/link";

export default function Joinsection() {
    return (
        <div className='font-plus-jakarta-sans text-center flex flex-col items-center justify-center gap-6 px-4 py-8 md:p-8 lg:p-16'>
            <h1 className="text-2xl md:text-3xl font-semibold text-[#0A2144]">Why Join Us</h1>
            <p className="w-full lg:w-[60%] text-sm md:text-base text-[#0A2144BF]">
                On October 2, 2025, our journey will begin in Osaka, circle the globe, and conclude in ancient Kyoto—symbolizing the harmonious integration of past wisdom and future innovation.
            </p>
            <p className="w-full lg:w-[60%] text-sm md:text-base text-[#0A2144BF]">
                Together, we will create a world where nature,<b> humanity, and technology flourish as one</b>—not in competition, but in compassionate partnership.
            </p>
            <p className="w-full lg:w-[60%] md:text-base text-[#0A2144BF]">
                “The true measure of AI’s success will not be its power, but its wisdom, not its efficiency, but its compassion.”
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full">
                <Link className="w-full md:w-fit px-10 py-3 bg-[#89478D] text-white rounded-full font-semibold" href="https://forms.gle/7FJH6pNbKxgi11wt5" aria-label="Join Us">Join Us</Link>
                <Link className="w-full md:w-fit px-10 py-3 border rounded-full font-semibold" href="mailto:connect@compassionai.io " aria-label="Ask a question">Ask a question</Link>
            </div>
        </div>
    )
}