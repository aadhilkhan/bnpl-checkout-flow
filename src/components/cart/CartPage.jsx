import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../../context/CheckoutContext';
import { MERCHANT_NAME } from '../../data/mockData';
import PageShell from '../layout/PageShell';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

export default function CartPage() {
  const { state, dispatch } = useCheckout();
  const navigate = useNavigate();

  const handleCheckout = () => {
    dispatch({ type: 'INIT_CART' });
    navigate('/verify');
  };

  return (
    <PageShell currentStep={1}>
      {/* Merchant header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-sm">TS</span>
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900">{MERCHANT_NAME}</h1>
          <p className="text-xs text-gray-500">Your shopping cart</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Cart items */}
        <div className="md:col-span-3 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-2">
            Cart ({state.cartItems.length} items)
          </h2>
          {state.cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Summary & checkout */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:sticky md:top-6">
            <h2 className="font-semibold text-gray-900 mb-3">Order Summary</h2>

            {/* Phone number */}
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-500 mb-1">Phone Number</label>
              <div className="h-11 rounded-lg border border-gray-300 bg-gray-50 px-3 flex items-center text-sm text-gray-700">
                {state.phoneNumber}
              </div>
              <p className="text-[10px] text-gray-400 mt-1">OTP will be sent to this number</p>
            </div>

            <CartSummary total={state.cartTotal} onCheckout={handleCheckout} />
          </div>
        </div>
      </div>
    </PageShell>
  );
}
