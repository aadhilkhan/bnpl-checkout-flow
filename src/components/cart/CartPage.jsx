import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../../context/CheckoutContext';
import PageShell from '../layout/PageShell';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

export default function CartPage() {
  const { state, dispatch } = useCheckout();
  const navigate = useNavigate();

  const handlePhoneChange = (e) => {
    dispatch({ type: 'UPDATE_PHONE', payload: e.target.value });
  };

  const handleCheckout = () => {
    dispatch({ type: 'INIT_CART' });
    navigate('/verify');
  };

  return (
    <PageShell currentStep={1}>
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
              <input
                type="tel"
                value={state.phoneNumber}
                onChange={handlePhoneChange}
                className="w-full h-11 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3A7DCF] focus:border-transparent"
                placeholder="+971 50 123 4567"
              />
              <p className="text-[10px] text-gray-400 mt-1">OTP will be sent to this number</p>
            </div>

            <CartSummary total={state.cartTotal} onCheckout={handleCheckout} />
          </div>
        </div>
      </div>
    </PageShell>
  );
}
