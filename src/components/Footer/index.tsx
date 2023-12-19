import Button from '@/ui/Buttons/Link'
import styles from './style.module.css'
import Logo from '@/assets/Logo.png'
import { FacebookIcon, InstagramIcon, TiktokIcon, TwitterIcon, YouTubeIcon } from '@/ui/Icons'
import useGlobalStore from '@/store'
import { Link } from 'react-router-dom'

const Footer = () => {
    const headerShown = useGlobalStore(state => state.headerShown)
    const page = useGlobalStore(state => state.page)

    const social = [
        { id: 1, link: '', icon: FacebookIcon },
        { id: 2, link: '', icon: InstagramIcon },
        { id: 3, link: '', icon: TiktokIcon },
        { id: 4, link: '', icon: YouTubeIcon },
        { id: 5, link: '', icon: TwitterIcon },
    ]

    return (
        <>
            {headerShown && <>
                {page !== "Support" && <footer className={styles.Footer}>
                    <div className={styles.Box}>
                        <div className={styles.Top}>
                            <img src={Logo} alt="" />

                            <div>
                                {social.map(s => (
                                    <Button key={s.id} onClick={() => ({})}>
                                        <s.icon />
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className={styles.Bottom}>
                            <ul>
                                <Link to="/terms"><li>Terms & Conditions</li></Link>
                                <Link to="/privacy"><li>Privacy Policy</li></Link>
                                <Link to="/contact"><li>Contact Us</li></Link>
                                <Link to="/cookie"><li>Cookie Policy</li></Link>
                                <Link to="/refund"><li>Refund Policy</li></Link>
                                <Link to="/work"><li>Work with us</li></Link>
                            </ul>

                            <ul>
                                <li>Diablo 4</li>
                                <li>WoW Dragonflight</li>
                                <li>WoW Classic Hardcore</li>
                                <li>WoW WotLK</li>
                                <li>Destiny 2</li>
                            </ul>

                            <ul>
                                <li>The Elder Scrolls Online</li>
                                <li>Escape from Tarkov</li>
                                <li>Valorant</li>
                                <li>Apex Legends</li>
                                <li>League Of Legends</li>
                            </ul>

                            <ul>
                                <li>Overwatch 2</li>
                                <li>FIFA 24</li>
                                <li>Final Fantasy XIV</li>
                                <li>Lost Ark</li>
                                <li>New World</li>
                            </ul>

                            <ul>
                                <li>GTA 5 Online</li>
                                <li>Path of Exile</li>
                            </ul>
                        </div>
                    </div>
                </footer>}
            </>}
        </>
    )
}

export default Footer