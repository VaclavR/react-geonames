import React, { useState } from 'react'
import CountryRow from './CountryRow'
import { useStore } from '../store/store'
import { Country, CountriesProps } from '../interfaces'
import styles from './Countries.css'

const tableHeadersData = [
    {
        name: 'Code',
        propName: 'countryCode',
        type: 'string'
    },
    {
        name: 'Country Name',
        propName: 'countryName',
        type: 'string'
    },
    {
        name: 'Capital',
        propName: 'capital',
        type: 'string'
    },
    {
        name: 'Continent',
        propName: 'continentName',
        type: 'string'
    },
    {
        name: 'Population',
        propName: 'population',
        type: 'number'
    },
    {
        name: 'Area',
        propName: 'areaInSqKm',
        type: 'number'
    },
    {
        name: 'Density',
        propName: 'density',
        type: 'number'
    }
]

const Countries = (props: CountriesProps): JSX.Element => {
    const [state, dispatch] = useStore()
    const countries = state.paginatedCountries as Country[]
    const [sortDirectionDesc, setSortDirection] = useState(false)
    const [sortField, setSortField] = useState('countryCode')

    const sortingHandler = (header: Record<string, string>): void => {
        setSortField(header.propName)
        dispatch('SORT_COUNTRIES', {header, sortDirectionDesc})
        setSortDirection(!sortDirectionDesc)
        props.saveSortingValues(header, sortDirectionDesc)
    }
    const tableHeaders = tableHeadersData.map((header) => {
        const claret = header.propName === sortField ? sortDirectionDesc ? '↑' : '↓' : '\u00A0\u00A0'
        return <th key={header.name} onClick={() => sortingHandler(header)}>{header.name}{claret}</th>
    })
    const countryRows = countries.map((country: Country) => <CountryRow key={country.countryCode} country={country} />)

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    {tableHeaders}
                </tr>
            </thead>
            <tbody>
                {countryRows}
            </tbody>
        </table>
    )
}

export default Countries
