import * as actions from './actions'

const todoReducer = (state, action) => {
    switch(action.type) {
        case actions.ADD_TODO:
            return state.concat({
                value: action.value,
                id: Math.random() * 6,
                category: action.category,
                complete: false
            })
        case actions.REMOVE_TODO:
            return state.filter(task => {
                if(task.id !== action.id) {
                    return {...task}
                }
            })
        case actions.COMPLETE_TODO:
            return state.map(task => {
                if(task.id === action.id) {
                    return {...task, complete: !action.complete}
                } else {
                    return task
                }
            })
        default:
            throw new Error('Something went wrong!');
    }
}

export default todoReducer;