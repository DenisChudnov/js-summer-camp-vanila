import {firebaseConfig} from "../config.js";

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export { firestore, firebase }
