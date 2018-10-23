import React, { Component } from 'react';
import { Container, Label, Content, Form, Item,
  Text, Input, Textarea, Button, DatePicker, Picker, Icon, StyleSheet, View} from 'react-native'
import FormCreateExpense from '../components/FormCreateExpense'
class Add extends Component {
  static navigationOptions = {
    headerTitle: <Text style={{
      fontSize: 32,
      fontFamily : 'bebaskai',
      textAlign : 'center',
      paddingTop: 28,
      paddingBottom: 20,
      paddingLeft : 80
    }}>SAVE EXPENSE</Text>,
    tabBarLabel: 'Home',
    tabBarVisible:true,
    tabBarIcon: <Icon name='home' />
  }

  render() {
    return (
      <View style={styles.container}>
        <FormCreateExpense></FormCreateExpense>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
})

export default Add;