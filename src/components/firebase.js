import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCK7N6Clh8A4j7pK35VlWCLCVmelVoH4XI",
  authDomain: "kleurenwiezenmvs.firebaseapp.com",
  databaseURL: "https://kleurenwiezenmvs.firebaseio.com",
  projectId: "kleurenwiezenmvs",
  storageBucket: "kleurenwiezenmvs.appspot.com",
  messagingSenderId: "652229590349",
  appId: "1:652229590349:web:7289be8283692b45f38b04",
  measurementId: "G-M9JN3MKKXK",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
