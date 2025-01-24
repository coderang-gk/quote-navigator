import React from 'react';

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onPageChange }) => {
  return (
    <div className="flex items-center justify-center gap-6 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-12 h-12 flex items-center justify-center rounded-full shadow-md transition-all duration-300 text-lg font-bold ${
          currentPage === 1
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-white text-black hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-500 hover:to-red-500 hover:text-white'
        }`}
      >
        ←
      </button>

      <span className="text-lg font-semibold bg-gray-900 text-white px-4 py-2 rounded-full shadow-md">
        Page {currentPage}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-black hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-500 hover:to-red-500 hover:text-white shadow-md transition-all duration-300 text-lg font-bold"
      >
        →
      </button>
    </div>
  );
};

export default Pagination;
