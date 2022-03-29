import React, {useReducer, useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {MyUniversalInput} from "./universalComponent/MyUniversalInput";
import {MyUniversalButton} from "./universalComponent/MyUniversalButton";
import {TodoList} from "./TodoList";
import {addNewArrayAC, addTaskAC, completeTaskAC, removeTaskAC, TasksReducer} from "./reducers/tasksReducer";
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

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'active'}
    ])
    let [tasks, setTasks] = useState<TasksType>({
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

    // const initialTasks:TasksType = {
    //     [todolistID1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "ReactJS", isDone: false},
    //         {id: v1(), title: "Rest API", isDone: false},
    //         {id: v1(), title: "GraphQL", isDone: false},
    //     ],
    //     [todolistID2]: [
    //         {id: v1(), title: "HTML&CSS2", isDone: true},
    //         {id: v1(), title: "JS2", isDone: true},
    //         {id: v1(), title: "ReactJS2", isDone: false},
    //         {id: v1(), title: "Rest API2", isDone: false},
    //         {id: v1(), title: "GraphQL2", isDone: false},
    //     ]
    // }
    //
    // const initialTodoLists:TodoListType[] = [
    //     {id: todolistID1, title: 'What to learn', filter: 'all'},
    //     {id: todolistID2, title: 'What to buy', filter: 'active'}
    // ]
    //
    // let [tasks, dispatchTasks] = useReducer(TasksReducer, initialTasks)
    // let [todoLists, dispatchTodoLists] = useReducer()


    let [todoListInputValue, setTodoListInputValue] = useState('')

    //addTask with Function
    // const addTask = (todolistID: string, title: string) => {
    //     const newTask = {id: v1(), title: title, isDone: false}
    //     setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    //

    //addTask with Reducer
    const addTask = (todolistID: string, title: string) => {
        setTasks(TasksReducer(tasks, addTaskAC(todolistID, title)))
    }

    //removeTask with Function
    // const removeTask = (todolistID: string, taskID: string) => {
    //     setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== taskID)})
    // }

    //removeTask with Reducer
    const removeTask = (todolistID: string, taskID: string) => {
        setTasks(TasksReducer(tasks, removeTaskAC(todolistID, taskID)))
    }

    //completeTask with Function
    // const completeTask = (todolistID: string, taskID: string, isDone: boolean) => {
    //     setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskID ? {...t, isDone: isDone} : t)})
    // }

    //completeTask with Reducer
    const completeTask = (todolistID: string, taskID: string, isDone: boolean) => {
        setTasks(TasksReducer(tasks, completeTaskAC(todolistID, taskID, isDone)))
    }

    //createTodoList with Function
    // const createTodoList = () => {
    //     const newTodoListID = v1()
    //     const newTodolist: TodoListType = {id: newTodoListID, title: todoListInputValue, filter: 'all'}
    //     setTodoLists([newTodolist, ...todoLists])
    //     setTasks({...tasks, [newTodoListID]: []})
    //     setTodoListInputValue('')
    // }

    //createTodoList with Reducer
    const createTodoList = () => {
        const newTodoListID = v1()
        setTodoLists(TodoListsReducer(todoLists, createTodoListAC(newTodoListID, todoListInputValue)))
        setTasks(TasksReducer(tasks, addNewArrayAC(newTodoListID)))
        setTodoListInputValue('')
    }

    //deleteTodoList with Function
    // const deleteTodoList = (todolistID: string) => {
    //     setTodoLists(todoLists.filter(el => el.id !== todolistID))
    //     delete tasks[todolistID]
    // }

    //deleteTodoList with Reducer
    const deleteTodoList = (todolistID: string) => {
        setTodoLists(TodoListsReducer(todoLists, deleteTodoListAC(todolistID)))
        delete tasks[todolistID]
    }

    //changeFilter with Function
    // const changeFilter = (todolistID: string, filter: FilterType) => {
    //     setTodoLists(todoLists.map(el => el.id === todolistID ? {...el, filter: filter} : el))
    // }

    //changeFilter with Reducer
    const changeFilter = (todolistID: string, filter: FilterType) => {
        setTodoLists(TodoListsReducer(todoLists, changeFilterAC(todolistID, filter)))
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
