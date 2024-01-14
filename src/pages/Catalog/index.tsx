import styles from './style.module.css'
import { useEffect, useState, useCallback, useMemo } from 'react'
import useGlobalStore from '@/store'
import { useNavigate, useParams } from "react-router-dom"
import Button from '@/ui/Buttons/Default'
import { IGame, IService } from '@/types'
import API from "@/api/items"
import APIGame from "@/api/games"
import SelectString from '@/ui/SelectString'

const Catalog = () => {
    const changeHeaderShown = useGlobalStore(state => state.changeHeaderShown)
    const changePage = useGlobalStore(state => state.changePage)
    const { id } = useParams()
    const navigate = useNavigate()
    const [section, setSection] = useState("All")

    useEffect(() => {
        changeHeaderShown(true)
        changePage("Catalog")
    }, [])

    const [data, setData] = useState<IService[]>([])
    const [game, setGame] = useState<IGame[]>([])

    const getData = useCallback(async () => {
        if (id !== undefined) {
            const data = await API.get(id)
            setData(data)
        }
    }, [API, id])

    const getGame = useCallback(async () => {
        if (id !== undefined) {
            const data: IGame[] = await APIGame.get()
            setGame(data)
        }
    }, [API, id])

    useEffect(() => {
        getData()
        getGame()
    }, [getData])

    const games = useMemo(() => {
        const array: string[] = []

        game.forEach(el => {
            array.push(el.data.name)
        });

        return array;
    }, [game])

    const categories = useMemo(() => {
        const currentGame = game[game.findIndex(i => i.id == id)]

        if (currentGame !== undefined) {
            return ["All", ...currentGame.data.sections]
        }
    }, [game, id])

    function gameHendler(value: string) {
        const selectedGame = game.find(i => i.data.name === value)
        navigate(`/catalog/${selectedGame?.id}`)
    }

    return (
        <main className={styles.Page}>
            <section className={styles.Section2}>
                {game.length !== 0 && <SelectString array={games} setValue={(value) => gameHendler(value)} value={game[game.findIndex(i => i.id === id)].data.name} />}

                {categories?.length !== 1 && <div className={styles.Categories}>
                    {categories?.map((cat, index) => (
                        <div key={index} onClick={() => setSection(cat)}>{cat}</div>
                    ))}
                </div>}
            </section>

            <section className={styles.Section1}>
                <h1>{game[game.findIndex(i => i.id === id)]?.data.name}</h1>

                <div className={styles.Grid}>
                    {data.filter(i => (
                        section === "All" ? true : i.data.section === section
                    )).map(item => (
                        <div key={item.id} className={styles.Item}>
                            <img src={item.data.image[0] === "/" ? `${import.meta.env.VITE_PUBLIC}${item.data.image}` : item.data.image} alt="" />
                            <div className={styles.Shadow} />

                            <div className={styles.Box}>
                                <h3>{item.data.name}</h3>

                                <div>
                                    <p>from</p>

                                    <div className={styles.Row}>
                                        <h2>${item.data.price}</h2>
                                        {item.data.oldPrice !== undefined && <h4>${item.data.oldPrice}</h4>}
                                    </div>

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