import {TasksType} from "../App";
import {v1} from "uuid";
import {createTodoListACType, deleteTodoListACType} from "./todoListsReducer";

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
        case 'CREATE-TODOLIST': {
            return {...state, [action.payload.newTodoListID]:[]}
        }
        case 'DELETE-TODOLIST': {
            let newState = {...state}
            delete newState[action.payload.todolistID]
            return newState
        }
        case 'CHANGE-TASK-TITLE': {
            return {...state, [action.payload.todolistID]:state[action.payload.todolistID].map(el=> el.id === action.payload.taskID
                    ? {...el, title:action.payload.newTitle} : el)}
        }
        default: {
            return state
        }
    }
}

type TaskReducerType = addTaskACType | removeTaskACType | completeTaskACType | createTodoListACType | deleteTodoListACType | changeTaskTitleACType
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
            taskID,
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
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistID: string, taskID:string, newTitle:string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todolistID,
            taskID,
            newTitle
        }
    } as const
}


