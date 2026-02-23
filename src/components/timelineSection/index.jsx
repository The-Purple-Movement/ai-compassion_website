"use client";
import React, { useState } from "react";

/* ------------------ DATA ------------------ */
const scheduleLeft = [
  { time: "", title: "", subtitle: "", items: ["Jean Alfonso-Decena (Moderator)"] },
  { time: "", title: "", subtitle: "", items: ["Tamami Tono"] },
  { time: "", title: "", subtitle: "", items: ["Sister Jenna"] },
  { time: "", title: "", subtitle: "", items: ["Hiroshi Ishiguro & Edi Pyrek"] },
  { time: "", title: "", subtitle: "", items: ["Yoichi Ochiai"] },
  { time: "", title: "", subtitle: "", items: ["Hiroo Saionji"] },
  { time: "", title: "", subtitle: "", items: ["Kunal Sood"] },
  
];

const scheduleRight = [
  { time: "", title: "", subtitle: "", items: ["Taikyo Murakami / Narumi Yoshikawa"] },
  { time: "", title: "", subtitle: "", items: ["Dr. Olaf Witkowski"] },
  { time: "", title: "", subtitle: "", items: ["Toshie Takahashi"] },
  { time: "", title: "", subtitle: "", items: ["Alex Cahana"] },
  { time: "", title: "", subtitle: "", items: ["Ben Weber"] },
  { time: "", title: "", subtitle: "", items: ["Ahmer Inam"] },
];

const global = [
  { subtitle: "", title: "South Asia", time: "11:00-14:00 UTC", items: ["Avkash Chauhan ( Moderator)","Sadhvi Bhagawati Saraswati","Prof. Prakash Singh Bisen","Anupam Trivedi","Devendra Kumar Jain","Saurabh Bhatt"]},
  { subtitle: "", title: "GCC/Europe", time: "14:00-17:00 UTC", items: ["Walied Albasheer (Moderator)","Ahmed Khbeer","Anas Almarie","Waleed Akaeha","Mohamed Elyas","Manel Chada El Islam Benmahcene","Sara Hegazy","Aliaa Mohamed","Haytham El-Azaizy","Mohamed Osman","Raed Habbis","Dr. Anour F A DAFA-ALLA","Krishna Raj","Dr. Fady Ismaeel","Manal Rifki"] },
  { subtitle: "", title: "Africa", time: "17:00-20:00 UTC", items: ["Dr. Lee Kironget (Moderator)", "Patrick McCullough (Moderator)", "Nell Watson", "Gary Bolles", "Alexis Stokes", "Sofia Couto da Rocha"] },
  { subtitle: "", title: "Latin America", time: "20:00-23:00 UTC", items: ["Marques Anderson (Moderator)","Valeria Soler","WarīNkwī Flores","Pico Velásquez","Justin Breen"] },
  { subtitle: "", title: "North America", time: "23:00-02:00 UTC", items: ["Ani Chahal Honan (Moderator)","Stephen Ibaraki", "Matthew Manos", "Douglas Thomas", "Jennifer Aaker","Stephen Butler","Nichol Bradford","DE KAI",] },
  { subtitle: "", title: "Oceania", time: "02:00-05:00 UTC", items: ["Tim Moriarity","Olivera Tomic", "Ian Haycroft"] },
  { subtitle: "", time: "14:00 - 15:00", title: "1 hour Ma Reflection", items: ["Jun Suto (Moderator)","Regional Producers"] },
];

const kyoto = [
  {
    subtitle: "",
    title: "Kyoto",
    time: "15:00-17:00 UTC",
    items: [
      "Jun Suto (Moderator)",
      "Shoukei Matsumoto"],
  },
];


