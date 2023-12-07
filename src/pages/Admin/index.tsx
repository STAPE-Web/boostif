import useGlobalStore from "@/store";
import { useEffect } from "react"
import styles from './style.module.css'
import AdminSidebar from "@/components/AdminSidebar"
import AdminContent from "@/components/AdminContent"

const Admin = () => {
    const changeHeaderShown = useGlobalStore(state => state.changeHeaderShown)
    const changePage = useGlobalStore(state => state.changePage)

    useEffect(() => {
        changeHeaderShown(false)
        changePage("Admin")
    }, [])

    return (
        <main className={styles.Page}>
            <AdminSidebar />
            <AdminContent />
        </main>
    )
}

export default Admin