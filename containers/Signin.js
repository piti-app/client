import React, { Component } from 'react';
import { View } from 'react-native'
import { Card, FormInput, Button, Icon } from 'react-native-elements'
import Logo from '../components/Logo'

export default class Signin extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
        title: 'Sign In',
        headerLeft: <Logo/>,
        headerRight: <Logo/>,
    
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
      <View style={{justifyContent:'center',alignItems:'center',flex:1}}>      
        <Card >
            <FormInput style={{backgroundColor:'black'}}/>          
            <FormInput style={{backgroundColor:'red'}}/>          
            <FormInput style={{backgroundColor:'blue'}}/>          
            <Button
            icon={<Icon name='code' color='#ffffff' />}
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            onPress={() => this.props.navigation.navigate("SignIn")}
            title='Submit' />
          </Card>
    </View>    
    );
  }
}