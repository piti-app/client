import React, { Component, Fragment } from 'react';
import { View, Text } from 'native-base'
import { StyleSheet, Image } from 'react-native'

export default class RecommendationCard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Card</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderTopWidth: 0.4,
    borderBottomWidth: 0.4,
    borderColor: '#D2D2D2',
    paddingTop : 10,
    paddingBottom: 10,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection : 'row',
    flex : 1
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