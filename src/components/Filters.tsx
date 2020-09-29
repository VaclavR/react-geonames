import React, { useState, useEffect } from 'react'
import { useStore, Dispatch } from '../store/store'
import { InputAttributes, SelectOption, Country, FiltersProps } from '../interfaces'
import Input from './formElements/Input'
import Select from './formElements/Select'

const selectOptions: SelectOption[] = [{value: '', name: 'Select a Continent...'}]

const Filters = ({header, sortDirectionDesc}: FiltersProps): JSX.Element => {
    const [state, dispatch]: [any, Dispatch] = useStore()
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
        placeholder: 'Search by Country Name',
        autoComplete: 'off'
    }

    function handleSubmit(queryValue: string, continentValue: string) {
        dispatch('FILTER_COUNTRIES', {
            query: {type: 'countryName', value: queryValue},
            continent: {type: 'continentName', value: continentValue },
            sortProperties: {
                header, sortDirectionDesc
            }
        })
    }

    useEffect(() => {
        // get all continents from countries array - overkill - simple hardcoded array should be enough
        if (state.countries.length) {
            const continents = new Set([...state.countries].map((country: Country) => country.continentName))
            continents.forEach((continent) => {
                selectOptions.push({name: continent, value: continent})
            })
        }
    }, [state.countries])

    return (
        <section>
            <form>
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
            </form>
        </section>
    )
}

export default Filters
