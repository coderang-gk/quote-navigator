import React from 'react';
import Home from './pages/Home';
import RandomQuote from './components/RandomQuote';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-checkered text-gray-800">
      
      <main className="container mx-auto px-4 py-8">
        <Home />
      </main>
    </div>
  );
};

export default App;
