import React, { Component, Fragment } from 'react';
import { View, StyleSheet, ScrollView, TouchableHighlight, AsyncStorage } from 'react-native'
import Swipeout from 'react-native-swipeout'
import { Container, Header, Content, Card, CardItem, Text, Body, Icon } from "native-base";
import {getEmail} from '../Authentication'
import ExpenseCard from '../components/ExpenseCard'
import Axios from 'axios';

class Home extends Component {
  static navigationOptions = {
    headerTitle: <Text style={{
      fontSize: 32,
      fontFamily : 'bebaskai',
      textAlign : 'center',
      paddingTop: 28,
      paddingBottom: 20,
      paddingLeft : 150
    }}>OVERVIEW</Text>,
    tabBarLabel: 'Home',
    tabBarVisible:true,
    tabBarIcon: <Icon name='home' />
  }

  state = {
    email : null,
    data : [],
    isLoaded : false
   }

   componentDidMount(){
    getEmail()
    .then((result) => {
      this.setState({
        email :result
      })
      Axios({
        method : 'GET',
        url : `http://10.0.2.2:4000/user/${result}`
      })
        .then(response=>{
          const expenses = [...response.data.user.expense]
          const finalArr = []
          expenses.forEach(expense=>{
            if(expense.type==="Other"){
              let newExpense = {
                ...expense,
                imageURL : require('../assets/icons/user.png')
              }
              finalArr.push(newExpense)
            }
            else if(expense.type==="Entertainment"){
              let newExpense = {
                ...expense,
                imageURL : require('../assets/icons/monitor.png')
              }
              finalArr.push(newExpense)
            }
            else if(expense.type==="Clothes"){
              let newExpense = {
                ...expense,
                imageURL : require('../assets/icons/basketball-jersey.png')
              }
              finalArr.push(newExpense)
            }
            else if(expense.type==="Personal"){
              let newExpense = {
                ...expense,
                imageURL : require('../assets/icons/piggy-bank.png')
              }
              finalArr.push(newExpense)
            }
            else if(expense.type==="Food & Drink"){
              let newExpense = {
                ...expense,
                imageURL : require('../assets/icons/fried-egg.png')
              }
              finalArr.push(newExpense)
            }
            else if(expense.type==="Transport"){
              let newExpense = {
                ...expense,
                imageURL : require('../assets/icons/car.png')
              }
              finalArr.push(newExpense)
            }
            else if(expense.type==="Electronic"){
              let newExpense = {
                ...expense,
                imageURL : require('../assets/icons/headphones.png')
              }
              finalArr.push(newExpense)
            }
          })
          this.setState({
            data : finalArr,
            isLoaded : true
          })
        })
        .catch(error=>{
          console.log(error)
        })
    }).catch((err) => {
      console.log(err)
    })
   }
  render() {
    const  swipeoutBtns = [{ text: 'Detele', color : '#FFF', backgroundColor : 'red'}]
    return (
        <View style ={{ backgroundColor : '#FFF', height:'100%' }}>
          <Text>{JSON.stringify(this.state.email)}</Text>
          {
            this.state.isLoaded
            ?
            <ScrollView style={{ marginBottom : 10, backgroundColor : '#FFF' }}>
            {
              this.state.data.map((datum,index)=>
              <Swipeout right={swipeoutBtns} style={{backgroundColor:'#FFF'}}>
                  <View>
                <TouchableHighlight onPress={() => this.props.navigation.navigate('Update', datum)}>
                  <ExpenseCard navigation={ this.props.navigation } data={datum} key={index} />
                </TouchableHighlight>
              </View>
                </Swipeout>
              )
            }
          </ScrollView>
          :
          <Fragment></Fragment>
          }
        </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontFamily : 'bebaskai',
    textAlign : 'center',
    paddingTop: 10,
    paddingBottom: 20,
  }
})