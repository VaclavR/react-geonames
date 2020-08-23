import React, { useEffect } from 'react'
import { useStore } from '../store/store'
import Search from '../components/Search'
import Countries from '../components/Countries'
import { Country } from '../interfaces'

const Landing = (): JSX.Element => {
    const [state, dispatch] = useStore()
    const stateCountries: Country[] = state.countries as Country[]

    useEffect(() => {
        console.log('useEffect')
        // fetch('http:
        //api.geonames.org/countryInfoJSON?username=vencator')
        //     .then(response => response.json())
        //     .then(data => {
        //         fetch('https://test-dec0e.firebaseio.com/countries.json', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json'
        //                 // 'Content-Type': 'application/x-www-form-urlencoded',
        //             },
        //             body: JSON.stringify(data.geonames)
        //         })
        //         console.log(data)
        //     })
        fetch('https://test-dec0e.firebaseio.com/countries.json')
            .then(response => response.json())
            .then(data => {
                let dataArray = []
                for (const key in data) {
                    dataArray = data[key]
                }
                dispatch('SET_COUNTRIES', dataArray)
            })
    }, [])
    const countries = stateCountries.length ? <Countries countries={[...stateCountries]} /> : null
    console.log('landing render')
    return (
        <React.Fragment>
            <Search />
            {countries}
        </React.Fragment>
    )
}

export default Landing
