import Logo from '@/assets/Logo.png'
import styles from './style.module.css'
import useAdminStore from '@/store/admin'
import { useNavigate } from 'react-router-dom'

const AdminSidebar = () => {
    const changeActivePage = useAdminStore(state => state.changeActivePage)
    const activePage = useAdminStore(state => state.activePage)
    const navigate = useNavigate()

    const nav = [
        { name: "1", title: "Diablo 4" },
        { name: "2", title: "WoW Dragonflight" },
        { name: "3", title: "WoW Classic Hardcore" },
        { name: "4", title: "WoW WotLK" },
        { name: "5", title: "Destiny 2" },
        { name: "6", title: "The Elder Scrolls Online" },
        { name: "7", title: "Escape from Tarkov" },
        { name: "8", title: "Valorant" },
        { name: "9", title: "Apex Legends" },
        { name: "10", title: "League Of Legends" },
        { name: "11", title: "Overwatch 2" },
        { name: "12", title: "FIFA 24" },
        { name: "13", title: "Final Fantasy XIV" },
        { name: "14", title: "Lost Ark" },
        { name: "15", title: "New World" },
        { name: "16", title: "GTA 5 Online" },
        { name: "17", title: "Path of Exile" },
    ]

    const nav2 = [
        { name: "18", title: "Terms & Conditions" },
        { name: "19", title: "Privacy Policy" },
        { name: "20", title: "Contact Us" },
        { name: "21", title: "Cookie Policy" },
        { name: "22", title: "Refund Policy" },
        { name: "23", title: "Work with us" },
    ]

    return (
        <div className={styles.Sidebar}>
            <div className={styles.LogoBox} onClick={() => navigate("/")}>
                <img className={styles.Logo} src={Logo} alt="" />
            </div>

            <ul>
                {nav.map(n => (
                    <li key={n.name} onClick={() => changeActivePage(n.name)} className={activePage === n.name ? styles.Active : ""}>{n.title}</li>
                ))}
            </ul>


            <div>
                <h3>Pages</h3>
                <ul>
                    {nav2.map(n => (
                        <li key={n.name} onClick={() => changeActivePage(n.name)} className={activePage === n.name ? styles.Active : ""}>{n.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default AdminSidebar