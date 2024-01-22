import { IGame } from '@/types'
import { FC } from 'react'
import styles from './style.module.css'
import { useNavigate } from 'react-router-dom'

interface Props {
    item: IGame
}

const Item: FC<Props> = ({ item }) => {
    const navigate = useNavigate()

    return (
        <div className={styles.Item} style={{ background: `url(${import.meta.env.VITE_PUBLIC}${item.data.image}) no-repeat`, backgroundSize: 'cover' }} onClick={() => navigate(`/catalog/${item.id}`)}>
            <h2>{item.data.name}</h2>
            {item.data.sections.length === 0 && <p>{item.data.text}</p>}

            <div className={styles.Categories}>
                {item.data.sections.map((i, index) => (
                    <div key={index} onClick={e => {
                        e.stopPropagation()
                        navigate(`/catalog/${item.id}?category=${i}`)
                    }}>{i}</div>
                ))}
            </div>

            {/* <Button>Order Now</Button> */}
        </div>
    )
}

export default Item