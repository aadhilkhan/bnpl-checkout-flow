import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../../context/CheckoutContext';
import { formatCurrency, generatePaymentSchedule } from '../../utils/calculations';
import PageShell from '../layout/PageShell';
import AnimatedCheckmark from './AnimatedCheckmark';
import PaymentSchedule from '../plans/PaymentSchedule';

export default function SuccessPage() {
  const { state, dispatch } = useCheckout();
  const navigate = useNavigate();
  const [showSchedule, setShowSchedule] = useState(false);

  // Navigation guard
  useEffect(() => {
    if (!state.orderConfirmation) {
      navigate('/');
    }
  }, [state.orderConfirmation, navigate]);

  const handleBackToStore = () => {
    dispatch({ type: 'RESET' });
    navigate('/');
  };

  if (!state.orderConfirmation) return null;

  const order = state.orderConfirmation;
  const schedule = state.planDetails ? generatePaymentSchedule(state.planDetails) : [];

  return (
    <PageShell currentStep={5} showProgress={false}>
      <div className="max-w-lg mx-auto text-center">
        {/* Animated checkmark */}
        <div className="flex justify-center mb-6">
          <AnimatedCheckmark />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">Payment Successful!</h1>
        <p className="text-sm text-gray-500 mb-6">Your order has been confirmed</p>

        {/* Order details */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-left mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Order Details</h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Order ID</span>
              <span className="font-mono font-semibold text-gray-900">{order.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Date</span>
              <span className="text-gray-700">{order.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Plan</span>
              <span className="text-gray-700">{order.planMonths} monthly payments</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Monthly Amount</span>
              <span className="font-semibold text-gray-900">{formatCurrency(order.monthlyAmount)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-100">
              <span className="text-gray-500">Total</span>
              <span className="font-bold text-gray-900">{formatCurrency(order.totalAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Payment Method</span>
              <span className="text-gray-700">{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Next Payment</span>
              <span className="font-medium text-[#3A7DCF]">{order.nextPaymentDate}</span>
            </div>
          </div>
        </div>

        {/* Payment schedule toggle */}
        {showSchedule && (
          <div className="text-left mb-6">
            <PaymentSchedule schedule={schedule} />
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setShowSchedule(!showSchedule)}
            className="flex-1 py-3 px-6 rounded-xl font-semibold text-gray-900 border-2 border-gray-900 hover:bg-gray-50 active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            {showSchedule ? 'Hide Schedule' : 'View Payment Schedule'}
          </button>
          <button
            onClick={handleBackToStore}
            className="flex-1 py-3 px-6 rounded-xl font-semibold text-white bg-gray-900 hover:bg-black hover:shadow-lg active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            Back to Store
          </button>
        </div>
      </div>
    </PageShell>
  );
}
