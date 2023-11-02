import styles from './style.module.css'
import useGlobalStore from "@/store"
import { useEffect, useState } from "react"
import Input from "@/ui/Input"
import Button from '@/ui/Buttons/Default'
import { DeleteIcon } from '@/ui/Icons'

const Settings = () => {
    const [username, setUsername] = useState('')
    const changeHeaderShown = useGlobalStore(state => state.changeHeaderShown)

    useEffect(() => {
        changeHeaderShown(true)
    }, [])

    return (
        <main className={styles.Settings}>
            <section>
                <h1>Settings</h1>
                <Input label="Your Name" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter Your Name" type="text" />
                <Button onClick={() => ({})}>Update Data</Button>
                <div className={styles.Line} />

                <Button red onClick={() => ({})}>
                    <DeleteIcon className={styles.Icon} />
                    Delete Account
                </Button>
            </section>
        </main>
    )
}

export default Settings