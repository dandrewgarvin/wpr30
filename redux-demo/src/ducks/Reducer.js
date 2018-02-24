const initialState = {
    selected: 'test'
}

const TEST = "TEST"

export default function reducer(state = initialState, action){
    switch (action.type){
        case TEST:
            return Object.assign({}, state, {test: action.payload.test, test2: action.payload.test2, selected: !state.selected})
    }
    return state;
}

export function testFunc(data){
    return {
        type: TEST,
        payload: data
    }
}