import React from 'react';
import { Quote } from '../types/Quote';

interface QuoteCardProps {
  quote: Quote;
  isFavorite: boolean;
  toggleFavorite: (quote: Quote) => void;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, isFavorite, toggleFavorite }) => {
  return (
    <div className="border border-gray-300 p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow">
      <p className="text-xl font-medium text-gray-700 italic">"{quote.quote}"</p>
      <p className="text-right text-sm font-semibold text-blue-600 mt-4">
        - {quote.author || 'Unknown'}
      </p>
      <button
        onClick={() => toggleFavorite(quote)}
        className={`mt-4 px-4 py-2 rounded ${
          isFavorite ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'
        }`}
      >
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default QuoteCard;
