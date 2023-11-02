import { FC, FormEvent, useState } from "react"
import styles from './style.module.css'
import { ArrowDownIcon, SearchIcon } from "../Icons"
import { useNavigate } from "react-router-dom"

const Search: FC = () => {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    function SearchItems(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        navigate(`/search?q=${search}`)
    }

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