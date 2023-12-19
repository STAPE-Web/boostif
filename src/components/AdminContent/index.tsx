import styles from './style.module.css'
import Items from './Items'
import useAdminStore from '@/store/admin'
import Pages from './Pages'

const AdminContent = () => {
    const activePage = useAdminStore(state => state.activePage)

    return (
        <div className={styles.Content}>
            {Number(activePage) < 18
                ? <Items />
                : <Pages />
            }
        </div>
    )
}

export default AdminContent