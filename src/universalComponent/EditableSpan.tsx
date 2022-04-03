import React, {useState} from 'react';
import {MyUniversalInput} from "./MyUniversalInput";

type EditableSpanPropsType = {
    title:string
    className?:string
    callback: (newTitle:string)=> void
}

const EditableSpan = (props:EditableSpanPropsType) => {
    let [title, setTitle] = useState(props.title)
    let [editMode, setEditMode] = useState<boolean>(false)

    const activateEditMode = () => {
        setEditMode(true)
    }

    const activateViewMode = () => {
        props.callback(title)
        setEditMode(false)
    }

    return !editMode ? (
        <span className={props.className} onDoubleClick={activateEditMode}>
            {props.title}
        </span> )
        : (
            <MyUniversalInput autoFocus onBlur={activateViewMode} edit={activateViewMode} value={title}
                              callback={(e)=>setTitle(e.currentTarget.value)}/>
        )
    ;
};

export default EditableSpan;