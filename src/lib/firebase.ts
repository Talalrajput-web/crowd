import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBMG-cEb0l87jvkOyV1L55TzMC9hqI26cI",
  authDomain: "psychic-codex-m7c1c.firebaseapp.com",
  projectId: "psychic-codex-m7c1c",
  storageBucket: "psychic-codex-m7c1c.firebasestorage.app",
  messagingSenderId: "443161423781",
  appId: "1:443161423781:web:4a707322cf78ba2f74824c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with custom databaseId
export const db = getFirestore(app, "ai-studio-kindred-58e80d13-4315-45bb-aa26-2aca52ca42c6");

// Initialize Auth
export const auth = getAuth(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
