import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDOr8Qys4WFR2l1GGRDFZ4-ye_FjGOqNZY",
    authDomain: "linkedin-clone-a5080.firebaseapp.com",
    projectId: "linkedin-clone-a5080",
    storageBucket: "linkedin-clone-a5080.appspot.com",
    messagingSenderId: "108013054474",
    appId: "1:108013054474:web:4fc60c01268432878f0df3",
    measurementId: "G-N6SCW5YHLK"
  };
  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const storage = getStorage(firebaseApp);
  
    
  export {db, auth, provider, storage };

  

