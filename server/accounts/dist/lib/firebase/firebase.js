import { initializeApp, getApp, getApps, deleteApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
async function initFirebase() {
    const response = await fetch('/accounts/api/config');
    const firebaseConfig = await response.json();
    return firebaseConfig;
}
const firebaseConfig = await initFirebase();
const APP_NAME = "sherman";
export const app = !getApps().length
    ? initializeApp(firebaseConfig, APP_NAME)
    : getApp(APP_NAME);
export const db = getFirestore(app);
export const auth = getAuth(app);
//# sourceMappingURL=firebase.js.map