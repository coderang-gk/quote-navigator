// Home Component
import React, { useEffect, useState } from 'react';
import { fetchQuotes } from '../utils/api';
import QuoteCard from '../components/QuoteCard';
import Pagination from '../components/Pagination';
import { Quote } from '../types/Quote';

interface HomeProps {
  darkMode: boolean;
  favorites: Quote[];
  setFavorites: React.Dispatch<React.SetStateAction<Quote[]>>;
}

const Home: React.FC<HomeProps> = ({ darkMode, favorites, setFavorites }) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingPlaceholders, setLoadingPlaceholders] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const limit = 3;

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, [setFavorites]);

  const toggleFavorite = (quote: Quote) => {
    const isFavorite = favorites.some((fav) => fav.id === quote.id);
    const updatedFavorites = isFavorite
      ? favorites.filter((fav) => fav.id !== quote.id)
      : [...favorites, quote];
    setFavorites(updatedFavorites);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoadingPlaceholders(true);
      try {
        const data = await fetchQuotes(limit, (currentPage - 1) * limit);
        setQuotes(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch quotes. Please try again later.');
      } finally {
        setLoadingPlaceholders(false);
      }
    };

    fetchData();
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
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
                        <div
                          className={`h-6 ${
                            darkMode ? 'bg-gray-500' : 'bg-gray-400'
                          } rounded mb-4`}
                        ></div>
                        <div
                          className={`h-4 ${
                            darkMode ? 'bg-gray-500' : 'bg-gray-400'
                          } rounded mb-2`}
                        ></div>
                        <div
                          className={`h-4 ${
                            darkMode ? 'bg-gray-500' : 'bg-gray-400'
                          } rounded w-2/3`}
                        ></div>
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