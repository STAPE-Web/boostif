import { authRouters, notAuthRouters } from "@/router"
import { FC } from "react"
import { Routes, Route } from 'react-router-dom'

const AppRouter: FC = () => {
    const isAuth = localStorage.getItem('isAuth')

    return (
        <>
            {isAuth
                ? <Routes>
                    {authRouters.map(route => (
                        <Route path={route.path} element={<route.element />} key={route.id} />
                    ))}
                </Routes>
                : <Routes>
                    {notAuthRouters.map(route => (
                        <Route path={route.path} element={<route.element />} key={route.id} />
                    ))}
                </Routes>
            }
        </>
    )
}

export default AppRouter