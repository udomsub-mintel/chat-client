import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyALF1uFZpEUbFbPLEUxIiGeRQoXA3Ucy1Y",
  authDomain: "connect-x-bb311.firebaseapp.com",
  databaseURL: "https://connect-x-bb311.firebaseio.com",
  projectId: "connect-x-bb311",
  storageBucket: "connect-x-bb311.appspot.com",
  messagingSenderId: "823772295710",
  appId: "1:823772295710:web:672db446fc06d1d0"
};
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export default firestore;