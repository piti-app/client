import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    Icon,
    ScrollView,
    Alert
  } from 'react-native';
import { connect } from 'react-redux'
import DateTimePicker from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios'
import getData from '../store/actions/getData'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getExpenses: () => {
      dispatch(getData())
    }
  }
}

class FormUpdateExpense extends Component {
  static navigationOptions = {
    headerTitle: <Text style={{
      fontSize: 32,
      fontFamily : 'bebaskai',
      textAlign : 'center',
      paddingTop: 28,
      paddingBottom: 20,
      paddingLeft : 80
    }}>EDIT EXPENSE</Text>,
    tabBarLabel: 'Update',
    tabBarVisible:true,
    tabBarIcon: <Icon name='home' />
  }

    state = {
      date: new Date(this.props.navigation.state.params.date).toDateString(),
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

    handleOnChangePrice = (event) => {
      let newPrice =  event
      this.setState({
        price: newPrice
      })
    }
    handleOnChangeDescription = (event) => {
      let newDescription =  event
      this.setState({
        description: newDescription
      })
    }
    onClickListener = () => {
  
        let id = this.props.navigation.state.params._id
        axios({
          method : 'PUT',
          url : `http://10.0.2.2:4000/expense/update/${id}`,
          data: {
              date: this.state.date,
              price: this.state.price,
              type: this.state.type,
              description: this.state.description
          }
          })
          .then((result) => {

              this.props.getExpenses()
              Alert.alert('Edit Expense Succes !')

          })
          .catch((err) => {

              Alert.alert("Edit Expense Error !")

          });
    }
  
    showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
   
    hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
   
    handleDatePicked = (dateEvent) => {
      let date = new Date(dateEvent)
      this.setState({
          date: date.toDateString()
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
                    value={this.state.price.toString()}
                    keyboardType="numeric"
                    underlineColorAndroid='transparent'
                    onChangeText={this.handleOnChangePrice}/>
            </View>

            <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={this.state.icon.description}/>
                <TextInput style={styles.inputs}
                    ref={input => { this.textDescription = input }}
                    value={this.state.description}
                    keyboardType="default"
                    underlineColorAndroid='transparent'
                    onChangeText={this.handleOnChangeDescription}/>
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
                 <Text style={styles.createText}>Edit Expense</Text>
            </TouchableHighlight>
  
        </View>
      );
    }
  }

export default connect(null, mapDispatchToProps)(FormUpdateExpense)
  
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

// import React from 'react';
// import {
//   StyleSheet,
//   View,
//   TextInput,
//   AppRegistry,
// } from 'react-native';

// class App extends React.Component {
//   constructor(props) {
//     super(props);

//     this.focusNextField = this.focusNextField.bind(this);
//     this.inputs = {};
//   }

//   focusNextField(id) {
//     this.inputs[id].focus();
//   }

//   render() {
//     return (
//       <View style={styles.outerContainer}>
//         <TextInput
//           placeholder="one"
//           blurOnSubmit={ false }
//           onSubmitEditing={() => {
//             this.focusNextField('two');
//           }}
//           returnKeyType={ "next" }
//           style={styles.textInput}
//           ref={ input => {
//             this.inputs['one'] = input;
//           }}
//         />
//         <TextInput
//           placeholder="two"
//           blurOnSubmit={ false }
//           onSubmitEditing={() => {
//             this.focusNextField('three');
//           }}
//           returnKeyType={ "next" }
//           style={styles.textInput}
//           ref={ input => {
//             this.inputs['two'] = input;
//           }}
//         />
//         <TextInput
//           placeholder="three"
//           blurOnSubmit={ false }
//           onSubmitEditing={() => {
//             this.focusNextField('four');
//           }}
//           returnKeyType={ "next" }
//           style={styles.textInput}
//           ref={ input => {
//             this.inputs['three'] = input;
//           }}
//         />
//         <TextInput
//           placeholder="four"
//           blurOnSubmit={ true }
//           returnKeyType={ "done" }
//           style={styles.textInput}
//           ref={ input => {
//             this.inputs['four'] = input;
//           }}
//         />
//       </View>
//     );
//   };
// }

// const styles = StyleSheet.create({
//   outerContainer: {
//     flex: 1,
//     paddingTop: 60,
//     alignItems: 'center',
//     flexDirection: 'column',
//   },
//   textInput: {
//     alignSelf: 'stretch',
//     borderRadius: 5,
//     borderWidth: 1,
//     height: 44,
//     paddingHorizontal: 10,
//     marginHorizontal: 20,
//     marginBottom: 20,
//   },
// });

// export default App;

