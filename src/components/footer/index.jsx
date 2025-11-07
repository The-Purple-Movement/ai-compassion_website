import Link from "next/link";
import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
    return (
        <div className="bg-[#8265AB] text-white p-4 py-8 md:p-8 flex flex-col md:flex-row items-start justify-between gap-6" id="contact">
            <div className="flex flex-col gap-3 items-start">
                <b className="font-libre">Copyright © AI+ Compassion  • All Rights Reserved</b>
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
                    <Link className="underline" href="mailto:contact@compassionai.io">
                        contact@compassionai.io
                    </Link>
                </p>
            </div>

            <div className="flex items-center gap-6">
              <a href="https://x.com/ai_compassion"> <FaXTwitter size={42} /></a>
               <a href="https://discord.gg/QmWJ28fNk"> <FaDiscord size={45} /></a>
            </div>
        </div>
    )
}
