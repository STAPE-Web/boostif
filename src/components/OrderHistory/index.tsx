import styles from './style.module.css'

const OrderHistory = () => {
    const history = [
        { id: 1, name: 'WoW Dragonflight', price: 12 },
        { id: 2, name: 'WoW Dragonflight', price: 12 },
        { id: 3, name: 'WoW Dragonflight', price: 12 },
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