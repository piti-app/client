
export const isLogin = (data) => {
    console.log(data)
    return (dispatch) => {        
        dispatch({
            type : 'IS_LOGIN',            
            payload : data
        })
    }
}






