import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDfW8-LnS6O6VWTkXxUNSa70hEL8Vxnho4",
    authDomain: "qandq-54810.firebaseapp.com",
    projectId: "qandq-54810",
    storageBucket: "qandq-54810.appspot.com",
    messagingSenderId: "295613064585",
    appId: "1:295613064585:web:888fa192e60d0cc2396d58"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