const preEvent = [
  { title: "Lab A", items: ["Los Angeles (PDT): Sept 29, 8:00–9:00 PM", "Vienna (CEST): Sept 30, 5:00–6:00 AM", "Tokyo (JST): Sept 30, 12:00–1:00 PM"] },
  { title: "Lab B", items: ["Los Angeles (PDT): Sept 29, 12:00–1:00 AM", "Vienna (CEST): Sept 30, 9:00–10:00 AM", "Tokyo (JST): Sept 30, 4:00–5:00 PM"] },
];

const locations = [
  { label: "UTC", key: "UTC", offset: 0 },
  { label: "San Francisco (PDT)", key: "PDT", offset: -7 },
  { label: "Osaka (JST)", key: "JST", offset: 9 },
  { label: "Mumbai (IST)", key: "IST", offset: 5.5 },
  { label: "Abu Dhabi (GST)", key: "GST", offset: 4 },
  { label: "London (BST)", key: "BST", offset: 1 },
  { label: "New York (EDT)", key: "EDT", offset: -4 },
  { label: "Lagos (WAT)", key: "WAT", offset: 1 },
  { label: "Rio de Janeiro (BRT)", key: "BRT", offset: -3 },
  { label: "Sydney (AEST)", key: "AEST", offset: 10 },
];

/* ------------------ TIME HELPERS ------------------ */

function pad(n) { return n.toString().padStart(2, "0"); }

function formatTimeFromMins(mins) {
  mins = Math.round((mins + 24 * 60) % (24 * 60));
  let h = Math.floor(mins / 60);
  const m = mins % 60;
  const period = h >= 12 ? "AM" : "PM";  
  const displayH = h % 12 === 0 ? 12 : h % 12;
  return `${displayH}:${pad(m)} ${period}`;
}


// parse tokens like "11:00", "11:00am", "11:00 AM", "23:30", "11:00a", "5p"
function parseTimeToken(token) {
  if (!token || typeof token !== "string") return null;
  const t = token.trim();
  const m = t.match(/^(\d{1,2})(?::(\d{2}))?\s*([AaPp][Mm]?|[ap])?$/);
  if (!m) return null;
  let h = parseInt(m[1], 10);
  const min = m[2] ? parseInt(m[2], 10) : 0;
  const periodRaw = m[3] ? m[3].toUpperCase() : null; // "AM", "PM", "A", "P"
  if (periodRaw) {
    const period = periodRaw.startsWith("A") ? "AM" : "PM";
    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;
  }
  return h * 60 + min;
}

/* Convert a range that is given in JST (or containing AM/PM) to target TZ using offset (hours difference from JST) */
function convertRangeFromJST(rangeStr, offset, tzLabel) {
  if (!rangeStr || typeof rangeStr !== "string") return rangeStr;
  // remove trailing timezone labels like "JST" if present
  let s = rangeStr.replace(/\bJST\b/i, "").trim();

  // 1) try tokens with AM/PM
  let m = s.match(/(\d{1,2}(?::\d{2})?\s*(?:[AaPp][Mm]?|[ap]))\s*[–-]\s*(\d{1,2}(?::\d{2})?\s*(?:[AaPp][Mm]?|[ap]))/i);
  if (m) {
    const start = parseTimeToken(m[1]);
    const end = parseTimeToken(m[2]);
    if (start == null || end == null) return rangeStr;
    return `${formatTimeFromMins(start + offset * 60)} - ${formatTimeFromMins(end + offset * 60)} ${tzLabel}`;
  }

  // 2) try plain numeric ranges like "8:00-11:00" (assume 24h or local)
  m = s.match(/(\d{1,2}(?::\d{2})?)\s*[–-]\s*(\d{1,2}(?::\d{2})?)/);
  if (m) {
    const startTok = m[1];
    const endTok = m[2];
    // try parse as HH:MM 24h (if hour > 12 and no am/pm)
    const startParts = startTok.split(":").map(Number);
    const endParts = endTok.split(":").map(Number);
    const start = (startParts[0] || 0) * 60 + (startParts[1] || 0);
    const end = (endParts[0] || 0) * 60 + (endParts[1] || 0);
    return `${formatTimeFromMins(start + offset * 60)} - ${formatTimeFromMins(end + offset * 60)} ${tzLabel}`;
  }

  // fallback
  return rangeStr;
}

