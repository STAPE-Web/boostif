import { IGame } from '@/types'
import Button from '@/ui/Buttons/Default'
import { FC } from 'react'
import styles from './style.module.css'
import { useNavigate } from 'react-router-dom'

interface Props {
    item: IGame
}

const Item: FC<Props> = ({ item }) => {
    const navigate = useNavigate()

    return (
        <div className={styles.Item} style={{ background: `url(${import.meta.env.VITE_PUBLIC}${item.data.image}) no-repeat`, backgroundSize: 'cover' }}>
            <h2>{item.data.name}</h2>
            <p>{item.data.text}</p>
            <Button onClick={() => navigate(`/catalog/${item.id}`)}>Order Now</Button>
        </div>
    )
}

export default Item