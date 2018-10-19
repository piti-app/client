import axios from 'axios'
import { AsyncStorage } from 'react-native'

export default function(){
  return (dispatch)=>{
    dispatch({
      type : 'GET_DATA_REQUEST'
    })
    AsyncStorage.getItem('user')
      .then((email) => {
        console.log(email)
        axios({
          method : 'GET',
          url : `http://10.0.2.2:4000/user/${email}`
        })
          .then(({ data }) => {
            console.log(data,'ini data')
            const expenses = [...data.user.expense]
            const finalArr = []
            console.log(expenses)
            expenses.forEach(expense=>{
              if(expense.type==="Others"){
                let newExpense = {
                  ...expense,
                  imageURL : require('../../assets/icons/user.png')
                }
                finalArr.push(newExpense)
              }
              else if(expense.type==="Entertainment"){
                let newExpense = {
                  ...expense,
                  imageURL : require('../../assets/icons/monitor.png')
                }
                finalArr.push(newExpense)
              }
              else if(expense.type==="Clothes"){
                let newExpense = {
                  ...expense,
                  imageURL : require('../../assets/icons/basketball-jersey.png')
                }
                finalArr.push(newExpense)
              }
              else if(expense.type==="Personal"){
                let newExpense = {
                  ...expense,
                  imageURL : require('../../assets/icons/piggy-bank.png')
                }
                finalArr.push(newExpense)
              }
              else if(expense.type==="Food & Drink"){
                let newExpense = {
                  ...expense,
                  imageURL : require('../../assets/icons/fried-egg.png')
                }
                finalArr.push(newExpense)
              }
              else if(expense.type==="Transport"){
                let newExpense = {
                  ...expense,
                  imageURL : require('../../assets/icons/car.png')
                }
                finalArr.push(newExpense)
              }
              else if(expense.type==="Electronic"){
                let newExpense = {
                  ...expense,
                  imageURL : require('../../assets/icons/headphones.png')
                }
                finalArr.push(newExpense)
              }
            })

            let obj = data.user
            obj.expense = finalArr
            dispatch({
              type : 'GET_DATA_DONE',
              payload : obj
            })
          }).catch((err) => {
            console.log(err)
            dispatch({
              type : 'GET_DATA_ERROR'
            })
          });
      }).catch((err) => {
        console.log(err)
        dispatch({
          type : 'GET_DATA_ERROR'
        })
      });
  }
}