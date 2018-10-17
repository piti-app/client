
export const isLogin = (data) => {
    return (dispatch) => {        
        dispatch({
            type : 'IS_LOGIN',            
            payload : data
        })
    }
}






