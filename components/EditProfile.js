import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Alert,
  Icon
} from 'react-native';

class EditProfile extends Component {
  static navigationOptions = {
    headerTitle: <Text style={{
      fontSize: 32,
      fontFamily : 'bebaskai',
      textAlign : 'center',
      paddingTop: 28,
      paddingBottom: 20,
      paddingLeft : 80
    }}>Edit Profile</Text>,
    tabBarLabel: 'Home',
    tabBarVisible:true,
    tabBarIcon: <Icon name='home' />
  }

  state = {
    name: this.props.navigation.state.params.name,
    email: this.props.navigation.state.params.email,
    avatar: this.props.navigation.state.params.avatar,
    main_balance: this.props.navigation.state.params.main_balance,
    budget: this.props.navigation.state.params.budget,
    show: false,
    error: false
  };

  handleOnChangeName = (event) => {
    let newName =  event
    this.setState({
      name: newName
    })
  }
  handleOnChangeEmail = (event) => {
    let newEmail =  event
    this.setState({
      email: newEmail
    })
  }
  handleOnChangeAvatar = (event) => {
    let newAvatar =  event
    this.setState({
      avatar: newAvatar
    })
  }
  handleOnChangeMain = (event) => {
    let newMain =  event
    this.setState({
      main_balance: newMain
    })
  }
  handleOnChangeBudget = (event) => {
    let newBudget =  event
    this.setState({
      budget: newBudget
    })
  }

  render() {
    console.log(this.props.navigation.state.params)
    return (
      <View style={styles.container}>

            <View style={styles.imageProfile}>
                <Image style={styles.inputIcon} source={{uri:this.state.avatar}}/>
            </View>

            <View style={styles.inputContainer}>
                {/* <Image style={styles.inputIcon} source={this.state.icon.price}/> */}
                <TextInput style={styles.inputs}
                    ref={input => { this.textName = input }}
                    value={this.state.name}
                    keyboardType="default"
                    underlineColorAndroid='transparent'
                    onChangeText={this.handleOnChangeName}/>
            </View>

            <View style={styles.inputContainer}>
                {/* <Image style={styles.inputIcon} source={this.state.icon.description}/> */}
                <TextInput style={styles.inputs}
                    ref={input => { this.textEmail = input }}
                    value={this.state.email}
                    keyboardType="default"
                    underlineColorAndroid='transparent'
                    onChangeText={this.handleOnChangeEmail}/>
            </View>

            <View style={styles.inputContainer}>
                {/* <Image style={styles.inputIcon} source={this.state.icon.description}/> */}
                <TextInput style={styles.inputs}
                    ref={input => { this.textMain = input }}
                    value={this.state.main_balance.toString()}
                    keyboardType="numeric"
                    underlineColorAndroid='transparent'
                    onChangeText={this.handleOnChangeMain}/>
            </View>

            <View style={styles.inputContainer}>
                {/* <Image style={styles.inputIcon} source={this.state.icon.description}/> */}
                <TextInput style={styles.inputs}
                    ref={input => { this.textBudget = input }}
                    value={this.state.budget.toString()}
                    keyboardType="numeric"
                    underlineColorAndroid='transparent'
                    onChangeText={this.handleOnChangeBudget}/>
            </View>

            <TouchableHighlight style={[styles.buttonContainer, styles.createButton]} onPress={() => this.onClickListener()}>
                 <Text style={styles.createText}>Save</Text>
            </TouchableHighlight>

        </View>
    )
  }
}

export default EditProfile


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderColor: '#D2D2D2',
      borderWidth: 1,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  dateText: {
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#a8a8a8'
  },
  typeText: {
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#a8a8a8',
    width: 200
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
      color: '#a8a8a8'
  },
  inputIcon:{
    width:150,
    height:150,
    borderRadius:50,
    justifyContent: 'center'
  },
  imageProfile: {
    justifyContent: 'center',
    alignContent: "center",
    marginBottom: 20
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  createButton: {
    backgroundColor: "#0D7EF7",
  },
  createText: {
    color: 'white',
  },
  titleText: {
  fontSize: 32,
  fontFamily : 'bebaskai',
  textAlign : 'center',
  paddingTop: 20,
  paddingBottom: 20,
}
});


