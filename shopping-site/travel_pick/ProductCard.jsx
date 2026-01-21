// travel_pick/components/ProductCard.jsx
import { Link } from "react-router-dom";

export default function ProductCard({
  id,
  title,
  thumbnail,
  price,
  rating,
  reviewCount,
  tag,
}) {
  return (
    <Link
      to={`/products/${id}`}
      className="block bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
    >
      <div className="relative">
        <img src={thumbnail} alt={title} className="w-full h-48 object-cover" />
        {tag && (
          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
            {tag}
          </span>
        )}
        <button className="absolute top-3 right-3 bg-white/90 p-2 rounded-full hover:bg-white">
          🤍
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm mb-2 line-clamp-2">{title}</h3>
        <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
          <span className="text-yellow-500">⭐</span>
          <span className="font-medium">{rating}</span>
          <span className="text-gray-400">({reviewCount})</span>
        </div>
        <p className="text-lg font-bold text-gray-900">
          {price.toLocaleString()}원
        </p>
      </div>
    </Link>
  );
}