/* Convert UTC range (e.g., "11:00-14:00 UTC") to target timezone:
   formula: target = UTC + (9 + locationOffset) hours
   because JST = UTC + 9, and locationOffset is target - JST.
*/
function convertUtcRangeToTarget(utcRange, locationOffset, tzLabel) {
  if (!utcRange || typeof utcRange !== "string") return utcRange;
  // strip trailing UTC and parentheses
  let s = utcRange.replace(/\bUTC\b/i, "").replace(/[()]/g, "").trim();
  const m = s.match(/(\d{1,2})(?::(\d{2}))?\s*[-–]\s*(\d{1,2})(?::(\d{2}))?/);
  if (!m) return utcRange;
  const startH = parseInt(m[1], 10);
  const startM = m[2] ? parseInt(m[2], 10) : 0;
  const endH = parseInt(m[3], 10);
  const endM = m[4] ? parseInt(m[4], 10) : 0;
  const utcToTargetHours = 9 + (locationOffset ?? 0); // as explained above
  const startMins = startH * 60 + startM + utcToTargetHours * 60;
  const endMins = endH * 60 + endM + utcToTargetHours * 60;
  return `${formatTimeFromMins(startMins)} - ${formatTimeFromMins(endMins)} ${tzLabel}`;
}

/* Convert an item that starts with a time range (many item strings follow that pattern). Returns converted string or original. */
function convertInnerItem(item, locationOffset, locationKey) {
  if (!item || typeof item !== "string") return item;
  // pattern: start - end (AM/PM optional) followed by optional colon/text
  const m = item.match(/^\s*(\d{1,2}(?::\d{2})?\s*(?:[AaPp][Mm]?|[ap])?)\s*[–-]\s*(\d{1,2}(?::\d{2})?\s*(?:[AaPp][Mm]?|[ap])?)\s*(?::)?\s*(.*)$/i);
  if (m) {
    const startTok = m[1];
    const endTok = m[2];
    const rest = m[3] || "";
    const start = parseTimeToken(startTok);
    const end = parseTimeToken(endTok);
    if (start == null || end == null) return item;
    const startMins = start + locationOffset * 60;
    const endMins = end + locationOffset * 60;
    return `${formatTimeFromMins(startMins)}–${formatTimeFromMins(endMins)}${rest ? `: ${rest}` : ""} ${locationKey}`;
  }

  // also try patterns like "8:30a - 10:30a City" (slightly different spacing)
  const m2 = item.match(/^\s*(\d{1,2}(?::\d{2})?\s*[ap]?)\s*[-]\s*(\d{1,2}(?::\d{2})?\s*[ap]?)\s*(.*)$/i);
  if (m2) {
    const start = parseTimeToken(m2[1]);
    const end = parseTimeToken(m2[2]);
    const rest = m2[3] || "";
    if (start == null || end == null) return item;
    return `${formatTimeFromMins(start + locationOffset * 60)}–${formatTimeFromMins(end + locationOffset * 60)} ${rest} ${locationKey}`;
  }

  return item;
}

/* Generic attempt: try inner item -> try global-style -> fallback original */
function convertAnyItem(item, locationOffset, locationKey) {
  if (!item) return "";
  // 1. attempt inner item conversion
  const a = convertInnerItem(item, locationOffset, locationKey);
  if (a && a !== item) return a;
  // 2. attempt generic AM/PM range replacement anywhere in text
  const m = item.match(/(\d{1,2}(?::\d{2})?\s*(?:[AaPp][Mm]?|[ap])?)\s*[-–]\s*(\d{1,2}(?::\d{2})?\s*(?:[AaPp][Mm]?|[ap])?)/i);
  if (m) {
    const start = parseTimeToken(m[1]);
    const end = parseTimeToken(m[2]);
    if (start != null && end != null) {
      const converted = `${formatTimeFromMins(start + locationOffset * 60)}-${formatTimeFromMins(end + locationOffset * 60)}`;
      return item.replace(m[0], converted) + ` ${locationKey}`;
    }
  }
  return item;
}

