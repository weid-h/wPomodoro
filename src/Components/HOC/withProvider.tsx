import React from 'react'
import { ComponentEnhancer, compose, setDisplayName } from 'recompose'
import { useApplicationContext } from '../../Contexts/ApplicationContext'

const withProviderComponent = (WrappedComponent: any) => (props: any) => {
    const [Context, initialState] = useApplicationContext()

    return (
        <Context.Provider value={initialState}>
            <WrappedComponent {...props} />
        </Context.Provider>
    )
}

export const withProvider: ComponentEnhancer<{}, {}> = compose(
    setDisplayName('withProvider'),
    (Component: any) => withProviderComponent(Component)
)
