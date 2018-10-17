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
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: 'black',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  activeTitle: {
    color: 'red',
  },
});