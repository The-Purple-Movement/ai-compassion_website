import Link from "next/link"; 
import Image from "next/image";
import { FaDiscord, FaEnvelope, FaGraduationCap, FaHandshake, FaBullhorn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-[#8265AB] via-[#6B4E94] to-[#5A3D7C] text-white overflow-hidden relative rounded-t-[2.5rem] md:rounded-t-[5rem]" id="contact">
            {/* Background pattern decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48 -mt-48 transition-transform duration-1000"></div>
            
            <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10">
                <div className="flex flex-col md:flex-row justify-between gap-12">
                    {/* Left Column: Contact & Info */}
                    <div className="flex flex-col gap-8 max-w-xl">
                        <div className="space-y-4">
                            <h3 className="font-libre text-2xl md:text-3xl font-bold tracking-tight">
                                Have a specific question?
                            </h3>
                            <p className="text-white/80 max-w-md">
                                We're here to help. Reach out to the appropriate department for any inquiries about the AI+ Compassion Global Forum.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                            {[
                                { label: "General inquiries", email: "connect@compassionai.io", icon: <FaEnvelope className="text-purple-200" /> },
                                { label: "Academic partnerships", email: "connect@compassionai.io", icon: <FaGraduationCap className="text-purple-200" /> },
                                { label: "Sponsorship opportunities", email: "jsuto@SCUBEDLLC.com", icon: <FaHandshake className="text-purple-200" /> },
                                { label: "Media inquiries", email: "connect@compassionai.io", icon: <FaBullhorn className="text-purple-200" /> }
                            ].map((item, idx) => (
                                <div key={idx} className="group transition-all duration-300">
                                    <span className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1 group-hover:text-white transition-colors">
                                        {item.label}
                                    </span>
                                    <Link 
                                        href={`mailto:${item.email}`}
                                        className="flex items-center gap-2 text-sm font-medium hover:text-purple-200 transition-colors break-all"
                                    >
                                        <span className="shrink-0">{item.icon}</span>
                                        <span className="underline underline-offset-4 decoration-white/30 group-hover:decoration-purple-200">
                                            {item.email}
                                        </span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Socials & Branding */}
                    <div className="flex flex-col items-start md:items-end gap-10">
                        {/* Social Links */}
                        <div className="flex flex-col items-start md:items-end gap-4">
                            <span className="text-xs font-semibold uppercase tracking-wider text-white/60">Connect With Us</span>
                            <div className="flex items-center gap-5">
                                <a 
                                    href="https://x.com/ai_compassion" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 active:scale-95 border border-white/10"
                                    aria-label="X (Twitter)"
                                >
                                    <FaXTwitter size={24} />
                                </a>
                                <a 
                                    href="https://discord.com/invite/3hzvqf4qJ" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 active:scale-95 border border-white/10"
                                    aria-label="Discord"
                                >
                                    <FaDiscord size={24} />
                                </a>
                            </div>
                        </div>

                        {/* Co-organized branding with Glassmorphism */}
                        <div className="flex flex-col items-start md:items-end gap-4">
                            <span className="text-xs font-semibold uppercase tracking-wider text-white/60">Partnered Foundation</span>
                            <div className="flex flex-col items-center gap-3">
                                <span className="text-xs font-libre italic text-white/70">Co-organized with:</span>
                                <a 
                                    href="https://www.goipeace.or.jp/en/" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-5 py-4 hover:bg-white/15 transition-all duration-500 group overflow-hidden relative shadow-xl"
                                >
                                    {/* Shimmer effect */}
                                    <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                                    
                                    <Image
                                        src="/goi-peace.svg"
                                        alt="Goi Peace Foundation"
                                        width={48}
                                        height={56}
                                        className="brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
                                    />
                                    <div className="flex flex-col">
                                        <span className="font-libre text-[15px] font-bold leading-tight tracking-wide">
                                            Goi Peace<br />Foundation
                                        </span>
                                        <span className="text-[10px] uppercase tracking-widest text-white/50 group-hover:text-white/70 transition-colors">
                                            Official Partner
                                        </span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-white/40 tracking-wider uppercase">
                    <p className="font-libre">
                        © {new Date().getFullYear()} AI+ Compassion Global Forum • All Rights Reserved
                    </p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Use</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
