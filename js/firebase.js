import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfre9YECso_pvFKFQBnPP-Wsvvu07ON8k",
  authDomain: "cafeenlaciudad-7bdef.firebaseapp.com",
  projectId: "cafeenlaciudad-7bdef",
  storageBucket: "cafeenlaciudad-7bdef.appspot.com",
  messagingSenderId: "543422309369",
  appId: "1:543422309369:web:59ef68213994ed9eab5328"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export const getCafeterias = () => getDocs(collection(db, "cafeterias"));