import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {firebaseConfig} from './config';
const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const auth = app.auth();
export const filmsRef = db.collection('films');
export const peopleRef = db.collection('people');
export const planetsRef = db.collection('planets');
export const speciesRef = db.collection('species');
export const starshipsRef = db.collection('starships');
export const transportRef = db.collection('transport');
export const vehiclesRef = db.collection('vehicles');
