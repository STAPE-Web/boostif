import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import State from './types'

const useGlobalStore = create<State>()(devtools((set) => ({
    headerShown: false,
    page: "",

    changeHeaderShown: (value: boolean) => set({ headerShown: value }),
    changePage: (value: string) => set({ page: value }),
})))

export default useGlobalStore