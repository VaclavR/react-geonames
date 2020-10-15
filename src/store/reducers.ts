import * as actionTypes from './actionTypes'
import { Country, Action, FilterProperties, State, TableHeader } from '../interfaces'

const countriesPerPage = 30

const initialState: State = {
    countries: [],
    filteredCountries: [],
    paginatedCountries: [],
    currentPage: 1,
    countriesPerPage
}

function paginateCountries(countries: Country[], currentPage: number) {
    const indexOfLastCountry = currentPage * countriesPerPage
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
    return {
        filteredCountries: countries,
        paginatedCountries: countries.slice(indexOfFirstCountry, indexOfLastCountry),
        currentPage
    }
}

function sortCountries(countries: Country[], payload: {header: TableHeader, sortDirectionDesc: boolean}) {
    const { header, sortDirectionDesc } = payload
    let filteredCountries
    if (sortDirectionDesc) {
        if (header.type === 'number') {
            filteredCountries = [...countries.sort((a, b) => +a[header.propName] - +b[header.propName])]
        } else {
            filteredCountries = [...countries.sort((a, b) => +(a[header.propName] > b[header.propName]) - +(a[header.propName] < b[header.propName]))]
        }
    } else {
        if (header.type === 'number') {
            filteredCountries = [...countries.sort((a, b) => +b[header.propName] - +a[header.propName])]
        } else {
            filteredCountries = [...countries.sort((a, b) => +(a[header.propName] < b[header.propName]) - +(a[header.propName] > b[header.propName]))]
        }
    }
    return paginateCountries(filteredCountries, 1)
}

function filterCountries(state: State, filterProperties: FilterProperties) {
    const countries = state.countries as Country []
    const filteredCountries = countries.filter((country : Country) => {
        return (
            (
                country.countryName.toLowerCase().includes(filterProperties.query.value.toLowerCase()) ||
                country.continentName.toLowerCase().includes(filterProperties.query.value.toLowerCase()) ||
                country.capital.toLowerCase().includes(filterProperties.query.value.toLowerCase()) ||
                country.currencyCode.toLowerCase().includes(filterProperties.query.value.toLowerCase()) ||
                country.countryCode.toLowerCase().includes(filterProperties.query.value.toLowerCase())
            )
            && country[filterProperties.continent.type as string].toLowerCase().includes(filterProperties.continent.value.toLowerCase())
            && country[filterProperties.currency.type as string].toLowerCase().includes(filterProperties.currency.value.toLowerCase())
        )
    })
    return sortCountries(filteredCountries, { header: filterProperties.sortProperties.header, sortDirectionDesc: filterProperties.sortProperties.sortDirectionDesc })
}

function createVisibleCountries(countries: Country[]) {
    const visibleCountries = [...countries]
    for (const country of visibleCountries as Country[]) {
        country.density = +country.areaInSqKm ? (Math.round((+country.population / +country.areaInSqKm) * 100) / 100).toFixed(2).toString() : '0.00'
        country.flag = `http://www.geonames.org/flags/m/${country.countryCode}.png`.toLowerCase()
    }
    return visibleCountries
}

const reducer = (state = initialState, action: Action): State => {
    switch (action.type) {
        case actionTypes.INIT_COUNTRIES:
            return {
                ...state,
                countries: [...action.countries as Country[]],
                filteredCountries: createVisibleCountries(action.countries as Country[])
            }
        case actionTypes.PAGINATE_COUNTRIES:
            return { ...state, ...paginateCountries(state.filteredCountries, action.currentPage as number) }
        case actionTypes.SORT_COUNTRIES:
            return { ...state, ...sortCountries(state.filteredCountries, action.payload as {header: TableHeader, sortDirectionDesc: boolean}) }
        case actionTypes.FILTER_COUNTRIES:
            return { ...state, ...filterCountries(state, action.filterProperties as FilterProperties) }
        default: return { ...state }
    }
}

export default reducer
