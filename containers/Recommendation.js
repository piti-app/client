import React, { Component, Fragment } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body, Icon } from "native-base";
import { StyleSheet, View, ScrollView, FlatList } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import axios from 'axios'

import RecommendationCard from '../components/RecommendationCard'
import RecommendationDetail from './RecommendationDetail'

class RecommendationContainer extends Component {
  state = {
    recommendations : [],
    isLoaded : false
  }
  componentDidMount = () => {
    let self = this
    axios({
      method : 'POST',
      url : `http://10.0.2.2:4000/recommendation`,
      data : {
        latitude : '-6.254590',
        longtitude : '106.757190',
        main_balance : 3000000,
        money_spent : 500000,
        budget : 200000
      },
      headers : {
        'user-key' : '43ba0f8146136e318177d15edc3dc24f'
      }
    })
      .then(response=>{
        this.setState({
          recommendations : response.data.data,
          isLoaded : true
        })
      })
      .catch(error =>{
        console.log(error,'ini error')
      })
    // axios({
    //   method : 'GET',
    //   url : 'https://swapi.co/api/people'
    // })
    //   .then(response=>{
    //     console.log(response)
    //   })
    //   .catch(err=>{
    //     console.log(err)
    //   })
  };

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
  render() {
    return (
      <Fragment>
        {
          this.state.isLoaded
          ?
          <View style={{ justifyContent : 'center',
          alignItems: 'center', backgroundColor : '#FFF',width :'100%', marginLeft: 'auto',
          marginRight: 'auto',}}>
            <FlatList style={styles.container}
            data={this.state.recommendations}
            renderItem={({item}) => <RecommendationCard data={item} />}
            numColumns={2}
            showsVerticalScrollIndicator={false}
          />
          </View>
          :
          <Text>Loading</Text>
        }
      </Fragment>

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
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor : '#FFF',
    flexDirection: 'column',
    paddingTop: 30,
    marginLeft: 'auto',
    marginRight: 'auto'
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