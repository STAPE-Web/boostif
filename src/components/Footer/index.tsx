import Button from '@/ui/Buttons/Link'
import styles from './style.module.css'
import Logo from '@/assets/Logo.png'
import { FacebookIcon, InstagramIcon, TiktokIcon, TwitterIcon, YouTubeIcon } from '@/ui/Icons'
import useGlobalStore from '@/store'
import { Link } from 'react-router-dom'
import Mastercard from '@/assets/Payments/Mastercard'
import ApplePay from '@/assets/Payments/ApplePay'
import GooglePay from '@/assets/Payments/GooglePay'
import Sofort from '@/assets/Payments/Sofort'
import Visa from '@/assets/Payments/Visa'
import AMEX from '@/assets/Payments/AMEX'

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

    const links = [
        [
            { link: "/terms", name: "Terms & Conditions" },
            { link: "/privacy", name: "Privacy Policy" },
            { link: "/contact", name: "Contact Us" },
            { link: "/cookie", name: "Cookie Policy" },
            { link: "/refund", name: "Refund Policy" },
            { link: "/work", name: "Work with us" },
        ],
        [
            { link: "/catalog/1", name: "Diablo 4" },
            { link: "/catalog/2", name: "WoW Dragonflight" },
            { link: "/catalog/3", name: "WoW Classic Hardcore" },
            { link: "/catalog/4", name: "WoW WotLK" },
            { link: "/catalog/5", name: "Destiny 2" },
        ],
        [
            { link: "/catalog/6", name: "The Elder Scrolls Online" },
            { link: "/catalog/7", name: "Escape from Tarkov" },
            { link: "/catalog/8", name: "Valorant" },
            { link: "/catalog/9", name: "Apex Legends" },
            { link: "/catalog/10", name: "League Of Legends" },
        ],
        [
            { link: "/catalog/11", name: "Overwatch 2" },
            { link: "/catalog/12", name: "FIFA 24" },
            { link: "/catalog/13", name: "Final Fantasy XIV" },
            { link: "/catalog/14", name: "Lost Ark" },
            { link: "/catalog/15", name: "New World" },
        ],
        [
            { link: "/catalog/16", name: "GTA 5 Online" },
            { link: "/catalog/17", name: "Path of Exile" },
        ],
    ]

    return (
        <>
            {headerShown && <>
                {page !== "Support" && <footer className={styles.Footer}>
                    <div className={styles.Payments}>
                        <Mastercard />
                        <ApplePay />
                        <GooglePay />
                        <Sofort />
                        <Visa />
                        <AMEX />
                    </div>

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
                            {links.map((link, index) => (
                                <ul key={index}>
                                    {link.map((l, i) => (
                                        <Link key={i} to={l.link}><li>{l.name}</li></Link>
                                    ))}
                                </ul>
                            ))}
                        </div>
                    </div>
                </footer>}
            </>}
        </>
    )
}

export default Footer