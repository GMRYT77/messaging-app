import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD7RwabtNPfui5tBoYzCtDmGhpsqlPRu5o",
  authDomain: "messaging-app-aeea7.firebaseapp.com",
  projectId: "messaging-app-aeea7",
  storageBucket: "messaging-app-aeea7.appspot.com",
  messagingSenderId: "908227343162",
  appId: "1:908227343162:web:153d460aff4fae897d5603",
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = getStorage(app);

export { db, auth, provider, storage };
