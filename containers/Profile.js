import React, { Component } from "react";
import { onSignOut } from "../Authentication";
import List from '../components/List'
import { connect }from 'react-redux'
import ExpenseCard from "../components/ExpenseCard";
import {Container,Body,Content,Card,CardItem,Text,Icon,View,Tab,Tabs,Badge,ListItem,Left,Right,Button} from "native-base";
import _ from "../assets/style";
import { TouchableHighlight,AsyncStorage,Alert,StyleSheet,Image,ProgressBarAndroid,ScrollView } from "react-native";
import axios from "axios";
import GestureRecognizer, { swipeDirections } from "react-native-swipe-gestures";
import getData from '../store/actions/getData'
import { BarChart, YAxis,XAxis,StackedBarChart } from 'react-native-svg-charts'

class Profile extends Component {

  componentDidMount = () => {
    this.props.getUserData()
  };

  static navigationOptions = ({ navigation }) => ({    
    headerTitle: <Text style={{
      fontSize: 32,
      fontFamily : 'bebaskai',
      textAlign : 'center',
      paddingTop: 28,
      paddingBottom: 20,
      paddingLeft : 150
    }}></Text>,    
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
    const data = [
      {          
          apples: 10,
          bananas: 20,
          cherries: 30,
          dates: 20,
          oranges: 20,
      },
      {          
          apples: 10,
          bananas: 20,
          cherries: 30,
          dates: 20,
          oranges: 20,
      },
      {          
          apples: 10,
          bananas: 20,
          cherries: 30,
          dates: 20,
          oranges: 20,
      },
      {
          apples: 10,
          bananas: 20,
          cherries: 30,
          dates: 20,
          oranges: 20,
      },
      {        
        apples: 10,
          bananas: 20,
          cherries: 30,
          dates: 20,
          oranges: 20,
    },
    {      
      apples: 10,
          bananas: 20,
          cherries: 30,
          dates: 20,
          oranges: 20,
  },
  ]
  const month = ['Jan','Feb','March','Aprl','Mei','June','July','Aug','Sept','Oct','Nov','Dec']
  const colors = [ '#4073F4','#FF8454','#FFBF30', '#02F6C9']
  const keys   = [ 'apples', 'bananas', 'cherries', 'dates' ]
    return (
      <Container>
        <Content style={_.content}>
            <View style={{justifyContent:'center',alignItems:'center',marginBottom:20}}>
              <Text note style={{marginBottom:5}}>
                  TOTAL BALANCE
              </Text>  
              <Text style={{fontSize:26,marginBottom:5,fontWeight:'bold'}}>
                  Rp.2500000
              </Text>  
              <View style={{flexDirection:'row'}}>
                  <View style={{backgroundColor:'#FF8454',opacity:0.3,padding:10,borderRadius:10}}>
                    <Text style={{color:'red',fontSize:12}}>
                    - Rp.2500000
                    </Text>
                  </View>                  
              </View>
            </View>        
            <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>             
              <Card style={{marginRight:15,width:180,marginLeft:15}}>        
                <CardItem style={{ backgroundColor: '#4073F4' }}>
                  <Body>
                    <Text style={{marginBottom:5,color:'#FFF',fontSize:14}}>
                      REVENUE
                    </Text>
                    <Text style={{marginBottom:20,fontSize:20,color:'#FFF',fontWeight:'bold'}}>
                      Rp.25000
                    </Text>
                    <View>
                      <Text style={{marginBottom:5,color:'#FFF',fontSize:14}}>
                        Click 
                      </Text>
                    </View>
                  </Body>
                </CardItem>           
              </Card>

              <Card style={{backgroundColor:'blue',marginRight:15,width:180}}>        
                <CardItem style={{ backgroundColor:'#08ddb3' }}>
                  <Body>
                    <Text style={{marginBottom:5,color:'#FFF',fontSize:14}}>
                      REVENUE
                    </Text>
                    <Text style={{marginBottom:20,fontSize:20,color:'#FFF',fontWeight:'bold'}}>
                      Rp.25000
                    </Text>
                    <View>
                      <Text style={{marginBottom:5,color:'#FFF',fontSize:14}}>
                        Click 
                      </Text>
                    </View>
                  </Body>
                </CardItem>           
              </Card>

              <Card style={{backgroundColor:'blue',marginRight:15,width:180}}>        
                <CardItem style={{ backgroundColor: '#c4c4c4' }}>
                  <Body>
                    <Text style={{marginBottom:5,color:'#FFF',fontSize:14}}>
                      REVENUE
                    </Text>
                    <Text style={{marginBottom:20,fontSize:20,color:'#FFF',fontWeight:'bold'}}>
                      Rp.25000
                    </Text>
                    <View>
                      <Text style={{marginBottom:5,color:'#FFF',fontSize:14}}>
                        Click 
                      </Text>
                    </View>
                  </Body>
                </CardItem>           
              </Card>              
            </ScrollView>
            <Tabs style={{marginTop:10}}>
            {/* ====== BASIC INFO ====== */}
              <Tab heading="Basic Info" tabStyle={{backgroundColor: '#FFF'}} textStyle={{color: 'black',fontFamily : 'avenir_medium'}} activeTabStyle={{backgroundColor: '#FFF'}} activeTextStyle={{color: 'blue', fontWeight: 'normal'}}>                               
                  <List type='Maximum' value='40000' color='#4073F4'/>   
                  <List type='Maximum' value='40000' color='#FF8454'/>   
                  <List type='Maximum' value='40000' color='#FFBF30'/>   
                  <List type='Maximum' value='40000' color='#02F6C9'/>   
                  <List type='Maximum' value='40000' color='#5133DF'/>                     
              </Tab>

              <Tab heading="History" tabStyle={{backgroundColor: '#FFF'}} textStyle={{color: 'black',fontFamily : 'avenir_medium'}} activeTabStyle={{backgroundColor: '#FFF'}} activeTextStyle={{color: 'blue', fontWeight: 'normal'}}>
                  <View style={{ backgroundColor: "#FFF",marginRight:15,marginLeft:15 }}>                                  
                  <StackedBarChart
                      style={ { height: 200 } }
                      keys={ keys }
                      colors={ colors }
                      data={ data }
                      showGrid={ false }
                      contentInset={ { top: 30, bottom: 10 } }
                  />
                   <XAxis
                    style={{ marginLeft: 0,marginRight:10}}
                    data={ data }
                    formatLabel={ (value, index) => month[index] }  
                    contentInset={ { left: 10, bottom: 10 } }                  
                    svg={{ fontSize: 13, fill: 'black' }}
                />
                    </View>                   
              </Tab>             
            </Tabs>     
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    user : state.getExpense.user,
    isLoaded : state.getExpense.isLoaded,
    totalExpense : state.getExpense.totalExpense
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUserData: () => {
      dispatch(getData())
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Profile)

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
    backgroundColor: "#4073F4"
  },
  createText: {
    color: "white"
  }
});
