import { AsyncStorage } from "react-native";
export const USER_KEY = "auth-piti";
export const onSignIn = () => AsyncStorage.setItem(USER_KEY, "true");
export const auth = (email) => AsyncStorage.setItem('user', email);
export const setFcm = (token) => AsyncStorage.setItem('fcmToken', token);
export const getEmail = () => {
  return new Promise((resolve, reject) => {
    let email = AsyncStorage.getItem('user')
    resolve(email)
  });
};
export  function onSignOut() {
  return AsyncStorage.removeItem('user') , AsyncStorage.removeItem(USER_KEY), AsyncStorage.removeItem('fcmToken')
  
}
  
export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};

export const fcm = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('fcmToken')
      .then(res => {
        if (res !== null) {
          resolve(res);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};