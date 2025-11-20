import React from 'react';

export function Advantages() {
  const items = [
    { title: 'دعم عبر واتساب 24/7', desc: 'فريق خدمة عملاء جاهز لمساعدتك في أي وقت', icon: '💬' },
    { title: 'تسليم واستلام مرن', desc: 'خدمة توصيل في المطارات والمدن الرئيسية', icon: '🚗' },
    { title: 'أسعار شفافة', desc: 'بدون رسوم مخفية وعقود واضحة', icon: '✅' },
  ];
  return (
    <section className="mt-12">
      <h3 className="text-right text-white text-xl font-bold mb-4">لماذا تختارنا؟</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {items.map((it, i) => (
          <div key={i} className="group relative bg-white/5 border border-white/10 rounded-2xl p-4 overflow-hidden">
            <div className="absolute -right-12 -top-12 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl group-hover:bg-amber-400/20 transition-colors pointer-events-none" />
            <div className="text-2xl">{it.icon}</div>
            <div className="text-white font-semibold mt-2">{it.title}</div>
            <div className="text-white/70 text-sm mt-1">{it.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Testimonials() {
  const items = [
    { name: 'محمد - طرابلس', text: 'خدمة ممتازة وسيارات نظيفة. كانت عملية الحجز سهلة وسريعة.' },
    { name: 'سارة - بنغازي', text: 'تم التسليم في الوقت المحدد والسعر مناسب جدًا. أنصح بشدة.' },
    { name: 'أحمد - مصراتة', text: 'تجربة رائعة ودعم فوري عبر واتساب. شكراً لكم!' },
  ];
  return (
    <section className="mt-12">
      <h3 className="text-right text-white text-xl font-bold mb-4">آراء العملاء</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {items.map((it, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <div className="text-white/80 text-sm">“{it.text}”</div>
            <div className="text-white font-semibold mt-3 text-right">{it.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
