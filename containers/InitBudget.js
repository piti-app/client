import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {  Button } from 'react-native-elements'
import { onSignIn } from "../Authentication"
export class InitBudget extends Component {
  render() {
    return (
      <View>
        <Text> InitBudget </Text>
        <Button         
                    onPress={() =>  onSignIn().then(() => this.props.navigation.navigate("SignedIn"))}           
                    backgroundColor='#03A9F4'
                    buttonStyle={{borderRadius:10}}                    
                    title='Register'
                    titleStyle={{justifyContent:'center',alignItems:'center' }} />                                              
      </View>
    )
  }
}

export default InitBudget