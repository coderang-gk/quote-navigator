import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import Home from './pages/Home';
import RandomQuote from './components/RandomQuote';
import { Quote } from './types/Quote';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    return storedDarkMode ? JSON.parse(storedDarkMode) : true; 
  });

  const [favorites, setFavorites] = useState<Quote[]>(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? 'bg-checkered dark-mode text-white' : 'bg-checkered text-gray-800'
      }`}
    >
      <div className="container mx-auto flex justify-end py-4 px-4">
        <button
          onClick={toggleDarkMode}
          className={`px-4 py-2 flex items-center space-x-2 rounded ${
            darkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-800'
          } shadow hover:shadow-lg transition`}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-2">
          Quotes
        </h1>
        <h1 className="text-5xl text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-4">
          Gallery
        </h1>

        <section className="mb-12 flex justify-center items-center">
          <RandomQuote darkMode={darkMode} favorites={favorites} setFavorites={setFavorites} />
        </section>

        <Home darkMode={darkMode} favorites={favorites} setFavorites={setFavorites} />
      </main>
    </div>
  );
};

export default App;

