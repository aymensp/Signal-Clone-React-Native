import firebase from "firebase"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCZ3cH5CyP8hFhFtTEWEKxaPtBbIojfl8Y",
  authDomain: "signal-clone-64922.firebaseapp.com",
  projectId: "signal-clone-64922",
  storageBucket: "signal-clone-64922.appspot.com",
  messagingSenderId: "353515790050",
  appId: "1:353515790050:web:6134a93368671fdf3248bb",
  measurementId: "G-MTRJBN44RQ"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
}
else {
  app = firebase.app();
}
const db = app.firestore();
const auth = firebase.auth();

export { auth, db };
