// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import rootReducer from './rootReducer'
import { apiSlice } from './api/userApi'


export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {},
      }).concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',
  })

  setupListeners(store.dispatch)
  return store
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const store = makeStore()
