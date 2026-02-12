import { formatCurrency } from '../../utils/calculations';

export default function PaymentSchedule({ schedule }) {
  if (!schedule || schedule.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mt-6">
      <h3 className="font-semibold text-gray-900 mb-4">Payment Schedule</h3>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[11px] top-3 bottom-3 w-0.5 bg-gray-200" />

        <div className="space-y-4">
          {schedule.map((item, index) => (
            <div key={index} className="flex items-start gap-4 relative">
              {/* Dot */}
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 z-10 ${
                item.isDueToday
                  ? 'border-[#3A7DCF] bg-[#3A7DCF]'
                  : 'border-gray-300 bg-white'
              }`}>
                {item.isDueToday && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>

              <div className="flex-1 flex items-center justify-between pb-1">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {item.date}
                    {item.isDueToday && (
                      <span className="ml-2 px-2 py-0.5 text-[10px] font-bold bg-[#3A7DCF]/10 text-[#3A7DCF] rounded-full">
                        Due today
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500">Installment {item.installment}</p>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {formatCurrency(item.amount)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
