import React, { Component } from 'react';
import { View,TextInput,Text,TouchableHighlight } from 'react-native'
import {  Button } from 'react-native-elements'
import { onSignIn } from "../Authentication"

export default class Signin extends Component {
    static navigationOptions = ({ navigation }) => {
            return {
                headerLeft: <View></View>,
                title: 'Sign Up',                            
                headerStyle: {
                    backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {                              
                    textAlign: 'center',
                    flex:1
                },
            };
        };
    render() {
        return (
            <View style={{justifyContent:'center',alignItems:'center',height:'100%'}}>                 
                <View style={{justifyContent:'center',alignItems:'center',padding:30,backgroundColor:'yellow'}}>
                    <Text style={{marginBottom:20}}>Sign Up</Text>
                    <TextInput style={{backgroundColor:'rgb(229, 229, 229)',width:280,marginBottom:20,borderRadius:20}}/>          
                    <TextInput style={{backgroundColor:'rgb(229, 229, 229)',width:280,marginBottom:20,borderRadius:20}}/>          
                    <TextInput style={{backgroundColor:'rgb(229, 229, 229)',width:280,marginBottom:20,borderRadius:20}}/>                             
                    <Button         
                    onPress={() =>  onSignIn().then(() => this.props.navigation.navigate("InitBudget"))}           
                    backgroundColor='#03A9F4'
                    buttonStyle={{borderRadius:10}}                    
                    title='Register'
                    titleStyle={{justifyContent:'center',alignItems:'center' }} />                                              
                </View>        
            </View>   
        );
    }
}