import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import { View, StyleSheet, ScrollView } from 'react-native'

import ExpenseCard from '../components/ExpenseCard'

class Home extends Component {
  state = {
    data : [
      {
        description : 'test',
        date : new Date(),
        price : 10000,
        type : 'food and drink',
        url : require('../assets/icons/fried-egg.png')
      },
      {
        description : 'test',
        date : new Date(),
        price : 10000,
        type : 'transport',
        url: require('../assets/icons/car.png')
      },
      {
        description : 'test',
        date : new Date(),
        price : 10000,
        type : 'personal',
        url : require('../assets/icons/piggy-bank.png')
      },
      {
        description : 'test',
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
        description : 'test',
        date : new Date(),
        price : 10000,
        type : 'entertainment',
        url : require('../assets/icons/monitor.png')
      },
      {
        description : 'test',
        date : new Date(),
        price : 10000,
        type : 'other',
        url : require('../assets/icons/user.png')
      }
    ]
   }
  render() {
    return (
        <View>
          <Text style={styles.title}>OVERVIEW</Text>
          <ScrollView style={{ marginBottom : 100 }}>
            {
              this.state.data.map((datum,index)=>
              <ExpenseCard data={datum} key={index} />
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
    fontWeight: 'bold',
    fontFamily : 'BebasKai',
    textAlign : 'center',
    paddingTop: 20,
    paddingBottom: 20,
  }
})