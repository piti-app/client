import React, { Component } from 'react';
import { View, Text } from 'native-base'
import { StyleSheet } from 'react-native'

export default class ExpenseCard extends Component {
  state = {  }
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
    borderTopWidth: 0.8,
    borderBottomWidth: 0.8,
    borderColor: '#D2D2D2',
    paddingTop : 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  activeTitle: {
    color: 'red',
  },
});