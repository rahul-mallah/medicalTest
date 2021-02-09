import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import 'firebase/storage'; 


const firebaseConfig = {
    apiKey: "AIzaSyD2kW0OTo9IS7ImFWOQxK2lPaI8yp-N8Xs",
    authDomain: "myappointment-bb30e.firebaseapp.com",
    projectId: "myappointment-bb30e",
    storageBucket: "myappointment-bb30e.appspot.com",
    messagingSenderId: "1043169572852",
    appId: "1:1043169572852:web:c41f169fd7b310a9602ba1",
    measurementId: "G-FKX22C5QHR"
  };


firebase.initializeApp(firebaseConfig);


export default firebase
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storageRef = firebase.storage().ref();
export const removeImageFromStorage = firebase.storage();









