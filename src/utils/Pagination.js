import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [...Array(totalPages).keys()].map(i => i + 1);

  return (
    <div>
      {pages.map(page => (
        <button key={page} disabled={page === currentPage} onClick={() => onPageChange(page)}>
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
