import Input from '@/ui/Input'
import { useState, useCallback, useEffect } from 'react'
import API from '@/api/items'
import { IService } from '@/types'
import styles from './style.module.css'
import useAdminStore from '@/store/admin'
import { DeleteIcon, EditIcon } from '@/ui/Icons'

const Items = () => {
    const [create, setCreate] = useState(false)
    const [data, setData] = useState<IService[]>([])
    const activePage = useAdminStore(state => state.activePage)

    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [details, setDetails] = useState([])
    const [requirements, setRequirements] = useState([])

    const getReviews = useCallback(async () => {
        setData([])
        const res = await API.get(activePage)
        setData(res)
    }, [API, activePage])

    useEffect(() => {
        getReviews()
    }, [getReviews])

    async function createReview() {
        const res = await API.create(title, price, description, details, requirements, activePage)
        if (res) {
            getReviews()
            setCreate(false)
            setTitle("")
            setPrice("")
            setDescription("")
            setDetails([])
            setRequirements([])
        }
    }

    async function deleteReview(id: string) {
        const res = await API.delete(id)
        if (res) {
            getReviews()
        }
    }

    return (
        <section className={styles.Module}>
            <div className={styles.CreationBox}>
                <button className={`${styles.Button} ${styles.Outline}`} onClick={() => setCreate(!create)}>{create ? "Close creation" : `Create service`}</button>
                {create &&
                    <div className={styles.Form}>
                        <Input label='' type="text" placeholder={"Enter service Name"} onChange={e => setTitle(e.target.value)} value={title} />
                        <Input label='' type="text" placeholder={"Enter service Price"} onChange={e => setPrice(e.target.value)} value={price} />
                        <Input label='' type="text" placeholder={"Enter service Description"} onChange={e => setDescription(e.target.value)} value={description} />
                        <button className={styles.Button} onClick={() => createReview()} disabled={title === ""}>Create</button>
                    </div>
                }
            </div>

            <div className={styles.List}>
                {data.map(item => (
                    <div key={item.id} className={styles.Item}>
                        <div className={styles.ItemInfo}>
                            <div className={styles.Text}>
                                <h3>{item.data.name}</h3>
                                <p>${item.data.price}</p>
                            </div>

                            <div className={styles.Controlls}>
                                <button className={styles.ButtonUpdate} onClick={() => ({})}>
                                    <EditIcon />
                                </button>
                                <button className={styles.ButtonDelete} onClick={() => deleteReview(item.id)}>
                                    <DeleteIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Items