
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyCqJviezQxobhTdRSq7JGjNqOJcwFCfWlw",
  authDomain: "betauploadingfile.firebaseapp.com",
  projectId: "betauploadingfile",
  storageBucket: "betauploadingfile.appspot.com",
  messagingSenderId: "746522759057",
  appId: "1:746522759057:web:4e3c0576f241f1b8b25430",
  measurementId: "G-CVKNW7BDWX"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const imageDb = getStorage(app)