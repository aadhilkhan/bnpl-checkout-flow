export default function SavedCard({ card, isSelected, onSelect }) {
  const brandColors = {
    visa: 'text-blue-700',
    mastercard: 'text-orange-600',
  };

  const brandLabels = {
    visa: 'VISA',
    mastercard: 'MC',
  };

  return (
    <button
      onClick={() => onSelect(card.id)}
      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer text-left ${
        isSelected
          ? 'border-[#3A7DCF] bg-[#3A7DCF]/5'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      {/* Radio */}
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
        isSelected ? 'border-[#3A7DCF]' : 'border-gray-300'
      }`}>
        {isSelected && <div className="w-2.5 h-2.5 bg-[#3A7DCF] rounded-full" />}
      </div>

      {/* Card brand */}
      <div className={`w-10 h-7 rounded border border-gray-200 flex items-center justify-center text-[10px] font-bold ${brandColors[card.brand]}`}>
        {brandLabels[card.brand]}
      </div>

      {/* Card info */}
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">
          •••• {card.last4}
          {card.isDefault && (
            <span className="ml-2 text-[10px] font-medium text-[#3A7DCF] bg-[#3A7DCF]/10 px-1.5 py-0.5 rounded">
              Default
            </span>
          )}
        </p>
        <p className="text-xs text-gray-500">Expires {card.expiry}</p>
      </div>
    </button>
  );
}
