import React, { Component } from 'react';
import { ScrollView,View,TextInput,Text,TouchableHighlight,Icon,Image,Alert } from 'react-native'
import { Button } from 'react-native-elements'
import firebase from 'react-native-firebase'
import {onSignIn} from '../Authentication'

class Signin extends Component {
    static navigationOptions = {
        headerTitle: <Text style={{
          fontSize: 32,
          fontFamily : 'bebaskai',
          textAlign : 'center',
          paddingTop: 28,
          paddingBottom: 20,
          paddingLeft : 190
        }}>PITI</Text>,
        tabBarLabel: 'Home',
        tabBarVisible:true,
        tabBarIcon: <Icon name='home' />
      }
      constructor(){
          super()
          this.state = {
              email : null,
              password: null,
              errorMessage : null
          }
      }

      signinHandler = () => {      
        this.setState({
            errorMessage : null
          })
          
          if(this.state.email && this.state.password)    {
              firebase
            .auth().signInWithEmailAndPassword(this.state.email, this.state.password)     
            .then((res) => {
              onSignIn()
              .then((result) => {
                  this.props.navigation.navigate("SignedIn")
              }).catch((err) => {
                  
              });
              
            })
            .catch(error => this.setState({ errorMessage: error.message }))
            }
          else{
              this.setState({
                errorMessage : 'input cant be null'
              })
          }
      }
  render() {
    return (
      <View style={{justifyContent:'center',alignItems:'center',height:'100%',backgroundColor:'#fff'}}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{justifyContent:'center',alignItems:'center',marginTop:55}}>
            <View style={{justifyContent:'center',alignItems:'center',padding:30,backgroundColor:'rgb(237, 237, 237)' ,borderRadius:10}}>
                <Image source={{uri: 'https://via.placeholder.com/350x150'}}
                style={{width: 100, height: 100,borderRadius:50,marginBottom:20}} />
                <View style={{flexDirection:'row'}}>
                <Image source={require('../assets/icons/letter.png')}
                style={{width: 30, height: 30,marginTop:10,marginRight:15}} />
                    <TextInput onChangeText={(email) => this.setState({email})} style={{backgroundColor:'rgb(229, 229, 229)',width:230,marginBottom:20,borderRadius:20}}/>
                </View>
                <View style={{flexDirection:'row'}}>
                <Image source={require('../assets/icons/padlock.png')}
                style={{width: 30, height: 30,marginTop:10,marginRight:15}} />
                    <TextInput secureTextEntry={true} onChangeText={(password) => this.setState({password})} style={{backgroundColor:'rgb(229, 229, 229)',width:230,marginBottom:20,borderRadius:20}}/>
                </View>
                <View style={{flexDirection:'row',marginBottom:20}}>
                    <Text style={{marginRight:5,fontSize: 16,
            fontFamily : 'geomanist_regular',}}>Dont have an account?</Text>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate("SignUp")}>
                            <Text style={{fontSize: 16,
            fontFamily : 'geomanist_regular',color:'blue'}}>Sign Up</Text>
                        </TouchableHighlight>
                </View>
                <Text style={{marginBottom:10,color:'red'}}>
                                {this.state.errorMessage}
                            </Text>
                <Button
                onPress={this.signinHandler}
                backgroundColor='#03A9F4'
                buttonStyle={{borderRadius:10,width:100}}
                title='Sign In'
                titleStyle={{justifyContent:'center',alignItems:'center',fontFamily : 'geomanist_regular' }} />
            </View>
        </ScrollView>       
    </View>
    );
  }
}

export default Signin


