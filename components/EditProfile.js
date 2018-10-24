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
  Icon,
  PixelRatio
} from 'react-native';
import axios from 'axios'
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert'
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux'
import getData from '../store/actions/getData'
import getRecommendation from '../store/actions/getRecommendations'


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getExpenses: () => {
      dispatch(getData())
    },
    getRecom : () =>{
      dispatch(getRecommendation())
    }
  }
}

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
    error: false,
    icon: {
      user : require('../assets/icons/user.png'),
      money: require('../assets/icons/money.png'),
      target: require('../assets/icons/target.png'),
    },
  };

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        const formData = new FormData
        formData.append('image', {
          uri : response.uri,
          name: response.fileName,
          type: response.type
         })
        axios.post('https://mtbcorner.wahyudisetiaji.xyz/articles/upload', formData,
          {headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          }}
        )
        .then((result) => {
          console.log(result.data.link)
          this.setState({
            avatar: result.data.link
          })
        }).catch((err) => {
           console.log('Error Upload', err)
        });
      }
    });
  }

  handleClose = () => {
    this.setState({ show: false })
  }

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

  onClickListener = () => {
    let newData = {
      name: this.state.name,
      email: this.state.email,
      avatar: this.state.avatar,
      main_balance: this.state.main_balance,
      budget: this.state.budget
    }
    let email = this.props.navigation.state.params.email
        axios({
            method : 'PUT',
            url : `https://piti.minimalistdeveloper.xyz/user/profile/${email}`,
            data: newData
        })
        .then((result) => {

            this.props.getExpenses()
            this.props.getRecom('asc')
            this.setState({ show: true })
            console.log(this.state.show)
            console.log(result)

        }).catch((err) => {
            this.setState({ error: true })
        });

  }

  render() {
    return (
      <View style={styles.container}>

            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
              <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
              { this.state.avatar === null ? <Text>Select a Photo</Text> :
                <Image style={styles.avatar} source={{uri: this.state.avatar}} />
              }
              </View>
            </TouchableOpacity>

            <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={this.state.icon.user}/>
                <TextInput style={styles.inputs}
                    ref={input => { this.textName = input }}
                    value={this.state.name}
                    keyboardType="default"
                    underlineColorAndroid='transparent'
                    onChangeText={this.handleOnChangeName}/>
            </View>

            <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={this.state.icon.money}/>
                <TextInput style={styles.inputs}
                    ref={input => { this.textMain = input }}
                    value={this.state.main_balance.toString()}
                    keyboardType="numeric"
                    underlineColorAndroid='transparent'
                    onChangeText={this.handleOnChangeMain}/>
            </View>

            <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={this.state.icon.target}/>
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

             <SCLAlert
              show={this.state.show}
              onRequestClose={this.handleClose}
              theme="info"
              title="Edit Success !"
              headerIconComponent={  <Image
                style={{width: 40, height: 40}}
                source={{uri: 'https://png.icons8.com/ios-glyphs/50/ffffff/multi-edit.png'}}
              />}
            >
            </SCLAlert>

        </View>
    )
  }
}

export default connect(null, mapDispatchToProps)(EditProfile)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
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


