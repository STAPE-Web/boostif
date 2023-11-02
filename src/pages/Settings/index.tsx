import styles from './style.module.css'
import useGlobalStore from "@/store"
import { useEffect, useState, useCallback } from "react"
import Input from "@/ui/Input"
import Button from '@/ui/Buttons/Default'
import { DeleteIcon } from '@/ui/Icons'
import { IUser } from '@/types'
import API from '@/api/user'

const Settings = () => {
    const [username, setUsername] = useState('')
    const changeHeaderShown = useGlobalStore(state => state.changeHeaderShown)
    const [data, setData] = useState<IUser | null>(null)

    const getUserData = useCallback(async () => {
        const res = await API.get(JSON.parse(localStorage.getItem('userId') as string))
        setData(res)
    }, [API])

    useEffect(() => {
        getUserData()
    }, [getUserData])

    useEffect(() => {
        changeHeaderShown(true)
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

    return (
        <main className={styles.Settings}>
            <section>
                <h1>Settings</h1>
                <Input label="Your Name" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter Your Name" type="text" />
                <Button onClick={() => updateData()}>Update Data</Button>
                <div className={styles.Line} />

                <Button red onClick={() => deleteData()}>
                    <DeleteIcon className={styles.Icon} />
                    Delete Account
                </Button>
            </section>
        </main>
    )
}

export default Settings