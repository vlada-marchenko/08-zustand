'use client'

import css from './Pagination.module.css';
import ReactPaginate from 'react-paginate'

export interface PaginationParams {
    page: number,
    totalPages: number,
    onPageChange: (page: number) => void
}

export default function Pagination({page, totalPages, onPageChange}: PaginationParams) {
    return <ReactPaginate 
      pageCount={totalPages}
      pageRangeDisplayed={4}
      marginPagesDisplayed={1}
      initialPage={page - 1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
}