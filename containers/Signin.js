import React, { Component } from 'react';
import { View,TextInput,Text,Alert } from 'react-native'
import { Button } from 'react-native-elements'
import {connect} from 'react-redux'
import {isLogin} from '../store/actions/isLogin'

class Signin extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
        title: 'Sign In',    
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
            <Text style={{marginBottom:20}}>Sign In</Text>  
            <Text>{JSON.stringify(this.props.signedIn)}</Text>         
            <TextInput style={{backgroundColor:'rgb(229, 229, 229)',width:280,marginBottom:20,borderRadius:20}}/>          
            <TextInput style={{backgroundColor:'rgb(229, 229, 229)',width:280,marginBottom:20,borderRadius:20}}/>          
            <Button                    
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius:10}}
            onPress={() => this.props.isLogin(true)}
            title='Submit'
            titleStyle={{justifyContent:'center',alignItems:'center' }} />
        </View>                                     
    </View>    
    );
  }
}
const mapStateToProps = props => ({
    signedIn : props.Authentication.signedIn,
    })
    
export default connect(mapStateToProps,{isLogin})(Signin)