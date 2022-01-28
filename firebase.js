import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD7oDCZOvQXMjpBGTLAg38PXVJ6UrsFdec",
  authDomain: "docs-clone-6139f.firebaseapp.com",
  projectId: "docs-clone-6139f",
  storageBucket: "docs-clone-6139f.appspot.com",
  messagingSenderId: "9580144092",
  appId: "1:9580144092:web:318bdd02e2865156b79b19",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export { db };
export { firebaseConfig };
