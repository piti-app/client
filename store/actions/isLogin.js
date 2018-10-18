
export const isLogin = (data) => {
    return (dispatch) => {        
        dispatch({
            type : 'IS_LOGIN',            
            payload : data
        })
    }
}
export const isAuthenticated = (data) => {
    return (dispatch) => {        
        dispatch({
            type : 'IS_AUTHENTICATED',            
            payload : data
        })
    }    
}






