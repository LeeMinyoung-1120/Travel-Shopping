// travel_pick/components/Header.jsx
import { Link } from "react-router-dom";
import { useCartStore } from "../hooks/useCart";

export default function Header() {
  const total = useCartStore((s) => s.getTotalCount());
  const badge = total >= 10 ? "10+" : total;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/2mg/logo.jpg" alt="Travel Pick" className="h-10" />
        </Link>

        <div className="flex-1 max-w-md mx-8">
          <input
            type="text"
            placeholder="나의 여행 스타일 찾는 키"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="text-sm border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
            로그인 & 회원가입
          </button>

          <div className="relative">
            <button className="text-2xl">🛒</button>
            {total > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-semibold">
                {badge}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}