import { AxeIcon, CashIcon, DimondIcon, SecureIcon, SwordIcon } from "@/ui/Icons"
import styles from "./style.module.css"

const PlayersChooseUs = () => {
    const items = [
        { icon: SwordIcon, title: 'PRO Team', description: "We hire only reliable and experienced players. Your order will be executed promptly and efficiently" },
        { icon: SecureIcon, title: 'Secure Payment', description: "Your payment will be processed through Stripe gateway. We don't get access to your private information" },
        { icon: DimondIcon, title: 'Guaranteed Safety', description: "Your account is as precious to us, as to you – we stick to the best safety protocols, including premium VPN" },
        { icon: AxeIcon, title: 'Dedicated Support', description: "Our friendly support is almost like your personal army. We answer your questions 24/7 in online chat" },
        { icon: CashIcon, title: 'Low Prices & Cashback', description: "Get up to 10% cashback as bonus points to your personal account. Use them to reduce price for your next purchase" },
    ]

    return (
        <div className={styles.Items}>
            {items.map((item, index) => (
                <div key={index}>
                    <item.icon />
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                </div>
            ))}
        </div>
    )
}

export default PlayersChooseUs