// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore/lite"


const firebaseConfig = {
    apiKey: "AIzaSyBqm1q1dugzo97YvOB6xii1UHmjAroutKQ",
    authDomain: "vue-3-2024-204a8.firebaseapp.com",
    projectId: "vue-3-2024-204a8",
    storageBucket: "vue-3-2024-204a8.appspot.com",
    messagingSenderId: "539387588381",
    appId: "1:539387588381:web:200701918e24d8eab1fbf4"
};

initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore()

export {auth, db}