import React from 'react';
import { Quote } from '../types/Quote';

interface QuoteCardProps {
  quote: Quote;
  isFavorite: boolean;
  toggleFavorite: (quote: Quote) => void;
  darkMode: boolean; 
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, isFavorite, toggleFavorite, darkMode }) => {
  return (
    <div
      className={`relative p-6 rounded-xl shadow-lg max-w-sm flex flex-col justify-between ${
        darkMode
          ? 'bg-gray-900 bg-opacity-50 text-white'
          : 'bg-gray-100 text-gray-900'
      }`}
    >
      <div>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
          Quote
        </p>
        <p className="text-lg font-bold">{quote.quote}</p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center">
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {quote.author || 'Unknown'}
          </p>
        </div>

        <button
          onClick={() => toggleFavorite(quote)}
          className={`flex items-center justify-center px-4 py-2 rounded-full shadow-lg text-sm font-semibold transition-transform transform duration-300 ${
            isFavorite
              ? `${
                  darkMode
                    ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white'
                    : 'bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 text-white'
                } hover:scale-105 hover:shadow-xl`
              : `${
                  darkMode
                    ? 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-gray-200'
                    : 'bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-gray-800'
                } hover:scale-105 hover:shadow-md`
          }`}
        >
          {isFavorite ? '♥ Remove' : '♡ Add'}
        </button>
      </div>
    </div>
  );
};

export default QuoteCard;