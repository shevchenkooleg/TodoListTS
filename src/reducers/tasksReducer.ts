import {TasksType} from "../App";
import {v1} from "uuid";

export const TasksReducer = (state:TasksType, action:TaskReducerType): TasksType => {
    switch (action.type) {
        case 'ADD-TASK': {
            const newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.todolistID]:[newTask, ...state[action.payload.todolistID]]}
        }
        case 'REMOVE-TASK': {
            return {...state, [action.payload.todolistID]:[...state[action.payload.todolistID].filter(el=> el.id != action.payload.taskID)]}
        }
        case 'COMPLETE-TASK': {
            return {...state, [action.payload.todolistID]:state[action.payload.todolistID].map(t=>t.id===action.payload.taskID ? {...t, isDone:action.payload.isDone} : t)}
        }
        case 'ADD-ARRAY-FOR-NEW-TODOLIST': {
            return {...state, [action.payload.newTodoListID]:[]}
        }
        case 'REMOVE-ARRAY-WITH-TODOLIST': {
            return state
        }
        default: {
            return state
        }
    }
}

type TaskReducerType = addTaskACType | removeTaskACType | completeTaskACType | addNewArrayACType | removeArrayWithTodolistACType
type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistID: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistID,
            title
        }
    } as const
}
type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistID: string, taskID: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistID,
            taskID
        }
    } as const
}
type completeTaskACType = ReturnType<typeof completeTaskAC>
export const completeTaskAC = (todolistID: string, taskID: string, isDone:boolean) => {
    return {
        type: 'COMPLETE-TASK',
        payload: {
            todolistID,
            taskID,
            isDone
        }
    } as const
}
type addNewArrayACType = ReturnType<typeof addNewArrayAC>
export const addNewArrayAC = (newTodoListID:string) => {
    return {
        type: 'ADD-ARRAY-FOR-NEW-TODOLIST',
        payload: {
            newTodoListID
        }
    } as const
}
type removeArrayWithTodolistACType = ReturnType<typeof removeArrayWithTodolistAC>
export const removeArrayWithTodolistAC = () => {
    return {
        type: 'REMOVE-ARRAY-WITH-TODOLIST',
        payload: {}
    } as const
}


