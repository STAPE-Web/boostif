import styles from './style.module.css'

const OrderHistory = () => {
    const history = [
        { id: 1, name: 'WoW Dragonflight', price: 12 },
        { id: 2, name: 'WoW Dragonflight', price: 12 },
        { id: 3, name: 'WoW Dragonflight', price: 12 },
        { id: 4, name: 'WoW Dragonflight', price: 12 },
        { id: 5, name: 'WoW Dragonflight', price: 12 },
        { id: 6, name: 'WoW Dragonflight', price: 12 },
        { id: 7, name: 'WoW Dragonflight', price: 12 },
        { id: 8, name: 'WoW Dragonflight', price: 12 },
        { id: 9, name: 'WoW Dragonflight', price: 12 },
        { id: 10, name: 'WoW Dragonflight', price: 12 },
        { id: 11, name: 'WoW Dragonflight', price: 12 },
        { id: 12, name: 'WoW Dragonflight', price: 12 },
        { id: 13, name: 'WoW Dragonflight', price: 12 },
        { id: 14, name: 'WoW Dragonflight', price: 12 },
        { id: 15, name: 'WoW Dragonflight', price: 12 },
    ]

    return (
        <div className={styles.OrderHistory}>
            {history.map(h => (
                <div key={h.id} className={styles.Item}>
                    <h3>{h.name}</h3>
                    <p>${h.price}</p>
                </div>
            ))}
        </div>
    )
}

export default OrderHistory