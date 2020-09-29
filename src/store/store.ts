import { useState, useEffect } from 'react'
interface Listener {
    (source: Record<string, unknown>): void;
}

export interface Dispatch {
    (actionIdentifier: string, payload: any): void
}

interface Action {
    (globalsState: Record<string, any>, payload: any): Record<string, unknown>
}

let globalState: Record<string, unknown> = {}
let listeners: Listener[] = []
let actions: Record<string, Action> = {}

export const useStore = (shouldListen = true): [Record<string, unknown>, Dispatch] => {
    const setState = useState(globalState)[1]

    const dispatch: Dispatch = (actionIdentifier, payload) => {
        const newState: Record<string, unknown> = actions[actionIdentifier](globalState, payload)
        globalState = { ...globalState, ...newState }

        for (const listener of listeners) {
            listener(globalState)
        }
    }

    useEffect(() => {
        if (shouldListen) {
            listeners.push(setState)
        }

        return () => {
            if (shouldListen) {
                listeners = listeners.filter(listener => listener !== setState)
            }
        }
    }, [setState, shouldListen])

    return [globalState, dispatch]
}

export const initStore = (userActions: Record<string, Action>, initalState: Record<string, unknown>): void => {
    if (initalState) {
        globalState = { ...globalState, ...initalState }
    }
    actions = { ...actions, ...userActions }
}
