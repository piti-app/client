import axios from 'axios'
import { AsyncStorage } from 'react-native'

export default function(params){
  return (dispatch)=>{
    dispatch({
      type : 'GET_RECOMMENDATIONS_REQUEST'
    })
    AsyncStorage.getItem('user')
      .then((email) => {
        axios({
          method : 'GET',
          url : `https://piti.minimalistdeveloper.xyz/user/${email}`
        })
          .then(({ data }) => {
            navigator.geolocation.getCurrentPosition((position)=>{
              console.log(position)
              axios({
                method : 'POST',
                url : `https://piti.minimalistdeveloper.xyz/recommendation/newRecommendation`,
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
                  if(params==='asc'){
                    let finalArr = response.data.data
                    finalArr.sort((a,b)=>{
                      return a.average_cost_for_two - b.average_cost_for_two
                    })
                    dispatch({
                      type : 'GET_RECOMMENDATIONS_DONE',
                      payload : {
                        recommendations : finalArr,
                        latitude : position.coords.latitude,
                        logitude : position.coords.longitude
                      }
                    })
                  }
                  else {
                    let finalArr = response.data.data
                    finalArr.sort((a,b)=>{
                      return b.average_cost_for_two - a.average_cost_for_two
                    })
                    dispatch({
                      type : 'GET_RECOMMENDATIONS_DONE',
                      payload : {
                        recommendations : finalArr,
                        latitude : position.coords.latitude,
                        logitude : position.coords.longitude
                      }
                    })
                  }

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