"use client";

import { useState } from "react";
import { GoChevronDown } from "react-icons/go";

const faqs = [
    {
        question: "What is the AI+Compassion Global Summit?",
		answer: "The AI+Compassion Global Summit is a 24-hour global relay event beginning at the USA Pavilion during Expo 2025 Osaka on October 2, 2025. The summit explores how to integrate compassion, cultural wisdom, and ethical considerations into artificial intelligence development. It combines an intimate 72-person gathering in Osaka with a worldwide online relay connecting six global regions over 24 hours, concluding with a closing ceremony in Kyoto on October 3."
    },
    {
        question: "Who is organizing this event?",
		answer: "The summit is co-organized by the AI+Compassion Alliance and the Goi Peace Foundation, with venue support from the USA Pavilion at Expo 2025 Osaka. Additional collaboration comes from the Global AI Alliance (GAIA) Foundation in Poland."
    },
    {
        question: "What makes this summit unique?",
		answer: "This is the first event to combine an intimate high-level gathering with a continuous 24-hour global relay format. The summit integrates Japanese cultural concepts of wa (harmony) and ma (mindful space) into both the content and structure, creating a living example of how different cultural approaches can inform technology development."
    },
    {
        question: "What are the main objectives?",
		answer: "The summit aims to: (1) Launch the Global AI+Compassion Alliance as a permanent organization, (2) Create actionable frameworks for compassionate AI development, (3) Initiate 3-5 flagship pilot projects demonstrating compassionate AI applications, (4) Build lasting partnerships between technologists, policymakers, academics, and cultural leaders, and (5) Shift the global conversation about AI from pure efficiency metrics to human flourishing outcomes."
    },
    {
					question: "How can I participate?",
					answer: "Regional Online Participation: Active engagement during your region's 3-hour programming block.Global Streaming: Free viewing access to all 24 hours with chat participation"
				},
				{
					question: "What is the cost to attend?",
					answer: "Access to the 24-hour global stream is free with registration."
				},
				{
					question: "How do I register?",
					answer: "Tickets are free. Academic institutions should contact ai@aicompassion.world directly for partnership opportunities. Corporate sponsorship inquiries can be directed to jsuto@SCUBEDLLC.com."
				},
                {
					question: "What is the complete schedule?",
					answer: "October 2, 11:00 AM - 5:00 PM JST: USA Pavilion main event;October 2, 5:00 PM JST - October 3, 11:00 AM JST: 24-hour global relay (South Asia → GCC/Europe → Africa → South America → North America → Oceania);October 3, 12:00 PM - 3:00 PM JST: Kyoto closing ceremony"
				},
				{
					question: "How does the global relay work?",
					answer: "The relay passes focus between six global regions, with each region hosting 3 hours of programming during their optimal time zone. Each regional segment includes presentations, workshops, and networking before passing to the next region. All segments are live-streamed globally with interactive chat and collaboration tools."
				},
				{
					question: "What happens during the USA Pavilion event?",
					answer: "The 6-hour program includes opening ceremonies, keynote dialogues, innovation showcases, the Global AI+Compassion Alliance launch, individual commitment ceremonies, and networking opportunities. The format balances presentations with interactive collaboration and includes built-in reflection periods following the Japanese concept of ma."
				},
				{
					question: "What is the Kyoto closing ceremony?",
					answer: "The closing ceremony provides cultural integration through traditional Japanese experiences including an Ikebana (flower arranging) workshop that embodies the concepts of wa and ma. Participants make final commitments, establish accountability partnerships, and celebrate the completion of the 24-hour global journey."
				},
                {
					question: "What topics will be covered?",
					answer: "Sessions address six thematic pillars: Compassionate Leadership in AI Governance, AI for Human & Planetary Well-being, Cultural Wisdom & Indigenous Perspectives, Regenerative AI Economies, Education & Public Trust, and a sixth pillar currently being defined. Content ranges from technical frameworks to philosophical foundations to practical implementation strategies."
				},
				{
					question: "Will session recordings be available?",
					answer: "Yes, all sessions will be recorded and made available to registered participants through the Alliance platform. Academic partners receive full access to proceedings for research and educational use."
				},
				{
					question: "What languages will be supported?",
					answer: "The USA Pavilion event includes simultaneous Japanese-English translation. Regional programming will primarily be in English with local language support where feasible. Chat platforms support multiple languages with translation capabilities."
				},


];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Split faqs into 3 roughly equal chunks
    const columns = [[], [], []];
    faqs.forEach((faq, i) => {
        columns[i % 3].push(faq);
    });

    return (
        <div id="faq" className="bg-[#FAF7F0] text-[#0A2144] px-6 py-8 md:py-12 md:px-20 m-4 my-6 rounded-4xl md:rounded-[4rem]">
            <h2 className="text-2xl md:text-3xl font-libre font-bold text-center mb-8">
                Frequently Asked Questions
            </h2>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 xl:gap-8 divide-y divide-gray-300 xl:divide-y-0">
                {columns.map((col, colIndex) => (
                    <div key={colIndex} className="max-w-2xl mx-auto flex flex-col divide-y divide-gray-300 w-full">
                        {col.map((faq, index) => {
                            const actualIndex = colIndex * faqs.length + index;
                            return (
                                <div key={index} className="py-4 ">
                                    <button
                                        onClick={() => toggleFAQ(actualIndex)}
                                        className="w-full flex gap-4 items-center justify-between font-sen text-left text-lg focus:outline-none"
                                    >
                                        {faq.question}
                                        <GoChevronDown
                                            className={`transform transition-transform duration-300 ${openIndex === actualIndex ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>
                                    {openIndex === actualIndex && (
                                        <p className="mt-3 text-sm text-gray-700">{faq.answer}</p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}