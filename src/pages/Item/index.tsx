import useGlobalStore from "@/store"
import { useCallback, useEffect, useState } from "react"
import styles from './style.module.css'
import ItemInfo from "@/components/ItemInfo"
import Order from "@/components/Order"
import { IGame, IService } from "@/types"
import { useParams } from "react-router-dom"
import API from "@/api/items"
import APIGame from "@/api/games"
import Button from "@/ui/Buttons/Default"

const Item = () => {
    const changeHeaderShown = useGlobalStore(state => state.changeHeaderShown)
    const changePage = useGlobalStore(state => state.changePage)
    const { serviceId } = useParams()
    const [modal, setModal] = useState(false)
    const [modalData, setModalData] = useState("")
    const [price, setPrice] = useState("")

    useEffect(() => {
        changeHeaderShown(true)
        changePage("Item")
    }, [])

    const [data, setData] = useState<IService | null>(null)
    const [game, setGame] = useState<IGame | null>(null)

    const getData = useCallback(async () => {
        if (serviceId !== undefined) {
            const data: IService = await API.getOne(serviceId)
            const game = await APIGame.getOne(data.data.game)
            setData(data)
            setGame(game)
        }
    }, [API, serviceId])

    useEffect(() => {
        getData()
    }, [getData])

    function goToCheckout() {
        localStorage.setItem("checkoutItem", JSON.stringify({
            image: data?.data.image,
            game: game?.data.name,
            title: data?.data.name,
            description: modalData,
            price: Number(price).toFixed(2),
            id: data?.id,
            gameId: game?.id
        }))

        window.location.replace("/checkout")
    }

    return (
        <main className={styles.Item}>
            <div className={styles.BackgroundColor} />
            {data?.data.game && <div className={styles.Background} style={{ backgroundImage: `url(/${data?.data.game}.png)`, backgroundRepeat: 'no-repeat' }} />}

            <h1>{data?.data.name}</h1>

            <div className={styles.Box}>
                <ItemInfo data={data} />
                <Order data={data} setModal={setModal} selectPrice={setPrice} setModalData={setModalData} />
            </div>

            {modal && <div className={styles.Modal} onClick={() => setModal(false)}>
                <div className={styles.ModalBox} onClick={e => e.stopPropagation()}>
                    <h2>Order preview</h2>

                    <div className={styles.ModalItem}>
                        <div className={styles.ModalItemBox}>
                            <img src={data?.data.image} alt="" />

                            <div>
                                <h6>{game?.data.name}</h6>
                                <h3>{data?.data.name}</h3>
                                <p>{modalData}</p>
                            </div>
                        </div>

                        <h3 className={styles.ModalItemPrice}>$ {Number(price).toFixed(2)}</h3>
                    </div>

                    <div className={styles.ModalButtons}>
                        <Button onClick={() => goToCheckout()}>Go to the payment</Button>
                        <button onClick={() => setModal(false)}>Back to shopping</button>
                    </div>
                </div>
            </div>}
        </main>
    )
}

export default Item