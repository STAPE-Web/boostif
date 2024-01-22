import { FC, useState } from "react"
import styles from './style.module.css'
import { ArrowDownIcon, SearchIcon } from "../Icons"

interface Props {
    SearchItems: (e: any) => void
}

const Search: FC<Props> = ({ SearchItems }) => {
    const [search, setSearch] = useState('')

    return (
        <form className={styles.Search} onSubmit={e => SearchItems(e)}>
            <SearchIcon className={styles.Icon} />
            <input type="text" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} />
            {search.length !== 0 && <button>
                <ArrowDownIcon className={styles.ArrowIcon} />
            </button>}
        </form>
    )
}

export default Search