import React from 'react';
import Home from './pages/Home';
import RandomQuote from './components/RandomQuote';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-checkered text-gray-800">
      <header className="bg-blue-600 text-white text-center py-6">
        <h1 className="text-3xl font-bold">Quote Generator</h1>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Home />
      </main>
    </div>
  );
};

export default App;
