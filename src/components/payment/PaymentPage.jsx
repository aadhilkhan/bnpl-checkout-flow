import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../../context/CheckoutContext';
import { savedCards } from '../../data/mockData';
import { formatCurrency, generateOrderId } from '../../utils/calculations';
import PageShell from '../layout/PageShell';
import SavedCardList from './SavedCardList';
import AddCardForm from './AddCardForm';
import PlanSummaryCard from './PlanSummaryCard';

export default function PaymentPage() {
  const { state, dispatch } = useCheckout();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // Navigation guard
  useEffect(() => {
    if (!state.isAuthenticated) {
      navigate('/verify');
    } else if (!state.planDetails) {
      navigate('/plans');
    }
  }, [state.isAuthenticated, state.planDetails, navigate]);

  const handleSelectCard = (cardId) => {
    dispatch({ type: 'SELECT_CARD', payload: cardId });
  };

  const handleNewCard = (cardData) => {
    dispatch({ type: 'SET_NEW_CARD', payload: cardData });
  };

  const handlePay = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const selectedCard = state.selectedCardId
      ? savedCards.find((c) => c.id === state.selectedCardId)
      : null;

    const paymentMethod = selectedCard
      ? `${selectedCard.brand === 'visa' ? 'Visa' : 'Mastercard'} •••• ${selectedCard.last4}`
      : `Card •••• ${state.newCardData?.number?.slice(-4) || '0000'}`;

    const nextDate = new Date();
    nextDate.setMonth(nextDate.getMonth() + 1);

    dispatch({
      type: 'PAYMENT_CONFIRMED',
      payload: {
        orderId: generateOrderId(),
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        planMonths: state.planDetails.months,
        monthlyAmount: state.planDetails.monthlyPayment,
        totalAmount: state.planDetails.totalWithFees,
        paymentMethod,
        nextPaymentDate: nextDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      },
    });
    navigate('/success');
  };

  const canPay = state.selectedCardId || state.newCardData;

  if (!state.planDetails) return null;

  return (
    <PageShell currentStep={4}>
      <h1 className="text-xl font-bold text-gray-900 mb-6">Review & Pay</h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Left: Payment methods */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <SavedCardList
              selectedCardId={state.selectedCardId}
              onSelectCard={handleSelectCard}
            />
            <AddCardForm onCardData={handleNewCard} />
          </div>

          {/* Pay button (mobile: below form, desktop: below form too) */}
          <button
            onClick={handlePay}
            disabled={!canPay || isProcessing}
            className="w-full mt-6 py-3 px-6 rounded-xl font-semibold text-white bg-gray-900 hover:bg-black hover:shadow-lg active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:active:scale-100 cursor-pointer"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processing payment...
              </span>
            ) : (
              `Pay ${formatCurrency(state.planDetails.monthlyPayment)}`
            )}
          </button>
        </div>

        {/* Right: Order summary */}
        <div className="md:col-span-2">
          <PlanSummaryCard
            cartTotal={state.cartTotal}
            planDetails={state.planDetails}
          />
        </div>
      </div>
    </PageShell>
  );
}
