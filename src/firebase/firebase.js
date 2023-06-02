import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebaseConfig";
import {GoogleAuthProvider , getAuth} from "firebase/auth";

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider = new GoogleAuthProvider();