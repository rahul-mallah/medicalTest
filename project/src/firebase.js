import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import 'firebase/storage'; 


const firebaseConfig = {
    apiKey: process.env.REACT_APP_api_key,
    authDomain: process.env.REACT_APP_auth_domain,
    projectId: process.env.REACT_APP_project_Id,
    storageBucket: process.env.REACT_APP_storage_Bucket,
    messagingSenderId: process.env.REACT_APP_messagingSender_Id,
    appId: process.env.REACT_APP_app_Id,
    measurementId: process.env.REACT_APP_measurement_Id
  };


firebase.initializeApp(firebaseConfig);


export default firebase
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storageRef = firebase.storage().ref();
export const removeImageFromStorage = firebase.storage();









