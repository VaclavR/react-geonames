import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Filters from '../components/Filters'
import Countries from '../components/Countries'
import Pagination from '../components/Pagination'
import { State, TableHeader } from '../interfaces'
import styles from './CountriesControl.css'
import { paginateCountries } from '../store/actions'

const CountriesControl = (): JSX.Element => {
    const dispatch = useDispatch()
    const countriesLength = useSelector((state: State) => state.filteredCountries.length)
    const currentPage = useSelector((state: State) => state.currentPage as number)
    const countriesPerPage = useSelector((state: State) => state.countriesPerPage as number)
    const [sortDirectionDesc, setSortDirection] = useState(false)
    const [header, setHeader] = useState({} as TableHeader)

    function saveSortingValues(field: TableHeader, direction: boolean) {
        setSortDirection(direction)
        setHeader(field)
    }

    const paginate = (pageNumber: number) => {
        dispatch(paginateCountries(pageNumber))
    }

    return (
        <div className={styles.countriesControl}>
            <Filters header={header} sortDirectionDesc={sortDirectionDesc} />
            <Pagination postsPerPage={countriesPerPage} totalPosts={countriesLength} currentPage={currentPage} paginate={paginate} />
            <Countries saveSortingValues={saveSortingValues} />
        </div>
    )
}

export default CountriesControl
