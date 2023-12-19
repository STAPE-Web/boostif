import Input from '@/ui/Input'
import { useState, useCallback, useEffect } from 'react'
import API from '@/api/items'
import { IService } from '@/types'
import styles from './style.module.css'
import useAdminStore from '@/store/admin'
import { CheckIcon, DeleteIcon, EditIcon, ImageIcon } from '@/ui/Icons'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from "@/firebase"
import { useNavigate } from 'react-router-dom'
import TextEditor from '@/components/TextEditor'

const Items = () => {
    const [create, setCreate] = useState(false)
    const [data, setData] = useState<IService[]>([])
    const activePage = useAdminStore(state => state.activePage)
    const [image, setImage] = useState<any>([])
    const [imagePath, setImagePath] = useState("")

    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [details, setDetails] = useState([])
    const [requirements, setRequirements] = useState([])

    const [updateId, setUpdateId] = useState("")
    const [updateTitle, setUpdateTitle] = useState("")
    const [updatePrice, setUpdatePrice] = useState("")
    const [updateDescription, setUpdateDescription] = useState("")

    const additionalData = useAdminStore(state => state.data)
    const changeModal = useAdminStore(state => state.changeModal)
    const changeDetails = useAdminStore(state => state.changeDetails)
    const changeRequirements = useAdminStore(state => state.changeRequirements)
    const changePlatform = useAdminStore(state => state.changePlatform)
    const changeService = useAdminStore(state => state.changeService)
    const changeRuns = useAdminStore(state => state.changeRuns)
    const changeCalculator = useAdminStore(state => state.changeCalculator)
    const changeDifficulty = useAdminStore(state => state.changeDifficulty)


    function AdditionalSettings() {
        changeModal(true)
    }

    const navigate = useNavigate()

    const getReviews = useCallback(async () => {
        setData([])
        const res = await API.get(activePage)
        setData(res)
    }, [API, activePage])

    useEffect(() => {
        getReviews()
    }, [getReviews])

    async function createReview() {
        const res = await API.create(title, price, description, details, requirements, activePage, imagePath)
        if (res) {
            getReviews()
            setCreate(false)
            setTitle("")
            setPrice("")
            setDescription("")
            setDetails([])
            setRequirements([])
            setImagePath("")
            setImage([])
        }
    }

    async function deleteReview(id: string) {
        const res = await API.delete(id)
        if (res) {
            getReviews()
        }
    }

    const loadImage = useCallback(async (path: string) => {
        if (path !== "") {
            const imageRef = ref(storage, path);

            try {
                const url = await getDownloadURL(imageRef);
                setImagePath(url);
            } catch (error) {
                console.error("Error getting download URL: ", error);
            }
        }
    }, []);

    useEffect(() => {
        if (image.length !== 0) {
            const imageRef = ref(storage, `images/${activePage}/${Date.now()}/${image[0]?.name}`);

            uploadBytes(imageRef, image[0]).then(() => {
                loadImage(imageRef.fullPath);
            })
        }
    }, [image, activePage, loadImage]);

    async function updateHandler(id: string) {
        if (id !== "") {
            const res: IService = await API.getOne(id)
            setUpdateTitle(res.data.name)
            setUpdatePrice(res.data.price)
            setUpdateDescription(res.data.description)
            setUpdateId(id)
            setImagePath(res.data.image)
            changeDetails(res.data.details)
            changeRequirements(res.data.requirements)
            if (res.data.platform !== undefined) changePlatform(res.data.platform)
            if (res.data.service !== undefined) changeService(res.data.service)
            if (res.data.runs !== undefined) changeRuns(res.data.runs)
            if (res.data.hideCalculator !== undefined) changeCalculator(res.data.hideCalculator)
            if (res.data.difficulty !== undefined) changeDifficulty(res.data.difficulty)
        } else {
            setUpdateTitle("")
            setUpdatePrice("")
            setUpdateDescription("")
            setImagePath("")
            setImage([])
            setUpdateId(id)
            changeDetails([""])
            changeRequirements([""])
            changePlatform({
                title: "",
                hidden: false,
                array: [
                    { name: "PC", price: 0, hidden: false },
                    { name: "Xbox", price: 0, hidden: false },
                    { name: "PS", price: 0, hidden: false }
                ]
            })
            changeService({
                title: "",
                hidden: false,
                array: [
                    { name: "", price: 0 }
                ]
            })
            changeRuns({
                title: "",
                count: 0,
                label: ""
            })
            changeCalculator(false)
            changeDifficulty({
                title: "",
                hidden: false,
                array: [
                    { name: "", price: 0 }
                ]
            })
        }
    }

    async function updateReview() {
        const data = await API.update(updateId, updateTitle, updatePrice, updateDescription, imagePath, additionalData)
        if (data) {
            getReviews()
            setUpdateTitle("")
            setUpdatePrice("")
            setUpdateDescription("")
            setUpdateId("")
            setImagePath("")
            setImage([])
            changeModal(false)
            changeDetails([""])
            changeRequirements([""])
            changePlatform({
                title: "",
                hidden: false,
                array: [
                    { name: "PC", price: 0, hidden: false },
                    { name: "Xbox", price: 0, hidden: false },
                    { name: "PS", price: 0, hidden: false }
                ]
            })
            changeService({
                title: "",
                hidden: false,
                array: [
                    { name: "", price: 0 }
                ]
            })
            changeRuns({
                title: "",
                count: 0,
                label: ""
            })
            changeCalculator(false)
            changeDifficulty({
                title: "",
                hidden: false,
                array: [
                    { name: "", price: 0 }
                ]
            })
        }
    }

    return (
        <section className={styles.Module}>
            <div className={styles.CreationBox}>
                <button className={`${styles.Button} ${styles.Outline}`} onClick={() => setCreate(!create)}>{create ? "Close creation" : `Create service`}</button>
                {create &&
                    <div className={styles.Form}>
                        <input className={styles.UploadInput} id='upload' type="file" onChange={e => setImage(e.target.files)} />
                        <label htmlFor="upload" className={styles.Button}>
                            {image.length !== 0
                                ? <>
                                    <CheckIcon className={styles.Icon} /> Image Uploaded
                                </>
                                : <>
                                    <ImageIcon className={styles.Icon} /> Upload Image
                                </>
                            }
                        </label>
                        <Input label='' type="text" placeholder={"Enter service Name"} onChange={e => setTitle(e.target.value)} value={title} />
                        <Input label='' type="text" placeholder={"Enter service Price"} onChange={e => setPrice(e.target.value)} value={price} />
                        {/* <Input label='' type="text" placeholder={"Enter service Description"} onChange={e => setDescription(e.target.value)} value={description} /> */}
                        <TextEditor big={false} value={description} onChange={setDescription} />
                        <button className={styles.Button} onClick={() => createReview()} disabled={title === ""}>Create</button>
                    </div>
                }
            </div>

            <div className={styles.List}>
                {data.map(item => (
                    <div key={item.id} className={styles.Item}>
                        <div className={styles.ItemInfo}>
                            <div className={styles.Info} onClick={() => navigate(`/item/${item.id}`)}>
                                <img src={item.data.image[0] === "/" ? `${import.meta.env.VITE_PUBLIC}${item.data.image}` : item.data.image} alt="" />
                                <div className={styles.Text}>
                                    <h3>{item.data.name}</h3>
                                    <p>${item.data.price}</p>
                                </div>
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
                            <div className={styles.Row}>
                                <input className={styles.UploadInput} id='upload' type="file" onChange={e => setImage(e.target.files)} />
                                <label htmlFor="upload" className={styles.Button}>
                                    {image.length !== 0
                                        ? <>
                                            <CheckIcon className={styles.Icon} /> Image Updated
                                        </>
                                        : <>
                                            <ImageIcon className={styles.Icon} /> Update Image
                                        </>
                                    }
                                </label>
                                <button className={`${styles.Button} ${styles.Outline}`} onClick={() => AdditionalSettings()}>+ Additional settings</button>
                            </div>
                            <Input label='' type="text" placeholder={"Enter service Name"} onChange={e => setUpdateTitle(e.target.value)} value={updateTitle} />
                            <Input label='' type="text" placeholder={"Enter service Price"} onChange={e => setUpdatePrice(e.target.value)} value={updatePrice} />
                            {/* <Input label='' type="text" placeholder={"Enter service Description"} onChange={e => setUpdateDescription(e.target.value)} value={updateDescription} /> */}
                            <TextEditor big={false} value={updateDescription} onChange={setUpdateDescription} />
                            <div className={styles.Row}>
                                <button className={styles.Button} onClick={() => updateReview()} disabled={updateTitle === ""}>Update</button>
                                <button className={`${styles.Button} ${styles.Outline}`} onClick={() => updateHandler("")}>Cancel</button>
                            </div>
                        </div>}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Items