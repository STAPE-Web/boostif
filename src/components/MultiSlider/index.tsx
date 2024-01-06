import { ChangeEvent, FC, useState } from "react"
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import styles from "./style.module.css"
import Input from "@/ui/Input";

interface Props {
    value: (number | undefined)[]
    maxCount: number
    setValue: React.Dispatch<React.SetStateAction<number[]>>
    label: string[]
}

const MultiSlider: FC<Props> = ({ label, maxCount, setValue, value }) => {
    const [minValue, set_minValue] = useState(1);
    const [maxValue, set_maxValue] = useState(maxCount);
    const handleInput = (e: ChangeResult) => {
        set_minValue(e.minValue);
        set_maxValue(e.maxValue);
        setValue([e.minValue, e.maxValue]);
    };

    const minHandler = (e: ChangeEvent<HTMLInputElement>) => {
        set_minValue(Number(e.target.value));
        setValue([Number(e.target.value), Number(value[1])]);
    }

    const maxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        set_maxValue(Number(e.target.value));
        setValue([Number(value[0]), Number(e.target.value)]);
    }

    return (
        <div>
            {value !== undefined && <div className={styles.Row}>
                <Input label={label[0]} onChange={e => minHandler(e)} placeholder="" type="number" value={Number(value[0])} max={maxCount - 1} min={1} />
                <Input label={label[1]} onChange={e => maxHandler(e)} placeholder="" type="number" value={Number(value[1])} max={maxCount} min={2} />
            </div>}
            <MultiRangeSlider
                min={1}
                max={maxCount}
                step={1}
                minValue={minValue}
                maxValue={maxValue}
                onInput={(e) => {
                    handleInput(e);
                }}
                className={styles.Range}
                label={false}
                ruler={false}
                barLeftColor="rgba(255, 255, 255, 0.2)"
                barInnerColor="#564FFF"
                barRightColor="rgba(255, 255, 255, 0.2)"
                thumbLeftColor="#fff"
                thumbRightColor="#fff"
            />

        </div>
    )
}

export default MultiSlider