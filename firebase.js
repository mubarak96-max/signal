// import * as firebase from 'firebase';
import { getAuth } from 'firebase/auth';
// import 'firebase/auth';
// import 'firebase/firestore';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC2Q6ogwjHu2irss1o3Jz0YAbFPY7FOFBg',
  authDomain: 'signal-1adb2.firebaseapp.com',
  projectId: 'signal-1adb2',
  storageBucket: 'signal-1adb2.appspot.com',
  messagingSenderId: '132396695420',
  appId: '1:132396695420:web:458d6b9058951344faeef9'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export const db = app.firestore();
export const auth = getAuth(app);
// export const auth = firebase.auth();
