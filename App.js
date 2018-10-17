/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Alert, View,Text} from 'react-native';
import firebase from 'react-native-firebase';
import { Provider } from 'react-redux'
import store from './store/index'
import type { Notification, NotificationOpen } from 'react-native-firebase';
<<<<<<< HEAD
import { createBottomTabNavigator, createStackNavigator,SwitchNavigator } from 'react-navigation'
import { Icon } from 'native-base'


import Authentication from './containers/Authentication'
=======
import { createBottomTabNavigator ,SwitchNavigator} from 'react-navigation'

import InitBudget from './containers/InitBudget'
>>>>>>> scafold layout
import Home from './containers/Home'
import Add from './containers/Add'
import Recommendation from './containers/Recommendation'
import Profile from './containers/Profile'
import { isSignedIn } from "./Authentication";
import SignedOut from './containers/Router'

import { isSignedIn } from "./Authentication";
import SignedOut from './containers/Router'
const SignedIn = createBottomTabNavigator({
    Home,
<<<<<<< HEAD
    Add
},{
    navigationOptions : ({ navigation }) => ({
        headerStyle: { backgroundColor: '#fff', elevation:0 },
        headerRight : (navigation.state.routeName==='Home') ? <Icon name="bookmarks" style={{ paddingRight : 30, paddingTop : 5 }} onPress={() => navigation.navigate('Add')} /> : <View></View>
    })
})

const SignedIn = createBottomTabNavigator({
    Home : StackHome,
=======
    Add,
>>>>>>> scafold layout
    Recommendation,
    Profile
})
const createRootNavigator = (signedIn) => {
    return SwitchNavigator(
      {
        SignedIn: {
          screen: SignedIn
        },
        SignedOut: {
          screen: SignedOut
<<<<<<< HEAD
        }
=======
        },
        InitBudget: {
            screen: InitBudget
        },
>>>>>>> scafold layout
      },
      {
        initialRouteName: signedIn ? "SignedIn" : "SignedOut"
      }
    );
  };
export default class App extends Component {
    constructor(){
        super()
<<<<<<< HEAD

        this.state = {
=======
        this.state = {
>>>>>>> scafold layout
            checkedSignIn: false,
            signedIn: false
          };
    }
<<<<<<< HEAD
    async componentDidMount() {
        isSignedIn()
            .then((res) => {
                this.setState({ signedIn:res,checkedSignIn: true })
=======
    async componentDidMount() {
        isSignedIn()
            .then((res) => {
                this.setState({ signedIn:res,checkedSignIn: true })
>>>>>>> scafold layout
            })
            .catch((err) => {Alert.alert(err)})

        const notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            const action = notificationOpen.action;
            const notification: Notification = notificationOpen.notification;
            var seen = [];
            alert(JSON.stringify(notification.data, function(key, val) {
                if (val != null && typeof val == "object") {
                    if (seen.indexOf(val) >= 0) {
                        return;
                    }
                    seen.push(val);
                }
                return val;
            }));
        }
        const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
                .setDescription('My apps test channel');
// Create the channel
        firebase.notifications().android.createChannel(channel);
        this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
            // Process your notification as required
            // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
        });
        this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
            // Process your notification as required
            notification
                .android.setChannelId('test-channel')
                .android.setSmallIcon('ic_launcher');
            firebase.notifications()
                .displayNotification(notification);

        });
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
            // Get the action triggered by the notification being opened
            const action = notificationOpen.action;
            // Get information about the notification that was opened
            const notification: Notification = notificationOpen.notification;
            var seen = [];
            alert(JSON.stringify(notification.data, function(key, val) {
                if (val != null && typeof val == "object") {
                    if (seen.indexOf(val) >= 0) {
                        return;
                    }
                    seen.push(val);
                }
                return val;
            }));
            firebase.notifications().removeDeliveredNotification(notification.notificationId);

        });
    }
    componentWillUnmount() {
        this.notificationDisplayedListener();
        this.notificationListener();
        this.notificationOpenedListener();
    }

render() {
    if (!this.state.checkedSignIn) {
      return null;
    }


   const Layout = createRootNavigator(this.state.signedIn)

   return (

    <Provider store={store}>
       <Layout/>
    </Provider>

    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});