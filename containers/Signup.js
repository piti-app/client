import React, { Component } from 'react';
import {ScrollView, View,TextInput,Text,Icon,Image,Alert } from 'react-native'
import {  Button } from 'react-native-elements'
import firebase from 'react-native-firebase'
import axios from 'axios'
import {onSignIn,auth} from '../Authentication'

export default class Signin extends Component {
    static navigationOptions = {
        headerLeft:<View></View>,
        tabBarLabel: 'Home',
        tabBarVisible:true,
        tabBarIcon: <Icon name='home' />
    }
    constructor(){
        super()
        this.state = {
            email : null,
            password : null,
            name : null,
            errorMessage : null
        }
    }

    signupHandle = () => {
        let email = this.state.email
        let name = this.state.name
        let self = this
        firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
          let data = {
              email,
              name,
              avatar : 'https://via.placeholder.com/150x150'
          }
          axios.post('https://piti.minimalistdeveloper.xyz/user',data)
            .then(({data}) => {
                onSignIn()
                .then((result) => {
                    auth(this.state.email).then((result) => {})
                    this.props.navigation.navigate("InitBudget")
                }).catch((err) => {

                });

            }).catch((err) => {
                Alert.alert(err)
            });
      })
      .catch(error => this.setState({ errorMessage: error.message }))
    }
    render() {
        return (
            <View style={{justifyContent:'center',alignItems:'center',height:'100%',backgroundColor:'#fff'}}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{justifyContent:'center',alignItems:'center',marginTop:35}}>
                    <View style={{justifyContent:'center',alignItems:'center',padding:30,backgroundColor:'#FFF' ,borderRadius:10}}>
                    <Image source={require('../assets/icon.png')}
                    style={{width: 150, height: 150,marginBottom:20, resizeMode:'contain'}} />

                        <View style={{flexDirection:'row'}}>
                            <Image source={require('../assets/icons/username.png')}
                            style={{width: 30, height: 30,marginTop:10,marginRight:15}} />
                            <TextInput onChangeText={(name) => this.setState({name})} id='name' placeholder='Name' style={{backgroundColor:'#FFF',width:230,marginBottom:20, borderBottomColor : '#ccc', borderBottomWidth : 1}}/>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Image source={require('../assets/icons/letter.png')}
                            style={{width: 30, height: 30,marginTop:10,marginRight:15}} />
                            <TextInput onChangeText={(email) => this.setState({email})} id='email' type='email' placeholder='Email' style={{backgroundColor:'#FFF',width:230,marginBottom:20, borderBottomColor : '#ccc', borderBottomWidth : 1}}/>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Image source={require('../assets/icons/padlock.png')}
                            style={{width: 30, height: 30,marginTop:10,marginRight:15}} />
                            <TextInput secureTextEntry={true} onChangeText={(password) => this.setState({password})} id='password' type='password' placeholder='Password' style={{backgroundColor:'#FFF',width:230,marginBottom:20, borderBottomColor : '#ccc', borderBottomWidth : 1}}/>
                        </View>
                        <Text style={{marginBottom:10,color:'red'}}>
                            {this.state.errorMessage}
                        </Text>
                        <Button
                        onPress={this.signupHandle}
                        backgroundColor='#03A9F4'
                        buttonStyle={{borderRadius:10}}
                        title='Sign Up'
                        titleStyle={{justifyContent:'center',alignItems:'center' }} />
                    </View>
                </ScrollView>
            </View>
        );
    }
}