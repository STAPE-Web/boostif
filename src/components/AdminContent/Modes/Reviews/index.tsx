import Input from '@/ui/Input'
import { useState, useCallback, useEffect } from 'react'
import API from '@/api/reviews'
import { IReview } from '@/types'
import styles from './style.module.css'
import { DeleteIcon, EditIcon } from '@/ui/Icons'

const Reviews = () => {
    const [create, setCreate] = useState(false)
    const [updateId, setUpdateId] = useState("")
    const [username, setUsername] = useState("")
    const [text, setText] = useState("")
    const [data, setData] = useState<IReview[]>([])
    const [updateText, setUpdateText] = useState("")
    const [updateUsername, setUpdateUsername] = useState("")

    const getReviews = useCallback(async () => {
        const res = await API.get()
        setData(res)
    }, [API])

    useEffect(() => {
        getReviews()
    }, [])

    async function createReview() {
        const res = await API.create(username, text)
        if (res) {
            setUsername("")
            setText("")
            getReviews()
        }
    }

    async function deleteReview(id: string) {
        const res = await API.delete(id)
        if (res) {
            getReviews()
        }
    }

    async function updateHandler(id: string) {
        if (id !== "") {
            const res: IReview = await API.getOne(id)
            setUpdateUsername(res.data.username)
            setUpdateText(res.data.text)
            setUpdateId(id)
        } else {
            setUpdateUsername("")
            setUpdateText("")
            setUpdateId(id)
        }
    }

    async function updateReview() {
        const data = await API.update(updateId, updateUsername, updateText)
        if (data) {
            getReviews()
            setUpdateUsername("")
            setUpdateText("")
            setUpdateId("")
        }
    }

    return (
        <section className={styles.Module}>
            <div className={styles.CreationBox}>
                <button className={`${styles.Button} ${styles.Outline}`} onClick={() => setCreate(!create)}>{create ? "Close creation" : "Create Review"}</button>
                {create &&
                    <div className={styles.Form}>
                        <Input type='user' placehodler='Enter username' setValue={setUsername} value={username} />
                        <Input type='post' textarea placehodler='Enter review text' setValue={setText} value={text} />
                        <button className={styles.Button} onClick={() => createReview()} disabled={username === ""}>Create</button>
                    </div>
                }
            </div>

            <div className={styles.List}>
                {data.map(item => (
                    <div key={item.id} className={styles.Item}>
                        <div className={styles.ItemInfo}>
                            <div className={styles.Text}>
                                <h3>{item.data.username}</h3>
                                <p>{item.data.text}</p>
                            </div>

                            <div className={styles.Controlls}>
                                <button className={styles.ButtonUpdate} onClick={() => updateHandler(item.id)}>
                                    <EditIcon />
                                </button>
                                <button className={styles.ButtonDelete} onClick={() => deleteReview(item.id)}>
                                    <DeleteIcon />
                                </button>
                            </div>
                        </div>

                        {updateId === item.id && <div className={styles.UpdateBox}>
                            <Input type='user' placehodler='Enter username' setValue={setUpdateUsername} value={updateUsername} />
                            <Input type='post' textarea placehodler='Enter review text' setValue={setUpdateText} value={updateText} />
                            <div className={styles.Row}>
                                <button className={styles.Button} onClick={() => updateReview()} disabled={updateUsername === ""}>Update</button>
                                <button className={`${styles.Button} ${styles.Outline}`} onClick={() => updateHandler("")}>Cancel</button>
                            </div>
                        </div>}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Reviews