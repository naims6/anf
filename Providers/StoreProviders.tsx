// src/providers/StoreProvider.tsx
'use client'

import { Provider } from 'react-redux'
import { ReactNode, useRef } from 'react'
import { makeStore } from '@/redux/store'
import type { AppStore } from '@/redux/store'
import { initializeCount } from '@/redux/slices/counterSlice'

interface Props {
  count?: number
  children: ReactNode
}

export default function StoreProvider({ count = 0, children }: Props) {
  const storeRef = useRef<AppStore | null>(null)

  if (!storeRef.current) {
    storeRef.current = makeStore()
    storeRef.current.dispatch(initializeCount(count))
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
