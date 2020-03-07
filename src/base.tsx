import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCK7N6Clh8A4j7pK35VlWCLCVmelVoH4XI",
  authDomain: "kleurenwiezenmvs.firebaseapp.com",
  databaseURL: "https://kleurenwiezenmvs.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;