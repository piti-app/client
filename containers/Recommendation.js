import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body, Icon } from "native-base";
import { View } from 'react-native'

import ExpenseCard from '../components/ExpenseCard'

class Recommendation extends Component {
  static navigationOptions = {
    title: 'Recomendation',
    tabBarLabel: 'Recomendation',
    tabBarVisible:true,
    tabBarIcon: <Icon name='star' />  
  }
  state = {  }
  render() {
    return (
        <View>
          <Text>recommendation</Text>
        </View>
    );
  }
}

export default Recommendation;