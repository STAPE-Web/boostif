import Chat from '@/components/Chat'
import styles from './style.module.css'
import { useEffect } from 'react'
import useGlobalStore from '@/store'

const Support = () => {
    const changeHeaderShown = useGlobalStore(state => state.changeHeaderShown)
    const changePage = useGlobalStore(state => state.changePage)

    useEffect(() => {
        changeHeaderShown(true)
        changePage("Support")
    }, [])

    return (
        <main className={styles.Support}>
            <section>
                <h1>Support</h1>
                <Chat />
            </section>
        </main>
    )
}

export default Support