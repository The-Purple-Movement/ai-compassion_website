"use client";

import { useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { faqs } from "./faqData";

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