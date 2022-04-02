import React, {useReducer, useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {MyUniversalInput} from "./universalComponent/MyUniversalInput";
import {MyUniversalButton} from "./universalComponent/MyUniversalButton";
import {TodoList} from "./TodoList";
import {addTaskAC, completeTaskAC, removeTaskAC, TasksReducer} from "./reducers/tasksReducer";
import {changeFilterAC, createTodoListAC, deleteTodoListAC, TodoListsReducer} from "./reducers/todoListsReducer";


export type FilterType = 'active' | 'completed' | 'all'
export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todolistID1: string = v1()
    const todolistID2: string = v1()

    let [todoLists, dispatchTodoLists] = useReducer(TodoListsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'active'}
    ])

    let [tasks, dispatchTasks] = useReducer(TasksReducer, {
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    })

    let [todoListInputValue, setTodoListInputValue] = useState('')

    const addTask = (todolistID: string, title: string) => {
        dispatchTasks(addTaskAC(todolistID, title))
    }

    const removeTask = (todolistID: string, taskID: string) => {
        dispatchTasks(removeTaskAC(todolistID, taskID))
    }

    const completeTask = (todolistID: string, taskID: string, isDone: boolean) => {
        dispatchTasks(completeTaskAC(todolistID, taskID, isDone))
    }

    const createTodoList = () => {
        const action = createTodoListAC(todoListInputValue)
        dispatchTasks(action)
        dispatchTodoLists(action)
        setTodoListInputValue('')
    }

    const deleteTodoList = (todolistID: string) => {
        dispatchTodoLists(deleteTodoListAC(todolistID))
        dispatchTasks(deleteTodoListAC(todolistID))
    }

    const changeFilter = (todolistID: string, filter: FilterType) => {
        dispatchTodoLists(changeFilterAC(todolistID, filter))
    }


    return (
        <div className='App'>

            <MyUniversalInput value={todoListInputValue} onEnter={createTodoList} callback={(e) => {
                setTodoListInputValue(e.currentTarget.value)
            }}/>
            <MyUniversalButton title={'Add TodoList'} callback={createTodoList}/>
            <div className='container'>
                {todoLists.map(el => {

                    let tasksForTodoList = tasks[el.id]

                    if (el.filter === 'active') {
                        tasksForTodoList = tasks[el.id].filter(t => t.isDone === false)
                    }

                    if (el.filter === 'completed') {
                        tasksForTodoList = tasks[el.id].filter(t => t.isDone === true)
                    }

                    if (el.filter === 'all') {
                        tasksForTodoList = tasks[el.id]
                    }

                    return (
                        <TodoList
                            key={el.id}
                            title={el.title}
                            tasks={tasksForTodoList}
                            todolistID={el.id}
                            addTask={addTask}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            filter={el.filter}
                            completeTask={completeTask}
                            deleteTodoList={deleteTodoList}
                        />
                    )

                })}
            </div>
        </div>


    );
}

export default App;
