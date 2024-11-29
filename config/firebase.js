// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBe6ybmg7vqPZxjYbgQVPbxfgidBvvJPII",
  authDomain: "pay-7dc82.firebaseapp.com",
  projectId: "pay-7dc82",
  storageBucket: "pay-7dc82.firebasestorage.app",
  messagingSenderId: "146566121471",
  appId: "1:146566121471:web:23d86279a08efce59409ca",
  measurementId: "G-R4TXXYRM2L"
};

// Initialize Firebase
var auth;
async function initializeFirebase(){
  try {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    console.log('........done');
  } catch (error) {
    console.log('..........initialize done ', error);

  }
};
export {auth, initializeFirebase} ;

 


