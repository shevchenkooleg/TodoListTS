import React, {useState} from 'react';
import {MyUniversalInput} from "./MyUniversalInput";

type EditableSpanPropsType = {
    title:string
    todolistID:string
    changeTodoListTitle: (todolistID:string, todoListTitleValue:string)=> void
}

const EditableSpan = (props:EditableSpanPropsType) => {
    let [todoListTitleValue, setTodoListTitleValue] = useState(props.title)
    let [editMode, setEditMode] = useState<boolean>(false)

    const activateEditMode = () => {
        setEditMode(true)
    }

    const activateViewMode = () => {
        props.changeTodoListTitle(props.todolistID, todoListTitleValue)
        setEditMode(false)
    }

    return !editMode ? (
        <span onDoubleClick={activateEditMode}>
            {props.title}
        </span> )
        : (
            <MyUniversalInput autoFocus onBlur={activateViewMode} edit={activateViewMode} value={todoListTitleValue}
                              callback={(e)=>setTodoListTitleValue(e.currentTarget.value)}/>
        )
    ;
};

export default EditableSpan;