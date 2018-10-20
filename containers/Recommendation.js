import React, { Component, Fragment } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body, Icon } from "native-base";
import { StyleSheet, View, ScrollView, FlatList } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import axios from 'axios'
import { AsyncStorage } from "react-native";
import {getEmail} from '../Authentication'
import Spinner from 'react-native-loading-spinner-overlay';
import MapView from 'react-native-maps';

import RecommendationCard from '../components/RecommendationCard'
import RecommendationDetail from './RecommendationDetail'

class RecommendationContainer extends Component {
  state = {
    recommendations : [],
    isLoaded : false,
    latitude : 0,
    longitude : 0
  }

  regionContainingPoints(points) {
    var minX, maxX, minY, maxY;

    // init first point
    ((point) => {
      minX = point.latitude;
      maxX = point.latitude;
      minY = point.longitude;
      maxY = point.longitude;
    })(points[0]);

    // calculate rect
    points.map((point) => {
      minX = Math.min(minX, point.latitude);
      maxX = Math.max(maxX, point.latitude);
      minY = Math.min(minY, point.longitude);
      maxY = Math.max(maxY, point.longitude);
    });

    var midX = (minX + maxX) / 2;
    var midY = (minY + maxY) / 2;
    var midPoint = [midX, midY];

    var deltaX = (maxX - minX);
    var deltaY = (maxY - minY);

    return {
      latitude: midX, longitude: midY,
      latitudeDelta: deltaX, longitudeDelta: deltaY,
    };
  }

  componentDidMount = () => {
    console.log('component did mount')
    getEmail()
      .then((email) => {
        axios({
          method : 'GET',
          url : `http://10.0.2.2:4000/user/${email}`
        })
          .then(({data}) => {
            navigator.geolocation.getCurrentPosition((position)=>{
              console.log(position)
              axios({
                method : 'POST',
                url : `http://10.0.2.2:4000/recommendation/newRecommendation`,
                data : {
                  main_balance : data.user.main_balance,
                  money_spent : data.user.money_spent,
                  budget : data.user.budget
                },
                headers : {
                  'user-key' : '43ba0f8146136e318177d15edc3dc24f'
                }
              })
                .then(response=>{
                  console.log(response)
                  this.setState({
                    recommendations : response.data.data,
                    isLoaded : true,
                    latitude : position.coords.latitude,
                    longitude : position.coords.longitude
                  })
                })
                .catch(error =>{
                  console.log(error,'ini error')
                })
            })
          }).catch((err) => {

          });
      }).catch((err) => {

      })

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
            <View style={mapStyles.container}>
              <MapView
                style={mapStyles.map}
                region={{
                  latitude: -6.2607134,
                  longitude: 106.7794222,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
              {
                this.state.recommendations.map(recommendation=>
                  <MapView.Marker
                    coordinate={{
                      latitude : recommendation.latitude,
                      longitude : recommendation.longitude
                    }}
                    title={recommendation.name}
                    description={recommendation.address}
                  />
                )
              }
              </MapView>
            </View>
            <View>
            <FlatList style={styles.container}
              data={this.state.recommendations}
              renderItem={({item}) => <RecommendationCard data={item} />}
              numColumns={2}
              showsVerticalScrollIndicator={false}
            />
            </View>

          </View>
          :
          <Spinner
            visible={!this.props.isLoaded}
            textContent={'Loading...'}
            textStyle={{ fontFamily : 'avenir_medium'}}
          />
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

const mapStyles = StyleSheet.create({
  container: {
    height: 600,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
 });


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