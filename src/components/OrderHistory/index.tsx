import { useCallback, useEffect, useState } from 'react'
import styles from './style.module.css'
import axios from 'axios'

type IOrder = {
    id: string,
    data: {
        count: number,
        description: string
        game: string
        gameId: string
        id: string
        image: string
        price: string
        title: string
        userData: string
        userId: string
    }
}

const OrderHistory = () => {
    const [orders, setOrders] = useState<IOrder[]>([])

    const getOrders = useCallback(async () => {
        const id = JSON.parse(localStorage.getItem('userId') as string)
        const data = await axios.get(`${import.meta.env.VITE_SERVER}/getOrder?id=${id}`)
        setOrders(data.data)
    }, [])

    useEffect(() => {
        getOrders()
    }, [])

    return (
        <div className={styles.OrderHistory}>
            {orders.length !== 0
                ? <>{orders.map(h => (
                    <div key={h.id} className={styles.Item}>
                        <div className={styles.ItemBox}>
                            <img src={h.data.image} alt="" />

                            <div>
                                <h6>{h.data.game}</h6>
                                <h3>{h.data.title}</h3>
                                <p>{h.data.description}</p>
                            </div>
                        </div>

                        <h2>${h.data.price}</h2>
                    </div>
                ))}</>
                : <p className={styles.NoOrders}>No orders</p>
            }
        </div>
    )
}

export default OrderHistory