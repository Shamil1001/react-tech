import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBydfGcm-OvmMdf-_uJW2LF9VV_eifOhM4",
    authDomain: "react-tech-f9d11.firebaseapp.com",
    projectId: "react-tech-f9d11",
    storageBucket: "react-tech-f9d11.appspot.com",
    messagingSenderId: "596430924929",
    appId: "1:596430924929:web:e10a1a2e7f714469f8b180",
    measurementId: "G-WSW6F5ZVVJ"
  };


const app = initializeApp(firebaseConfig);
export const db =getDatabase(app)
export const auth = getAuth()