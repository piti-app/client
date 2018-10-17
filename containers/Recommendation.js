import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body, Icon } from "native-base";
import { StyleSheet, View } from 'react-native'

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
      <Container>
        <Text style={styles.title}>RECOMMENDATION</Text>
        <Content style={styles.main}>
          <Text>Halo</Text>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    padding: 10
  },
  mb10: {
    marginBottom: 10
  },
  title: {
    fontSize: 32,
    fontFamily : 'bebaskai',
    textAlign : 'center',
    paddingTop: 20,
    paddingBottom: 20,
  }
})

export default Recommendation;