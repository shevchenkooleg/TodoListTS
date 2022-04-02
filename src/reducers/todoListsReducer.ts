import { v1 } from "uuid";
import {FilterType, TodoListType} from "../App";


export const TodoListsReducer = (state:TodoListType[], action: TodoListsReducerType):TodoListType[] => {
    switch (action.type) {
        case 'CREATE-TODOLIST': {
            const newTodolist: TodoListType = {id: action.payload.newTodoListID, title: action.payload.todoListInputValue, filter: 'all'}
            return [newTodolist, ...state]
        }
        case 'DELETE-TODOLIST': {
            return state.filter(el=>el.id != action.payload.todolistID)
        }
        case 'CHANGE-FILTER': {
            return state.map(el=> el.id === action.payload.todolistID ? {...el, filter:action.payload.filter} : el)
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el=>el.id === action.payload.todolistID ? {...el, title:action.payload.newTitle} : el)
        }

        default: {
            return state
        }
    }
}

type TodoListsReducerType = createTodoListACType | deleteTodoListACType | changeFilterACType | changeTodoListTitleACType
export type createTodoListACType = ReturnType<typeof createTodoListAC>
export const createTodoListAC = (todoListInputValue:string) => {
    return {
        type: 'CREATE-TODOLIST',
        payload: {
            newTodoListID: v1(),
            todoListInputValue
        }
    } as const
}
export type deleteTodoListACType = ReturnType<typeof deleteTodoListAC>
export const deleteTodoListAC = (todolistID:string) => {
    return {
        type: 'DELETE-TODOLIST',
        payload: {
            todolistID
        }
    } as const
}
type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistID: string, filter: FilterType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            todolistID,
            filter
        }
    } as const
}
type changeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>
export const changeTodoListTitleAC = (todolistID: string, newTitle:string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistID,
            newTitle
        }
    } as const
}
