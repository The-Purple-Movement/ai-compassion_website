import React from "react";

// Example team data (replace img with actual URLs or imports)
const team = [
  { name: "Jun Sato", role: "", img: "/jun.webp" },
  { name: "Chris Ewald", role: "", img: "/chris.webp" },
  { name: "Anuka Roinishvili", role: "", img: "/anuka.webp" },
  { name: "Naomi Yamazaki", role: "", img: "/naomi.webp" },
  { name: "Deepu Nath", role: "", img: "/deepu.webp" },
  // { name: "Akshaya Sita Rajesh", role: "", img: "/akshaya.webp" },
  { name: "Akshaya Sita Rajesh", role: "", img: "/akshaya-rajesh.webp" },
  { name: "Rasha Hasoon", role: "", img: "/rasha.webp" },
  { name: "Nash", role: "", img: "/nash.webp" },
  { name: "Dany Koshy", role: "", img: "/dany.webp" },
  { name: "Akshat Pradeep", role: "Project Manager", img: "/akshat.webp" },
  { name: "Jibu Mathew", role: "", img: "/jibu.webp" },
];

export default function MeetMyTeam() {
  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-[#0A2144BF]">Meet The Team</h2>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
        {team.map((member, idx) => {
          const lowerImg =
            ["Jun Sato", "Anuka Roinishvili", "Deepu Nath", "Akshaya Sita Rajesh"].includes(member.name);
          return (
            <div key={idx} className="bg-white rounded shadow p-4 flex flex-col items-center">
              <div className="w-24 h-24 rounded bg-gray-200 mb-3 flex items-center justify-center overflow-hidden relative">
                {member.img && (
                  <img
                    src={member.img}
                    alt={member.name}
                    className={`object-cover w-full h-full ${lowerImg ? "mt-0" : ""}`}
                    style={lowerImg ? { objectPosition: "center 50%" } : {}}
                  />
                )}
              </div>
              <div className="font-semibold text-center w-full">{member.name}</div>
              <div className="text-sm text-gray-500 text-center w-full">{member.role}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
