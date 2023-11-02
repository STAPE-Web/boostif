import Logo from '@/assets/Logo.png'
import styles from './style.module.css'
import Search from '@/ui/Search'
import ButtonSquare from '@/ui/Buttons/Square'
import { FilterIcon } from '@/ui/Icons'
import Language from '@/ui/Language'
import Button from '@/ui/Buttons/Default'
import { useNavigate } from 'react-router-dom'
import Avatar from '@/ui/Avatar'
import useGlobalStore from '@/store'

const Header = () => {
    const navigate = useNavigate()
    const headerShown = useGlobalStore(state => state.headerShown)
    const isAuth = localStorage.getItem('isAuth')

    return (
        <>
            {headerShown && <header className={styles.Header}>
                <div className={styles.LogoBox} onClick={() => navigate("/")}>
                    <img className={styles.Logo} src={Logo} alt="" />
                </div>

                <div className={styles.Controlls}>
                    <Search />
                    <ButtonSquare onClick={() => ({})}>
                        <FilterIcon className={styles.Icon} />
                    </ButtonSquare>
                </div>

                <div className={styles.Box}>
                    <Language language='En' />
                    {isAuth
                        ? <Avatar sign='S' onClick={() => navigate(`/profile`)} />
                        : <Button onClick={() => navigate("/signin")}>Sign in</Button>
                    }
                </div>
            </header>}
        </>
    )
}

export default Header