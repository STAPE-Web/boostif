import useGlobalStore from "@/store"
import { useEffect, useState } from "react"
import Logo from '@/assets/Logo.png'
import Button from "@/ui/Buttons/Default"
import styles from './style.module.css'
import ButtonGoogle from '@/ui/Buttons/Google'
import Input from "@/ui/Input"
import { Link } from "react-router-dom"

const SignUp = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const changeHeaderShown = useGlobalStore(state => state.changeHeaderShown)

    useEffect(() => {
        changeHeaderShown(false)
    }, [])

    function Login() {
        localStorage.setItem('isAuth', JSON.stringify(true))
        window.location.replace('/')
    }

    return (
        <main className={styles.Auth}>
            <Link to="/">
                <img src={Logo} alt="" />
            </Link>

            <div className={styles.Form}>
                <Input label="Name" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter Your Name" type="text" />
                <Input label="Email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter Your Email" type="text" />
                <Input label="Password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Password" type="password" />
                <Button onClick={() => Login()}>Sign up</Button>
                <p>Already have an account? <Link to="/signin">Sign in</Link></p>

                <div className={styles.Line} />

                <ButtonGoogle onClick={() => Login()} />
            </div>
        </main>
    )
}

export default SignUp