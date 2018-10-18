const initialState = {
    signedIn : false,
    userInfo : ''
}

export default function(state = initialState, action){
    console.log(action)
    switch (action.type) {
        case 'IS_LOGIN':
            return {
                ...state,
                signedIn : action.payload
            }
        case 'IS_AUTHENTICATED':
            return {
                ...state,
                userInfo : action.payload
            }
        default:
            return state;
    }
}