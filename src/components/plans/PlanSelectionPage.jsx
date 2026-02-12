import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../../context/CheckoutContext';
import { installmentPlans } from '../../data/mockData';
import { formatCurrency, calculatePlanDetails, generatePaymentSchedule } from '../../utils/calculations';
import PageShell from '../layout/PageShell';
import PlanCard from './PlanCard';
import PaymentSchedule from './PaymentSchedule';

export default function PlanSelectionPage() {
  const { state, dispatch } = useCheckout();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [schedule, setSchedule] = useState([]);

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

  // Highest monthly payment for the cost comparison bar
  const maxMonthly = Math.max(...planOptions.map((p) => p.monthlyPayment));

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

        {/* Plan list — single column */}
        <div className="flex flex-col gap-3">
          {planOptions.map((plan) => (
            <div key={plan.id}>
              <PlanCard
                plan={plan}
                isSelected={selectedPlan === plan.id}
                onSelect={handleSelectPlan}
                isRecommended={plan.feePercent === 0}
                maxMonthly={maxMonthly}
              />

              {/* Inline payment schedule for the selected plan */}
              {selectedPlan === plan.id && schedule.length > 0 && (
                <PaymentSchedule schedule={schedule} />
              )}
            </div>
          ))}
        </div>

        {/* Summary bar when a plan is selected */}
        {selectedPlan && (
          <div className="mt-5 flex items-center justify-between rounded-xl bg-gray-50 border border-gray-200 px-4 py-3">
            <div>
              <p className="text-xs text-gray-500">You pay today</p>
              <p className="text-sm font-bold text-gray-900">
                {formatCurrency(planOptions.find((p) => p.id === selectedPlan)?.monthlyPayment ?? 0)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Total with fees</p>
              <p className="text-sm font-bold text-gray-900">
                {formatCurrency(planOptions.find((p) => p.id === selectedPlan)?.totalWithFees ?? 0)}
              </p>
            </div>
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
    </PageShell>
  );
}
