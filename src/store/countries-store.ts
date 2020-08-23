import { initStore } from './store'
import { Country } from '../interfaces'

const configureStore = (): void => {
    const actions = {
        SET_COUNTRIES: (state: unknown, countries: Record<string, Country[]>) => {
            return { countries }
        }
    }

    initStore(actions, {
        countries: []
    })
}

export default configureStore
