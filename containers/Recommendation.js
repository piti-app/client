import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body, Icon } from "native-base";
import { StyleSheet, View, ScrollView } from 'react-native'
import { createStackNavigator } from 'react-navigation'

import RecommendationCard from '../components/RecommendationCard'
import RecommendationDetail from './RecommendationDetail'

class RecommendationContainer extends Component {
  static navigationOptions = {
    headerTitle: <Text style={{
      fontSize: 32,
      fontFamily : 'bebaskai',
      textAlign : 'center',
      paddingTop: 28,
      paddingBottom: 20,
      paddingLeft : 105
    }}>RECOMMENDATIONS</Text>,
    tabBarLabel: 'Home',
    tabBarVisible:true,
    tabBarIcon: <Icon name='home' />
  }
  state = {  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <RecommendationCard/>
        <RecommendationCard/>
        <RecommendationCard/>
        <RecommendationCard/>
        <RecommendationCard/>
      </ScrollView>
    );
  }
}

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
      <RecommendationStack/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display : 'flex',
    flexWrap: 'wrap',
    backgroundColor : '#FFF'
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




const RecommendationStack = createStackNavigator({
  RecommendationContainer,
  RecommendationDetail
},
{
  navigationOptions : ({ navigation }) => ({
      headerStyle: { backgroundColor: '#fff', elevation:0 }
  })
})



export default Recommendation;