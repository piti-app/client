import axios from 'axios'

export default function(){
    return (dispatch)=>{
      
      axios({
        method : 'GET',
        url : `http://localhost:4000`
      })
        .then(result=>{
          dispatch({
            type : 'CREATE_EXPENSE',
            payload : {
              dataProfile : result.data.teams[0],
              isLoaded : true,
              error : ''
            }
          })
        })
        .catch(err=>{
            console.log(err)
        })
  
    }
  }