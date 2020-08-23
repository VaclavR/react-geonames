import React, { useState } from 'react'
import CountryRow from './CountryRow'
import { Country } from '../interfaces'
import CSS from 'csstype'

interface CountriesProps {
    countries: Country[]
}
const thStyles: CSS.Properties = {
    textAlign: 'left',
    paddingRight: '5px',
    borderBottom: '1px solid black',
    cursor: 'pointer'
}

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
    }
]

const Countries = (props: CountriesProps): JSX.Element => {
    console.log('countries render')
    const [countries, setCountries] = useState(props.countries)
    const [sortDirectionDesc, setSortDirection] = useState(false)
    const [sortField, setSortField] = useState('countryCode')

    const sortingHandler = (header: Record<string, string>): void => {
        setSortField(header.propName)
        let sortedCountries: Country[]
        if (sortDirectionDesc) {
            if (header.type === 'number') {
                sortedCountries = [...countries.sort((a, b) => +a[header.propName] - +b[header.propName])]
            } else {
                sortedCountries = [...countries.sort((a, b) => +(a[header.propName] > b[header.propName]) - +(a[header.propName] < b[header.propName]))]
            }
        } else {
            if (header.type === 'number') {
                sortedCountries = [...countries.sort((a, b) => +b[header.propName] - +a[header.propName])]
            } else {
                sortedCountries = [...countries.sort((a, b) => +(a[header.propName] < b[header.propName]) - +(a[header.propName] > b[header.propName]))]
            }
        }
        setSortDirection(!sortDirectionDesc)
        setCountries(sortedCountries)
    }
    const tableHeaders = tableHeadersData.map((header) => {
        const claret = header.propName === sortField ? sortDirectionDesc ? '↑' : '↓' : '\u00A0\u00A0'
        return <th key={header.name} style={thStyles} onClick={() => sortingHandler(header)}>{header.name}{claret}</th>
    })
    const countriesRows = countries.map((country: Country) => <CountryRow key={country.countryCode} country={country} />)

    return (
        <table style={{borderCollapse: 'collapse'}}>
            <thead>
                <tr>
                    {tableHeaders}
                </tr>
            </thead>
            <tbody>
                {countriesRows}
            </tbody>
        </table>
    )
}

export default Countries
