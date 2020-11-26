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
    inputAttributes: InputAttributes
    onChangeHandler?(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<unknown>, value?: number | number[]): void
}

export interface Range extends Input {
    sliderValue: number[]
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
    value: string
    type?: string,
}

export interface FilterProperties {
    query: string,
    continent: string,
    currency: string,
    popSlider: number[],
    sortProperties: {header: TableHeader, sortDirectionDesc: boolean}
}

export interface FiltersProps {
    header: TableHeader,
    sortDirectionDesc: boolean
}

export interface CountriesProps {
    saveSortingValues: (arg1: TableHeader, arg2: boolean) => void
}

export interface PaginationProps {
    postsPerPage: number
    totalPosts: number
    currentPage: number
    paginate: (arg1: number) => void
}

export interface BackdropProps {
    isVisible: boolean
    clicked: () => void
}

export interface TopbarProps {
    isOpen: boolean
    // closedHandler: () => void
    drawerToggleClicked: () => void
}

export interface DrawerToggleProps {
    clicked: () => void
}

export interface SideDrawerProps {
    isOpen: boolean
    closedHandler: () => void
}

export interface Action {
    type: string
    countries?: Country[]
    currentPage?: number
    filterProperties?: FilterProperties
    payload?: Record<string, unknown>
}

export interface State {
    countries: Country[]
    filteredCountries: Country[]
    paginatedCountries: Country[]
    currentPage: number
    countriesPerPage: number
}

export interface TableHeader {
    name: string,
    propName: string,
    type: string,
    width?: string,
    tooltip?: string
}
