import { initStore } from './store'
import { Country, FilterProperties } from '../interfaces'

const countriesPerPage = 30
const configureStore = (): void => {

    function sortCountries(countries: Country[], payload: {header: Record<string, string>, sortDirectionDesc: boolean}) {
        const {header, sortDirectionDesc} = payload
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

    function paginateCountries(countries: Country[], currentPage: number) {
        const indexOfLastCountry = currentPage * countriesPerPage
        const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
        return {
            filteredCountries: countries,
            paginatedCountries: countries.slice(indexOfFirstCountry, indexOfLastCountry),
            currentPage
        }
    }

    const actions = {
        SET_ALL_COUNTRIES: (state: unknown, countries: Country[]) => {
            return { countries: [...countries] }
        },
        SET_ALL_VISIBLE_COUNTRIES: (state: unknown, filteredCountries: Country[]) => {
            for (const country of filteredCountries) {
                country.density = +country.areaInSqKm ? (Math.round((+country.population / +country.areaInSqKm) * 100) / 100).toFixed(2).toString() : '0.00'
            }
            return { filteredCountries: [...filteredCountries] }
        },
        PAGINATE_COUNTRIES: (state: Record<string, Country[]>, currentPage: number) => {
            return paginateCountries(state.filteredCountries, currentPage)
        },
        SORT_COUNTRIES: (
            state: Record<string, Country[]>,
            payload: {header: Record<string, string>, sortDirectionDesc: boolean}) => {
            return sortCountries(state.filteredCountries, payload)
        },
        FILTER_COUNTRIES: (state: Record<string, unknown>, filterProperties: FilterProperties) => {
            const countries = state.countries as Country []
            const filteredCountries = countries.filter((country : Country) => {
                return (
                    country[filterProperties.query.type].toLowerCase().includes(filterProperties.query.value.toLowerCase()) &&
                    country[filterProperties.continent.type].toLowerCase().includes(filterProperties.continent.value.toLowerCase()))
            })
            return sortCountries(filteredCountries, {header: filterProperties.sortProperties.header, sortDirectionDesc: filterProperties.sortProperties.sortDirectionDesc})
        }
    }

    initStore(actions, {
        countries: [],
        filteredCountries: [],
        paginatedCountries: [],
        currentPage: 1,
        countriesPerPage
    })
}

export default configureStore
