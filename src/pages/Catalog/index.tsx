import styles from './style.module.css'
import { useEffect } from 'react'
import useGlobalStore from '@/store'
import { useNavigate, useSearchParams } from "react-router-dom"
import Button from '@/ui/Buttons/Default'
import { Image1, Image10, Image11, Image12, Image2, Image3, Image4, Image5, Image6, Image7, Image8, Image9 } from '@/assets/Category'

const Catalog = () => {
    const changeHeaderShown = useGlobalStore(state => state.changeHeaderShown)
    const changePage = useGlobalStore(state => state.changePage)
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    useEffect(() => {
        changeHeaderShown(true)
        changePage("Catalog")
    }, [searchParams])

    const items = [
        { id: 1, gameId: 1, name: "Gold farming", price: 1.38, image: Image1 },
        { id: 2, gameId: 1, name: "Power Leveling – 50 Lvl", price: 0.99, image: Image2 },
        { id: 3, gameId: 1, name: "Training Set – 86% Bonus XP", price: 0.99, image: Image3 },
        { id: 4, gameId: 1, name: "ESO Bundle: 100 Skyshards + Guild Leveling", price: 8.79, image: Image4 },
        { id: 5, gameId: 1, name: "Premium ESO Bundle: 50 lvl + 160 CP gear set", price: 0.99, image: Image5 },
        { id: 6, gameId: 1, name: "160 CP PvE Gear Sets", price: 0.99, image: Image6 },
        { id: 7, gameId: 1, name: "Champion Points + FREE Leveling 1-50", price: 0.99, image: Image7 },
        { id: 8, gameId: 1, name: "ESO Bundle: vVA + vMA", price: 14.39, image: Image8 },
        { id: 9, gameId: 1, name: "Guilds leveling", price: 0.99, image: Image9 },
        { id: 10, gameId: 1, name: "ESO Materials", price: 0.99, image: Image10 },
        { id: 11, gameId: 1, name: "Crafting Skills – Professions", price: 0.99, image: Image11 },
        { id: 12, gameId: 1, name: "ESO Houses", price: 0.99, image: Image12 },
    ]

    return (
        <main className={styles.Page}>
            <section className={styles.Section1}>
                <h1>Elder Scrolls Online Boosts</h1>

                <div className={styles.Grid}>
                    {items.map(item => (
                        <div key={item.id} className={styles.Item}>
                            <img src={item.image} alt="" />
                            <div className={styles.Shadow} />

                            <div className={styles.Box}>
                                <h3>{item.name}</h3>

                                <div>
                                    <p>from</p>
                                    <h2>${item.price}</h2>
                                    <Button onClick={() => navigate(`/item/${item.id}/${item.gameId}`)}>Order Now</Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default Catalog