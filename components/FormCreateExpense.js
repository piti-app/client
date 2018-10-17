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
import RNPickerSelect from 'react-native-picker-select';

export default class FormCreateExpense extends Component {

    state = {
      date: 'Date',
      price: '',
      type: 'Type',
      description: '',
      isDateTimePickerVisible: false,
      items: [
          {
              label: 'Food & Drink',
              value: 'Food & Drink',
          },
          {
              label: 'Transport',
              value: 'Transport',
          },
          {
              label: 'Personal',
              value: 'Personal',
          },
          {
            label: 'Electronic',
            value: 'Electronic',
          },
          {
            label: 'Clothes',
            value: 'Clothes',
          },
          {
            label: 'Entertainment',
            value: 'Entertainment',
          },
          {
            label: 'Others',
            value: 'Others',
          }
      ]
    };

    onClickListener = () => {
        console.log(this.state.date, 'Date')
        console.log(this.state.price, 'Price')
        console.log(this.state.type, 'Type')
        console.log(this.state.description, 'Description')
    }
  
    showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
   
    hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
   
    handleDatePicked = (dateEvent) => {
      console.log('A date has been picked: ', dateEvent.toDateString());
      this.setState({
          date: dateEvent.toDateString()
      })
      this.hideDateTimePicker();
    };
  
    render() {
      return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity onPress={this.showDateTimePicker}>
                    <View style={styles.inputContainer}>
                        <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/ultraviolet/1600/today.png'}}/>
                        <Text style={styles.dateText}>{this.state.date}</Text>
                    </View>
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                    />
                </TouchableOpacity>
            </View>
          
            <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/ultraviolet/1600/tags.png'}}/>
                <TextInput style={styles.inputs}
                    placeholder="Price"
                    keyboardType="numeric"
                    underlineColorAndroid='transparent'
                    onChangeText={(price) => this.setState({price})}/>
            </View>

            <TouchableOpacity>
                <RNPickerSelect
                    items={this.state.items}
                    placeholder={{}}
                    onValueChange={(type) => {this.setState({type})
                    }}
                >
                    <View style={styles.inputContainer}>
                        <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/ultraviolet/1600/today.png'}}/>
                        <Text style={styles.dateText}>{this.state.type}</Text>
                    </View>
                </RNPickerSelect>
            </TouchableOpacity>

            <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
                <TextInput style={styles.inputs}
                    placeholder="Description"
                    keyboardType="default"
                    underlineColorAndroid='transparent'
                    onChangeText={(description) => this.setState({description})}/>
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
        color: '#a8a8a8'
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
