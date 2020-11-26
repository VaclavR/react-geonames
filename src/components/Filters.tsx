import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InputAttributes, SelectOption, Country, FiltersProps, State } from '../interfaces'
import Input from './formElements/Input'
import Select from './formElements/Select'
import Range from './formElements/Range'
import { filterCountries } from '../store/actions'
import styles from './Filters.css'

const continentSelectOptions: SelectOption[] = [{ value: '', name: 'All Continents' }]
const currenciesSelectOptions: SelectOption[] = [{ value: '', name: 'All Currencies' }]

const Filters = ({ header, sortDirectionDesc }: FiltersProps): JSX.Element => {
    const dispatch = useDispatch()
    const countries = useSelector((state: State) => state.countries)
    const [filters, setFilters] = useState(
        {
            query: '',
            continent: '',
            currency: '',
            popSlider: [0, 10]
        }
    )

    const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value
        setFilters({ ...filters, query: value })
    }

    const handleContinentSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        const value = event.target.value
        setFilters({ ...filters, continent: value })
    }

    const handleCurrenciesSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        const value = event.target.value
        setFilters({ ...filters, currency: value })
    }

    const handlePopRange = (event: React.ChangeEvent<unknown>, value: number[]): void => {
        setFilters({ ...filters, popSlider: value })
    }

    useEffect(() => {
        handleSubmit()
    }, [filters])

    const queryAttributes: InputAttributes = {
        value: filters.query,
        type: 'text',
        placeholder: 'Search',
        autoComplete: 'off'
    }

    const rangeAttributes: InputAttributes = {
        type: 'range',
        min: '0',
        max: '1400000000',
        step: '1000000'
    }

    function handleSubmit() {
        dispatch(filterCountries({
            ...filters,
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

    // get all currencies from countries array
    if (countries.length && currenciesSelectOptions.length === 1) {
        const currencies = new Set([...countries].map((country: Country) => country.currencyCode))
        currencies.forEach((currency) => {
            if (currency.length) {
                currenciesSelectOptions.push({ name: currency, value: currency })
            }
        })
    }

    return (
        <section>
            <div>
                <fieldset className={styles.fieldset}>
                    <Input
                        inputAttributes={queryAttributes}
                        onChangeHandler={handleSearchInput}
                    />
                    <Select
                        options={continentSelectOptions}
                        onChangeHandler={handleContinentSelect}
                        value={filters.continent}
                    />
                    <Select
                        options={currenciesSelectOptions}
                        onChangeHandler={handleCurrenciesSelect}
                        value={filters.currency}
                    />
                    {/* <Range
                        inputAttributes={rangeAttributes}
                        onChangeHandler={handlePopRange}
                        sliderValue={filters.popSlider}
                    /> */}
                </fieldset>
            </div>

        </section>
    )
}

export default Filters
