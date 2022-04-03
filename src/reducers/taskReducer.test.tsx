import {TasksType} from "../App";
import {addTaskAC, changeTaskTitleAC, completeTaskAC, removeTaskAC, TasksReducer} from "./tasksReducer";
import exp from "constants";
import {createTodoListAC, deleteTodoListAC} from "./todoListsReducer";

const state: TasksType = {
    "todolistId1": [
        {id: "1", title: "CSS", isDone: false},
        {id: "2", title: "JS", isDone: true},
        {id: "3", title: "React", isDone: false}
    ],
    "todolistId2": [
        {id: "1", title: "bread", isDone: false},
        {id: "2", title: "milk", isDone: true},
        {id: "3", title: "tea", isDone: false}
    ]
};

test('task should be added to the TodoList', ()=>{
    const startState = {...state, ["todolistId1"]:state["todolistId1"].map(el=> ({...el}))}

    const action = addTaskAC('todolistId2', 'juse')
    const endState = TasksReducer(startState, action)

    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'][0].title).toBe('juse')
    expect(endState['todolistId2'][1].title).toBe('bread')
    expect(endState['todolistId1'][0].title).toBe('CSS')
})

test('task should be remove from the TodoList', ()=>{
    const startState = {...state, ["todolistId1"]:state["todolistId1"].map(el=> ({...el}))}

    const action = removeTaskAC('todolistId1', '2')
    const endState = TasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(2)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId1'][1].title).toBe('React')
    expect(endState['todolistId2'][1].title).toBe('milk')
})

test('task status should be changed', ()=>{
    const startState = {...state, ["todolistId1"]:state["todolistId1"].map(el=> ({...el}))}

    const action = completeTaskAC('todolistId1', '1', true)
    const endState = TasksReducer(startState, action)

    expect(startState['todolistId1'][0].isDone).toBe(false)
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId1'][0].isDone).toBe(true)
    expect(endState['todolistId2'][0].isDone).toBe(false)
})

test('task title should be changed', ()=>{
    const startState = {...state, ["todolistId1"]:state["todolistId1"].map(el=> ({...el}))}
    const action = changeTaskTitleAC("todolistId1", "2", "Redux")
    const endState = TasksReducer(startState, action)

    expect(endState["todolistId1"][1].title).toBe("Redux")
    expect(endState["todolistId2"][1].title).toBe("milk")
    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(3)
})

test('new empty Array for tasks should be created together with todoList', ()=> {
    const startState = {...state, ["todolistId1"]:state["todolistId1"].map(el=> ({...el}))}
    const action1 = createTodoListAC('What to read')
    const endState1 = TasksReducer(startState, action1)
    const action2 = createTodoListAC('What to eat')
    const endState = TasksReducer(endState1, action2)
    const todolistId3 = Object.keys(endState)[2]
    const todolistId4 = Object.keys(endState)[3]

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState[todolistId3].length).toBe(0)
    expect(endState[todolistId4].length).toBe(0)
    expect(endState[todolistId3]).not.toBe(endState[todolistId4])
})

test('unused tasks Array should be deleted together with todoList', ()=>{
    const startState = {...state, ["todolistId1"]:state["todolistId1"].map(el=> ({...el}))}
    const action = deleteTodoListAC('todolistId2')
    const endState = TasksReducer(startState,action)

    expect(Object.keys(endState).length).toBe(1)
    expect(endState['todolistId2']).toBeUndefined()
})