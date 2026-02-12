import { formatCurrency } from '../../utils/calculations';

export default function CartItem({ item }) {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0">
      <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-2xl shrink-0">
        {item.image}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm text-gray-900 truncate">{item.name}</h3>
        <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
        <p className="text-xs text-gray-400 mt-1">Qty: {item.quantity}</p>
      </div>
      <div className="text-sm font-semibold text-gray-900 shrink-0">
        {formatCurrency(item.price)}
      </div>
    </div>
  );
}
