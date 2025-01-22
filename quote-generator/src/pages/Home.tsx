import React, { useEffect, useState } from 'react';
import { fetchQuotes } from '../utils/api';
import QuoteCard from '../components/QuoteCard';
import Pagination from '../components/Pagination';
import { Quote } from '../types/Quote';

const Home: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [favorites, setFavorites] = useState<Quote[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const limit = 3;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchQuotes(limit, (currentPage - 1) * limit);
      setQuotes(data);
      setLoading(false);
    };

    fetchData();
  }, [currentPage]);

  // Load favorites from localStorage on component mount
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
    <div className="container mx-auto p-4">
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quotes.map((quote) => (
            <QuoteCard
              key={quote.id}
              quote={quote}
              isFavorite={favorites.some((fav) => fav.id === quote.id)}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
      <Pagination currentPage={currentPage} onPageChange={handlePageChange} />

      <h2 className="text-2xl font-bold mt-8">Favorites</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {favorites.map((quote) => (
          <QuoteCard
            key={quote.id}
            quote={quote}
            isFavorite={true}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
