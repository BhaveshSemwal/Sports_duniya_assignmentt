import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCFrb30VCPfZ6tPhhrntk1qk7dlb_mdTdk",
  authDomain: "news-app-365b8.firebaseapp.com",
  projectId: "news-app-365b8",
  storageBucket: "news-app-365b8.firebasestorage.app",
  messagingSenderId: "934757200768",
  appId: "1:934757200768:web:588e85eb63a07c687f8765",
};
// ✅ First initialize the app
const app = initializeApp(firebaseConfig);

// ✅ Then export both app and db
const db = getFirestore(app);

export { app, db };
