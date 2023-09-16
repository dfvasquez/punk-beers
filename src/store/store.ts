import { configureStore } from '@reduxjs/toolkit'
import beersReducer from './beersSlice'

export const store = configureStore({
  reducer: {
    beers: beersReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
