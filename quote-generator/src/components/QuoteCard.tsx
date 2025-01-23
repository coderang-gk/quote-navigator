import React from 'react';
import { Quote } from '../types/Quote';

interface QuoteCardProps {
  quote: Quote;
  isFavorite: boolean;
  toggleFavorite: (quote: Quote) => void;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, isFavorite, toggleFavorite }) => {
  return (
    <div className="relative bg-gray-900 bg-opacity-50 p-6 rounded-xl shadow-lg max-w-sm flex flex-col justify-between">
      {/* Content */}
      <div>
        <p className="text-sm text-gray-400 mb-2">Quote</p>
        <p className="text-lg font-bold text-white">{quote.quote}</p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4">
        {/* Author Section */}
        <div className="flex items-center">
          {quote.authorImage && (
            <img
              src={quote.authorImage}
              alt={quote.author}
              className="w-8 h-8 rounded-full object-cover mr-3"
            />
          )}
          <p className="text-sm text-gray-400">{quote.author || 'Unknown'}</p>
        </div>

        {/* Favorites Button */}
        <button
          onClick={() => toggleFavorite(quote)}
          className={`flex items-center justify-center px-4 py-2 rounded-full shadow-lg text-sm font-semibold transition-transform transform duration-300 ${
            isFavorite
              ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white hover:scale-105 hover:shadow-xl'
              : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-gray-200 hover:scale-105 hover:shadow-md'
          }`}
        >
          {isFavorite ? '♥ Remove' : '♡ Add'}
        </button>
      </div>
    </div>
  );
};

export default QuoteCard;
