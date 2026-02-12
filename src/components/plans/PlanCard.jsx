import { formatCurrency } from '../../utils/calculations';

export default function PlanCard({ plan, isSelected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(plan)}
      className={`relative w-full text-left rounded-2xl border-2 p-5 transition-all duration-200 cursor-pointer ${
        isSelected
          ? 'border-[#3A7DCF] bg-[#3A7DCF]/5 shadow-sm'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
      }`}
    >
      {/* Badge */}
      {plan.badge && (
        <span className={`absolute -top-2.5 left-4 px-2.5 py-0.5 text-[10px] font-bold rounded-full ${
          plan.badge === 'Interest-free'
            ? 'bg-green-100 text-green-700'
            : 'bg-amber-100 text-amber-700'
        }`}>
          {plan.badge}
        </span>
      )}

      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold text-gray-900">{plan.months} payments</h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {plan.feePercent === 0 ? 'No fees' : `${plan.feePercent}% fee`}
          </p>
        </div>

        {/* Checkmark / Radio */}
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
          isSelected ? 'border-[#3A7DCF] bg-[#3A7DCF]' : 'border-gray-300'
        }`}>
          {isSelected && (
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100">
        <span className="text-lg font-bold text-gray-900">
          {formatCurrency(plan.monthlyPayment)}
        </span>
        <span className="text-xs text-gray-500">/mo</span>
      </div>
    </button>
  );
}
