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
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-gray-900">Choose your payment plan</h1>
          <p className="text-sm text-gray-500 mt-1">
            Total: <span className="font-semibold text-gray-700">{formatCurrency(state.cartTotal)}</span>
          </p>
        </div>

        {/* Plan grid */}
        <div className="grid grid-cols-2 gap-4">
          {planOptions.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isSelected={selectedPlan === plan.id}
              onSelect={handleSelectPlan}
            />
          ))}
        </div>

        {/* Payment schedule */}
        {schedule.length > 0 && <PaymentSchedule schedule={schedule} />}

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
