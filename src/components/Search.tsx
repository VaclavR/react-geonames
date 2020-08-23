import React, { useState } from 'react'

const Search = (): JSX.Element => {
    const [query, setQuery] = useState('')

    const handleSearchForm = (event: React.FormEvent<EventTarget>): void => {
        event.preventDefault()
        const url = `https://secure.geonames.org/searchJSON?username=vencator&q=${query}`
        console.log(url)
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
    }

    const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setQuery(event.target.value)
    }

    return (
        <form onSubmit={handleSearchForm}>
            <input
                type="text"
                name="search"
                placeholder="search by country name"
                onChange={handleSearchInput}
                required />
            <button type="submit">Search</button>
        </form>
    )
}

export default Search
