import React from 'react'
import { Country } from '../interfaces'
import styles from './Countries.css'

interface CountryProps {
    country: Country
}

const CountryRow = (props: CountryProps): JSX.Element => {
    return (
        <tr>
            <td>{props.country.countryCode}</td>
            <td><span className={styles.flag}><img src={props.country.flag}/></span>{props.country.countryName}</td>
            <td>{props.country.capital}</td>
            <td>{props.country.continentName}</td>
            <td>{props.country.population}</td>
            <td>{props.country.currencyCode}</td>
            <td style={{ whiteSpace: 'nowrap' }}>{+props.country.areaInSqKm} km<sup>2</sup></td>
            <td style={{ whiteSpace: 'nowrap' }}>{props.country.density} &#50883;/km<sup>2</sup></td>
        </tr>
    )
}

export default CountryRow
