import Item1 from '@/assets/Item1.jpg'
import Item2 from '@/assets/Item2.jpg'
import Item3 from '@/assets/Item3.jpg'
import Item4 from '@/assets/Item4.jpg'
import Item5 from '@/assets/Item5.jpg'
import Item6 from '@/assets/Item6.jpg'
import Item from '../Item'
import styles from './style.module.css'

const ListItems = () => {
    const items = [
        { id: 1, title: 'WoW Dragonflight', image: Item1, description: 'Buy safe WoW carries with pro players. Vast catalog of boosts for high-end PvE and PvE activities, as well as solo-farm and coaching.' },
        { id: 2, title: 'WoW Dragonflight', image: Item2, description: 'Buy safe WoW carries with pro players. Vast catalog of boosts for high-end PvE and PvE activities, as well as solo-farm and coaching.' },
        { id: 3, title: 'WoW Dragonflight', image: Item3, description: 'Buy safe WoW carries with pro players. Vast catalog of boosts for high-end PvE and PvE activities, as well as solo-farm and coaching.' },
        { id: 4, title: 'WoW Dragonflight', image: Item4, description: 'Buy safe WoW carries with pro players. Vast catalog of boosts for high-end PvE and PvE activities, as well as solo-farm and coaching.' },
        { id: 5, title: 'WoW Dragonflight', image: Item5, description: 'Buy safe WoW carries with pro players. Vast catalog of boosts for high-end PvE and PvE activities, as well as solo-farm and coaching.' },
        { id: 6, title: 'WoW Dragonflight', image: Item6, description: 'Buy safe WoW carries with pro players. Vast catalog of boosts for high-end PvE and PvE activities, as well as solo-farm and coaching.' }
    ]

    return (
        <div className={styles.List}>
            {items.map(item => (
                <Item key={item.id} item={item} />
            ))}
        </div>
    )
}

export default ListItems