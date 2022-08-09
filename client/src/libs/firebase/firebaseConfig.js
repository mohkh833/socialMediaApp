// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyDbWXEBVO2YkhoweQlaC8JZamNpL7vMX4E",

  authDomain: "social-media-app-57b9b.firebaseapp.com",

  projectId: "social-media-app-57b9b",

  storageBucket: "social-media-app-57b9b.appspot.com",

  messagingSenderId: "197895383185",

  appId: "1:197895383185:web:8cee25ec469d41ef877730"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export default storage;