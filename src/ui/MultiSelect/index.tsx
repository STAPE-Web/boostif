import { FC, useState } from "react";
import styles from './style.module.css';
import { ArrowDownIcon, CheckIcon } from "@/ui/Icons";
import { IArray } from "@/store/types/admin";

interface Props {
    array: IArray[];
    setValue: (selectedDifficulties: string[]) => void;
    value: string[];
}

const MultiSelect: FC<Props> = ({ array, setValue, value }) => {
    const [active, setActive] = useState(false)

    function selectItems(item: IArray) {
        if (value.includes(item.name)) {
            setValue(value.filter(selectedItem => selectedItem !== item.name));
        } else {
            setValue([...value, item.name]);
        }
    }

    return (
        <div className={styles.Module}>
            <div className={styles.Select} onClick={() => setActive(!active)}>
                <p>{value.length !== 0 ? `${value[0]} ${value.length > 1 ? `+ ${value.length - 1}` : ""}` : 'Nothing selected'}</p>
                <ArrowDownIcon className={styles.Icon} />
            </div>

            {active && <div className={styles.DropDown}>
                {array.map((item, index) => (
                    <div
                        key={index}
                        className={styles.Item}
                        style={{ display: item.hidden === undefined ? "flex" : item.hidden ? "flex" : "none" }}
                        onClick={() => selectItems(item)}
                    >
                        {item.name}

                        <div className={`${styles.Checked} ${value.includes(item.name) ? styles.Active : ''}`}>
                            <CheckIcon className={styles.CheckIcon} />
                        </div>
                    </div>
                ))}
            </div>}
        </div>
    );
};

export default MultiSelect;
