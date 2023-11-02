import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import State from './types'

const useGlobalStore = create<State>()(devtools((set) => ({
    headerShown: false,

    changeHeaderShown: (value: boolean) => set({ headerShown: value }),
})))

export default useGlobalStore