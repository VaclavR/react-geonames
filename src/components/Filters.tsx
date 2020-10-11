import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InputAttributes, SelectOption, Country, FiltersProps, State } from '../interfaces'
import Input from './formElements/Input'
import Select from './formElements/Select'
import { filterCountries } from '../store/actions'
import styles from './Filters.css'

const selectOptions: SelectOption[] = [{ value: '', name: 'Select a Continent...' }]

const Filters = ({ header, sortDirectionDesc }: FiltersProps): JSX.Element => {
    const dispatch = useDispatch()
    const countries = useSelector((state: State) => state.countries)
    const [queryFilter, setQueryFilter] = useState('')
    const [continentFilter, setContinentFilter] = useState('')

    const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value
        handleSubmit(value, continentFilter)
        setQueryFilter(value)
    }

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        const value = event.target.value
        handleSubmit(queryFilter, value)
        setContinentFilter(value)
    }

    const inputAttributes: InputAttributes = {
        type: 'text',
        name: 'search',
        placeholder: 'Search',
        autoComplete: 'off'
    }

    function handleSubmit(queryValue: string, continentValue: string) {
        dispatch(filterCountries({
            query: { value: queryValue },
            continent: { type: 'continentName', value: continentValue },
            sortProperties: {
                header, sortDirectionDesc
            }
        }))
    }

    // get all continents from countries array - overkill - simple hardcoded array should be enough
    if (countries.length && selectOptions.length === 1) {
        const continents = new Set([...countries].map((country: Country) => country.continentName))
        continents.forEach((continent) => {
            selectOptions.push({ name: continent, value: continent })
        })
    }

    return (
        <section>
            <form>
                <fieldset className={styles.fieldset}>
                    <Input
                        inputAttributes={inputAttributes}
                        onChangeHandler={handleSearchInput}
                        value={queryFilter}
                    />
                    <Select
                        options={selectOptions}
                        onChangeHandler={handleSelect}
                        value={continentFilter}
                    />
                </fieldset>
            </form>
        </section>
    )
}

export default Filters
