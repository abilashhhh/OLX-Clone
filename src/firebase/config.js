import { initializeApp } from "firebase/app";
// import 'firebase/auth'
// import 'firebase/firestore'
// import 'firebase/storage'
 
 
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBUtzizY3AdlZpxOMmaDwByqZf9Ni9mLqw",
    authDomain: "olx-clone-829cd.firebaseapp.com",
    projectId: "olx-clone-829cd",
    storageBucket: "olx-clone-829cd.appspot.com",
    messagingSenderId: "520508071664",
    appId: "1:520508071664:web:7e871606f238fd94af6c35",
    measurementId: "G-6R8WVQY62T"
};

const Firebase = initializeApp(firebaseConfig);
 
export default Firebase;
 