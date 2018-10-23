import axios from 'axios'
import { AsyncStorage } from 'react-native'

export default function(){
  return (dispatch)=>{
    dispatch({
      type : 'GET_DATA_REQUEST'
    })
    AsyncStorage.getItem('user')
      .then((email) => {
        axios({
          method : 'GET',
          url : `http://10.0.2.2:4000/user/${email}`
        })
          .then(({ data }) => {
            const expenses = [...data.user.expense]
            const finalArr = []
            const expenseArray = []
            let counterEntertainment = 0
            let counterClothes = 0
            let counterFood = 0
            let counterTransport = 0
            let counterElectronic = 0
            console.log(expenses)
            expenses.forEach(expense=>{
              console.log(expense.type,'ini type')
              // if(expense.type==="Others"){
              //   let newExpense = {
              //     ...expense,
              //     imageURL : require('../../assets/icons/user.png')
              //   }
              //   finalArr.push(newExpense)
              // }
              if(expense.type==="Entertainment"){
                let newExpense = {
                  ...expense,
                  imageURL : require('../../assets/icons/headphones.png')
                }
                counterEntertainment += expense.price
                finalArr.push(newExpense)
              }
              else if(expense.type==="Clothes"){
                let newExpense = {
                  ...expense,
                  imageURL : require('../../assets/icons/basketball-jersey.png')
                }
                counterClothes += expense.price

                finalArr.push(newExpense)
              }
              // else if(expense.type==="Personal"){
              //   let newExpense = {
              //     ...expense,
              //     imageURL : require('../../assets/icons/piggy-bank.png')
              //   }
              //   finalArr.push(newExpense)
              // }
              else if(expense.type==="Food & Drink"){
                let newExpense = {
                  ...expense,
                  imageURL : require('../../assets/icons/fried-egg.png')
                }
                counterFood += expense.price

                finalArr.push(newExpense)
              }
              else if(expense.type==="Transport"){
                let newExpense = {
                  ...expense,
                  imageURL : require('../../assets/icons/car.png')
                }
                counterTransport += expense.price
                finalArr.push(newExpense)
              }
              else if(expense.type==="Electronic"){
                let newExpense = {
                  ...expense,
                  imageURL : require('../../assets/icons/monitor.png')
                }
                counterElectronic += expense.price
                finalArr.push(newExpense)
              }
            })
            expenseArray.push(counterClothes,counterTransport,counterElectronic,counterEntertainment,counterFood)
            let obj = data.user
            obj.expense = finalArr
            dispatch({
              type : 'GET_DATA_DONE',
              payload : {
                user : obj,
                totalExpense : expenseArray
              }
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