import Input from '@/ui/Input'
import { useState, useCallback, useEffect } from 'react'
import API from '@/api/items'
import APIGame from "@/api/games"
import { IService } from '@/types'
import styles from './style.module.css'
import useAdminStore from '@/store/admin'
import { CheckIcon, DeleteIcon, EditIcon, ImageIcon } from '@/ui/Icons'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from "@/firebase"
import { useNavigate } from 'react-router-dom'
import TextEditor from '@/components/TextEditor'
import SelectSections from '@/ui/SelectSections'

const Items = () => {
    const [create, setCreate] = useState(false)
    const [sections, setSections] = useState(false)
    const [section, setSection] = useState("")

    const [data, setData] = useState<IService[]>([])
    const [game, setGame] = useState<string[]>([])
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
    const [updateOldPrice, setUpdateOldPrice] = useState("")
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
    const changeLevel = useAdminStore(state => state.changeLevel)
    const changeSection = useAdminStore(state => state.changeSection)

    function AdditionalSettings() {
        changeModal(true)
    }

    const navigate = useNavigate()

    const getReviews = useCallback(async () => {
        setData([])
        const res = await API.get(activePage)
        setData(res)
    }, [API, activePage])

    const getGame = useCallback(async () => {
        setGame([])
        const res = await APIGame.getOne(activePage)
        setGame(res.data.sections)
    }, [APIGame, activePage])

    useEffect(() => {
        getReviews()
        getGame()
    }, [getReviews, getGame])

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

    async function createSection() {
        const newArray = [...game, section]
        const res = await APIGame.update(activePage, { sections: newArray })
        if (res) {
            setSection("")
            getGame()
        }
    }

    async function deleteSection(name: string) {
        const newArray = game.filter(i => !i.includes(name))
        const res = await APIGame.update(activePage, { sections: newArray })
        if (res) {
            getGame()
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
            changeSection(res.data.section)
            setUpdateTitle(res.data.name)
            setUpdatePrice(res.data.price)
            setUpdateOldPrice(res.data.oldPrice || "")
            setUpdateDescription(res.data.description)
            setUpdateId(id)
            setImagePath(res.data.image)
            changeDetails(res.data.details)
            changeRequirements(res.data.requirements)
            if (res.data.platform !== undefined) changePlatform(res.data.platform)
            if (res.data.service !== undefined) {
                if (typeof res.data.service.array[0].price !== "number") {
                    console.log(true)
                    changeService(res.data.service)
                } else {
                    changeService({
                        ...res.data.service, array: [{ name: "", price: [0, 0, 0], class: [] }]
                    })
                }
            }
            if (res.data.runs !== undefined) changeRuns(res.data.runs)
            if (res.data.hideCalculator !== undefined) changeCalculator(res.data.hideCalculator)
            if (res.data.difficulty !== undefined) changeDifficulty(res.data.difficulty)
            if (res.data.level !== undefined) changeLevel(res.data.level)
        } else {
            setUpdateTitle("")
            setUpdatePrice("")
            setUpdateOldPrice("")
            setUpdateDescription("")
            setImagePath("")
            setImage([])
            setUpdateId(id)
            changeDetails([""])
            changeRequirements([""])
            changeSection("")
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
                    { name: "", price: [0, 0, 0], class: [] }
                ]
            })
            changeRuns({
                title: "",
                count: 0,
                label: "",
                price: 0
            })
            changeCalculator(false)
            changeDifficulty({
                title: "",
                hidden: false,
                array: [
                    { name: "", price: 0 }
                ]
            })
            changeLevel({
                hidden: false,
                count: 50,
                title: "",
                label: ["", ""],
                price: 1
            })
        }
    }

    async function updateReview() {
        const data = await API.update(updateId, updateTitle, updatePrice, updateOldPrice, updateDescription, imagePath, additionalData)
        if (data) {
            getReviews()
            setUpdateTitle("")
            setUpdatePrice("")
            setUpdateOldPrice("")
            setUpdateDescription("")
            setUpdateId("")
            setImagePath("")
            setImage([])
            changeModal(false)
            changeDetails([""])
            changeRequirements([""])
            changeSection("")
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
                    { name: "", price: [0, 0, 0], class: [] }
                ]
            })
            changeRuns({
                title: "",
                count: 0,
                label: "",
                price: 0
            })
            changeCalculator(false)
            changeDifficulty({
                title: "",
                hidden: false,
                array: [
                    { name: "", price: 0 }
                ]
            })
            changeLevel({
                hidden: false,
                count: 50,
                title: "",
                label: ["", ""],
                price: 1
            })
        }
    }

    return (
        <section className={styles.Module}>
            <div className={styles.CreationBox}>
                <div className={styles.RowBox}>
                    <button className={styles.Button} onClick={() => {
                        setCreate(!create)
                        setSections(false)
                    }}>{create ? "Close Creation" : `Create Service`}</button>
                    <button className={`${styles.Button} ${styles.Outline}`} onClick={() => {
                        setSections(!sections)
                        setCreate(false)
                    }}>{sections ? "Close" : `Manage Sections`}</button>
                </div>

                {create &&
                    <div className={styles.Form}>
                        <h2>Create Service</h2>
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
                        <TextEditor big={false} value={description} onChange={setDescription} />
                        <button className={styles.Button} onClick={() => createReview()} disabled={title === ""}>Create</button>
                    </div>
                }

                {sections && <div className={styles.Form}>
                    <h2>Manage Sections</h2>
                    {game.length !== 0 && <SelectSections deleteSection={deleteSection} array={game} />}
                    <Input label='Create New Section' onChange={e => setSection(e.target.value)} placeholder='Enter Section Name' type='text' value={section} />
                    <button className={styles.Button} onClick={() => createSection()} disabled={section === ""}>Create</button>
                </div>}
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
                            <Input label='' type="number" placeholder={"Enter service Price"} onChange={e => setUpdatePrice(e.target.value)} value={updatePrice} />
                            <Input label='' type="number" placeholder={"Enter old service Price"} onChange={e => setUpdateOldPrice(e.target.value)} value={updateOldPrice} />
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