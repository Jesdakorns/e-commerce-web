"use client";
import { IToastNotification } from '@/components/Toast';
import { NOTIFICATION_VARIANT } from '@/utils/constants';
import { useSession } from 'next-auth/react';
import React, { createContext, ReactNode, useContext, useEffect, useReducer } from 'react';

export type StateContextDispatcher = React.Dispatch<Partial<IState>>;

interface User {
    id: number,
    name: string,
    email: string,
    image: string,
    accessToken: string,
    refreshToken: string
}

export interface IState {
    user?: User
    toastNotification?: IToastNotification;
}

const defaultState: IState = {
    user: undefined,
    toastNotification: undefined,
};

export const StateContext = createContext(defaultState);
export const DispatchContext = createContext<any>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
    const { data } = useSession()
    const [state, dispatch] = useReducer((oldState: IState, newValue: any) => {
        if (typeof newValue === 'function') return newValue(oldState);
        return {
            ...oldState,
            ...newValue,
        };
    }, defaultState);

    useEffect(() => {
        dispatch({ user: data?.user })
    }, [data?.user])

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
        </StateContext.Provider>
    );
};

export const useAppContext: () => [IState, any] = () => [
    useContext(StateContext),
    useContext(DispatchContext),
];
