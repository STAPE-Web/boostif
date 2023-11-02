import Step from "../Step"
import styles from './style.module.css'

const OrderSteps = () => {
    const steps = [
        { id: 1, title: 'Choose a service', description: "Choose a game and service, select options if needed, and add it to the cart." },
        { id: 2, title: 'Make a purchase', description: "Proceed to our quick checkout page, don't forget to use a promo code if you have one. After that choose a payment method and make a purchase." },
        { id: 3, title: 'Get in touch', description: "Drop us a line or just wait till we contact you first to confirm your order details. Then just sit back and relax, while our pros do the heavy lifting. We'll keep you updated about your order's progress. Done, enjoy the results!" },
    ]

    return (
        <div className={styles.Steps}>
            {steps.map(step => (
                <Step step={step} key={step.id} />
            ))}
        </div>
    )
}

export default OrderSteps