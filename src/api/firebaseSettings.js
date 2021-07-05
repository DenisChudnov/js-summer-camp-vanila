import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {firebaseConfig} from './config';
const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
// db.settings({timestampsInSnapshots:true});
export const auth = app.auth();
