import { decode, encode } from 'base-64';
import './timerConfig';
global.addEventListener = (x) => x;
if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCkGFh71eIodOiP7bGESNpznFVpVL-8rIY',
  authDomain: 'chatngift-ac272.firebaseapp.com',
  projectId: 'chatngift-ac272',
  storageBucket: 'chatngift-ac272.appspot.com',
  messagingSenderId: '162776616350',
  appId: '1:162776616350:web:e054bf8e6dfed392d8da8f',
  measurementId: 'G-F8QZ5ZBJZ6',
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export { firebase };
