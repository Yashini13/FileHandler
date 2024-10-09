import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyD6-tAE05W_e3i0cmwk6Nh_CQzA1Kkzm9E",
  authDomain: "filefetchupload.firebaseapp.com",
  projectId: "filefetchupload",
  storageBucket: "filefetchupload.appspot.com",
  messagingSenderId: "749450624280",
  appId: "1:749450624280:web:efd0a2607ee13e25ccb26d"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app); 

export { storage };
