
export const isLogin = (data) => {
<<<<<<< HEAD
<<<<<<< HEAD
    console.log(data)
=======
>>>>>>> authentication + setup redux
=======
    console.log(data)
>>>>>>> setAsyncStorage
    return (dispatch) => {        
        dispatch({
            type : 'IS_LOGIN',            
            payload : data
        })
    }
}






