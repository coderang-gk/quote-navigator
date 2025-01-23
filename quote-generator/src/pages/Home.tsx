import React, { useEffect, useState } from 'react';
import { fetchQuotes } from '../utils/api';
import QuoteCard from '../components/QuoteCard';
import Pagination from '../components/Pagination';
import RandomQuote from '../components/RandomQuote';
import { Quote } from '../types/Quote';

const Home: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [favorites, setFavorites] = useState<Quote[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const limit = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchQuotes(limit, (currentPage - 1) * limit);
        setQuotes(data);
      } catch (error) {
        setError('Failed to fetch quotes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Failed to load favorites from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handlePageChange = (page: number) => {
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
    <div className="checkered-bg min-h-screen px-8 py-8">
      <div className="container mx-auto">
        {/* Title */}
        <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-12">
          Quotes Gallery
        </h1>

        {/* Random Quote Section */}
        <section className="mb-12">
          <RandomQuote />
        </section>

        {/* Quotes Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white text-center mb-6">All Quotes</h2>

          {loading ? (
            <div className="flex justify-center items-center">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {quotes.map((quote) => (
                  <QuoteCard
                    key={quote.id}
                    quote={quote}
                    isFavorite={favorites.some((fav) => fav.id === quote.id)}
                    toggleFavorite={toggleFavorite}
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
          <h2 className="text-2xl font-bold text-white text-center mb-6">Favorites</h2>

          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {favorites.map((quote) => (
                <QuoteCard
                  key={quote.id}
                  quote={quote}
                  isFavorite={true}
                  toggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">No favorites yet. Add some!</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
