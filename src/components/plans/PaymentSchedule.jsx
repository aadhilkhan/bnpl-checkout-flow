import { formatCurrency } from '../../utils/calculations';

export default function PaymentSchedule({ schedule, connected = false }) {
  if (!schedule || schedule.length === 0) return null;

  return (
    <div className={`${connected ? 'mx-0' : 'mx-2'} mt-0 rounded-b-xl border-x-2 border-b-2 border-[#3A7DCF]/30 bg-[#3A7DCF]/[0.03] px-4 py-4`}>
      <div className="flex items-center gap-2 mb-3">
        <svg className="w-4 h-4 text-[#3A7DCF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h4 className="text-xs font-semibold text-gray-700">Payment Schedule</h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
        {schedule.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs ${
              item.isDueToday
                ? 'bg-[#3A7DCF]/10 font-semibold text-gray-900'
                : 'bg-white/60 text-gray-600'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold bg-gray-200 text-gray-600 shrink-0">
                {item.installment}
              </span>
              {!item.isDueToday && <span>{item.date}</span>}
              {item.isDueToday && (
                <span className="px-1.5 py-0.5 text-[9px] font-bold bg-[#3A7DCF] text-white rounded">
                  TODAY
                </span>
              )}
            </div>
            <span className="font-semibold ml-2 shrink-0">{formatCurrency(item.amount)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
