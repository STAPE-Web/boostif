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
import { useCallback, useEffect, useState } from 'react'
import API from '@/api/user'
import { IUser } from '@/types'

const Header = () => {
    const navigate = useNavigate()
    const headerShown = useGlobalStore(state => state.headerShown)
    const userId = JSON.parse(localStorage.getItem('userId') as string)
    const [data, setData] = useState<IUser | null>(null)

    const getUserData = useCallback(async () => {
        const res = await API.get(JSON.parse(localStorage.getItem('userId') as string))
        setData(res)
    }, [API])

    useEffect(() => {
        getUserData()
    }, [getUserData])

    return (
        <>
            {headerShown && <header className={styles.Header}>
                <div className={styles.LogoBox} onClick={() => navigate("/")}>
                    <img className={styles.Logo} src={Logo} alt="" />
                </div>

                <div className={styles.Controlls}>
                    <Search />
                    <ButtonSquare onClick={() => navigate("/search?q=")}>
                        <FilterIcon className={styles.Icon} />
                    </ButtonSquare>
                </div>

                <div className={styles.Box}>
                    <Language language='En' />
                    {userId !== '' && userId !== null && userId !== undefined
                        ? <Avatar sign={data?.data.username[0]} url={data?.data.avatar} onClick={() => navigate(`/profile`)} />
                        : <Button onClick={() => navigate("/signin")}>Sign in</Button>
                    }
                </div>
            </header>}
        </>
    )
}

export default Header