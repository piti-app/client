import React, { Component } from 'react';
import { onSignOut } from "../Authentication";
import ExpenseCard from '../components/ExpenseCard'
import {
  Container, Header, Left, Body, Right, Content,
  Button, Title, Card, CardItem, Text, Icon, H1, H2, Thumbnail } from "native-base";
import _ from '../assets/style'
import { TouchableHighlight,AsyncStorage,Alert, StyleSheet } from 'react-native'
import axios from 'axios'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

class Profile extends Component {
  componentDidMount = async() =>{
    let self = this
    AsyncStorage.getItem('user')
      .then(email=>{
        axios({
          method : 'GET',
          url : `http://10.0.2.2:4000/user/${email}`
        })
          .then(({ data }) => {
            console.log(data.user)
            let expenses = 0
            data.user.expense.forEach( expense =>{
              console.log(expense.price)
              expenses+= expense.price
            })

            self.setState({
              userData : data.user,
              totalExpense : expenses
            })
          }).catch((err) => {
            Alert.alert(error)
          });
      })
      .catch(err=>{
        Alert.alert(error)
      })
  }

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
      selected: undefined,
      userData : {},
      totalExpense : 0
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
          <Header noLeft style={{backgroundColor : '#FFF'}}>
            <Body>
              <Title style={_.title}>Profile</Title>
            </Body>
            <Right>
              <TouchableHighlight onPress={() => {onSignOut().then(() => this.props.navigation.navigate("SignedOut"))}}>
                <Icon type="FontAwesome" name="sign-out" />
              </TouchableHighlight>
            </Right>
          </Header>
          <Content style={_.content}>
            <Card>
              <CardItem>
                <Left>
                  <Thumbnail source={{uri: this.state.userData.avatar}} />
                  <Body>
                    <H2>{this.state.userData.name}</H2>
                    <Text note>{this.state.userData.email}</Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>
            <Card>
              <CardItem>
                <Content>
                  <H1>Your Main Balance</H1>
                  <Text>Rp.{ this.state.userData.main_balance }</Text>
                </Content>
              </CardItem>
            </Card>
            <Card>
              <CardItem>
                <Content>
                  <H1>Your Expenses</H1>
                  <Text>Rp.{ this.state.totalExpense }</Text>
                </Content>
              </CardItem>
            </Card>
            <Card>
              <CardItem>
                <Content>
                  <H1>Your Saving Goal</H1>
                  <Text>Rp.{ this.state.userData.budget }</Text>
                </Content>
              </CardItem>
            </Card>
          <TouchableHighlight style={[styles.buttonContainer, styles.createButton]} onPress={() => this.props.navigation.navigate('EditProfile', this.state.userData)}>
                 <Text style={styles.createText}>Edit</Text>
          </TouchableHighlight>
          </Content>
        </Container>

    );
  }
}

export default Profile;

const styles = StyleSheet.create({
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  createButton: {
    backgroundColor: "#0D7EF7",
  },
  createText: {
    color: 'white',
  },
});