const initialState = {
    signedIn : false
}

export default function(state = initialState, action){
    console.log(action)
    switch (action.type) {
        case 'IS_LOGIN':
            return {
                ...state,
                signedIn : action.payload
            }
        default:
            return state;
    }
}