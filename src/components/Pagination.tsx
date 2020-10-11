import React from 'react'
import { PaginationProps } from '../interfaces'
import styles from './Pagination.css'

const Pagination = ({ postsPerPage, totalPosts, currentPage, paginate }: PaginationProps): JSX.Element|null => {
    const totalPages = Math.ceil(totalPosts / postsPerPage)
    if (totalPages < 2) return null
    const pageNumbers = []

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className={styles.pagination}>
                {pageNumbers.map(pageNumber => {
                    const pageItemClass = currentPage === pageNumber ? styles.active : ''
                    return (
                        <li key={pageNumber} className={pageItemClass} onClick={() => paginate(pageNumber)}>
                            {pageNumber}
                        </li>
                    )})}
            </ul>
        </nav>
    )
}

export default Pagination
