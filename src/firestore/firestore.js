import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDab6zX873Hce3fFOgOAccrAq5ddg_2YEU",
  authDomain: "connect-x-sandbox-22779.firebaseapp.com",
  databaseURL: "https://connect-x-sandbox-22779.firebaseio.com",
  projectId: "connect-x-sandbox-22779",
  storageBucket: "connect-x-sandbox-22779.appspot.com",
  messagingSenderId: "1035301278821",
  appId: "1:1035301278821:web:3463957445df1e8ca4a28c",
  measurementId: "G-JTNG86F17Z",
};
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export default firestore;