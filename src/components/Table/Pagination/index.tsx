import React from 'react';
import './style.scss';

interface IPaginationProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<IPaginationProps> = ({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className="pagination-container">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        上一页
      </button>
      <span className="pageCurrent">{currentPage}</span>
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage * pageSize >= totalItems}
      >
        下一页
      </button>
    </div>
  );
};
