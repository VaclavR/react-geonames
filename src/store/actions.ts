import * as actionTypes from './actionTypes'
import { Country, FilterProperties, Action, TableHeader } from '../interfaces'

export const initCountries = (countries: Country[]): Action => {
    return { type: actionTypes.INIT_COUNTRIES, countries }
}

export const paginateCountries = (currentPage: number): Action => {
    return { type: actionTypes.PAGINATE_COUNTRIES, currentPage }
}

export const sortCountries = (payload: {header: TableHeader, sortDirectionDesc: boolean}): Action => {
    return { type: actionTypes.SORT_COUNTRIES, payload }
}

export const filterCountries = (filterProperties: FilterProperties): Action => {
    return { type: actionTypes.FILTER_COUNTRIES, filterProperties }
}
