import Link from "next/link";
import Image from "next/image";
import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
    return (
        <div className="bg-[#8265AB] text-white p-4 py-8 md:p-8 flex flex-col md:flex-row items-start justify-between gap-6" id="contact">
            <div className="flex flex-col gap-3 items-start">
                <b className="font-libre">Copyright © AI+ Compassion Global Forum  • All Rights Reserved</b>
                <b className="font-libre py-3">Have a specific question?</b>
                <p>
                    General inquiries{" "}
                    <Link className="underline" href="mailto:connect@compassionai.io">
                        connect@compassionai.io
                    </Link>
                </p>
                <p>
                    Academic partnerships{" "}
                    <Link className="underline" href="mailto:connect@compassionai.io">
                        connect@compassionai.io
                    </Link>
                </p>
                <p>
                    Sponsorship opportunities{" "}
                    <Link className="underline" href="mailto:jsuto@SCUBEDLLC.com">
                        jsuto@SCUBEDLLC.com
                    </Link>
                </p>
                <p>
                    Media inquiries contact main organizers through{" "}
                    <Link className="underline" href="mailto:connect@compassionai.io">
                        connect@compassionai.io
                    </Link>
                </p>
            </div>

            <div className="flex flex-col items-end gap-6 md:self-stretch md:justify-between">
                <div className="flex items-center gap-6">
                    <a href="https://x.com/ai_compassion"> <FaXTwitter size={42} /></a>
                    <a href="https://discord.com/invite/3hzvqf4qJ"> <FaDiscord size={45} /></a>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <span className="text-sm font-libre opacity-90">Co-organized with:</span>
                    <a href="https://www.goipeace.or.jp/en/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-2 hover:bg-white/20 transition-colors">
                        <Image
                            src="/goi-peace.svg"
                            alt="Goi Peace Foundation"
                            width={42}
                            height={50}
                            className="brightness-0 invert"
                        />
                        <span className="font-libre text-sm font-semibold leading-tight">
                            Goi Peace<br />Foundation
                        </span>
                    </a>
                </div>
            </div>
        </div>
    )
}
