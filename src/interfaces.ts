export interface Country {
    countryName: string
    capital: string
    continentName: string
    population: string
    areaInSqKm: string
    countryCode: string
    [key: string]: string
}

export interface InputAttributes {
    [key: string]: unknown
}

export interface Input {
    value: string
    inputAttributes: InputAttributes
    name?: string
    onChangeHandler?(event: React.ChangeEvent<HTMLInputElement>): void
}

export interface SelectOption {
    name: string
    value: string
}

export interface Select {
    value: string
    options: SelectOption[]
    name?: string
    inputAttributes?: InputAttributes
    onChangeHandler?(event: React.ChangeEvent<HTMLSelectElement>): void
}

export interface FilterConfig {
    type: string,
    value: string
}

export interface FilterProperties {
    query: FilterConfig,
    continent: FilterConfig
    sortProperties: {header: Record<string, string>, sortDirectionDesc: boolean}
}

export interface FiltersProps {
    header: Record<string, string>,
    sortDirectionDesc: boolean
}

export interface CountriesProps {
    saveSortingValues: (arg1: Record<string, string>, arg2: boolean) => void
}

export interface PaginationProps {
    postsPerPage: number
    totalPosts: number
    currentPage: number
    paginate: (arg1: number) => void
}
