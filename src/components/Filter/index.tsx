import { IGame, IService } from "@/types"
import Search from "@/ui/Search"
import { useCallback, useEffect, useState } from "react"
import API from "@/api/items"
import APIGame from "@/api/games"
import styles from "./style.module.css"
import useGlobalStore from "@/store"
import Button from "@/ui/Buttons/Default"
import { useNavigate } from "react-router-dom"

const Filter = () => {
    const [search, setSearch] = useState("")
    const [id, setId] = useState("1")
    const changeModal = useGlobalStore(state => state.changeModal)
    const modal = useGlobalStore(state => state.modal)
    const navigate = useNavigate()

    function SearchItems(e: any) {
        e.preventDefault()
        setSearch(e.target[0].value)
    }

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
    }, [getData, getGame])

    return (
        <>
            {modal && <div className={styles.Filter} onClick={() => changeModal(false)}>
                <div className={styles.Box} onClick={e => e.stopPropagation()}>
                    <div className={styles.Sidebar}>
                        <Search SearchItems={SearchItems} />
                        <h3>Choose Game</h3>

                        <div className={styles.List}>
                            {game.filter(i => i.data.name.toLowerCase().includes(search.toLowerCase())).map((item, index) => (
                                <div
                                    className={id === item.id ? styles.Active : ""}
                                    key={index}
                                    onMouseEnter={() => setId(item.id)}
                                >{item.data.name}</div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.Content}>
                        {game[game.findIndex(i => i.id === id)].data.sections.length !== 0 && (
                            <div className={styles.Categories}>
                                <h3>Categories</h3>

                                <div className={styles.CatList}>
                                    {game.length !== 0 && <>
                                        {game[game.findIndex(i => i.id === id)].data.sections.map((section, index) => (
                                            <div key={index}>{section}</div>
                                        ))}
                                    </>}
                                </div>
                            </div>
                        )}

                        <div className={styles.Products}>
                            <h3>Products</h3>

                            <div className={styles.Grid}>
                                {data.map(item => (
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

                                                <Button onClick={() => {
                                                    navigate(`/item/${item.id}`)
                                                    changeModal(false)
                                                }}>Order Now</Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Filter