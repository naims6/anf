// src/redux/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit'
import { apiSlice } from './api/userApi'
import counterReducer from './slices/counterSlice'


const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  counter: counterReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
