import { savedCards } from '../../data/mockData';
import SavedCard from './SavedCard';

export default function SavedCardList({ selectedCardId, onSelectCard }) {
  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-3">Saved payment methods</h3>
      <div className="space-y-2">
        {savedCards.map((card) => (
          <SavedCard
            key={card.id}
            card={card}
            isSelected={selectedCardId === card.id}
            onSelect={onSelectCard}
          />
        ))}
      </div>
    </div>
  );
}
