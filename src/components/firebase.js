
import "firebase/compat/auth";
import "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAx0BpU65lFDQwc5IUQ5mXXMhkz0VUCiAg",
    authDomain: "chat-app-f547d.firebaseapp.com",
    projectId: "chat-app-f547d",
    storageBucket: "chat-app-f547d.appspot.com",
    messagingSenderId: "198020423017",
    appId: "1:198020423017:web:d63fe5335c9d765c9b31f8"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get the Firebase Auth instance
export const auth = getAuth(firebaseApp);
 
    
