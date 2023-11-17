import useGlobalStore from "@/store"
import { useEffect } from "react"
import styles from './style.module.css'
import ItemInfo from "@/components/ItemInfo"
import Order from "@/components/Order"

const Item = () => {
    const changeHeaderShown = useGlobalStore(state => state.changeHeaderShown)
    const changePage = useGlobalStore(state => state.changePage)

    useEffect(() => {
        changeHeaderShown(true)
        changePage("Item")
    }, [])

    return (
        <main className={styles.Item}>
            <div className={styles.BackgroundColor} />
            <div className={styles.Background} />

            <h1>Mythic Plus Custom Boost</h1>

            <div className={styles.Box}>
                <ItemInfo />
                <Order />
            </div>
        </main>
    )
}

export default Item