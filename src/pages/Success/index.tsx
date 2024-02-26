import Button from "@/ui/Buttons/Default"
import { CheckIcon } from "@/ui/Icons"
import styles from "./style.module.css"
import { useNavigate } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import axios from "axios"

const Success = () => {
    const navigate = useNavigate()
    const [sended, setSended] = useState(false)

    function goToHome() {
        navigate("/")
        localStorage.removeItem("checkoutItem")
        localStorage.removeItem("checkoutData")
        setSended(false)
    }

    const Create = useCallback(() => {
        const checkoutItem = JSON.parse(localStorage.getItem("checkoutItem") as string)
        const checkoutData = JSON.parse(localStorage.getItem("checkoutData") as string)
        const userId = JSON.parse(localStorage.getItem('userId') as string)

        if (checkoutItem !== null) {
            axios.post(`${import.meta.env.VITE_SERVER}/createOrder`, {
                ...checkoutItem, ...checkoutData, userId
            }).then(() => {
                setSended(true)
            })
        }
    }, [setSended])

    useEffect(() => {
        Create()
    }, [Create])

    return (
        <main className={styles.Page}>
            <section>
                <CheckIcon />
                <div>
                    <h1>Payment was successfully completed</h1>
                    <p>Our manager will contact you soon</p>
                </div>
                <Button onClick={() => sended && goToHome()}>Go to Home</Button>
            </section>
        </main>
    )
}

export default Success