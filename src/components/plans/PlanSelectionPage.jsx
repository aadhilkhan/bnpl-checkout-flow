import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChartPie } from 'lucide-react';
import { useCheckout } from '../../context/CheckoutContext';
import { installmentPlans } from '../../data/mockData';
import { formatCurrency, calculatePlanDetails, generatePaymentSchedule } from '../../utils/calculations';
import PageShell from '../layout/PageShell';
import ScheduleModal from './ScheduleModal';

export default function PlanSelectionPage() {
  const { state, dispatch } = useCheckout();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(12);
  const [schedule, setSchedule] = useState([]);
  const [showSchedule, setShowSchedule] = useState(false);

  // Navigation guard
  useEffect(() => {
    if (!state.isAuthenticated) {
      navigate('/verify');
    }
  }, [state.isAuthenticated, navigate]);

  // Initialize with 12-month plan preselected
  useEffect(() => {
    const twelveMonthPlan = installmentPlans.find(plan => plan.id === 12);
    if (twelveMonthPlan && !state.selectedPlan) {
      const details = calculatePlanDetails(state.cartTotal, twelveMonthPlan);
      dispatch({ type: 'SELECT_PLAN', payload: { planId: twelveMonthPlan.id, planDetails: details } });
      setSchedule(generatePaymentSchedule(details));
    }
  }, [state.cartTotal, state.selectedPlan, dispatch]);

  const planOptions = installmentPlans.map((plan) => ({
    ...plan,
    ...calculatePlanDetails(state.cartTotal, plan),
  }));

  // Sort descending so highest months appear first (12, 8, 6, 4) per design
  const sortedPlans = [...planOptions].sort((a, b) => b.months - a.months);

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
      <div className="flex justify-center">
        <div className="w-full max-w-[420px]">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">Choose your payment plan</h1>
          <p className="text-sm text-gray-500 mt-1">
            Split <span className="font-semibold text-gray-700">{formatCurrency(state.cartTotal)}</span> into easy installments
          </p>
        </div>

        {/* Plan selection card */}
        <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
          {/* Number of payments label */}
          <div className="px-5 pt-5 pb-3">
            <p className="text-sm font-semibold text-gray-900">Number of payments</p>
          </div>

          {/* Pill selector row */}
          <div className="px-5 pb-5 flex gap-2">
            {sortedPlans.map((plan) => {
              const isSelected = selectedPlan === plan.id;
              return (
                <button
                  key={plan.id}
                  onClick={() => handleSelectPlan(plan)}
                  className={`py-2 px-5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#3A7DCF] text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {plan.months}
                </button>
              );
            })}
          </div>

          {/* Divider + Payment detail row */}
          {activePlan && (
            <>
              <div className="border-t border-gray-100" />
              <button
                onClick={() => setShowSchedule(true)}
                className="w-full flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                {/* Circular icon */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#3A7DCF]/10 flex items-center justify-center">
                  <ChartPie className="w-5 h-5 text-[#3A7DCF]" />
                </div>

                {/* Amount and fee text */}
                <div className="flex-1 text-left">
                  <p className="text-base font-bold text-gray-900">
                    {formatCurrency(activePlan.monthlyPayment)}
                    <span className="text-sm font-normal text-gray-500">/mo</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {activePlan.feePercent === 0
                      ? 'Interest-free \u2014 no service fees'
                      : `Includes ${formatCurrency(activePlan.feeAmount)} in service fees`}
                  </p>
                </div>

                {/* Chevron */}
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Continue button */}
        <button
          onClick={handleContinue}
          disabled={!selectedPlan}
          className="w-full mt-6 py-3 px-6 rounded-xl font-semibold text-white bg-gray-900 hover:bg-black hover:shadow-lg active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:active:scale-100 cursor-pointer"
        >
          Continue to Payment
        </button>
        </div>
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
