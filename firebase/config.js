import firebase from 'firebase';
import { onFrameDidUpdate } from 'expo/build/AR';
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDx5CjA-E59cOjUpE-j82vNdKuWsGwd0GE",
    authDomain: "my-rn-project-f6756.firebaseapp.com",
    databaseURL: "https://my-rn-project-f6756.firebaseio.com",
    projectId: "my-rn-project-f6756",
    storageBucket: "my-rn-project-f6756.appspot.com",
    messagingSenderId: "958989909871",
    appId: "1:958989909871:web:80ae89d063d1d3503cf29a",
    measurementId: "G-9345NHHD7G"
  };
  // Initialize Firebase
 firebase.initializeApp(firebaseConfig);

 const auth = firebase.auth();
 const firestore = firebase.firestore();
 const storage = firebase.storage();

//  FieldValue
 
 export { auth, firestore, storage };
