
import React, { useState, useEffect } from 'react';
import { fetchRandomQuote } from '../utils/api';
import QuoteCard from './QuoteCard';
import { Quote } from '../types/Quote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom } from '@fortawesome/free-solid-svg-icons';

interface RandomQuoteProps {
  darkMode: boolean;
  favorites: Quote[];
  setFavorites: React.Dispatch<React.SetStateAction<Quote[]>>;
}
const RandomQuote: React.FC<RandomQuoteProps> = ({ darkMode, favorites, setFavorites }) => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFetchQuote = async () => {
    setIsAnimating(true);
    try {
      const data = await fetchRandomQuote();
      setTimeout(() => {
        setQuote(data);
        setIsAnimating(false);
      }, 300);
    } catch (error) {
      console.error('Failed to fetch random quote:', error);
      setIsAnimating(false);
    }
  };

  const toggleFavorite = (selectedQuote: Quote) => {
    const isFavorite = favorites.some((fav) => fav.id === selectedQuote.id);
    const updatedFavorites = isFavorite
      ? favorites.filter((fav) => fav.id !== selectedQuote.id)
      : [...favorites, selectedQuote];
    setFavorites(updatedFavorites);
  };

  return (
    <div className="my-8 flex flex-col items-center">
      <button
        onClick={handleFetchQuote}
        className={`flex items-center gap-3 px-8 py-4 rounded-full shadow-lg font-semibold transform transition-transform duration-300 ease-in-out ${
          darkMode
            ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white hover:shadow-xl hover:scale-105'
            : 'bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 text-black hover:shadow-xl hover:scale-105'
        }`}
      >
        <FontAwesomeIcon icon={faRandom} className="text-lg" />
        Get Random Quote
      </button>

      {quote && (
        <div
          className={`random-quote-bg mt-6 max-w-md w-full transition-opacity duration-300 ${
            isAnimating ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <QuoteCard
            quote={quote}
            isFavorite={favorites.some((fav) => fav.id === quote.id)}
            toggleFavorite={toggleFavorite}
            darkMode={darkMode}
          />
        </div>
      )}
    </div>
  );
};

export default RandomQuote;