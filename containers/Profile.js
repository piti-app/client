import React, { Component } from 'react';
import { onSignOut } from "../Authentication";
import ExpenseCard from '../components/ExpenseCard'
import { 
  Container, Header, Left, Body, Right, Content, 
  Button, Title, Card, CardItem, Text, Icon, H1, H2, Thumbnail } from "native-base";
import _ from '../assets/style'


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
          <Header noLeft>
            <Body>
              <Title style={_.title}>Profile</Title>
            </Body>
            <Right>
              <Button transparent onPress={() => {onSignOut().then(() => this.props.navigation.navigate("SignedOut"))}}>
                <Icon type="FontAwesome" name="sign-out" />
              </Button>
            </Right>
          </Header>
          <Content style={_.content}>
            <Card>
              <CardItem>
                <Left>
                  <Thumbnail source={{uri: 'https://avatars2.githubusercontent.com/u/15111402?s=460&v=4'}} />
                  <Body>
                    <H2>NativeBase</H2>
                    <Text note>GeekyAnts</Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>
            <Card>
              <CardItem>
                <Content>
                  <H1>Bugget</H1>
                  <Text>Total Bugget: Rp.15.000</Text>
                </Content>
              </CardItem>
            </Card>
            <Card>
              <CardItem>
                <Content>
                  <H1>Expense</H1>
                  <Text>Total Expense: Rp.10.000,-</Text>
                </Content>
              </CardItem>
            </Card>
          </Content>
        </Container>

    );
  }
}

export default Profile;