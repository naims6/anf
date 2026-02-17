// src/redux/slices/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    initializeCount(state, action: PayloadAction<number>) {
      const v = Number(action.payload)
      if (!Number.isNaN(v)) state.value = v
    },
    increment(state) {
      state.value += 1
    },
    decrement(state) {
      state.value -= 1
    },
    reset(state) {
      state.value = 0
    },
  },
})

export const { initializeCount, increment, decrement, reset } = counterSlice.actions
export default counterSlice.reducer
