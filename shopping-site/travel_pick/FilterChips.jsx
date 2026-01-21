// travel_pick/components/FilterChips.jsx
import { useState } from "react";

export default function FilterChips() {
  const [active, setActive] = useState("전체");
  const chips = ["전체", "내륙", "MBTI", "액티비티", "미식투어"];

  return (
    <div className="flex gap-2 flex-wrap">
      {chips.map((chip) => (
        <button
          key={chip}
          onClick={() => setActive(chip)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            active === chip
              ? "bg-green-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {chip}
        </button>
      ))}
    </div>
  );
}