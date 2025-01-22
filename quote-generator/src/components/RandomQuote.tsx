import React, { useState, useEffect } from 'react';
import { fetchRandomQuote } from '../utils/api';
import QuoteCard from './QuoteCard';
import { Quote } from '../types/Quote';

const RandomQuote: React.FC = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [favorites, setFavorites] = useState<Quote[]>([]);

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
    const data = await fetchRandomQuote();
    setQuote(data);
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
    <div className="my-8 text-center">
      <button
        onClick={handleFetchQuote}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Get Random Quote
      </button>
      {quote && (
        <div className="mt-6">
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
