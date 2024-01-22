import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import State from './types'

const useGlobalStore = create<State>()(devtools((set) => ({
    headerShown: false,
    page: "",
    modal: false,

    changeHeaderShown: (value: boolean) => set({ headerShown: value }),
    changePage: (value: string) => set({ page: value }),
    changeModal: (value: boolean) => set({ modal: value })
})))

export default useGlobalStore