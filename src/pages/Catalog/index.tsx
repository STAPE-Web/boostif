import styles from './style.module.css'
import { useEffect, useState, useCallback } from 'react'
import useGlobalStore from '@/store'
import { useNavigate, useParams } from "react-router-dom"
import Button from '@/ui/Buttons/Default'
import { IGame, IService } from '@/types'
import API from "@/api/items"
import APIGame from "@/api/games"

const Catalog = () => {
    const changeHeaderShown = useGlobalStore(state => state.changeHeaderShown)
    const changePage = useGlobalStore(state => state.changePage)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        changeHeaderShown(true)
        changePage("Catalog")
    }, [])

    const [data, setData] = useState<IService[]>([])
    const [game, setGame] = useState<IGame | null>(null)

    const getData = useCallback(async () => {
        if (id !== undefined) {
            const data = await API.get(id)
            setData(data)
        }
    }, [API, id])

    const getGame = useCallback(async () => {
        if (id !== undefined) {
            const data: IGame[] = await APIGame.get()
            const game = data.findIndex(item => item.id === id)
            setGame(data[game])
        }
    }, [API, id])

    useEffect(() => {
        getData()
        getGame()
    }, [])

    return (
        <main className={styles.Page}>
            <section className={styles.Section1}>
                <h1>{game?.data.name}</h1>

                <div className={styles.Grid}>
                    {data.map(item => (
                        <div key={item.id} className={styles.Item}>
                            <img src={`${import.meta.env.VITE_PUBLIC}${item.data.image}`} alt="" />
                            <div className={styles.Shadow} />

                            <div className={styles.Box}>
                                <h3>{item.data.name}</h3>

                                <div>
                                    <p>from</p>
                                    <h2>${item.data.price}</h2>
                                    <Button onClick={() => navigate(`/item/${item.id}`)}>Order Now</Button>
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