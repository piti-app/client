import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    Icon
  } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';

export default class FormUpdateExpense extends Component {
  static navigationOptions = {
    headerTitle: <Text style={{
      fontSize: 32,
      fontFamily : 'bebaskai',
      textAlign : 'center',
      paddingTop: 28,
      paddingBottom: 20,
      paddingLeft : 65
    }}>UPDATE EXPENSE</Text>,
    tabBarLabel: 'Home',
    tabBarVisible:true,
    tabBarIcon: <Icon name='home' />
  }

    state = {
      date: this.props.navigation.state.params.date.toDateString(),
      price: this.props.navigation.state.params.price,
      type: this.props.navigation.state.params.type,
      description: this.props.navigation.state.params.description,
      isDateTimePickerVisible: false,
      items: [
          { label: 'Food & Drink', value: 'Food & Drink'},
          { label: 'Transport', value: 'Transport' },
          { label: 'Personal', value: 'Personal' },
          { label: 'Electronic', value: 'Electronic' },
          { label: 'Clothes', value: 'Clothes' },
          { label: 'Entertainment', value: 'Entertainment' },
          { label: 'Others', value: 'Others' }
      ],
      icon: {
        date : require('../assets/icons/calendar.png'),
        price: require('../assets/icons/money.png'),
        type: require('../assets/icons/checked.png'),
        description: require('../assets/icons/target.png'),
      }
    };

    onClickListener = () => {
        console.log(this.state.date, 'Date')
        console.log(this.state.price, 'Price')
        console.log(this.state.type, 'Type')
        console.log(this.state.description, 'Description')
        this.textType.clear()
        this.textDescription.clear()
        this.setState({
            date: 'Date',
            price: '',
            type: 'Type',
            description: ''
        })
    }
  
    showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
   
    hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
   
    handleDatePicked = (dateEvent) => {
      this.setState({
          date: dateEvent.toDateString()
      })
      this.hideDateTimePicker();
    };
  
    render() {
      console.log(this.props.navigation.state.params.price)
      return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity onPress={this.showDateTimePicker}>
                    <View style={styles.inputContainer}>
                        <Image style={styles.inputIcon} source={this.state.icon.date}/>
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
                <Image style={styles.inputIcon} source={this.state.icon.price}/>
                <TextInput style={styles.inputs}
                    ref={input => { this.textType = input }}
                    placeholder="Price"
                    keyboardType="numeric"
                    value={this.props.navigation.state.params.price.toString()}
                    underlineColorAndroid='transparent'
                    onChangeText={(price) => this.setState({price})}/>
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

            <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={this.state.icon.description}/>
                <TextInput style={styles.inputs}
                    ref={input => { this.textDescription = input }}
                    placeholder="Description"
                    keyboardType="default"
                    value={this.props.navigation.state.params.description}
                    underlineColorAndroid='transparent'
                    onChangeText={(description) => this.setState({description})}/>
            </View>

            <TouchableHighlight style={[styles.buttonContainer, styles.createButton]} onPress={() => this.onClickListener()}>
                 <Text style={styles.createText}>Save Expense</Text>
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
      backgroundColor: '#F7F7F7',
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
      backgroundColor: "#00b5ec",
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
