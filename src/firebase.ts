import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA6LyKtRscKtKUhP25PWzeuRTV72bkwgbg",
    authDomain: "boostif-fad4d.firebaseapp.com",
    databaseURL: "https://boostif-fad4d-default-rtdb.firebaseio.com",
    projectId: "boostif-fad4d",
    storageBucket: "boostif-fad4d.appspot.com",
    messagingSenderId: "1094525233014",
    appId: "1:1094525233014:web:e32710f94b804b460dfc57"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };