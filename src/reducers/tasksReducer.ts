import {FilterType, TaskType} from "../App";
import {v1} from "uuid";

type TaskReducerType = {
    type: string
    payload: any
}

const TasksReducer = (state:Array<TaskType>, action:TaskReducerType): Array<TaskType> => {
    switch (action.type) {
        case 'ADD-TASK': {
            return state

            // const newTask = {id: v1(), title: title, isDone: false}
            // setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
        }
        case 'REMOVE-TASK': {
            return state
        }
        case 'REMOVE-TASK': {
            return state
        }
        case 'COMPLETE-TASK': {
            return state
        }
        default: {
            return state
        }
    }
}

type taskReducerType = addTaskACType | removeTaskACType | completeTaskACType
type addTaskACType = ReturnType<typeof addTaskAC>
const addTaskAC = (todolistID: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistID,
            title
        }
    } as const
}

const removeTaskAC = (todolistID: string, taskID: string) => {
    setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== taskID)})
}
const completeTaskAC = (todolistID: string, taskID: string, isDone: boolean) => {
    setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskID ? {...t, isDone: isDone} : t)})
}

