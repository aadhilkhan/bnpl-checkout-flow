import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../../context/CheckoutContext';
import { installmentPlans } from '../../data/mockData';
import { formatCurrency, calculatePlanDetails, generatePaymentSchedule } from '../../utils/calculations';
import PageShell from '../layout/PageShell';
import ScheduleModal from './ScheduleModal';

export default function PlanSelectionPage() {
  const { state, dispatch } = useCheckout();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [showSchedule, setShowSchedule] = useState(false);

  // Navigation guard
  useEffect(() => {
    if (!state.isAuthenticated) {
      navigate('/verify');
    }
  }, [state.isAuthenticated, navigate]);

  const planOptions = installmentPlans.map((plan) => ({
    ...plan,
    ...calculatePlanDetails(state.cartTotal, plan),
  }));

  const activePlan = planOptions.find((p) => p.id === selectedPlan);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan.id);
    const details = calculatePlanDetails(state.cartTotal, plan);
    dispatch({ type: 'SELECT_PLAN', payload: { planId: plan.id, planDetails: details } });
    setSchedule(generatePaymentSchedule(details));
  };

  const handleContinue = () => {
    if (selectedPlan) {
      navigate('/payment');
    }
  };

  if (!state.isAuthenticated) return null;

  return (
    <PageShell currentStep={3}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">Choose your payment plan</h1>
          <p className="text-sm text-gray-500 mt-1">
            Split <span className="font-semibold text-gray-700">{formatCurrency(state.cartTotal)}</span> into easy installments
          </p>
        </div>

        {/* Plan pills */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {planOptions.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            const isRecommended = plan.feePercent === 0;

            return (
              <button
                key={plan.id}
                onClick={() => handleSelectPlan(plan)}
                className={`relative flex flex-col items-center rounded-xl border-2 py-3 px-2 sm:py-4 sm:px-3 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-[#3A7DCF] bg-[#3A7DCF] text-white shadow-md'
                    : 'border-gray-200 bg-white text-gray-900 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                {isRecommended && (
                  <span className={`absolute -top-2.5 px-2 py-0.5 text-[9px] font-bold rounded-full whitespace-nowrap ${
                    isSelected
                      ? 'bg-white text-[#3A7DCF]'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    Best value
                  </span>
                )}
                <span className="text-lg sm:text-xl font-bold leading-tight">{plan.months}</span>
                <span className={`text-[11px] sm:text-xs font-medium ${
                  isSelected ? 'text-white/80' : 'text-gray-500'
                }`}>
                  months
                </span>
                <span className={`mt-1.5 text-[10px] sm:text-xs font-semibold ${
                  isSelected ? 'text-white/90' : 'text-gray-600'
                }`}>
                  {formatCurrency(plan.monthlyPayment)}
                  <span className={`font-normal ${isSelected ? 'text-white/70' : 'text-gray-400'}`}>/mo</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Summary card for selected plan */}
        {activePlan && (
          <div className="mt-4 rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
            {/* Top section — plan breakdown */}
            <div className="px-5 py-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-900">
                  {activePlan.months}-month plan
                </span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  activePlan.feePercent === 0
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {activePlan.feePercent === 0 ? 'Interest-free' : `${activePlan.feePercent}% fee`}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-[11px] text-gray-500 mb-0.5">Monthly</p>
                  <p className="text-sm font-bold text-gray-900">{formatCurrency(activePlan.monthlyPayment)}</p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-500 mb-0.5">Fee</p>
                  <p className="text-sm font-bold text-gray-900">
                    {activePlan.feePercent === 0 ? 'AED 0.00' : formatCurrency(activePlan.feeAmount)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-gray-500 mb-0.5">Total</p>
                  <p className="text-sm font-bold text-gray-900">{formatCurrency(activePlan.totalWithFees)}</p>
                </div>
              </div>
            </div>

            {/* Bottom section — clickable schedule preview */}
            <button
              onClick={() => setShowSchedule(true)}
              className="w-full flex items-center justify-between px-5 py-3 bg-[#3A7DCF]/[0.04] border-t border-gray-100 hover:bg-[#3A7DCF]/[0.08] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#3A7DCF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs font-semibold text-gray-700">
                  Due today: {formatCurrency(activePlan.monthlyPayment)}
                </span>
                <span className="text-[10px] text-gray-400">
                  &middot; Next: {schedule[1]?.date}
                </span>
              </div>
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Continue button */}
        <button
          onClick={handleContinue}
          disabled={!selectedPlan}
          className="w-full mt-6 py-3 px-6 rounded-xl font-semibold text-white bg-gray-900 hover:bg-black hover:shadow-lg active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:active:scale-100 cursor-pointer"
        >
          Continue to Payment
        </button>
      </div>

      {/* Schedule modal — sheet on mobile, popup on desktop */}
      {showSchedule && activePlan && (
        <ScheduleModal
          schedule={schedule}
          planDetails={activePlan}
          onClose={() => setShowSchedule(false)}
        />
      )}
    </PageShell>
  );
}
