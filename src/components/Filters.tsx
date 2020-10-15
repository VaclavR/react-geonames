import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InputAttributes, SelectOption, Country, FiltersProps, State } from '../interfaces'
import Input from './formElements/Input'
import Select from './formElements/Select'
import { filterCountries } from '../store/actions'
import styles from './Filters.css'

const continentSelectOptions: SelectOption[] = [{ value: '', name: 'All Continents' }]
const currenciesSelectOptions: SelectOption[] = [{ value: '', name: 'All Currencies' }]

const Filters = ({ header, sortDirectionDesc }: FiltersProps): JSX.Element => {
    const dispatch = useDispatch()
    const countries = useSelector((state: State) => state.countries)
    const [queryFilter, setQueryFilter] = useState('')
    const [continentFilter, setContinentFilter] = useState('')
    const [currenciesFilter, setCurrenciesFilter] = useState('')

    const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value
        setQueryFilter(value)
    }

    const handleContinentSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        const value = event.target.value
        setContinentFilter(value)
    }

    const handleCurrenciesSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        const value = event.target.value
        setCurrenciesFilter(value)
    }

    useEffect(() => {
        handleSubmit()
    }, [queryFilter, continentFilter, currenciesFilter])

    const inputAttributes: InputAttributes = {
        type: 'text',
        name: 'search',
        placeholder: 'Search',
        autoComplete: 'off'
    }

    function handleSubmit() {
        dispatch(filterCountries({
            query: { value: queryFilter },
            continent: { type: 'continentName', value: continentFilter },
            currency: { type: 'currencyCode', value: currenciesFilter },
            sortProperties: {
                header, sortDirectionDesc
            }
        }))
    }

    // get all continents from countries array - overkill - simple hardcoded array should be enough
    if (countries.length && continentSelectOptions.length === 1) {
        const continents = new Set([...countries].map((country: Country) => country.continentName))
        continents.forEach((continent) => {
            continentSelectOptions.push({ name: continent, value: continent })
        })
    }

    // get all currencies from countries array - overkill - simple hardcoded array should be enough
    if (countries.length && currenciesSelectOptions.length === 1) {
        const currencies = new Set([...countries].map((country: Country) => country.currencyCode))
        currencies.forEach((currency) => {
            currenciesSelectOptions.push({ name: currency, value: currency })
        })
    }

    return (
        <section>
            <div>
                <fieldset className={styles.fieldset}>
                    <Input
                        inputAttributes={inputAttributes}
                        onChangeHandler={handleSearchInput}
                        value={queryFilter}
                    />
                    <Select
                        options={continentSelectOptions}
                        onChangeHandler={handleContinentSelect}
                        value={continentFilter}
                    />
                    <Select
                        options={currenciesSelectOptions}
                        onChangeHandler={handleCurrenciesSelect}
                        value={currenciesFilter}
                    />
                </fieldset>
            </div>
        </section>
    )
}

export default Filters
