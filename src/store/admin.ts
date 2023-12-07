import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import State from './types/admin'

const useAdminStore = create<State>()(devtools((set) => ({
    activePage: "1",

    changeActivePage: (value: string) => set({ activePage: value }),
})))

export default useAdminStore