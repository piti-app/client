import React, { Component, Fragment } from 'react';
import { View, StyleSheet, ScrollView, TouchableHighlight, AsyncStorage, Alert } from 'react-native'
import Swipeout from 'react-native-swipeout'
import { Container, Header, Content, Card, CardItem, Text, Body, Icon } from "native-base";
import {getEmail} from '../Authentication'
import ExpenseCard from '../components/ExpenseCard'
import axios from 'axios';
import { connect }from 'react-redux'
import getData from '../store/actions/getData'
import Spinner from 'react-native-loading-spinner-overlay';

const mapStateToProps = (state, ownProps) => {
  return {
    user : state.getExpense.user,
    isLoaded : state.getExpense.isLoaded
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

   componentDidMount(){
      this.props.getExpenses()
      setTimeout(() => {
        console.log(this.props)
      }, 10000);

   }

   onClickListener = (id) => {
    // Alert.alert('Delete Expense Succes !')
      axios({
        method : 'DELETE',
        url : `http://10.0.2.2:4000/expense/${id}`,
        data: {
            date: this.state.date,
            price: this.state.price,
            type: this.state.type,
            description: this.state.description
        }
        })
        .then((result) => {

            this.props.getExpenses()
            Alert.alert('Delete Expense Succes !')

        })
        .catch((err) => {

            Alert.alert("Delete Expense Error !")

        });

    }

  render() {
    return (
        <View style ={{ backgroundColor : '#FFF', height:'100%' }}>
          <Text>{JSON.stringify(this.props.user.email)}</Text>
          {
            this.props.isLoaded
            ?
            <ScrollView style={{ marginBottom : 10, backgroundColor : '#FFF' }}>
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
          <Spinner
            visible={true}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
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