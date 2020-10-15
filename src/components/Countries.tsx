import React, { useState } from 'react'
import CountryRow from './CountryRow'
import { useDispatch, useSelector } from 'react-redux'
import { Country, CountriesProps, State, TableHeader } from '../interfaces'
import styles from './Countries.css'
import { sortCountries } from '../store/actions'

const tableHeadersData: TableHeader[] = [
    {
        name: 'Code',
        propName: 'countryCode',
        type: 'string',
        width: '75px'
    },
    {
        name: 'Country',
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
        name: 'Cur.',
        propName: 'currencyCode',
        type: 'string',
        tooltip: 'Currency'
    },
    {
        name: 'Land Mass',
        propName: 'areaInSqKm',
        type: 'number',
        width: '116px'
    },
    {
        name: 'Density',
        propName: 'density',
        type: 'number',
        width: '132px'
    }
]

const Countries = (props: CountriesProps): JSX.Element => {
    const dispatch = useDispatch()
    const countries = useSelector((state: State) => state.paginatedCountries as Country[])
    const [sortDirectionDesc, setSortDirection] = useState(false)
    const [sortField, setSortField] = useState('countryCode')

    const sortingHandler = (header: TableHeader): void => {
        setSortField(header.propName)
        dispatch(sortCountries({ header, sortDirectionDesc }))
        setSortDirection(!sortDirectionDesc)
        props.saveSortingValues(header, sortDirectionDesc)
    }
    const tableHeaders = tableHeadersData.map((header) => {
        const claret = header.propName === sortField ? sortDirectionDesc ? '↑' : '↓' : '\u00A0\u00A0'
        return (
            <th
                key={header.name}
                style={{ minWidth: header.width }}
                title={header.tooltip}
                onClick={() => sortingHandler(header)}>
                {header.name}{claret}
            </th>
        )
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
