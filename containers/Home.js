import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body, Icon } from "native-base";
import { View, StyleSheet, ScrollView } from 'react-native'
import {getEmail} from '../Authentication'
import ExpenseCard from '../components/ExpenseCard'

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
    data : [
      {
        description : 'Nasi Goreng',
        date : new Date(),
        price : 10000,
        type : 'food and drink',
        url : require('../assets/icons/fried-egg.png')
      },
      {
        description : 'Lamborghini',
        date : new Date(),
        price : 10000,
        type : 'transport',
        url: require('../assets/icons/car.png')
      },
      {
        description : 'Make Up',
        date : new Date(),
        price : 10000,
        type : 'personal',
        url : require('../assets/icons/piggy-bank.png')
      },
      {
        description : 'Bose QC35',
        date : new Date(),
        price : 10000,
        type : 'electronic',
        url : require('../assets/icons/headphones.png')
      },
      {
        description : 'test',
        date : new Date(),
        price : 10000,
        type : 'clothes',
        url : require('../assets/icons/basketball-jersey.png')
      },
      {
        description : 'FIFA 19',
        date : new Date(),
        price : 10000,
        type : 'entertainment',
        url : require('../assets/icons/monitor.png')
      },
      {
        description : 'Marathon',
        date : new Date(),
        price : 10000,
        type : 'other',
        url : require('../assets/icons/user.png')
      },
      {
        description : 'Marathon',
        date : new Date(),
        price : 10000,
        type : 'other',
        url : require('../assets/icons/user.png')
      },
      {
        description : 'Roko',
        date : new Date(),
        price : 10000,
        type : 'other',
        url : require('../assets/icons/user.png')
      }
    ]
   }

   componentDidMount(){
    getEmail()
    .then((result) => {
      this.setState({
        email :result
      })
    }).catch((err) => {
      
    })  
   }
  render() {
    return (
        <View style ={{ backgroundColor : '#FFF' }}>
          <Text>{JSON.stringify(this.state.email)}</Text>
          <ScrollView style={{ marginBottom : 10, backgroundColor : '#FFF' }}>
            {
              this.state.data.map((datum,index)=>
              <ExpenseCard navigation={ this.props.navigation } data={datum} key={index} />
              )
            }
          </ScrollView>
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