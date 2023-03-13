import React from 'react';
import {ToDoStore} from "./ToDoStore";

type RootStateContextValue = {
    toDoStore: ToDoStore
}

const RootStateContext = React.createContext<RootStateContextValue>({} as RootStateContextValue)

const toDoStore = new ToDoStore()

export const RootStateProvider: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
    return (
        <RootStateContext.Provider value={{ toDoStore }}>
            {children}
        </RootStateContext.Provider>
        )
}

export const useRootStore = () => React.useContext(RootStateContext)