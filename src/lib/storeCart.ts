import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { cartReducer } from "./cartSlice"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { combineReducers } from "redux"
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	PURGE,
	REGISTER,
	REHYDRATE,
} from "redux-persist"
import { createWrapper } from "next-redux-wrapper"

const persistConfig = {
	key: "shoppingCart",
	storage: AsyncStorage,
}

const reducers = combineReducers({ shoppingCart: cartReducer })

const persistedReducer = persistReducer(persistConfig, reducers)

const storeCart = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
					REHYDRATE,
				],
			},
		}),
})

type RootState = ReturnType<typeof storeCart.getState>

type AppDispatch = typeof storeCart.dispatch

export const useCartDispatch = () => useDispatch<AppDispatch>()
export const useCartSelector: TypedUseSelectorHook<RootState> = useSelector

const makestoreCart = () => storeCart

export const wrapper =
	createWrapper<ReturnType<typeof makestoreCart>>(makestoreCart)
