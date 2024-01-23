import Avatar from "@/ui/Avatar"
import Button from "@/ui/Buttons/Default"
import styles from './style.module.css'
import { SettingsIcon } from "@/ui/Icons"
import { useNavigate } from "react-router-dom"
import OrderHistory from "@/components/OrderHistory"
import useGlobalStore from "@/store"
import { useEffect, useState, useCallback } from "react"
import API from '@/api/user'
import { IUser } from '@/types'

const User = () => {
    const navigate = useNavigate()
    const changeHeaderShown = useGlobalStore(state => state.changeHeaderShown)
    const [data, setData] = useState<IUser | null>(null)
    const changePage = useGlobalStore(state => state.changePage)

    const getUserData = useCallback(async () => {
        const res = await API.get(JSON.parse(localStorage.getItem('userId') as string))
        setData(res)
    }, [API])

    useEffect(() => {
        getUserData()
    }, [getUserData])

    useEffect(() => {
        changeHeaderShown(true)
        changePage("User")
    }, [])

    async function Logout() {
        localStorage.removeItem('userId')
        window.location.replace('/')
    }

    return (
        <main className={styles.Page}>
            <section className={styles.AccountInfo}>
                <Avatar large sign={data?.data.username[0]} url={data?.data.avatar} />
                <h3>{data?.data.username}</h3>

                <div>
                    <Button onClick={() => Logout()} red>Log out</Button>
                    <SettingsIcon className={styles.Icon} onClick={() => navigate("/settings")} />
                </div>
            </section>

            <section className={styles.History}>
                <h2>My Orders</h2>
                <OrderHistory />
            </section>
        </main>
    )
}

export default User