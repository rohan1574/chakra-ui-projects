// components/Pagination.js
import React from 'react';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

const MyPagination = ({ currentPage, totalItems, pageSize, handlePageChange }) => {
  return (
    <Pagination
      onChange={handlePageChange}
      current={currentPage}
      total={totalItems}
      pageSize={pageSize}
    />
  );
};

export default MyPagination;
