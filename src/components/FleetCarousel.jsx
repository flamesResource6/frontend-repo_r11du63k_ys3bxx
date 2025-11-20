import React, { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || '';

export default function FleetCarousel({ onSelect, activeId }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/fleet`).then(r => r.json()).then(setItems).catch(()=>{});
  }, []);

  return (
    <div className="mt-6 rtl text-right">
      <h3 className="text-white text-lg font-semibold mb-3">أسطول السيارات</h3>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {items.map(car => (
          <button
            key={car.id}
            onClick={() => onSelect && onSelect(car)}
            aria-pressed={activeId === car.id}
            className={`flex-shrink-0 w-40 bg-white/5 border ${activeId===car.id ? 'border-amber-400' : 'border-white/10'} rounded-xl overflow-hidden hover:border-amber-300 transition-colors`}
          >
            <div className="h-24 bg-gradient-to-b from-slate-800 to-black flex items-center justify-center">
              <img src={car.thumbnail} alt={car.name_ar} className="max-h-20" loading="lazy" />
            </div>
            <div className="p-2 text-right text-white">
              <div className="text-sm font-medium line-clamp-1">{car.name_ar}</div>
              <div className="text-xs opacity-70">{car.category_ar} • {car.seats} مقاعد</div>
              <div className="text-xs text-amber-300 mt-1">{car.price_per_day} د.ل / اليوم</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
