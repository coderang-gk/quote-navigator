import React, { useEffect, useState } from 'react';
import { fetchQuotes } from '../utils/api';
import QuoteCard from '../components/QuoteCard';
import Pagination from '../components/Pagination';
import RandomQuote from '../components/RandomQuote';
import { Quote } from '../types/Quote';

interface HomeProps {
  darkMode: boolean;
}

const Home: React.FC<HomeProps> = ({ darkMode }) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [favorites, setFavorites] = useState<Quote[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingPlaceholders, setLoadingPlaceholders] = useState(false);

  const limit = 3;

  // Load quotes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        setLoadingPlaceholders(false);
        const data = await fetchQuotes(limit, (currentPage - 1) * limit);
        setQuotes(data);
      } catch (err) {
        setError('Failed to fetch quotes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  // Load favorites from local storage on mount
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (err) {
      console.error('Failed to load favorites from local storage:', err);
    }
  }, []);

  // Save favorites to local storage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (err) {
      console.error('Failed to save favorites to local storage:', err);
    }
  }, [favorites]);

  const handlePageChange = (page: number) => {
    setLoadingPlaceholders(true);
    setCurrentPage(page);
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
    <div>
      {/* Title */}
      <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-2">
        Quotes
      </h1>
      <h1 className="text-5xl text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-4">
        Gallery
      </h1>

      {/* Random Quote Section */}
      <section className="mb-12 flex justify-center items-center">
        <RandomQuote />
      </section>

      {/* Quotes Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-center mb-6">All Quotes</h2>

        {error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loadingPlaceholders
                ? Array(limit)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        key={index}
                        className={`${
                          darkMode ? 'bg-gray-700' : 'bg-gray-300'
                        } p-6 rounded-xl shadow-md animate-pulse`}
                      >
                        <div className={`h-6 ${darkMode ? 'bg-gray-500' : 'bg-gray-400'} rounded mb-4`}></div>
                        <div className={`h-4 ${darkMode ? 'bg-gray-500' : 'bg-gray-400'} rounded mb-2`}></div>
                        <div className={`h-4 ${darkMode ? 'bg-gray-500' : 'bg-gray-400'} rounded w-2/3`}></div>
                      </div>
                    ))
                : quotes.map((quote) => (
                    <QuoteCard
                      key={quote.id}
                      quote={quote}
                      isFavorite={favorites.some((fav) => fav.id === quote.id)}
                      toggleFavorite={toggleFavorite}
                      darkMode={darkMode}
                    />
                  ))}
            </div>

            <div className="mt-8">
              <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
            </div>
          </div>
        )}
      </section>

      {/* Favorites Section */}
      <section>
        <h2 className="text-2xl font-bold text-center mb-6">Favorites</h2>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((quote) => (
              <QuoteCard
                key={quote.id}
                quote={quote}
                isFavorite={true}
                toggleFavorite={toggleFavorite}
                darkMode={darkMode}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">No favorites yet. Add some!</p>
        )}
      </section>
    </div>
  );
};

export default Home;
