import React, { Component } from "react";
import { onSignOut } from "../Authentication";
import List from '../components/List'
import { connect }from 'react-redux'
import ExpenseCard from "../components/ExpenseCard";
import { Col, Row, Grid } from "react-native-easy-grid";
import {Container,Body,Content,Card,CardItem,Text,Icon,View,Tab,Tabs,TabHeading } from "native-base";
import _ from "../assets/style";
import { TouchableHighlight,AsyncStorage,Alert,StyleSheet,Image } from "react-native";
import axios from "axios";
import GestureRecognizer, { swipeDirections } from "react-native-swipe-gestures";

class Profile extends Component {
  componentDidMount = async () => {
    let self = this;
    AsyncStorage.getItem("user")
      .then(email => {
        axios({
          method: "GET",
          url: `http://10.0.2.2:4000/user/${email}`
        })
          .then(({ data }) => {
            console.log(data.user);
            let expenses = 0;
            data.user.expense.forEach(expense => {
              console.log(expense.price);
              expenses += expense.price;
            });

            self.setState({
              userData: data.user,
              totalExpense: expenses
            });
          })
          .catch(err => {
            Alert.alert(error);
          });
      })
      .catch(err => {
        Alert.alert(error);
      });
  };

  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <Text
        style={{
          fontSize: 32,
          fontFamily: "bebaskai",
          textAlign: "center",
          paddingTop: 28,
          paddingBottom: 20,
          paddingLeft: 133,
          marginLeft: 25
        }}
      >
        PROFILE
      </Text>
    ),
    headerStyle: { backgroundColor: "#fff", elevation: 0 },
    headerRight: (
      <TouchableHighlight
        style={{ marginRight: 25 }}
        onPress={() => {
          onSignOut()
            .then(result => {
              navigation.navigate("SignedOut");
            })
            .catch(err => {});
        }}
      >
        <Icon type="FontAwesome" name="sign-out" />
      </TouchableHighlight>
    )
  });
  constructor(props) {
    super(props);
    this.state = {
      chosenDate: new Date(),
      selected: undefined,
      userData: {},
      totalExpense: 0
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
        <Content style={_.content}>
          <Grid>
            <Col
              style={{
                backgroundColor: "#FFF",                
                justifyContent: "center",
                alignItems: "center"
              }}>
               <Grid>
                <Col style={{ backgroundColor: '#FFF', justifyContent:'center',alignItems:'center' }}>
                <Image source={{uri: 'https://via.placeholder.com/350x150'}}
                      style={{width: 115, height: 115,borderRadius:60,marginTop:10,marginBottom:10}} />
                </Col>
                <Col style={{ backgroundColor: '#FFF',  justifyContent:'center'}}>
                
                      <Text style={{fontSize:16,fontFamily : 'avenir_medium',textAlign:'center'}}>{this.state.userData.name}</Text>                    
                      <Text style={{fontSize:16,fontFamily : 'avenir_medium',marginBottom:10,textAlign:'center'}}>{this.state.userData.email}</Text>                    
                
                        <TouchableHighlight style={[styles.buttonContainer, styles.createButton]} onPress={() => this.props.navigation.navigate('EditProfile', this.state.userData)}>
                              <Text style={styles.createText}>Edit</Text>
                        </TouchableHighlight>     
                </Col>
              </Grid>
              <Grid>
                {/* ====== TABS ===== */}
                <Tabs tabBarUnderlineStyle={{borderBottomWidth:2,backgroundColor:'#FFF'}}>

                {/* ====== BASIC INFO ====== */}
                  <Tab heading="Basic Info" tabStyle={{backgroundColor: '#FFF'}} textStyle={{color: 'black',fontFamily : 'avenir_medium'}} activeTabStyle={{backgroundColor: '#FFF'}} activeTextStyle={{color: 'blue', fontWeight: 'normal'}}>                  
                  <Card>
                    <CardItem header bordered>
                      <Text>NativeBase</Text>
                    </CardItem>
                    <CardItem bordered>
                      <Body>
                        <List type='Main Balance' content='50000'/>
                        <List type='Total Spent' content='60000'/>
                        <List type='Total Expense' content='40000'/>
                        <List type='Today Activity' content='60000'/>
                        <List type='Last Activity' content='20000'/>
                        <List type='Target Saving' content='30000'/>
                        <List type='Maximum' content='40000'/>                                             
                      </Body>
                    </CardItem>
                    <CardItem footer bordered>
                      <Text>GeekyAnts</Text>
                    </CardItem>
                  </Card>                 
                  </Tab>
                  <Tab heading="History" tabStyle={{backgroundColor: '#FFF'}} textStyle={{color: 'black',fontFamily : 'avenir_medium'}} activeTabStyle={{backgroundColor: '#FFF'}} activeTextStyle={{color: 'blue', fontWeight: 'normal'}}>
                      <View style={{ backgroundColor: "yellow" }}>
                          <Text>aw</Text>
                        </View>
                        <View />
                  </Tab>
                      <Tab heading={<TabHeading style={{backgroundColor: '#FFF'}}>
                      <Icon name="apps" style={{color: 'blue'}} />                 
                      </TabHeading>}>       
                  </Tab>
                </Tabs>
              </Grid>             
            </Col>
          </Grid>          
        </Content>
      </Container>
    );
  }
}

export default Profile;

const styles = StyleSheet.create({
  buttonContainer: {
    height: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    borderRadius: 30
  },
  createButton: {
    backgroundColor: "#0D7EF7"
  },
  createText: {
    color: "white"
  }
});
