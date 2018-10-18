import React, { Component, Fragment } from 'react';
import { View, Text } from 'native-base'
import { StyleSheet, Image } from 'react-native'

export default class RecommendationCard extends Component {
  componentDidMount() {
    console.log(this.props.data)
  }
  render() {
    return (
      <View elevation={2} style={styles.container}>
        {
          this.props.data.thumb
          ?
          <Image
          source={{ uri:this.props.data.thumb }}
          style={{ height : 150, width : 160, borderRadius: 5, marginTop : -10 }}
          />
          :
          <Image
          source={require('../assets/icons/doughnut.png')}
          style={{ height : 150, width : 130, resizeMode : 'contain' }}
          />
        }
        <Text style={ styles.text }>{ this.props.data.name }</Text>
        <Text style={ styles.textSmall }>{ this.props.data.locality_ }</Text>
        <Text style={ styles.textSmall }>{ this.props.data.average_cost_for_two/2 }</Text>
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
    marginBottom : 40,
    height : 240,
    width : 160,
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    fontFamily : 'gilroy_extrabold',
    color : 'black',
    textAlign : 'center',
    marginTop : 10
  },
  textSmall: {
    fontSize: 11,
    fontFamily : 'gilroy_light',
    color : 'black',
    textAlign : 'center'
  },
  activeTitle: {
    color: 'red',
  },
});