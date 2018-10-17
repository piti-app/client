import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import { View } from 'react-native'

import ExpenseCard from '../components/ExpenseCard'

class Home extends Component {
  state = {  }
  render() {
    return (
        <View>
          <Text>halo</Text>
          <ExpenseCard />
        </View>
    );
  }
}

export default Home;