import { TypedUseSelectorHook, useSelector } from "react-redux";
import { reducer } from "./reducers/index";
import {configureStore} from '@reduxjs/toolkit';

export const store = configureStore({
    reducer
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector