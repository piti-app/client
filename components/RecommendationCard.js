import React, { Component, Fragment } from 'react';
import { View, Text } from 'native-base'
import { StyleSheet, Image } from 'react-native'

export default class RecommendationCard extends Component {
  componentDidMount() {
    console.log(this.props.data.restaurant)
  }
  render() {
    return (
      <View elevation={2} style={styles.container}>
        {
          this.props.data.restaurant.thumb
          ?
          <Image
          source={{ uri:this.props.data.restaurant.thumb }}
          style={{ height : 150, width : 140 }}
          />
          :
          <Image
          source={require('../assets/icons/doughnut.png')}
          style={{ height : 130, width : 130, resizeMode : 'contain' }}
          />
        }
        <Text style={ styles.text }>{ this.props.data.restaurant.name }</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderWidth: 0.4,
    borderColor: '#D2D2D2',
    paddingTop : 10,
    paddingBottom: 10,
    width : '80%',
    marginLeft: 10,
    marginRight: 10,
    shadowOffset:{  width: 4,  height: 3,  },
    shadowColor: '#cacaca',
    shadowOpacity: 0.6,
    marginBottom : 40,
    height : 200,
    width : 150,
    alignItems: 'center',
    justifyContent : 'center'
  },
  text: {
    fontSize: 12,
    fontFamily : 'geomanist_regular',
    color : 'black',
    textAlign : 'center'
  },
  textSmall: {
    fontSize: 12,
    fontFamily : 'gilroy_light',
    color : 'black',
    textAlign : 'right'
  },
  activeTitle: {
    color: 'red',
  },
});