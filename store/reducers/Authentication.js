const initialState = {   
    signedIn : false
}

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> setAsyncStorage
export default function(state = initialState, action){  
    console.log(action)       
    switch (action.type) {                     
        case 'IS_LOGIN':     
        console.log('masuk pak eko')   
<<<<<<< HEAD
=======
export default function(state = initialState, action){         
    switch (action.type) {             
        case 'IS_LOGIN  ':        
>>>>>>> authentication + setup redux
=======
>>>>>>> setAsyncStorage
            return {
                ...state,
                signedIn : action.payload
            }                      
        default:
            return state;
    }
}