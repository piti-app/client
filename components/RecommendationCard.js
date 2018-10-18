import React, { Component, Fragment } from 'react';
import { View, Text } from 'native-base'
import { StyleSheet, Image } from 'react-native'

export default class RecommendationCard extends Component {
  render() {
    return (
      <View elevation={2} style={styles.container}>
        <Text>Card</Text>
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
    marginLeft: 'auto',
    marginRight: 'auto',
    shadowOffset:{  width: 4,  height: 3,  },
    shadowColor: '#cacaca',
    shadowOpacity: 0.6,
    marginBottom : 40,
    height : 200,
    width : 150,
    marginRight: 20,
  },
  text: {
    fontSize: 16,
    fontFamily : 'geomanist_regular',
    color : 'black',
    textAlign : 'right'
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