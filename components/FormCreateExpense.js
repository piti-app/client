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
    AsyncStorage
  } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';
import {getEmail,fcm} from '../Authentication'
import axios from 'axios'
import { connect } from 'react-redux'
import getData from '../store/actions/getData'
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getExpenses: () => {
      dispatch(getData())
    }
  }
}

class FormCreateExpense extends Component {

    state = {
      date: 'Date',
      displayDate: 'Date',
      price: '',
      type: 'Type',
      description: '',
      isDateTimePickerVisible: false,
      items: [
            {
                label: ' ',
                value: ' ',
            },
          {
              label: 'Food & Drink',
              value: 'Food & Drink',
          },
          {
              label: 'Transport',
              value: 'Transport',
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
          }
      ],
      icon: {
        date : require('../assets/icons/calendar.png'),
        price: require('../assets/icons/money.png'),
        type: require('../assets/icons/checked.png'),
        description: require('../assets/icons/target.png'),
      },
      show: false
    };

     onClickListener = async () => {
        fcm()
        .then((fcmToken) => {
            getEmail()
            .then((email) => {
                axios({
                    method : 'POST',
                    url : `http://10.0.2.2:4000/expense/create/${email}`,
                    data: {
                        date: this.state.date,
                        price: this.state.price,
                        type: this.state.type,
                        description: this.state.description,
                        fcmToken
                    }
                })
                .then((result) => {
                    this.props.getExpenses()
                    Alert.alert("Save Expense Succes !")
                    this.textType.clear()
                    this.textDescription.clear()
                    this.setState({
                        displayDate: 'Date',
                        price: '',
                        type: 'Type',
                        description: ''
                    })
                }).catch((err) => {
                    Alert.alert("Save Expense Error !")
                });
    
            }).catch((err) => {
                Alert.alert("Save Expense Error !")
            }); 
            
        }).catch((err) => {
            
        });        

    }

    showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    handleDatePicked = (dateEvent) => {
      this.setState({
          date: dateEvent,
          displayDate: dateEvent.toDateString()

      })
      this.hideDateTimePicker();
    };

    render() {
      return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity onPress={this.showDateTimePicker}>
                    <View style={styles.inputContainer}>
                        <Image style={styles.inputIcon} source={this.state.icon.date}/>
                        <Text style={styles.dateText}>{this.state.displayDate}</Text>
                    </View>
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={this.state.icon.price}/>
                <TextInput style={styles.inputs}
                    ref={input => { this.textType = input }}
                    placeholder="Price"
                    keyboardType="numeric"
                    underlineColorAndroid='transparent'
                    onChangeText={(price) => this.setState({price})}/>
            </View>

             <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={this.state.icon.description}/>
                <TextInput style={styles.inputs}
                    ref={input => { this.textDescription = input }}
                    placeholder="Description"
                    keyboardType="default"
                    underlineColorAndroid='transparent'
                    onChangeText={(description) => this.setState({description})}/>
            </View>

            <View>
                <TouchableOpacity>
                    <RNPickerSelect
                        items={this.state.items}
                        placeholder={{}}
                        onValueChange={(type) => {this.setState({type})
                        }}
                    >
                        <View style={styles.inputContainer}>
                            <Image style={styles.inputIcon} source={this.state.icon.type}/>
                            <Text style={styles.dateText}>{this.state.type}</Text>
                        </View>
                    </RNPickerSelect>
                </TouchableOpacity>
            </View>

            <TouchableHighlight style={[styles.buttonContainer, styles.createButton]} onPress={() => this.onClickListener()}>
                 <Text style={styles.createText}>Save</Text>
            </TouchableHighlight>

             <SCLAlert
              show={this.state.show}
              onRequestClose={this.handleClose}
              theme="info"
              title="Save Success !"
              headerIconComponent={  <Image
                style={{width: 40, height: 40}}
                source={{uri: 'https://png.icons8.com/ios-glyphs/50/ffffff/multi-edit.png'}}
              />}
            >
            </SCLAlert>

        </View>
      );
    }
  }

  export default connect(null, mapDispatchToProps)(FormCreateExpense)

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