import React, { Component } from 'react';
import { View,TextInput,Text,Icon,Image } from 'react-native'
import {  Button } from 'react-native-elements'
import { onSignIn } from "../Authentication"

export default class InitBudget extends Component {
    static navigationOptions = {
        headerLeft:<View></View>,
        headerTitle: <Text style={{
          fontSize: 32,
          fontFamily : 'bebaskai',
          textAlign : 'center',
          paddingTop: 28,
          paddingBottom: 20,
          paddingLeft : 135
        }}>PITI</Text>,
        tabBarLabel: 'Home',
        tabBarVisible:true,
        tabBarIcon: <Icon name='home' />
    }
    render() {
        return (
            <View style={{justifyContent:'center',alignItems:'center',height:'100%',backgroundColor:'#fff'}}>
                <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'rgb(27, 162, 247)' ,borderRadius:10,paddingTop:4,paddingRight:4}}>
                  <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'rgb(67, 204, 232)' ,borderRadius:10,paddingTop:4,paddingRight:4}}>
                    <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'rgb(229, 229, 229)' ,borderRadius:10,padding:2}}>
                      <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'#fff' ,borderRadius:10,paddingTop:20,paddingBottom:20,paddingLeft:35,paddingRight:35}}>
                        <View style={{flexDirection:'column',marginBottom:20,marginTop:20,justifyContent:'center',alignItems:'center'}}>
                          <Text style={{ fontWeight:'bold', fontSize:16,fontFamily : 'geomanist_regular',textAlign : 'center'}}>Being in control of your finances</Text>                                  
                          <Text style={{ fontWeight:'bold', fontSize:16,fontFamily : 'geomanist_regular',textAlign : 'center'}}>is a great stress reliever</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>                        
                            <TextInput keyboardType='number-pad' placeholder='Your Main Balance' style={{backgroundColor:'rgb(229, 229, 229)',width:230,marginBottom:20,borderRadius:20}}/>
                        </View>
                        <View style={{flexDirection:'row'}}>                        
                            <TextInput  keyboardType='number-pad' placeholder='Your Target Saving' style={{backgroundColor:'rgb(229, 229, 229)',width:230,marginBottom:20,borderRadius:20}}/>
                        </View>                    
                        <Button
                        onPress={() =>  onSignIn().then(() => this.props.navigation.navigate("SignedIn"))}
                        backgroundColor='rgb(27, 162, 247)'
                        buttonStyle={{borderRadius:10}}
                        title='Do It'

                        titleStyle={{justifyContent:'center',alignItems:'center' }} />
                    </View>
                    </View>    
                  </View>
                </View>                         
            </View>
        );
    }
}