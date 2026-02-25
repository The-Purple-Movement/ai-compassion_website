import React from "react";

// Example team data (replace img with actual URLs or imports)
const team = [
  { name: "Jun Suto", role: "", img: "/jun.png" },
  { name: "Chris Ewald", role: "", img: "/chris.png" },
  { name: "Anuka Roinishvili", role: "", img: "/anuka.png" },
  { name: "Naomi Yamazaki", role: "", img: "/naomi.png" },
  { name: "Maki Kawamura", role: "", img: "/maki.jpg" },
  { name: "Deepu Nath", role: "", img: "/deepu.png" },
  // { name: "Akshaya Sita Rajesh", role: "", img: "/akshaya.png" },
  { name: "Akshaya Sita Rajesh", role: "", img: "/akshaya-rajesh.png" },
  { name: "Rasha Hasoon", role: "", img: "/rasha.png" },
  { name: "Nash", role: "", img: "/nash.png" },
  { name: "Dany Koshy", role: "", img: "/dany.png" },
  { name: "Akshat Pradeep", role: "", img: "/akshat.png" },
  { name: "Jibu Mathew", role: "", img: "/jibu.png" },
];

export default function MeetMyTeam() {
  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-[#0A2144BF]">Meet The Team</h2>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
        {team.map((member, idx) => {
          const lowerImg =
            ["Jun Suto", "Anuka Roinishvili", "Deepu Nath", "Akshaya Sita Rajesh"].includes(member.name);
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
