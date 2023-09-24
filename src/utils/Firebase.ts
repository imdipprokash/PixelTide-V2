import firebase from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBal5l2NonBR4Mr87hDhfTvAVF2b0U1H_k',
  authDomain: 'asia-east1',
  databaseURL:
    'https://pixeltide-2da7e-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'pixeltide-2da7e',
  storageBucket: 'gs://pixeltide-2da7e.appspot.com',
  messagingSenderId: '636002777334',
  appId: '1:636002777334:android:4c9fdd270d5776a821d4d7',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
