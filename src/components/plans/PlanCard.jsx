import { formatCurrency } from '../../utils/calculations';

export default function PlanCard({ plan, isSelected, onSelect, isRecommended, maxMonthly }) {
  const barWidth = maxMonthly > 0 ? (plan.monthlyPayment / maxMonthly) * 100 : 0;

  return (
    <button
      onClick={() => onSelect(plan)}
      className={`relative w-full text-left rounded-xl border-2 px-4 py-4 transition-all duration-200 cursor-pointer ${
        isSelected
          ? 'border-[#3A7DCF] bg-[#3A7DCF]/5 shadow-md'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
      }`}
    >
      {/* Recommended ribbon */}
      {isRecommended && (
        <span className="absolute -top-2.5 left-4 px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-green-100 text-green-700">
          Recommended
        </span>
      )}

      {/* Main row */}
      <div className="flex items-center gap-4">
        {/* Radio */}
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
          isSelected ? 'border-[#3A7DCF] bg-[#3A7DCF]' : 'border-gray-300'
        }`}>
          {isSelected && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>

        {/* Duration */}
        <div className="w-20 shrink-0">
          <span className="text-sm font-bold text-gray-900">{plan.months}mo</span>
        </div>

        {/* Cost bar + monthly amount */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between mb-1.5">
            <span className="text-base font-bold text-gray-900">
              {formatCurrency(plan.monthlyPayment)}
              <span className="text-xs font-normal text-gray-500">/mo</span>
            </span>
            <span className="text-xs text-gray-500 ml-2 shrink-0">
              {plan.feePercent === 0 ? 'No fees' : `${plan.feePercent}% fee`}
            </span>
          </div>
          {/* Visual cost bar */}
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isSelected ? 'bg-[#3A7DCF]' : 'bg-gray-300'
              }`}
              style={{ width: `${barWidth}%` }}
            />
          </div>
        </div>
      </div>

      {/* Total line */}
      <div className="flex items-center justify-between mt-2 ml-9 pl-4 text-xs text-gray-500">
        <span>Total: {formatCurrency(plan.totalWithFees)}</span>
        {plan.feePercent > 0 && (
          <span>Fee: {formatCurrency(plan.feeAmount)}</span>
        )}
      </div>
    </button>
  );
}
