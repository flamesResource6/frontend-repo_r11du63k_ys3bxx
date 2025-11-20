import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';

function useDataSaver() {
  const [isDataSaver, setIsDataSaver] = useState(false);
  useEffect(() => {
    try {
      const nav = navigator;
      const conn = nav && (nav.connection || nav.mozConnection || nav.webkitConnection);
      const save = (conn && (conn.saveData || conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g')) || false;
      const mem = nav && nav.deviceMemory && nav.deviceMemory <= 2;
      setIsDataSaver(Boolean(save || mem));
    } catch (e) {
      setIsDataSaver(false);
    }
  }, []);
  return isDataSaver;
}

export default function Hero3D({ activeVehicle, onHotspotClick }) {
  const isDataSaver = useDataSaver();
  const [ready, setReady] = useState(false);
  const splineRef = useRef(null);

  // Hotspot positions in percentage relative to container (approximate)
  const hotspots = useMemo(() => ([
    { id: 'price', label: 'السعر اليومي', x: '70%', y: '55%' },
    { id: 'category', label: 'الفئة', x: '25%', y: '40%' },
    { id: 'seats', label: 'المقاعد', x: '50%', y: '20%' },
  ]), []);

  // 2D fallback hero
  const FallbackHero = (
    <div className="relative w-full h-[60vh] sm:h-[70vh] rounded-3xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-black border border-slate-800">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,215,0,0.06),transparent_60%)] pointer-events-none"/>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"/>
      <div className="absolute inset-0 flex items-center justify-center">
        <img src="/fallback-car.png" alt="سيارة عرض" className="w-[80%] max-w-4xl opacity-90" loading="lazy" />
      </div>
    </div>
  );

  return (
    <section aria-label="عرض ثلاثي الأبعاد" className="relative">
      <div className="relative w-full h-[60vh] sm:h-[75vh] rounded-3xl overflow-hidden border border-slate-800 bg-black">
        {!isDataSaver ? (
          <Suspense fallback={FallbackHero}>
            <Spline
              ref={splineRef}
              scene="https://prod.spline.design/m8wpIQzXWhEh9Yek/scene.splinecode"
              onLoad={() => setReady(true)}
              style={{ width: '100%', height: '100%' }}
            />
          </Suspense>
        ) : (
          FallbackHero
        )}

        {/* Overlay labels for active vehicle */}
        {activeVehicle && (
          <div className="pointer-events-none absolute top-4 left-4 sm:left-8 bg-black/50 backdrop-blur-md border border-white/10 text-white rounded-xl p-3 sm:p-4">
            <div className="text-sm sm:text-base font-semibold">{activeVehicle.name_ar}</div>
            <div className="text-[12px] sm:text-sm opacity-80">{activeVehicle.category_ar} • {activeVehicle.seats} مقاعد</div>
            <div className="text-[12px] sm:text-sm text-amber-300 mt-1">{activeVehicle.price_per_day} د.ل / اليوم</div>
          </div>
        )}

        {/* Hotspots - accessible buttons */}
        {!isDataSaver && ready && hotspots.map(h => (
          <button
            key={h.id}
            aria-label={`نقطة تفاعلية: ${h.label}`}
            onClick={() => onHotspotClick && onHotspotClick(h.id)}
            className="group absolute z-10 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400"
            style={{ left: h.x, top: h.y, transform: 'translate(-50%, -50%)' }}
          >
            <span className="block w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-amber-400 shadow-[0_0_18px_rgba(251,191,36,0.8)] animate-pulse" />
            <span className="absolute top-1/2 -translate-y-1/2 mr-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity text-xs sm:text-sm bg-black/70 text-white px-2 py-1 rounded-md border border-white/10">
              {h.label}
            </span>
          </button>
        ))}

        {/* Decorative gradient overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"/>
      </div>
    </section>
  );
}
