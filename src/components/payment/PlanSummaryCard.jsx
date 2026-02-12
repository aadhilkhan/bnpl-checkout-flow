import { formatCurrency } from '../../utils/calculations';

export default function PlanSummaryCard({ cartTotal, planDetails }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:sticky md:top-6">
      <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Subtotal</span>
          <span className="text-gray-700">{formatCurrency(cartTotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">
            Fee ({planDetails.feePercent}%)
          </span>
          <span className="text-gray-700">
            {planDetails.feeAmount === 0 ? 'Free' : formatCurrency(planDetails.feeAmount)}
          </span>
        </div>
        <div className="flex justify-between pt-2 border-t border-gray-200 font-semibold">
          <span className="text-gray-900">Total</span>
          <span className="text-gray-900">{formatCurrency(planDetails.totalWithFees)}</span>
        </div>
      </div>

      {/* Plan summary */}
      <div className="mt-4 p-3 rounded-xl bg-gray-50">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">{planDetails.months} monthly payments</span>{' '}
          of {formatCurrency(planDetails.monthlyPayment)}
        </p>
      </div>

      {/* Due today */}
      <div className="mt-4 p-4 rounded-xl bg-[#3A7DCF]/10 border border-[#3A7DCF]/20">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-[#3A7DCF]">Due today</span>
          <span className="text-lg font-bold text-[#3A7DCF]">
            {formatCurrency(planDetails.monthlyPayment)}
          </span>
        </div>
      </div>
    </div>
  );
}
