import useGlobalStore from "@/store";
import Button from "@/ui/Buttons/Default";
import { useEffect, useState } from "react";
import styles from "./style.module.css"
import Counter from "@/components/Counter";
import Input from "@/ui/Input";
import Checkbox from "@/ui/Checkbox";
import ApplePay from "@/assets/Payments/ApplePay";
import GooglePay from "@/assets/Payments/GooglePay";
import Mastercard from "@/assets/Payments/Mastercard";
import Sofort from "@/assets/Payments/Sofort";
import Visa from "@/assets/Payments/Visa";
import { LockIcon } from "@/ui/Icons";
import axios from "axios";
import AMEX from "@/assets/Payments/AMEX";

const Checkout = () => {
    const checkoutData = JSON.parse(localStorage.getItem('checkoutItem') as string);
    const changeHeaderShown = useGlobalStore(state => state.changeHeaderShown)
    const changePage = useGlobalStore(state => state.changePage)

    const [count, setCount] = useState(1)
    const [userData, setUserData] = useState("")
    const [agree, setAgree] = useState(false)

    useEffect(() => {
        changeHeaderShown(true)
        changePage("Item")
    }, [])

    async function Payment() {
        const roundedPrice = Math.round((Number(checkoutData.price) * count) * 100);
        const data = await axios.post(
            `${import.meta.env.VITE_SERVER}/payment`,
            {
                price: roundedPrice,
            },
        ).then(res => res.data);

        console.log(data)
        window.location.replace(data.session.url)
        localStorage.setItem("checkoutData", JSON.stringify({
            count, userData
        }))
    }

    return (
        <main>
            <section className={styles.Section}>
                <div className={styles.MainBox}>
                    <div className={styles.ReviewOrder}>
                        <h2>1. Review order</h2>

                        <div className={styles.Item}>
                            <div className={styles.ItemBox}>
                                <img src={checkoutData.image} alt="" />

                                <div>
                                    <h6>{checkoutData.game}</h6>
                                    <h3>{checkoutData.title}</h3>
                                    <p>{checkoutData.description}</p>
                                </div>
                            </div>

                            <div className={styles.ItemPrice}>
                                <Counter count={count} setCount={setCount} />
                                <h3>$ {(Number(checkoutData.price) * count).toFixed(2)}</h3>
                            </div>
                        </div>
                    </div>

                    <div className={styles.ReviewOrder}>
                        <h2>2. Payment method</h2>

                        <div className={styles.Stripe}>
                            <h3>Stripe</h3>

                            <div>
                                <Mastercard />
                                <ApplePay />
                                <GooglePay />
                                <Sofort />
                                <Visa />
                                <AMEX />
                            </div>
                        </div>

                        <Input label="Enter a Discord username or Telegram @username" onChange={e => setUserData(e.target.value)} placeholder="Enter username" type="text" value={userData} />

                        <div className={styles.Agree} onClick={() => setAgree(!agree)}>
                            <Checkbox active={agree} />
                            <p>I agree with <span>Terms or Service</span> and <span>Privacy Policy</span></p>
                        </div>

                        <div className={styles.SSL}>
                            <LockIcon />
                            <h5>SSL Protected</h5>
                            <p>Our checkout page is absolutely secure: we use SSL to protect your personal data.</p>
                        </div>
                    </div>
                </div>

                <div className={styles.TotalBox}>
                    <div className={styles.TotalRow}>
                        <h2>Total</h2>
                        <h2>$ {(Number(checkoutData.price) * count).toFixed(2)}</h2>
                    </div>

                    <Button onClick={() => Payment()}>Proceed to payment</Button>
                </div>
            </section>
        </main>
    )
}

export default Checkout