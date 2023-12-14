import useGlobalStore from "@/store";
import { useEffect, useState } from "react"
import styles from './style.module.css'
import AdminSidebar from "@/components/AdminSidebar"
import AdminContent from "@/components/AdminContent"
import Input from "@/ui/Input";
import Button from "@/ui/Buttons/Default";
import API from "@/api/auth"

const Admin = () => {
    const changeHeaderShown = useGlobalStore(state => state.changeHeaderShown)
    const changePage = useGlobalStore(state => state.changePage)

    useEffect(() => {
        changeHeaderShown(false)
        changePage("Admin")
    }, [])

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    async function LoginAdmin() {
        const res = await API.admin(login, password)
        localStorage.setItem("adminLogin", res)
        window.location.reload()
        // wh2G$5343/d=
    }

    return (
        <>
            {localStorage.getItem("adminLogin")
                ? <main className={styles.Page}>
                    <AdminSidebar />
                    <AdminContent />
                </main>
                : <div className={styles.FormBox}>
                    <div className={styles.Form}>
                        <Input label="Admin Login" onChange={e => setLogin(e.target.value)} placeholder="Enter Admin Login" type="text" value={login} />
                        <Input label="Admin Password" onChange={e => setPassword(e.target.value)} placeholder="Enter Admin Password" type="text" value={password} />
                        <Button onClick={() => LoginAdmin()}>Login to admin panel</Button>
                    </div>
                </div>
            }
        </>
    )
}

export default Admin