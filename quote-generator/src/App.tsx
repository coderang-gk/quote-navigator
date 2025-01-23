import React, { useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import Home from './pages/Home';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen bg-checkered ${darkMode ? 'dark-mode' : ''}`}>
      {/* Dark Mode Toggle */}
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
        <Home darkMode={darkMode} />
      </main>
    </div>
  );
};

export default App;
