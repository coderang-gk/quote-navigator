import React, { useState, useEffect } from 'react';
import { fetchRandomQuote } from '../utils/api';
import QuoteCard from './QuoteCard';
import { Quote } from '../types/Quote';

// Import Font Awesome Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom } from '@fortawesome/free-solid-svg-icons';

const RandomQuote: React.FC = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [favorites, setFavorites] = useState<Quote[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleFetchQuote = async () => {
    setIsAnimating(true); // Start animation
    const data = await fetchRandomQuote();
    setTimeout(() => {
      setQuote(data); // Set the new quote after the animation
      setIsAnimating(false); // End animation
    }, 300); // Matches the animation duration
  };

  const toggleFavorite = (quote: Quote) => {
    const isFavorite = favorites.some((fav) => fav.id === quote.id);
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== quote.id));
    } else {
      setFavorites([...favorites, quote]);
    }
  };

  return (
    <div className="my-8 flex flex-col items-center">
      {/* Stylish Button with Icon */}
      <button
        onClick={handleFetchQuote}
        className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out flex items-center gap-3"
      >
        <FontAwesomeIcon icon={faRandom} className="text-lg" /> {/* Icon */}
        Get Random Quote
      </button>

      {/* Random Quote Card */}
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
          />
        </div>
      )}
    </div>
  );
};

export default RandomQuote;
