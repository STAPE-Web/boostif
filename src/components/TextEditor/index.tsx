import { FC } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Props {
    value: string;
    onChange: React.Dispatch<React.SetStateAction<string>>
    big: boolean
}

const TextEditor: FC<Props> = ({ value, onChange, big }) => {
    return (
        <ReactQuill theme="snow" value={value} onChange={onChange}
            style={{ height: big ? 'calc(100vh - 250px)' : '200px', color: "#fff", marginBottom: "50px" }}
            placeholder='Enter Description'
        />
    );
}

export default TextEditor