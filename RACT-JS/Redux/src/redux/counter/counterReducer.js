const initialState = {
    count: 0,
    count2: 10
}

const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                count: state.count + 1
            };
        case 'DECREMENT':
            return {...state, count: state.count - 1};
            case 'INCREMENTBY5':
                return {...state, count2: state.count2 + action.payload};
        default:
            return state;
    }
}

export default counterReducer