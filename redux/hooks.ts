// src/redux/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux'
import type { AppDispatch, RootState, AppStore } from './store'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => AppStore = useStore as any
