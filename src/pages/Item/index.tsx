import useGlobalStore from "@/store"
import { useCallback, useEffect, useState } from "react"
import styles from './style.module.css'
import ItemInfo from "@/components/ItemInfo"
import Order from "@/components/Order"
import { IService } from "@/types"
import { useParams } from "react-router-dom"
import API from "@/api/items"

const Item = () => {
    const changeHeaderShown = useGlobalStore(state => state.changeHeaderShown)
    const changePage = useGlobalStore(state => state.changePage)
    const { id, serviceId } = useParams()

    useEffect(() => {
        changeHeaderShown(true)
        changePage("Item")
    }, [])

    const [data, setData] = useState<IService | null>(null)

    const getData = useCallback(async () => {
        if (serviceId !== undefined) {
            const data = await API.getOne(serviceId)
            setData(data)
        }
    }, [API, id])

    useEffect(() => {
        getData()
    }, [])

    return (
        <main className={styles.Item}>
            <div className={styles.BackgroundColor} />
            {data?.data.game && <div className={styles.Background} style={{ backgroundImage: `url(/${data?.data.game}.png)`, backgroundRepeat: 'no-repeat' }} />}

            <h1>{data?.data.name}</h1>

            <div className={styles.Box}>
                <ItemInfo data={data} />
                <Order data={data} />
            </div>
        </main>
    )
}

export default Item