import Item from '../Item'
import styles from './style.module.css'
import { useSearchParams } from 'react-router-dom'
import API from '@/api/games'
import { useCallback, useEffect, useState } from 'react'
import { IGame } from '@/types'

const ListItems = () => {
    const [searchParams] = useSearchParams()
    const query = searchParams.get("q")
    const [data, setData] = useState<IGame[]>([])

    const getData = useCallback(async () => {
        const data = await API.get()
        setData(data)
    }, [API])

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className={styles.List}>
            {data.length !== 0 && <>
                {data?.filter(item => item?.data?.name.toLocaleLowerCase().includes(query?.toLocaleLowerCase() || "")).map(item => (
                    <Item key={item.id} item={item} />
                ))}
            </>}
        </div>
    )
}

export default ListItems