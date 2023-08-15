import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBkJLWt_h37Q7sS8oxptpS-wZinPW51HPg",
  authDomain: "react-crud-rakshit.firebaseapp.com",
  projectId: "react-crud-rakshit",
  storageBucket: "react-crud-rakshit.appspot.com",
  messagingSenderId: "712775988136",
  appId: "1:712775988136:web:b28df44d07e512b578239d",
  measurementId: "G-P0BCRFKV1X"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
