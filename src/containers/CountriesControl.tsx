import React, { useState, useEffect } from 'react'
import { useStore } from '../store/store'
import Filters from '../components/Filters'
import Countries from '../components/Countries'
import Pagination from '../components/Pagination'
import { Country } from '../interfaces'

const Landing = (): JSX.Element => {
    const [state, dispatch] = useStore()
    const countries = state.filteredCountries as Country[]
    const currentPage = state.currentPage as number
    const countriesPerPage = state.countriesPerPage as number
    const [sortDirectionDesc, setSortDirection] = useState(false)
    const [header, setHeader] = useState({})

    function saveSortingValues(field: Record<string, string>, direction: boolean) {
        setSortDirection(direction)
        setHeader(field)
    }

    useEffect(() => {
        // fetch('http:
        //api.geonames.org/countryInfoJSON?username=vencator')
        //     .then(response => response.json())
        //     .then(data => {
        //         fetch('https://test-dec0e.firebaseio.com/countries.json', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json'
        //                 // 'Content-Type': 'application/x-www-form-urlencoded',
        //             },
        //             body: JSON.stringify(data.geonames)
        //         })
        //         console.log(data)
        //     })
        fetch('https://test-dec0e.firebaseio.com/countries.json')
            .then(response => response.json())
            .then(data => {
                let dataArray = []
                for (const key in data) {
                    dataArray = data[key]
                }
                dispatch('SET_ALL_COUNTRIES', dataArray)
                dispatch('SET_ALL_VISIBLE_COUNTRIES', dataArray)
                dispatch('PAGINATE_COUNTRIES', 1)
            })
    }, [])

    const paginate = (pageNumber: number) => {
        dispatch('PAGINATE_COUNTRIES', pageNumber)
    }

    return (
        <React.Fragment>
            <Pagination postsPerPage={countriesPerPage} totalPosts={countries.length} currentPage={currentPage} paginate={paginate} />
            <Filters header={header} sortDirectionDesc={sortDirectionDesc} />
            <Countries saveSortingValues={saveSortingValues} />
        </React.Fragment>
    )
}

export default Landing
