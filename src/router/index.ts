import Home from "@/pages/Home"
import Item from "@/pages/Item"
import Search from "@/pages/Search"
import Settings from "@/pages/Settings"
import SignIn from "@/pages/SignIn"
import SignUp from "@/pages/SignUp"
import User from "@/pages/User"

const notAuthRouters = [
    { id: 1, path: '*', element: SignIn },
    { id: 2, path: '/', element: Home },
    { id: 3, path: '/signin', element: SignIn },
    { id: 4, path: '/signup', element: SignUp },
    { id: 5, path: '/search', element: Search },
    { id: 6, path: '/item/:id', element: Item },
]

const authRouters = [
    { id: 1, path: '*', element: Home },
    { id: 2, path: '/', element: Home },
    { id: 3, path: '/profile', element: User },
    { id: 4, path: '/search', element: Search },
    { id: 5, path: '/settings', element: Settings },
    { id: 6, path: '/item/:id', element: Item },
]

export { notAuthRouters, authRouters }