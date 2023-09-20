import React from 'react'
import './Pagination.css'

interface IPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  displayRange?: number
}

const Pagination: React.FC<IPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  displayRange = 2
}) => {

  const renderPages = () => {
    const pageElements = []
    let prevPage = 0

    for (let page = 1; page <= totalPages; page++) {
      if (
        page === 1 ||
        page === totalPages ||
        Math.abs(page - currentPage) <= displayRange
      ) {
        if (prevPage !== page - 1) {
          pageElements.push(
            <button key={`ellipsis-${page}`} className='ellipsis' disabled>
              ...
            </button>
          )
        }

        pageElements.push(
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={page === currentPage ? 'active' : ''}>
            {page}
          </button>
        )

        prevPage = page
      }
    }

    return pageElements
  }

  return (
    <div className='pagination-container'>
      <div className='pagination'>{renderPages()}</div>
    </div>
  )
}

export default Pagination
