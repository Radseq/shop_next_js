import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { cartReducer } from "./cartSlice";
import storage from 'redux-persist/lib/storage' // localStorage

import { combineReducers } from 'redux';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import { createWrapper } from "next-redux-wrapper";

const persistConfig = {
    key: 'shoppingCart',
    storage,
}

const reducers = combineReducers({ shoppingCart: cartReducer });

const persistedReducer = persistReducer(persistConfig, reducers);

const storeCart = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

type RootState = ReturnType<typeof storeCart.getState>

type AppDispatch = typeof storeCart.dispatch

export const useCartDispatch = () => useDispatch<AppDispatch>();
export const useCartSelector: TypedUseSelectorHook<RootState> = useSelector;

const makestoreCart = () => storeCart;

export const wrapper = createWrapper<ReturnType<typeof makestoreCart>>(makestoreCart);