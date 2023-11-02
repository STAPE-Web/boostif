import Button from '@/ui/Buttons/Default'
import styles from './style.module.css'
import ListItems from '@/components/ListItems'
import OrderSteps from '@/components/OrderSteps'
import { useEffect } from 'react'
import useGlobalStore from '@/store'
import { useSearchParams } from "react-router-dom"

const Home = () => {
    const changeHeaderShown = useGlobalStore(state => state.changeHeaderShown)
    const [searchParams] = useSearchParams()

    function navigate() {
        let section = document.getElementById("Items");
        section?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        changeHeaderShown(true)
        if (searchParams.get('uid') !== null) {
            localStorage.setItem("userId", JSON.stringify(searchParams.get('uid')))
            window.location.replace('/')
        }
    }, [searchParams])

    return (
        <main>
            <div className={styles.TopBackground} />

            <section className={styles.Section1}>
                <h1>Boost your account and gaming skills today</h1>
                <Button onClick={() => navigate()}>Choose game</Button>
            </section>

            <section className={styles.Section2} id='Items'>
                <ListItems />
            </section>

            <section className={styles.Section3}>
                <h2>Our customers’ reviews</h2>
                {/* Reviews */}
            </section>

            <section className={styles.Section4}>
                <h2>How do I order?</h2>
                <OrderSteps />
            </section>
        </main >
    )
}

export default Home