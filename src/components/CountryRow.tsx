import React from 'react'
import {Country} from '../interfaces'
import CSS from 'csstype';

interface CountryProps {
    country: Country
}
const tdStyles: CSS.Properties = {
    paddingRight: '10px',
}
const CountryRow = (props: CountryProps): JSX.Element => {

    return (
        <tr>
            <td style={tdStyles}>{props.country.countryCode}</td>
            <td style={tdStyles}>{props.country.countryName}</td>
            <td style={tdStyles}>{props.country.capital}</td>
            <td style={tdStyles}>{props.country.continentName}</td>
            <td style={tdStyles}>{props.country.population}</td>
            <td style={tdStyles}>{props.country.areaInSqKm}</td>
        </tr>
    )
}

export default CountryRow
