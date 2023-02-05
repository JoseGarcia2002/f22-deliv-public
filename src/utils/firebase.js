// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";
import StyledFirebaseAuth from '../components/StyledFirebaseAuth.tsx';

// ! DO NOT CHANGE THIS FILE.

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyDnYXTrIyou5sVFQYqw1_s1Y3cEb9-0diw",
   authDomain: "t4sg-f22-deliv.firebaseapp.com",
   projectId: "t4sg-f22-deliv",
   storageBucket: "t4sg-f22-deliv.appspot.com",
   messagingSenderId: "507266397052",
   appId: "1:507266397052:web:8b3eefbbf5c6af78bceaf9",
   measurementId: "G-L6H014ZLGT"
};

// const firebaseConfig = {
//    apiKey: "AIzaSyDTp9E0PCkG6VRWr1Mc2H6zpoFiBZjRKjU",
//    authDomain: "aerobic-canto-297605.firebaseapp.com",
//    projectId: "aerobic-canto-297605",
//    storageBucket: "aerobic-canto-297605.appspot.com",
//    messagingSenderId: "862300201270",
//    appId: "1:862300201270:web:dd69b2173c7c0d64955397",
//    measurementId: "G-ZE2YJJH2N8"
//  }; 

// Configure FirebaseUI.
const uiConfig = {
   // Popup signin flow rather than redirect flow.
   signInFlow: 'popup',
   // We will display Github as auth providers.
   signInOptions: [
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
   ],
   callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
   },
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export Firestore database
export const db = getFirestore();

// Export FirebaseUI signin screen
export function SignInScreen() {
   return (
      <div>
         <h1>Sign in to Links for Climate Good</h1>
         <p>Please sign-in with your Github account:</p>
         <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
   );
}
