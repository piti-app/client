import React, { Component, Fragment } from 'react';
import { View, Text } from 'native-base'
import { StyleSheet, Image } from 'react-native'

export default class ExpenseCard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent :'center', alignItems :'center' }}>
          <Image source={this.props.data.url} style={{ width :32, height:32, marginLeft : 50 }} />
        </View>
        <View style={{ justifyContent :'center', alignItems :'flex-end', width : 180, marginLeft : 100 }}>
          <Text style={styles.text}>{this.props.data.description}</Text>
          <Text style={styles.textSmall}>{this.props.data.price}</Text>
          <Text style={styles.textSmall}>{this.props.data.type}</Text>
        </View>
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
    flexDirection : 'row'
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