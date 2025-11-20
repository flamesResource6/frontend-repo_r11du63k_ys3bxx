import React, { useMemo, useState } from 'react';
import Hero3D from './components/Hero3D';
import BookingPanel from './components/BookingPanel';
import FleetCarousel from './components/FleetCarousel';
import { Advantages, Testimonials } from './components/Sections';

export default function App() {
  const [activeVehicle, setActiveVehicle] = useState(null);
  const [tooltip, setTooltip] = useState(null);

  const theme = {
    bg: 'from-white to-blue-50 dark:from-slate-950 dark:to-slate-900',
    text: 'text-slate-900 dark:text-white',
    primary: 'text-amber-400',
  };

  const handleHotspotClick = (id) => {
    if (!activeVehicle) return;
    const content = {
      price: `${activeVehicle.price_per_day} د.ل / اليوم`,
      category: activeVehicle.category_ar,
      seats: `${activeVehicle.seats} مقاعد`,
    }[id];
    setTooltip({ id, content });
    setTimeout(() => setTooltip(null), 2500);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.bg}`} dir="rtl">
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/60 dark:bg-slate-950/50 border-b border-slate-200/60 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-900 to-black border border-white/10" />
            <div className="font-extrabold tracking-tight text-slate-900 dark:text-white">ليبيا لتأجير السيارات</div>
          </div>
          <nav className="hidden sm:flex gap-6 text-sm text-slate-700 dark:text-slate-300">
            <a href="#fleet" className="hover:text-amber-400">الأسطول</a>
            <a href="#advantages" className="hover:text-amber-400">المزايا</a>
            <a href="#testimonials" className="hover:text-amber-400">آراء العملاء</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <Hero3D activeVehicle={activeVehicle} onHotspotClick={handleHotspotClick} />
            {tooltip && (
              <div className="text-right mt-3 text-sm text-white/90 bg-black/60 inline-block rounded-lg px-3 py-2 border border-white/10">{tooltip.content}</div>
            )}
            <div id="fleet">
              <FleetCarousel activeId={activeVehicle?.id} onSelect={setActiveVehicle} />
            </div>
          </div>
          <div>
            <BookingPanel activeVehicle={activeVehicle} />
          </div>
        </div>

        <div id="advantages">
          <Advantages />
        </div>
        <div id="testimonials">
          <Testimonials />
        </div>

        <footer className="mt-16 py-8 text-center text-sm text-slate-600 dark:text-slate-400">
          © {new Date().getFullYear()} جميع الحقوق محفوظة — ليبيا لتأجير السيارات
        </footer>
      </main>
    </div>
  );
}
