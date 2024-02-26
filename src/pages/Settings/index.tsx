import styles from './style.module.css'
import useGlobalStore from "@/store"
import { useEffect, useState, useCallback } from "react"
import Input from "@/ui/Input"
import Button from '@/ui/Buttons/Default'
import { DeleteIcon, UserIcon } from '@/ui/Icons'
import { IUser } from '@/types'
import API from '@/api/user'
import Avatar from '@/ui/Avatar'
import { useNavigate } from 'react-router-dom'

const Settings = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
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
        changePage("Settings")
        if (data !== null) {
            setUsername(data?.data.username)
        }
    }, [data])

    async function updateData() {
        await API.update(username, JSON.parse(localStorage.getItem('userId') as string)).then(() => {
            window.location.replace('/profile')
        })
    }

    async function deleteData() {
        await API.delete(JSON.parse(localStorage.getItem('userId') as string)).then(() => {
            localStorage.removeItem('userId')
            window.location.replace('/')
        })
    }

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
                    <UserIcon className={styles.Icon} onClick={() => navigate("/profile")} />
                </div>
            </section>

            <section className={styles.History}>
                <h2>Settings</h2>

                <div className={styles.UserData}>
                    <div className={styles.Row}>
                        <Input label="Your Name" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter Your Name" type="text" />
                        <Input label="Your Email" value={data?.data.email || ""} onChange={() => ({})} placeholder="Enter Your Email" type="text" />
                    </div>

                    <div className={styles.Row}>
                        <Button onClick={() => updateData()}>Update Data</Button>
                        <Button red onClick={() => deleteData()}>
                            <DeleteIcon className={styles.DeleteIcon} />
                            Delete Account
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Settings