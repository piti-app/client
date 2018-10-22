import React, { Component } from "react";
import { onSignOut } from "../Authentication";
import List from '../components/List'
import { connect }from 'react-redux'
import setDate from '../helper/date'
import ExpenseCard from "../components/ExpenseCard";
import {Container,Body,Content,Card,CardItem,Text,Icon,View,Tab,Tabs,Badge,ListItem,Left,Right,Button} from "native-base";
import _ from "../assets/style";
import { TouchableHighlight,AsyncStorage,Alert,StyleSheet,Image,ProgressBarAndroid,ScrollView } from "react-native";
import axios from "axios";
import GestureRecognizer, { swipeDirections } from "react-native-swipe-gestures";
import getData from '../store/actions/getData'
import { BarChart, YAxis,XAxis,StackedBarChart } from 'react-native-svg-charts'
import { forEach } from "async";

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
  let totalBalance = this.props.user.main_balance - this.props.user.money_spent
  let date = new Date()
  let dd = date.getDate()
  let MaximumSpentPerDay = Math.round((totalBalance-this.props.user.budget)/(30-dd))
  
  let expensesToday = [0]  
  this.props.user.expense.forEach(item =>{
    if(setDate(item.date)== setDate()){      
      expensesToday.push(item.price)
    }
  }) 
  
const reducer = (accumulator, currentValue) => accumulator + currentValue;
  
    return (
      <Container>
        <Content style={_.content}>

            <View style={{  flex: 1,flexDirection: 'row',justifyContent: 'space-around',marginBottom:20}}>
              <View style={{justifyContent:'center',alignItems:'center'}}>                    
                    <Image style={styles.avatar} source={{uri: this.props.user.avatar}} />
              </View>
                
              <View style={{justifyContent:'center',alignItems:'center'}}>
                  <Text note style={{marginBottom:5}}>
                      TOTAL BALANCE
                  </Text>  
                  <Text style={{fontSize:26,marginBottom:5,fontWeight:'bold'}}>
                      Rp.{totalBalance},00
                  </Text>                
                  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                      <View style={{backgroundColor:'#FF8454',opacity:0.3,padding:10,borderRadius:10}}>
                        {this.props.user.money_spent===0?
                          <Text style={{color:'red',fontSize:12,fontWeight:'bold'}}>
                          Rp. 0,00
                          </Text>:
                          <Text style={{color:'red',fontSize:12,fontWeight:'bold'}}>
                          - Rp.{this.props.user.money_spent},00
                          </Text>           
                      }                        
                      </View>                  
                        
                        <Button small onPress={() => this.props.navigation.navigate('EditProfile', this.props.user)} style={{marginTop:5,borderRadius:100,marginLeft:10,backgroundColor:'#4073F4' }}>            
                          <Icon small type="FontAwesome" name="edit" style={{ color: "#FFF"}} />
                        </Button>              
                  </View>
                
               </View>    
            </View>
              
            <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>             
              <Card style={{marginRight:15,width:180,marginLeft:15}}>        
                <CardItem style={{ backgroundColor: '#4073F4' }}>
                  <Body>
                    <Text style={{marginBottom:5,color:'#FFF',fontSize:14}}>
                      INCOME
                    </Text>
                    <Text style={{marginBottom:20,fontSize:20,color:'#FFF',fontWeight:'bold'}}>
                      Rp.{this.props.user.main_balance},00
                    </Text>
                    <View>
                      <Text style={{marginBottom:5,color:'#FFF',fontSize:14}}>
                        Click 
                      </Text>
                    </View>
                  </Body>
                </CardItem>           
              </Card>

              <Card style={{marginRight:15,width:180}}>        
                <CardItem style={{ backgroundColor:'#08ddb3' }}>
                  <Body>
                    <Text style={{marginBottom:5,color:'#FFF',fontSize:14}}>
                      EXPENSE
                    </Text>
                    <Text style={{marginBottom:20,fontSize:20,color:'#FFF',fontWeight:'bold'}}>
                      Rp.{this.props.user.money_spent},00
                    </Text>
                    <View>
                      <Text style={{marginBottom:5,color:'#FFF',fontSize:14}}>
                        Click 
                      </Text>
                    </View>
                  </Body>
                </CardItem>           
              </Card>

              <Card style={{marginRight:15,width:180}}>        
                <CardItem style={{ backgroundColor: '#c4c4c4' }}>
                  <Body>
                    <Text style={{marginBottom:5,color:'#FFF',fontSize:14}}>
                      GOAL SAVING
                    </Text>
                    <Text style={{marginBottom:20,fontSize:20,color:'#FFF',fontWeight:'bold'}}>
                      Rp.{this.props.user.budget},00
                    </Text>
                    <View>    
                      <Text style={{marginBottom:5,color:'#FFF',fontSize:14}}>
                            click                                                                                       
                      </Text>                  
                    </View>
                  </Body>
                </CardItem>           
              </Card>              
            </ScrollView>
            <Tabs style={{marginTop:10}}>
            {/* ====== BASIC INFO ====== */}
              <Tab heading="Basic Info" tabStyle={{backgroundColor: '#FFF'}} textStyle={{color: 'black',fontFamily : 'avenir_medium'}} activeTabStyle={{backgroundColor: '#FFF'}} activeTextStyle={{color: 'blue', fontWeight: 'normal'}}>                               
                  <List type='Maximum' value={MaximumSpentPerDay} color='#4073F4'/>                              
                  <List type='expense today' value={expensesToday.reduce(reducer)}color='#FFBF30'/>   
                  <List type='saving today' value={MaximumSpentPerDay-expensesToday.reduce(reducer)} color='#02F6C9'/>                                       
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
    width: 100,
    borderRadius: 10
  },
  createButton: {
    backgroundColor: "#4073F4"
  },
  createText: {
    color: "red"
  },
  avatar:{
    width:110,
    height:110,
    borderRadius:70
  }
});