const initialState = {
    name: 'www',
    username: 'wwww'
}

export const FormReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'SUBMIT_FORM': 
            return {
                ...state,
                name:  action.payload.name,
                username: action.payload.username
            }

        default:
            return state;
    }
}