import {TodoListType} from "../App";
import {
    changeFilterAC,
    changeTodoListTitleAC,
    createTodoListAC,
    deleteTodoListAC,
    TodoListsReducer
} from "./todoListsReducer";
import exp from "constants";

const state:Array<TodoListType> = [
    {id: 'todolistID1', title: 'What to learn', filter: 'all'},
    {id: 'todolistID2', title: 'What to buy', filter: 'active'}
]

test('new todoList should be created', ()=>{
    const startState = state.map(el=>({...el}))
    const action = createTodoListAC('What to eat')
    const endState = TodoListsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('What to eat')
    expect(startState[0].title).toBe('What to learn')
})

test('todoLish should be deleted', ()=>{
    const startState = state.map(el=>({...el}))
    const action = deleteTodoListAC('todolistID1')
    const endState = TodoListsReducer(startState, action)

    expect(startState.length).toBe(2)
    expect(endState.length).toBe(1)
    expect(startState[0].title).toBe('What to learn')
    expect(endState[0].title).toBe('What to buy')
})

test('showing option should be changed', ()=>{
    const startState = state.map(el=>({...el}))
    const action = changeFilterAC('todolistID1', 'completed')
    const endState = TodoListsReducer(startState, action)

    expect(endState[0].filter).toBe('completed')
    expect(startState[0].filter).toBe('all')
})

test('todoList title should be changed', ()=>{
    const startState = state.map(el=>({...el}))
    const action = changeTodoListTitleAC('todolistID1', 'BlaBlaBla')
    const endState = TodoListsReducer(startState,action)

    expect(startState[0].title).toBe('What to learn')
    expect(endState[0].title).toBe('BlaBlaBla')
})