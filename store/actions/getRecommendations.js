import axios from 'axios'
import { AsyncStorage } from 'react-native'

export default function(){
  return (dispatch)=>{
    dispatch({
      type : 'GET_RECOMMENDATIONS_REQUEST'
    })
    AsyncStorage.getItem('user')
      .then((email) => {
        axios({
          method : 'GET',
          url : `http://10.0.2.2:4000/user/${email}`
        })
          .then(({ data }) => {
            navigator.geolocation.getCurrentPosition((position)=>{
              console.log(position)
              axios({
                method : 'POST',
                url : `http://10.0.2.2:4000/recommendation/newRecommendation`,
                data : {
                  main_balance : data.user.main_balance,
                  money_spent : data.user.money_spent,
                  budget : data.user.budget
                },
                headers : {
                  'user-key' : '43ba0f8146136e318177d15edc3dc24f'
                }
              })
                .then(response=>{
                  console.log(response)
                  dispatch({
                    type : 'GET_RECOMMENDATIONS_DONE',
                    payload : {
                      recommendations : response.data.data,
                      latitude : position.coords.latitude,
                      logitude : position.coords.longitude
                    }
                  })
                })
                .catch(error =>{
                  console.log(error)
                  dispatch({
                    type : 'GET_RECOMMENDATIONS_ERROR'
                  })
                })
            })
          }).catch((err) => {
            console.log(err)
            dispatch({
              type : 'GET_RECOMMENDATIONS_ERROR'
            })
          });
      }).catch((err) => {
        console.log(err)
        dispatch({
          type : 'GET_RECOMMENDATIONS_ERROR'
        })
      });
  }
}