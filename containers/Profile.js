import React, { Component } from "react";
import { onSignOut } from "../Authentication";
import List from '../components/List'
import Report from '../helper/report'
import { connect }from 'react-redux'
import setDate from '../helper/date'
import ExpenseCard from "../components/ExpenseCard";
import {Container,Body,Content,Card,CardItem,Text,Icon,View,Tab,Tabs,Badge,ListItem,Left,Right,Button} from "native-base";
import _ from "../assets/style";
import { TouchableHighlight,AsyncStorage,Alert,StyleSheet,Image,ProgressBarAndroid,ScrollView } from "react-native";
import axios from "axios";
import GestureRecognizer, { swipeDirections } from "react-native-swipe-gestures";
import getData from '../store/actions/getData'
import { BarChart, YAxis,XAxis,StackedBarChart,LineChart,Grid } from 'react-native-svg-charts'
import { forEach } from "async";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenDate: new Date(),
      selected: undefined,
      expenses: [],
      totalExpense: 0,
      dataExpense : [0,0,0,0,0,0,0,0,0,0]
    };
    this.setDate = this.setDate.bind(this);
  }
  componentDidMount = () => {
    this.props.getUserData()
    let stackBarData =  this.fetchExpenses()
    console.log(stackBarData,'stackbarData')
    this.setState({
      expenses : stackBarData.finalArray,
      dataExpense : stackBarData.totalExpense
    })

    setTimeout(() => {
      console.log(this.state,'ini state')
    }, 5000);

  };

  totalPerMonth = (arr) =>{
    const arrTotalExpense = []
    console.log(arr,'expenses state')
    arr.forEach((expense)=>{
      console.log(expense,'expense')
      let total = 0
      for(let i in expense){
        if(typeof expense[i] !== "string"){
          total += expense[i]
        }
      }
      arrTotalExpense.push(total)
    })
    console.log(arrTotalExpense)
    return arrTotalExpense
  }

  componentDidUpdate(prevProps){
    console.log("componentDidUpdate", this.state)
    if(this.props.user.expense !==prevProps.user.expense){
      let stackBarData = this.fetchExpenses()
      console.log(stackBarData,'ini stack bar data from did update')
      this.setState({
        expenses : stackBarData.finalArray,
        dataExpense : stackBarData.totalExpense
      })
    }
  }

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

  fetchExpenses = () => {
    let obj = {}
    for(let i = 0 ;i<12;i++){
      obj[i] = this.reportExpenses(this.props.user.expense,i)
    }
    let finalArr = []
    for(let data in obj){
      if(obj[data].length!==0){
        finalArr.push(obj[data][0])
      }
    }
    let totalExpense =  this.totalPerMonth(finalArr)
    return {
      finalArray : finalArr,
      totalExpense : totalExpense
    }
  }
  reportExpenses = (expenses,mm) =>{
    let nameMonth = ["jan","feb","mar","apr","mei","jun","jul","aug","sep","oct","nov","dec"]
    let initData = {
      foods:0,
      transport:0,
      electronic:0,
      entertainment:0,
      clothes:0
    }
    let foodCounterPrice = 0
    let electronicCounterPrice = 0
    let transportCounterPrice = 0
    let clothesCounterPrice = 0
    let entertainmentCounterPrice = 0
    let data= []
    let jan =[]
    let feb =[]
    let mar =[]
    let apr =[]
    let mei =[]
    let jun =[]
    let jul =[]
    let aug =[]
    let sep =[]
    let oct =[]
    let nov =[]
    let dec =[]
    let month = [jan,feb,mar,apr,mei,jun,jul,aug,sep,oct,nov,dec]
    expenses.forEach(item => {
      let date = new Date(item.date)
      if(item.type == 'Food & Drink'&& date.getMonth() ==mm){
        foodCounterPrice += item.price
            initData = {
            ...initData,
            foods : foodCounterPrice
            }
            data = month[mm].concat({
            ...initData,
            foods: foodCounterPrice
            })
        }
        else if(item.type == 'Entertainment'&& date.getMonth() ==mm){
            entertainmentCounterPrice += item.price
            initData = {
            ...initData,
            entertainment : entertainmentCounterPrice
            }
            data = month[mm].concat({
            ...initData,
            entertainment: entertainmentCounterPrice
            })
        }
        else if(item.type == 'Clothes'&& date.getMonth() ==mm){
            clothesCounterPrice += item.price
            initData = {
            ...initData,
            clothes : clothesCounterPrice
            }
            data = month[mm].concat({
            ...initData,
            clothes: clothesCounterPrice
            })
        }
        else if(item.type == 'Transport'&& date.getMonth() ==mm){
            transportCounterPrice += item.price
            initData = {
            ...initData,
            transport : transportCounterPrice
            }
            data = month[mm].concat({
            ...initData,
            transport: transportCounterPrice
            })
        }
        else if(item.type == 'Electronic'&& date.getMonth() ==mm){
            electronicCounterPrice += item.price
            initData = {
            ...initData,
            electronic : electronicCounterPrice
            }
            data = month[mm].concat({
            ...initData,
            electronic: electronicCounterPrice
            })
        }
    })
    data = month[mm].concat({
      ...initData,
      month : nameMonth[mm]
      })
    return data
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
  const month = ['Jan','Feb','March','Aprl','Mei','June','July','Aug','Sept','Oct','Nov','Dec']
  const colors = [ '#4073F4','#FF8454','#FFBF30', '#02F6C9', '#5133DF']
  const keys   = [ 'clothes', 'transport', 'electronic', 'entertainment' ,'foods' ]
  let totalBalance = this.props.user.main_balance
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
const data = this.state.dataExpense
const axesSvg = { fontSize: 10, fill: 'grey' };
const verticalContentInset = { top: 5 }
const xAxisHeight = 30
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
                      Rp.{totalBalance-this.props.user.budget},00
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
                      <View style ={{alignItems : 'center', marginTop : 20}}>
                        <Image source={require('../assets/forprofile.png')}
                        style = {{height : 40, width : 300, resizeMode : 'contain'}}
                        />
                      </View>

                    <View style={{ height: 380, padding: 30, flexDirection: 'row' }}>
                        <YAxis
                            data={data}
                            style={{ marginBottom: xAxisHeight }}
                            contentInset={verticalContentInset}
                            svg={axesSvg}
                            numberOfTicks={ 5 }
                        />
                        <View style={{ flex: 1, marginLeft: 10 }}>
                        <StackedBarChart
                          style={ { flex:1 } }
                          keys={ keys }
                          colors={ colors }
                          spacingInner={0.1}
                          data={ this.state.expenses }
                          showGrid={ false }
                          contentInset={ { top: 30, bottom: 5 } }
                      >
                      <Grid/>
                      </StackedBarChart>
                      <XAxis
                       style={{ marginHorizontal: -10, height: xAxisHeight }}
                        data={ this.state.expenses }
                        formatLabel={ (value, index) => this.state.expenses[index].month }
                        contentInset={{ left: 10, right: 10 }}
                        svg={axesSvg}
                    />

                        </View>
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