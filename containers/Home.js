import React, { Component, Fragment } from 'react';
import { View, StyleSheet, ScrollView, TouchableHighlight, AsyncStorage, Alert, Image } from 'react-native'
import Swipeout from 'react-native-swipeout'
import { Container, Header, Content, Card, CardItem, Text, Body, Icon } from "native-base";
import {getEmail} from '../Authentication'
import ExpenseCard from '../components/ExpenseCard'
import axios from 'axios';
import { connect }from 'react-redux'
import getData from '../store/actions/getData'
import Spinner from 'react-native-loading-spinner-overlay';
import PieChart from 'react-native-pie-chart';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import firebase from 'react-native-firebase';
import { setFcm } from "../Authentication";


const mapStateToProps = (state, ownProps) => {
  return {
    user : state.getExpense.user,
    isLoaded : state.getExpense.isLoaded,
    totalExpense : state.getExpense.totalExpense
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getExpenses: () => {
      dispatch(getData())
    }
  }
}

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
    email : null
   }

   async componentDidMount(){
      this.props.getExpenses()
      let fcmToken = await firebase.messaging().getToken();
            setFcm(fcmToken).then(result => {})
      console.log(fcmToken,'token')
      setTimeout(() => {
        console.log(this.props)
      }, 10000);

   }

   onClickListener = (id) => {
    getEmail()
    .then((email) => {
      console.log(email)
      axios({
        method : 'DELETE',
        url : `http://10.0.2.2:4000/expense/${id}`,
        data: {
            email: email
        }
      })
        .then((result) => {

            this.props.getExpenses()

        })
        .catch((err) => {

            Alert.alert("Delete Expense Error !")

        });

    })
    .catch((err) => {
      
    });
      

    }

  render() {
    const chart_wh = 170
    const series = [123, 321, 123, 789, 537]
    const sliceColor = ['#4073F4','#FF8454','#FFBF30', '#02F6C9', '#5133DF']

    return (
       <View style ={{ backgroundColor : '#FFF', height:'100%' }}>
          {
            this.props.isLoaded
            ?
            <Fragment>
            {
              this.props.user.expense.length!==0
              ?
              <ScrollView style={{ marginBottom : 10, backgroundColor : '#FFF' }}>
                <View style={{ alignItems : 'center', marginTop : 30, marginBottom : 30, justifyContent : 'center',flexDirection : 'row' }}>
                <PieChart
                  chart_wh={chart_wh}
                  series={this.props.totalExpense}
                  sliceColor={sliceColor}
                />
                <Image source={require('../assets/icons/pie_chart_definition.png')} style={{width : 130, height : 130, resizeMode: 'contain', marginLeft : 30 }}/>
                </View>
                {
                  this.props.user.expense.map((datum,index)=>
                  <Swipeout right={[{ text: 'Detele', color : '#FFF', backgroundColor : 'red', onPress: () => this.onClickListener(datum._id) }]} style={{backgroundColor:'#FFF'}}>
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
              <View style={{justifyContent : 'center', alignItems : 'center', height : '100%'}}>
                <Text style={{ textAlign: 'center', fontFamily: 'avenir_book' }}>You Have No Expense This Month</Text>
              </View>
            }
            </Fragment>
          :
          <Spinner
            visible={!this.props.isLoaded}
            textContent={'Loading...'}
            textStyle={{ fontFamily : 'avenir_medium'}}
          />
          }
        </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontFamily : 'bebaskai',
    textAlign : 'center',
    paddingTop: 10,
    paddingBottom: 20,
  }
})