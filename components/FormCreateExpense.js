import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    Alert
  } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class FormCreateExpense extends Component {

    state = {
      isDateTimePickerVisible: false,
      data: [{
        value: 'Banana',
      }, {
        value: 'Mango',
      }, {
        value: 'Pear',
      }]
    };
  
    onClickListener = (viewId) => {
      Alert.alert("Alert", "Button pressed "+viewId);
    }
  
    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
   
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
   
    _handleDatePicked = (date) => {
      console.log('A date has been picked: ', date);
      this._hideDateTimePicker();
    };
  
    render() {
      return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity onPress={this._showDateTimePicker}>
                    <View style={styles.inputContainer}>
                        <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/ultraviolet/1600/today.png'}}/>
                        <Text style={styles.dateText}>Date</Text>
                    </View>
                </TouchableOpacity>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                />
            </View>
          
            <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/ultraviolet/1600/tags.png'}}/>
                <TextInput style={styles.inputs}
                    placeholder="Price"
                    keyboardType="numeric"
                    underlineColorAndroid='transparent'
                    onChangeText={(email) => this.setState({email})}/>
            </View>

            <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
                <TextInput style={styles.inputs}
                    placeholder="Description"
                    keyboardType="default"
                    underlineColorAndroid='transparent'
                    onChangeText={(password) => this.setState({password})}/>
            </View>

            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
                 <Text style={styles.createText}>Create</Text>
            </TouchableHighlight>
  
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#d2d2d2',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderColor:"#00b5ec",
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
        color: '#000000'
    },
    inputIcon:{
      width:27,
      height:27,
      marginLeft:20,
      justifyContent: 'center'
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
    loginButton: {
      backgroundColor: "#00b5ec",
    },
    createText: {
      color: 'white',
    }
  });
