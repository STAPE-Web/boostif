import Avatar from "@/ui/Avatar"
import Button from "@/ui/Buttons/Default"
import styles from './style.module.css'
import { SettingsIcon } from "@/ui/Icons"
import { useNavigate } from "react-router-dom"
import OrderHistory from "@/components/OrderHistory"
import useGlobalStore from "@/store"
import { useEffect } from "react"

const User = () => {
    const navigate = useNavigate()
    const changeHeaderShown = useGlobalStore(state => state.changeHeaderShown)

    useEffect(() => {
        changeHeaderShown(true)
    }, [])

    return (
        <main>
            <section className={styles.AccountInfo}>
                <Avatar large sign="S" />
                <h3>STAPE-Web</h3>

                <div>
                    <Button onClick={() => ({})} red>Log out</Button>
                    <SettingsIcon className={styles.Icon} onClick={() => navigate("/settings")} />
                </div>
            </section>

            <section className={styles.History}>
                <h2>Orders History</h2>
                <OrderHistory />
            </section>
        </main>
    )
}

export default User