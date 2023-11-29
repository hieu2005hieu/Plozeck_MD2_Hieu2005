
import { getStorage } from "firebase/storage"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBfpp5f9cKxEk4qZBy4qtQ2nCAJZtHPaSc",
    authDomain: "json-15db3.firebaseapp.com",
    projectId: "json-15db3",
    storageBucket: "json-15db3.appspot.com",
    messagingSenderId: "383726680753",
    appId: "1:383726680753:web:1c873e369e758e1ce1c090",
    measurementId: "G-KS6426W8DM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)