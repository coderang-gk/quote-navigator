import React from 'react';

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onPageChange }) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded ${
          currentPage === 1
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        Previous
      </button>
      <span className="text-lg font-semibold">{`Page ${currentPage}`}</span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
