import React, { Component } from 'react';
import { Container, Content, Text, Icon, Button} from 'native-base';
import { StyleSheet } from 'react-native'

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
        <Container>
          <Text style={styles.title}>PROFILE</Text>
          <Content style={styles.main}>
            <Text>Halo</Text>
          </Content>
        </Container>
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