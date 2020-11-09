import React from 'react'
import {ComponentEnhancer, compose, setDisplayName} from 'recompose'
import {useApplicationContext} from '../../Hooks/useApplicationContext'
import {CircularProgress} from "@material-ui/core";

const withProviderComponent = (WrappedComponent: any) => (props: any) => {
    const [Context, initialState, loading] = useApplicationContext()

    return (
        <Context.Provider value={initialState}>
            {loading ? <>
                <div style={{marginTop: "5rem", width:"100%", textAlign:"center"}}>
                    <CircularProgress/>

                </div>
            </> : <WrappedComponent {...props} />}
        </Context.Provider>
    )
}

export const withProvider: ComponentEnhancer<{}, {}> = compose(
    setDisplayName('withProvider'),
    (Component: any) => withProviderComponent(Component)
)
