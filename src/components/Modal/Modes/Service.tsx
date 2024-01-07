import { ChangeEvent, FC, useState } from "react"
import styles from "../style.module.css"
import Input from "@/ui/Input"
import useAdminStore from "@/store/admin"
import Toggle from "@/components/Toggle"
import { AddIcon, DeleteIcon } from "@/ui/Icons"
import MultiSelect from "@/ui/MultiSelect"

interface Props {
    tab: string
    serviceHidden: boolean
    setHiddenService: React.Dispatch<React.SetStateAction<boolean>>
    setTitleService: React.Dispatch<React.SetStateAction<string>>
    serviceTitle: string
    handleService: (e: ChangeEvent<HTMLInputElement>, index: number, state: string, priceIndex?: number | undefined) => void
}

const Service: FC<Props> = ({ tab, serviceHidden, setHiddenService, serviceTitle, setTitleService, handleService }) => {
    const service = useAdminStore(state => state.data.service)
    const changeService = useAdminStore(state => state.changeService)
    const difficulty = useAdminStore(state => state.data.difficulty)

    const [activeSelect, setActiveSelect] = useState(false)

    console.log(service)

    return (
        <>
            <div className={styles.Row2}>
                <h2>{tab}</h2>
                <Toggle state={serviceHidden} onChange={() => setHiddenService(!serviceHidden)} />
            </div>

            <Input label="" onChange={e => setTitleService(e.target.value)} placeholder={"Service Title"} type="text" value={serviceTitle} />

            <div className={styles.Row2} style={{ marginTop: 10 }}>
                <p>Add binding to classes</p>
                <Toggle state={activeSelect} onChange={() => setActiveSelect(!activeSelect)} />
            </div>

            <div className={`${styles.Scroll} ${service.array.length < 9 ? styles.HideScroll : ""}`}>
                {service.array.map((item, index) => (
                    <div className={styles.Row3} key={index}>
                        <Input label="" onChange={e => handleService(e, index, "name")} placeholder={"Service Name"} type="text" value={item.name} />
                        <div className={styles.Row}>
                            {item.price.map((price, i) => (
                                <Input key={i} label="" onChange={e => handleService(e, index, "price", i)} placeholder="Price" type="number" value={price} />
                            ))}
                        </div>

                        {activeSelect && <div className={styles.SelectBox}>
                            <MultiSelect
                                array={difficulty.array}
                                setValue={(selectedDifficulties) => {
                                    const updatedArray = service.array.map((serviceItem, serviceIndex) => {
                                        if (serviceIndex === index) {
                                            return {
                                                ...serviceItem,
                                                class: selectedDifficulties
                                            };
                                        }
                                        return serviceItem;
                                    });

                                    changeService({
                                        ...service,
                                        array: updatedArray
                                    });
                                }}
                                value={item.class || []}
                            />
                        </div>}

                        <DeleteIcon className={styles.DeleteIcon} onClick={() => changeService({
                            hidden: service.hidden, title: service.title,
                            array: service.array.filter((_, id) => id !== index)
                        })} />
                    </div>
                ))}
            </div>

            <button className={styles.ButtonUpdate} onClick={() => changeService({
                hidden: service.hidden, title: service.title,
                array: [...service.array, { name: "", price: [0, 0, 0], class: [] }]
            })}>
                <AddIcon />
            </button>
        </>
    )
}

export default Service