
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBLeJHr3SR13IsemuarK5SyYSR78LXkHEc",
  authDomain: "otp-login-89ba3.firebaseapp.com",
  projectId: "otp-login-89ba3",
  storageBucket: "otp-login-89ba3.appspot.com",
  messagingSenderId: "53855221591",
  appId: "1:53855221591:web:bbc30c43f485e0c754b012"
};


export const app = firebase.initializeApp(firebaseConfig);

export const { auth } = firebase;

export default firebase;

