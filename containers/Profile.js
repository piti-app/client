import React, { Component } from 'react';
import { Button } from 'react-native-elements'
import { View, StyleSheet } from 'react-native'
import { onSignOut } from "../Authentication";
import ExpenseCard from '../components/ExpenseCard'
import { Icon } from 'native-base'


class Profile extends Component {
  static navigationOptions = {
    title: 'Profile',
    tabBarLabel: 'Profile',
    tabBarVisible:true,
    tabBarIcon: <Icon name='person' />
  }
  constructor(props) {
    super(props);
    this.state = {
      chosenDate: new Date(),
      selected: undefined
    };
    this.setDate = this.setDate.bind(this);
  }
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }
  onValueChange(value) {
    this.setState({
      selected: value
    });
  }
  render() {
    return (
        <View>
          <Button title='logout' onPress={() => {onSignOut().then(() => this.props.navigation.navigate("SignedOut"))}}></Button>
        </View>

    );
  }
}

const styles = StyleSheet.create({
  main: {
    padding: 10
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

export default Profile;