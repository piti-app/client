import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import { View, StyleSheet } from 'react-native'

import ExpenseCard from '../components/ExpenseCard'

class Home extends Component {
  state = {  }
  render() {
    return (
        <View>
          <Text style={styles.title}>OVERVIEW</Text>
          <ExpenseCard />
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