/* ------------------ PRESENTATIONAL COMPONENTS ------------------ */

function EventCard({ event, lineColor, locationKey = "UTC", locationOffset = 0, isGlobal = false, tzLabel, noBullets = false }) {
  // compute displayTime
  let displayTime;
  const hasTime = event.time && event.time.toString().trim().length > 0;

  if (isGlobal && hasTime && /\bUTC\b/i.test(event.time)) {
    // event.time given in UTC -> convert using convertUtcRangeToTarget
    displayTime = convertUtcRangeToTarget(event.time, locationOffset, tzLabel);
  } else if (hasTime) {
    // assume event.time in JST (or AM/PM) -> convert from JST to selected tz using locationOffset
    displayTime = convertRangeFromJST(event.time, locationOffset, locationKey);
  } else {
    displayTime = undefined;
  }

  const items = Array.isArray(event.items) ? event.items.filter(Boolean) : [];

  return (
    <div className="p-6 pl-10 md:pl-6 w-full md:max-w-md relative" style={{ color: "#000" }}>
      <span className="absolute top-6 left-4 md:hidden w-5 h-5 rounded-full" style={{ backgroundColor: lineColor }} />
      {/* Render subtitle above the title if present */}
      {event.subtitle && (
        <div className="text-base md:text-lg font-semibold mb-1">{event.subtitle}</div>
      )}
      {event.subtitle && /\d{4}/.test(event.subtitle) && <p className="text-sm md:text-base font-semibold">{event.subtitle}</p>}
      {displayTime && <p className="text-sm md:text-base font-semibold">{displayTime}</p>}
      <h3 className="text-xl md:text-2xl py-1 font-bold">{event.title}</h3>

      {items.length > 0 && (
        noBullets ? (
          <div className="mt-3 text-sm md:text-base space-y-1">
            {items.map((it, i) => (
              <div key={i}>{convertAnyItem(it, locationOffset, locationKey)}</div>
            ))}
          </div>
        ) : (
          <ul className="mt-3 text-sm md:text-base list-disc list-inside space-y-1">
            {items.map((it, i) => (
              <li key={i}>{convertAnyItem(it, locationOffset, locationKey)}</li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}

function TimelineSection({
  title,
  events,
  lineColor,
  showProducer = false,
  locationKey = "JST",
  locationOffset = 0,
  showLocationButtons = false,
  onLocationChange = () => {},
  stickyTitle = false,
  fixedLocationKey,
  fixedLocationOffset,
  showDropdown = false,
  useParentLocation = false,
  parentLocationKey,
  parentLocationOffset,
}) {
  // compute effective location used for conversion inside this section
  const effectiveLocationKey = useParentLocation ? parentLocationKey : (fixedLocationKey ?? locationKey);
  const effectiveLocationOffset = useParentLocation ? parentLocationOffset : (fixedLocationOffset ?? locationOffset);

  const tzLabel = locations.find(l => l.key === effectiveLocationKey)?.label || effectiveLocationKey;
  const conversionOffset = locations.find(l => l.key === effectiveLocationKey)?.offset ?? effectiveLocationOffset ?? 0;

  // List of titles/items to always left-align
  const alwaysLeftAlign = [
    "Tamami Tono",
    "Sister Jenna",
    "Hiroshi Ishiguro & Edi Pyrek",
    "Yoichi Ochiai / Narumi Yoshikawa"
  ];

  // Helper to check if event should be left-aligned
  function isLeftAligned(event) {
    // Check if event.title or first item matches any in alwaysLeftAlign
    if (alwaysLeftAlign.includes(event.title)) return true;
    if (event.items && event.items.length > 0 && alwaysLeftAlign.includes(event.items[0])) return true;
    return false;
  }

  // Only for the schedule section, use split left/right arrays
  const isScheduleSection = title === "Complete 24-Hour Schedule";

  // Prepare left/right speaker names for the grid
  const leftSpeakers = scheduleLeft.map(e => e.items[0]);
  const rightSpeakers = scheduleRight.map(e => e.items[0]);

  return (
    <div>
      <div className={stickyTitle ? "sticky top-0 z-10 bg-white border-b border-gray-200" : ""}>
        <h1 className="text-3xl font-bold pl-4 md:text-center my-6" style={{ color: lineColor }}>{title}</h1>

        {showLocationButtons && !showDropdown && (
          <>
            <div className="flex md:hidden justify-center mb-6">
              <select className="border-2 border-[#89478D] rounded px-4 py-2 font-semibold" style={{ backgroundColor: "#89478D", color: "#fff" }}
                value={locationKey}
                onChange={e => {
                  const sel = locations.find(l => l.key === e.target.value);
                  if (sel) onLocationChange(sel.key, sel.offset);
                }}
              >
                {locations.map(loc => <option key={loc.key} value={loc.key}>{loc.label}</option>)}
              </select>
            </div>

            <div className="gap-4 justify-center mb-6 hidden md:flex">
              {locations.map(loc => (
                <button key={loc.key} type="button" className="px-4 py-2 rounded font-semibold border-2 transition focus:outline-none"
                  style={{
                    backgroundColor: locationKey === loc.key ? "#89478D" : "#fff",
                    color: locationKey === loc.key ? "#fff" : "#89478D",
                    borderColor: "#89478D"
                  }}
                  onClick={() => onLocationChange(loc.key, loc.offset)}
                >
                  {loc.label}
                </button>
              ))}
            </div>
          </>
        )}

        {showDropdown && (
          <div className="flex justify-center mb-6">
            <select className="border-4 border-[#89478D] rounded px-4 py-2 font-semibold" style={{ backgroundColor: "#89478D", color: "#fff" }}
              value={locationKey}
              onChange={e => {
                const sel = locations.find(l => l.key === e.target.value);
                if (sel) onLocationChange(sel.key, sel.offset);
              }}>
              {locations.map(loc => <option key={loc.key} value={loc.key}>{loc.label}</option>)}
            </select>
          </div>
        )}

        {fixedLocationKey && !showDropdown && (
          <div className="flex justify-center mb-4">
            <span className="inline-block px-4 py-2 rounded font-semibold border-2 border-[#89478D]" style={{ backgroundColor: "#89478D", color: "#fff" }}>
              {locations.find(l => l.key === fixedLocationKey)?.label || fixedLocationKey}
            </span>
          </div>
        )}
      </div>

      {/* Special note for Osaka opening (keeps your previous behaviour) */}
      {title === "Complete 24-Hour Schedule" && (
        <div className="w-full flex flex-col items-center my-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#89478D] text-center mb-1">Osaka: USA Pavilion Opening</h2>
          <div className="text-base md:text-lg text-gray-700 text-center">
            October 2, 2025:&nbsp;{convertUtcRangeToTarget("05:00 - 11:00", conversionOffset, tzLabel)}
          </div>
        </div>
      )}

      <div className="relative w-full max-w-5xl mx-auto px-4 md:px-0">
        {/* center line - hide for Osaka Opening */}
        {title !== "Complete 24-Hour Schedule" && (
          <div
            className="absolute top-0 left-6 md:left-1/2 md:-translate-x-1/2 w-1 h-full"
            style={{ backgroundColor: lineColor }}
          />
        )}

        {isScheduleSection ? (
          <div className="relative w-full max-w-6xl mx-auto px-2 md:px-8">
            {/* Mobile: show as list */}
            <div className="block md:hidden">
              <ul className="list-disc pl-6 space-y-2">
                {scheduleLeft.map((leftEvent, idx) => (
                  <li key={`left-${idx}`}>{leftEvent.items[0]}</li>
                ))}
                {scheduleRight.map((rightEvent, idx) => (
                  <li key={`right-${idx}`}>{rightEvent.items[0]}</li>
                ))}
              </ul>
            </div>
            {/* Desktop: show as grid with dots */}
            <div className="hidden md:block">
              <div className="grid grid-cols-9 gap-12">
                {scheduleLeft.map((leftEvent, idx) => {
                  const rightEvent = scheduleRight[idx];
                  return (
                    <React.Fragment key={idx}>
                      <div className="md:col-span-4 md:pr-4 flex md:justify-end">
                        <div className="text-xl font-medium">
                          {leftEvent.items[0]}
                        </div>
                      </div>
                      <div className="col-span-1 flex justify-center">
                        <div
                          className="w-5 h-5 rounded-full"
                          style={{ backgroundColor: "#89478D" }}
                        />
                      </div>
                      <div className="md:col-span-4 md:pl-4 flex md:justify-start">
                        <div className="text-xl font-medium">
                          {rightEvent ? rightEvent.items[0] : ""}
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          events.map((event, index) => {
            const leftAlign = isLeftAligned(event) || index % 2 === 0;
            const noBullets = false;
            return (
              <div key={index} className="relative grid grid-cols-1 md:grid-cols-9 items-start">
                <div className={leftAlign ? "md:col-span-4 md:pr-2 flex md:justify-end" : "md:col-span-4"}>
                  {leftAlign && (
                    <EventCard
                      event={event}
                      lineColor={lineColor}
                      locationKey={effectiveLocationKey}
                      locationOffset={conversionOffset}
                      isGlobal={title === "Global 24-Hour Relay Schedule"}
                      tzLabel={tzLabel}
                      noBullets={noBullets}
                    />
                  )}
                </div>

                <div className="md:col-span-1 flex justify-center">
                  <div className="hidden md:flex items-start">
                    <span className="w-5 h-5 rounded-full mt-6" style={{ backgroundColor: lineColor }} />
                  </div>
                </div>

                <div className={leftAlign ? "md:col-span-4" : "md:col-span-4 md:pl-2 flex md:justify-start"}>
                  {!leftAlign && (
                    <EventCard
                      event={event}
                      lineColor={lineColor}
                      locationKey={effectiveLocationKey}
                      locationOffset={conversionOffset}
                      isGlobal={title === "Global 24-Hour Relay Schedule"}
                      tzLabel={tzLabel}
                      noBullets={noBullets}
                    />
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

/* ------------------ MAIN EXPORT ------------------ */

export default function Timeline() {
  const [locationKey, setLocationKey] = useState("UTC");
  const [locationOffset, setLocationOffset] = useState(0);

  return (
    <div id="schedule" className="py-12 px-4 flex flex-col items-center space-y-12">
      <TimelineSection title="Pre-Event Global Labs" events={preEvent} lineColor="#89478D" stickyTitle />

      <TimelineSection
        title="Complete 24-Hour Schedule"
        events={[]} // pass empty, handled by split arrays
        lineColor="#89478D"
        showLocationButtons
        locationKey={locationKey}
        locationOffset={locationOffset}
        onLocationChange={(key, offset) => {
          setLocationKey(key);
          setLocationOffset(offset);
        }}
        stickyTitle
      />

      <div className="flex flex-col">
        <TimelineSection
          title="Global 24-Hour Relay Schedule"
          events={global}
          lineColor="#89478D"
          showProducer
          useParentLocation
          parentLocationKey={locationKey}
          parentLocationOffset={locationOffset}
          stickyTitle
        />

        <TimelineSection
          title="Kyoto Closing Ceremony"
          events={kyoto}
          lineColor="#89478D"
          showProducer
          useParentLocation
          parentLocationKey={locationKey}
          parentLocationOffset={locationOffset}
          stickyTitle
        />
      </div>

    </div>
  );
}