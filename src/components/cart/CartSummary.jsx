import { formatCurrency } from '../../utils/calculations';

export default function CartSummary({ total, onCheckout }) {
  const monthlyEstimate = total / 4;

  return (
    <div className="mt-4 pt-4 border-t border-gray-200">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-gray-500">Subtotal</span>
        <span className="text-sm text-gray-700">{formatCurrency(total)}</span>
      </div>
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-gray-500">Shipping</span>
        <span className="text-sm text-green-600 font-medium">Free</span>
      </div>
      <div className="flex justify-between items-center mb-4 pt-3 border-t border-gray-200">
        <span className="text-base font-bold text-gray-900">Total</span>
        <span className="text-base font-bold text-gray-900">{formatCurrency(total)}</span>
      </div>

      <div className="bg-[#3A7DCF]/10 rounded-xl p-3 mb-4 text-center">
        <p className="text-xs text-[#3A7DCF]">
          Or split into <span className="font-bold">4 interest-free payments</span> of{' '}
          <span className="font-bold">{formatCurrency(monthlyEstimate)}</span>/mo
        </p>
      </div>

      <button
        onClick={onCheckout}
        className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-gray-900 hover:bg-black hover:shadow-lg active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
      >
        <span>Checkout with</span>
        <img src="/tabby-logo.png" alt="Tabby" className="h-5" />
      </button>
    </div>
  );
}
