import React, { Component } from 'react';
import { ScrollView,View,TextInput,Text,TouchableHighlight,Icon,Image,Alert } from 'react-native'
import { Button } from 'react-native-elements'
import firebase from 'react-native-firebase'
import {onSignIn,auth} from '../Authentication'
import {connect} from 'react-redux'
import {isAuthenticated} from '../store/actions/isLogin'

class Signin extends Component {
    static navigationOptions = {
        headerTitle: <Text style={{
          fontSize: 32,
          fontFamily : 'bebaskai',
          textAlign : 'center',
          color : '#FFF',
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
                auth(this.state.email).then((result) => {})
                this.props.isAuthenticated(this.state.email)
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
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{justifyContent:'center',alignItems:'center',marginTop:45}}>
            <View style={{justifyContent:'center',alignItems:'center',padding:30,backgroundColor:'#FFF' ,borderRadius:10}}>
                <Image source={require('../assets/icon.png')}
                style={{width: 150, height: 150,marginBottom:20, resizeMode:'contain'}} />
                <View style={{flexDirection:'row'}}>
                <Image source={require('../assets/icons/letter.png')}
                style={{width: 30, height: 30,marginTop:10,marginRight:15}} />
                    <TextInput onChangeText={(email) => this.setState({email})} style={{backgroundColor:'#FFF',width:230,marginBottom:20, borderBottomColor : '#ccc', borderBottomWidth : 1 }}/>
                </View>
                <View style={{flexDirection:'row'}}>
                <Image source={require('../assets/icons/padlock.png')}
                style={{width: 30, height: 30,marginTop:10,marginRight:15}} />
                    <TextInput secureTextEntry={true} onChangeText={(password) => this.setState({password})} style={{backgroundColor:'#FFF',width:230,marginBottom:20, borderBottomColor : '#ccc', borderBottomWidth : 1}}/>
                </View>
                <View style={{flexDirection:'row',marginBottom:20}}>
                    <Text style={{marginRight:5,fontSize: 16,
            fontFamily : 'avenir_book',}}>Dont have an account?</Text>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate("SignUp")}>
                            <Text style={{fontSize: 16,
            fontFamily : 'avenir_book',color:'blue'}}>Sign Up</Text>
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

export default connect(null,{isAuthenticated})(Signin)


