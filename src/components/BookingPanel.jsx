import React, { useMemo, useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || '';

export default function BookingPanel({ activeVehicle }) {
  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    pickup_location: 'طرابلس',
    return_location: 'طرابلس',
    pickup_date: '',
    return_date: '',
    whatsapp: '',
    notes: '',
  });
  const [status, setStatus] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const payload = useMemo(() => ({
    ...form,
    vehicle_id: activeVehicle?.id || null,
  }), [form, activeVehicle]);

  async function submit(e) {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'جاري الإرسال...' });
    try {
      const res = await fetch(`${API_BASE}/api/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'فشل الإرسال');
      setStatus({ type: 'success', message: 'تم استلام طلبك وسنتواصل معك قريبًا' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    }
  }

  return (
    <aside aria-label="نموذج الحجز" className="sticky top-4 z-20 w-full">
      <form onSubmit={submit} className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl">
        <h3 className="text-right font-bold text-slate-900 dark:text-white mb-3">احجز الآن</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input aria-label="الاسم الكامل" required name="full_name" value={form.full_name} onChange={onChange} placeholder="الاسم الكامل" className="input" />
          <input aria-label="الهاتف / واتساب" required name="phone" value={form.phone} onChange={onChange} placeholder="الهاتف / واتساب" className="input" />
          <input aria-label="مكان الاستلام" required name="pickup_location" value={form.pickup_location} onChange={onChange} placeholder="مكان الاستلام" className="input" />
          <input aria-label="مكان التسليم" required name="return_location" value={form.return_location} onChange={onChange} placeholder="مكان التسليم" className="input" />
          <input aria-label="تاريخ الاستلام" required type="datetime-local" name="pickup_date" value={form.pickup_date} onChange={onChange} className="input" />
          <input aria-label="تاريخ التسليم" required type="datetime-local" name="return_date" value={form.return_date} onChange={onChange} className="input" />
          <input aria-label="واتساب" name="whatsapp" value={form.whatsapp} onChange={onChange} placeholder="واتساب (اختياري)" className="input sm:col-span-2" />
          <textarea aria-label="ملاحظات" name="notes" value={form.notes} onChange={onChange} placeholder="ملاحظات" className="input sm:col-span-2 min-h-[80px]" />
        </div>
        {activeVehicle && (
          <div className="text-xs text-right text-slate-600 dark:text-slate-300 mt-2">السيارة المختارة: {activeVehicle.name_ar}</div>
        )}
        {status && (
          <div role="status" className={`mt-3 text-sm ${status.type==='error' ? 'text-red-600' : status.type==='success' ? 'text-green-600' : 'text-slate-600'}`}>{status.message}</div>
        )}
        <button type="submit" className="mt-4 w-full py-2 rounded-xl bg-gradient-to-r from-blue-900 to-black text-white font-semibold hover:from-blue-800 hover:to-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400">إرسال الطلب</button>
      </form>
    </aside>
  );
}
