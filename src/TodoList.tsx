import React, {ChangeEvent, useState} from 'react';
import {MyUniversalButton} from "./universalComponent/MyUniversalButton";
import {FilterType, TaskType} from "./App";
import {MyUniversalInput} from "./universalComponent/MyUniversalInput";
import s from './TodoList.module.css'
import EditableSpan from "./universalComponent/EditableSpan";

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    todolistID: string
    addTask: (todolistID: string, title: string) => void
    removeTask: (todolistID: string, taskID: string) => void
    changeFilter: (todolistID: string, filter: FilterType) => void
    completeTask: (todolistID: string, taskID: string, isDone: boolean) => void
    deleteTodoList: (todolistID: string) => void
    changeTodoListTitle: (todolistID:string, newTitle:string)=> void
    changeTaskTitle: (todolistID:string, taskID: string, newTitle:string) => void
    filter: FilterType

}

export const TodoList = (props: TodoListPropsType) => {

    let [inputValue, setInputValue] = useState('')
    let [error, setError] = useState(false)

    const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)

    }

    const onPressAddTaskButtonHandler = () => {
        if (inputValue) {
            props.addTask(props.todolistID, inputValue)
            setInputValue('')
            setError(false)

        } else {
            setError(true)
        }
    }

    const onChangeFilterHandler = (filter: FilterType) => {
        props.changeFilter(props.todolistID, filter)
    }

    const onCheckBoxHandler = (taskID: string, isDone: boolean) => {
        props.completeTask(props.todolistID, taskID, isDone)
    }

    const onDeleteTodoListButtonHandler = () => {
        props.deleteTodoList(props.todolistID)
    }

    const onChangeTodoListTitleHandler = (newTitle:string) => {
        props.changeTodoListTitle(props.todolistID, newTitle)
    }






    return (
        <div className={s.container}>
            <h3>
                <div>
                    <EditableSpan title={props.title} callback={onChangeTodoListTitleHandler}/>

                    <MyUniversalButton callback={onDeleteTodoListButtonHandler} title={'x'}/>
                    <span className={s.filter_status}>{props.filter}</span>
                </div>
                <div className={s.inputBlock}>
                    <MyUniversalInput placeholder={'Input task title'} value={inputValue} callback={onInputChangeHandler}
                                      onEnter={onPressAddTaskButtonHandler} red={error}/>
                    <MyUniversalButton title={'+'} callback={onPressAddTaskButtonHandler}/>
                </div>

            </h3>
            <div>
                {props.tasks.map(t => {

                    const onPressRemoveTaskButtonHandler = () => {
                        props.removeTask(props.todolistID, t.id)
                    }

                    const onChangeTaskTitleHandler = (newTitle:string) => {
                        props.changeTaskTitle(props.todolistID, t.id, newTitle)
                    }


                    return (


                        <div className={s.tasksContainer} key={t.id}>
                            <div className={s.taskCheckBox}>
                                <input  type="checkbox" checked={t.isDone}
                                        onChange={(e) => onCheckBoxHandler(t.id, e.currentTarget.checked)}/>
                            </div>
                            <EditableSpan className={s.taskTitle} title={t.title} callback={onChangeTaskTitleHandler}/>
                            {/*<div className={s.taskTitle}>{t.title}</div>*/}
                            <div className={s.taskDeleteButton}>
                                <MyUniversalButton title={'X'} callback={onPressRemoveTaskButtonHandler}/>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={s.buttons_bar}>
                <MyUniversalButton className={props.filter === 'active' ? s.active : s.button} title={'active'}
                                   callback={() => onChangeFilterHandler('active')}/>
                <MyUniversalButton className={props.filter === 'completed' ? s.active : s.button} title={'completed'}
                                   callback={() => onChangeFilterHandler('completed')}/>
                <MyUniversalButton className={props.filter === 'all' ? s.active : s.button} title={'all'}
                                   callback={() => onChangeFilterHandler('all')}/>
            </div>
        </div>
    )
}