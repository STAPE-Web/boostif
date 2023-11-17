import ListItems from "@/components/ListItems"
import useGlobalStore from "@/store";
import { useEffect } from "react";
import styles from './style.module.css'

const Search = () => {
    const changeHeaderShown = useGlobalStore(state => state.changeHeaderShown)
    const changePage = useGlobalStore(state => state.changePage)

    useEffect(() => {
        changeHeaderShown(true)
        changePage("Search")
    }, [])

    return (
        <main className={styles.Search}>
            <ListItems />
        </main>
    )
}

export default Search