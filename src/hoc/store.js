import React, {createContext, useReducer} from 'react'
import todoReducer from '../reducer/reducer'

const initialState = []

const Store = ({children}) => {
    const [state, dispatch] = useReducer(todoReducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    );
}

export const Context = createContext(initialState);
export default Store;