import { IItem } from '@/types'
import Button from '@/ui/Buttons/Default'
import { FC } from 'react'
import styles from './style.module.css'
import { useNavigate } from 'react-router-dom'

interface Props {
    item: IItem
}

const Item: FC<Props> = ({ item }) => {
    const navigate = useNavigate()

    return (
        <div className={styles.Item} style={{ background: `url(${item.image}) no-repeat`, backgroundSize: 'cover' }}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <Button onClick={() => navigate(`/item/${item.id}`)}>Order Now</Button>
        </div>
    )
}

export default Item