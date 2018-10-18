import React, { Component } from 'react';
import { View,TextInput,Text,TouchableHighlight } from 'react-native'
import { Button } from 'react-native-elements'

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
    }
}
  render() {
    return (
      <View style={{justifyContent:'center',alignItems:'center',height:'100%'}}>
        <View style={{justifyContent:'center',alignItems:'center',padding:30,backgroundColor:'yellow'}}>

            <Text style={{marginBottom:20}}>Sign In</Text>
            <TextInput style={{backgroundColor:'rgb(229, 229, 229)',width:280,marginBottom:20,borderRadius:20}}/>
            <TextInput style={{backgroundColor:'rgb(229, 229, 229)',width:280,marginBottom:20,borderRadius:20}}/>
            <View style={{flexDirection:'row'}}>
                <Text style={{marginRight:5}}>Dont have an account?</Text>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate("SignUp")}>
                        <Text>Sign Up</Text>
                    </TouchableHighlight>
            </View>
            <Button
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius:10}}
            title='Submit'
            titleStyle={{justifyContent:'center',alignItems:'center' }} />
        </View>
    </View>
    );
  }
}

export default Signin


