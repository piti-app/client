import React, { Component, Fragment } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body, Icon } from "native-base";
import { StyleSheet, View, ScrollView, FlatList,Alert,TouchableHighlight } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import MapView from 'react-native-maps';
import { connect } from 'react-redux'

import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import RecommendationCard from '../components/RecommendationCard'
import getRecommendations from '../store/actions/getRecommendations'

const mapStateToProps = (state, ownProps) => {
  return {
    recommendations: state.getRecommendations.recommendations,
    isLoaded : state.getRecommendations.isLoaded,
    latitude : state.getRecommendations.latitude,
    longitude : state.getRecommendations.longitude,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getRecom: (params) => {
      dispatch(getRecommendations(params))
    }
  }
}

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
    this.props.getRecom('asc')
  };

  sortAscending = () =>{
    this.props.getRecom('asc')
  }

  sortDescending = () =>{
    this.props.getRecom('desc')
  }

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
      <GestureRecognizer
        onSwipeLeft={() => this.props.navigation.navigate('Home')}
        onSwipeRight={() => this.props.navigation.navigate('Profile')}
        >
           <Fragment>
        {
          this.props.isLoaded
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
                this.props.recommendations.map(recommendation=>
                  <MapView.Marker
                    coordinate={{
                      latitude : recommendation.latitude,
                      longitude : recommendation.longitude
                    }}
                    title={recommendation.name}
                    description={recommendation.address}
                    pinColor='tomato'
                    opacity = {0.7}
                  />
                )
              }
                <MapView.Marker
                    coordinate={{
                      latitude : -6.2607134,
                      longitude : 106.7794222
                    }}
                    title= 'You Are Here!'
                    description= 'Your Current Position'
                    pinColor='blue'
                  />
              </MapView>
            </View>
            <View>
              <View
              style ={{display : "flex", flexWrap :"wrap", flexDirection : "row",
              justifyContent:"center",alignItems:"center"}}>
              <TouchableHighlight onPress={this.sortAscending}>
                <Text style={styles.button}>Ascending</Text>
              </TouchableHighlight>
              <TouchableHighlight onPress={this.sortDescending}>
                <Text style={styles.button}>Descending</Text>
              </TouchableHighlight>
              </View>

              <FlatList style={styles.container}
                data={this.props.recommendations}
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
        </GestureRecognizer>


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
  },
  button : {
    paddingTop : 3,
    paddingBottom: 3,
    backgroundColor : 'black',
    borderColor : 'black',
    borderWidth: 1,
    color : 'white',
    margin : 20,
    borderRadius: 5,
    paddingLeft: 3,
    paddingRight: 3,
  }
})

const mapStyles = StyleSheet.create({
  container: {
    height: 450,
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

export default connect(mapStateToProps,mapDispatchToProps)(RecommendationContainer);