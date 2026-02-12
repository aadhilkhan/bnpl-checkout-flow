import { useEffect } from 'react';
import { formatCurrency } from '../../utils/calculations';

export default function ScheduleModal({ schedule, planDetails, onClose }) {
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 transition-opacity" />

      {/* Panel — full-width sheet on mobile, centered popup on desktop */}
      <div
        className="relative w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-xl animate-slide-up sm:animate-fade-scale overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle (mobile) */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3">
          <div>
            <h3 className="text-base font-bold text-gray-900">Payment Schedule</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {planDetails.months} months &middot; {planDetails.feePercent === 0 ? 'Interest-free' : `${planDetails.feePercent}% fee`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close schedule"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Schedule list */}
        <div className="px-5 pb-5 max-h-[60vh] overflow-y-auto">
          <div className="flex flex-col gap-2">
            {schedule.map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-between rounded-xl px-4 py-3 ${
                  item.isDueToday
                    ? 'bg-[#3A7DCF]/10 border border-[#3A7DCF]/20'
                    : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                    item.isDueToday
                      ? 'bg-[#3A7DCF] text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {item.installment}
                  </span>
                  <div>
                    <span className={`text-sm ${item.isDueToday ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                      {item.date}
                    </span>
                    {item.isDueToday && (
                      <span className="ml-2 px-1.5 py-0.5 text-[10px] font-bold bg-[#3A7DCF] text-white rounded">
                        TODAY
                      </span>
                    )}
                  </div>
                </div>
                <span className={`text-sm font-semibold shrink-0 ${
                  item.isDueToday ? 'text-gray-900' : 'text-gray-700'
                }`}>
                  {formatCurrency(item.amount)}
                </span>
              </div>
            ))}
          </div>

          {/* Total row */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200 px-1">
            <span className="text-sm font-medium text-gray-500">Total</span>
            <span className="text-sm font-bold text-gray-900">{formatCurrency(planDetails.totalWithFees)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
